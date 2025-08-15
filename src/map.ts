import L from 'leaflet';
import type { FeatureCollection, GeoJsonObject } from 'geojson';
import 'leaflet/dist/leaflet.css'
import countyJsonRaw from './data/overlay.json'

function onEachFeature(feature, layer){
    var PopupContent = "<b>"+feature.properties.CountyDisplayName+"</b> <br>\
                        <b>County Solar Restrictions:</b>"

    if(feature.properties && feature.properties.HasLocationRestrictions){
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
        style: function(feature) {
            switch(feature?.properties.HasLocationRestrictions){
                case 1: return {"color": "#ff0000"};
            }
        }
    }).addTo(map)

    console.log(countyJson.features[0].properties)
}