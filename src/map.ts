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

    let flag = false;

    if(feature.properties?.HasLocationRestrictions === 1){
        PopupContent += "<b>Location Restrictions:</b> <br>" + feature.properties.LocationRestrictions + '<br>'
        flag = true;
    }

    if(feature.properties?.HasAcreageRestrictions === 1){
        PopupContent += "<b>Acreage Restrictions:</b> <br>" + feature.properties.AcreageRestrictions + '<br>'
        flag = true;
    }

    if(feature.properties?.HasGroundCoverRestrictions === 1){
        PopupContent += "<b>Ground Cover Restrictions:</b> <br>" + feature.properties.GroundCoverRestrictions + '<br>'
        flag = true;
    }

    if(feature.properties?.HasScreeningRestrictions === 1){
        PopupContent += "<b>Screening Restrictions:</b> <br>" + feature.properties.ScreeningRestrictions + '<br>'
        flag = true;
    }

    if(feature.properties?.HasHeightRestrictions === 1){
        PopupContent += "<b>Height Restrictions:</b> <br>" + feature.properties.HeightRestrictions + '<br>'
        flag = true;
    }

    if(flag === false){
        PopupContent += "<b> No Restrictions </b>"
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

    function gen_restrict_layer(base_color : string, highlight_color : string, layer_props : (keyof CountyProps)[]) {
        return L.geoJson(countyJson, {
            onEachFeature: onEachFeature,
            style: (feature) => {
                for(const layer_prop of layer_props){
                    if(feature?.properties?.[layer_prop] === 1){
                        return {"fillColor": highlight_color,
                                "color": base_color};
                    }
                }
                return {"color": base_color};
            }
        })
    }

    function gen_county_layer(base_color : string, highlight_color: string, county_display_name: string){
        return L.geoJSON(countyJson, {
            onEachFeature: onEachFeature,
            style: (feature) => {
                if(feature?.properties?.CountyDisplayName === county_display_name){
                    return {"fillColor": highlight_color,
                                "color": base_color};
                }
                return {"color": base_color}
            }
        })
    }

    map.addLayer(background_layer);
    map.addLayer(gen_restrict_layer("#50C878", "#FF0000", ["HasLocationRestrictions", "HasAcreageRestrictions", "HasGroundCoverRestrictions", "HasScreeningRestrictions", "HasHeightRestrictions"]));

    type LayerKey = "any" | "location" | "acreage" | "groundcover" | "screening" | "height";

    const restricted_layers: Record<LayerKey, any> = 
                              {"any" :        gen_restrict_layer("#50C878", "#FF0000", ["HasLocationRestrictions", "HasAcreageRestrictions", "HasGroundCoverRestrictions", "HasScreeningRestrictions", "HasHeightRestrictions"]), 
                               "location":    gen_restrict_layer("#50C878", "#FF0000", ["HasLocationRestrictions"]), 
                               "acreage":     gen_restrict_layer("#50C878", "#FF0000", ["HasAcreageRestrictions"]), 
                               "groundcover": gen_restrict_layer("#50C878", "#FF0000", ["HasGroundCoverRestrictions"]),
                               "screening":   gen_restrict_layer("#50C878", "#FF0000", ["HasScreeningRestrictions"]), 
                               "height":      gen_restrict_layer("#50C878", "#FF0000", ["HasHeightRestrictions"])}

    let restrictSelect = document.getElementById("restrictionType") as HTMLSelectElement | null;
    restrictSelect?.addEventListener("click", ()=>{
        showLayer(map, restricted_layers[restrictSelect.value as LayerKey], background_layer);
    });

    let countySelect = document.getElementById("countyName") as HTMLSelectElement | null;
    countySelect?.addEventListener("click", ()=>{
        if(countySelect.value === "Restriction Type"){
            showLayer(map, restricted_layers["any"], background_layer);
        }else{
            showLayer(map, gen_county_layer("#50C878", "#FF0000", countySelect.value), background_layer)
        }
    })
    
}

