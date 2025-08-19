import L, { Layer, TileLayer } from 'leaflet';
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
  HasScreeningRestrictions?: number;
  ScreeningRestrictions?: string;
  HasHeightRestrictions?: number;
  HeightRestrictions?: string;
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

    if(feature.properties?.HasHeightRestrictions === 1){
        PopupContent += "<b>Height Restrictions:</b> <br>" + feature.properties.HeightRestrictions + '<br>'
    }

    layer.bindPopup(PopupContent)
}

function showLayer(map: L.Map, shownLayer: L.GeoJSON, background_layer: TileLayer){
    map.eachLayer(function(layer){
        if (layer != background_layer){
            map.removeLayer(layer);
        }
    })
    map.addLayer(shownLayer);
}

export function setupMap(){
    var map = L.map('map', {zoomSnap: 0.25}).setView([41.95, -93.098], 7.25);
    
    let background_layer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    let countyJson = countyJsonRaw as FeatureCollection

    let base_layer = L.geoJSON(countyJson, {
        onEachFeature : onEachFeature,
        style: (feature)=>{

            if(feature?.properties?.HasLocationRestrictions === 1 ||
               feature?.properties?.HasAcreageRestrictions === 1 ||
               feature?.properties?.HasGroundCoverRestrictions === 1 ||
               feature?.properties?.HasHeightRestrictions === 1
            ){
                return {"color": "#FF0000"}
            }
            return {"color": "#50C878"};
        }
    })

    let location_layer = L.geoJSON(countyJson, {
        onEachFeature : onEachFeature,
        style: (feature) => {
            if(feature?.properties?.HasLocationRestrictions === 1){
                return {"color": "#ff0000"};
            }
            return {"color": "#50C878"};
        }
    });

    let acreage_layer = L.geoJSON(countyJson, {
        onEachFeature : onEachFeature,
        style: (feature) => {
            if(feature?.properties?.HasAcreageRestrictions === 1){
                return {"color": "#FF7F50"};
            }
            return {"color": "#50C878"};
        }
    });

    let groundcover_layer = L.geoJSON(countyJson, {
        onEachFeature : onEachFeature,
        style: (feature) => {
            if(feature?.properties?.HasGroundCoverRestrictions === 1){
                return {"color": "#0000FF"};
            }
            return {"color": "#50C878"};
        }
    });

    let screening_layer = L.geoJson(countyJson, {
        onEachFeature: onEachFeature,
        style: (feature) => {
            if(feature?.properties?.HasScreeningRestrictions === 1){
                return {"color": "#AA336A"};
            }
            return {"color": "#50C878"};
        }
    });

    let height_layer = L.geoJson(countyJson, {
        onEachFeature: onEachFeature,
        style: (feature) => {
            if(feature?.properties?.HasHeightRestrictions === 1){
                return {"color": "#AA336A"};
            }
            return {"color": "#50C878"};
        }
    });

    map.addLayer(background_layer);
    map.addLayer(base_layer);

    type LayerKey = "any" | "location" | "acreage" | "groundcover" | "screening" | "height";

    const restricted_layers: Record<LayerKey, any> = 
                              {"any" : base_layer, "location": location_layer, 
                               "acreage": acreage_layer, "groundcover": groundcover_layer,
                               "screening": screening_layer, "height": height_layer}

    let select = document.getElementById("showLayer") as HTMLSelectElement | null;
    select?.addEventListener("click", ()=>{
        showLayer(map, restricted_layers[select.value as LayerKey], background_layer);
    });
}

