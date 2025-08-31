import './style.css'
import { setupStateMap } from './state_map.ts'
import { list_options } from './select_options.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  


<br><br><br>

  <div id="content">
    
  
    <h1>Iowa Solar Zoning Regulations Map</h1>

    <br>
    <label>Use the following dropdown menu to highlight counties by category of regulation.</label>
    <br>


    <div style="display:flex; flex-direction: row; justify-content: center; align-items: center">

      <select name="Type Of Restriction" id="restrictionType"> 
        <option value="any"        > Restriction Type </option>
        <option value="location"   > Location     </option>
        <option value="acreage"    > Acreage      </option>
        <option value="groundcover"> Ground Cover </option>
        <option value="screening"  > Screening    </option>
        <option value="height"     > Height       </option>
      </select>

      <select name="County Name" id="countyName">
        <option value="all"        > County Name </option>
        ${list_options()}
      </select>

    </div>

    <div id="map"></div>    
  
  </div>
  
`

setupStateMap()