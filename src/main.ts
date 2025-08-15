import './style.css'
import { setupMap } from './map.ts'
import { setupHeader } from './header.ts'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  


<br><br><br>

  <div id="content">
    
  
    <h1>Iowa Solar Map</h1>

    <div id="map"></div>
  
  </div>
  
`


setupMap()

setupHeader() 