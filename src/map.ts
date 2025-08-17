import L, { Layer } from 'leaflet';
import type { Feature, FeatureCollection, Geometry} from 'geojson';
import 'leaflet/dist/leaflet.css'
import countyJsonRaw from './data/overlay.json'

type CountyProps = {
  CountyDisplayName?: string;
  HasLocationRestrictions?: number | boolean | "0" | "1";
  LocationRestrictions?: string;
  Website: string;
};

function onEachFeature(feature: Feature<Geometry, CountyProps>, layer: Layer){
    var PopupContent = `<a href=${feature?.properties?.Website} style="font-weight: bold"> ${feature?.properties?.CountyDisplayName} </a> <br>\
                        <br>`

    const hasLocationRestrictions = feature.properties?.HasLocationRestrictions;
    const isLocationRestricted =
    hasLocationRestrictions === 1 ||
    hasLocationRestrictions === true ||
    hasLocationRestrictions === "1";

    if(isLocationRestricted && feature.properties.HasLocationRestrictions){
        PopupContent += "<b>Location Restrictions:</b> <br>" + feature.properties.LocationRestrictions
    }

    layer.bindPopup(PopupContent)
}

export function setupMap(){
    var map = L.map('map', {zoomSnap: 0.25}).setView([41.95, -93.098], 7.25);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let countyJson = countyJsonRaw as FeatureCollection

    L.geoJSON(countyJson, {
        onEachFeature: onEachFeature,
        style: (feature) => {
            switch(feature?.properties?.HasLocationRestrictions){
                case 1: return {"color": "#ff0000"};
            }
            return {"color": "#0000ff"}; 
        }
    }).addTo(map)

    console.log(countyJson.features[0].properties)
}