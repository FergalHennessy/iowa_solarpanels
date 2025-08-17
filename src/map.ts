import L, { Layer } from 'leaflet';
import type { Feature, FeatureCollection, Geometry} from 'geojson';
import 'leaflet/dist/leaflet.css'
import countyJsonRaw from './data/overlay.json'

type CountyProps = {
  CountyDisplayName?: string;
  HasLocationRestrictions?: number;
  LocationRestrictions?: string;
  HasAcreageRestrictions?: number;
  AcreageRestrictions?: string;
  HasGroundCoverRestrictions?: number;
  GroundCoverRestrictions?: string;
  Website: string;
};

function onEachFeature(feature: Feature<Geometry, CountyProps>, layer: Layer){
    var PopupContent = `<a href=${feature?.properties?.Website} style="font-weight: bold"> ${feature?.properties?.CountyDisplayName} </a> <br>\
                        <br>`

    if(feature.properties?.HasLocationRestrictions === 1){
        PopupContent += "<b>Location Restrictions:</b> <br>" + feature.properties.LocationRestrictions + '<br>'
    }

    if(feature.properties?.HasAcreageRestrictions === 1){
        PopupContent += "<b>Acreage Restrictions:</b> <br>" + feature.properties.AcreageRestrictions + '<br>'
    }

    if(feature.properties?.HasGroundCoverRestrictions === 1){
        PopupContent += "<b>Ground Cover Restrictions:</b> <br>" + feature.properties.GroundCoverRestrictions + '<br>'
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
            if(feature?.properties?.HasLocationRestrictions === 1){
                return {"color": "#ff0000"};
            }
            if(feature?.properties?.HasAcreageRestrictions === 1){
                return {"color": "#FF7F50"};
            }
            if(feature?.properties?.HasGroundCoverRestrictions === 1){
                return {"color": "#0000FF"};
            }
            return {"color": "#50C878"}; 
        }
    }).addTo(map)

    console.log(countyJson.features[0].properties)
}