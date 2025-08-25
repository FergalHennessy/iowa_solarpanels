import countyJSONRaw from './data/overlay.json'
import type {FeatureCollection, Geometry} from 'geojson';

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

export function list_options(){

    const countyFeatureCollection = countyJSONRaw as FeatureCollection<Geometry, CountyProps>

    let counties = countyFeatureCollection.features
        .map(f => {
            return f.properties?.CountyDisplayName?? "";
        })

    counties.sort();
    
    return counties
        .map(c => {
            return `<option value="${c}">${c}</option>`
        })
        .join("\n");
}