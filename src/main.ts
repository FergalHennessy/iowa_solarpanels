// import L, { Layer } from 'leaflet';
// import type { Feature, FeatureCollection, Geometry} from 'geojson';
import './style.css'
import { setupMap } from './map.ts'
import { setupHeader } from './header.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  


<br><br><br>

  <div id="content">
    
  
    <h1>Iowa Solar Zoning Regulations Map</h1>

    <br>
    <label for="showLayer">Filter Counties By Restriction:</label>
    <br>
    <select name="Type Of Restriction" id="showLayer"> 
      <option value="any"        > Any          </option>
      <option value="location"   > Location     </option>
      <option value="acreage"    > Acreage      </option>
      <option value="groundcover"> Ground Cover </option>
      <option value="screening"  > Screening    </option>
      <option value="height"     > Height       </option>
    </select>

    <div id="map"></div>    
  
  </div>
  
`


setupMap()

setupHeader(); 