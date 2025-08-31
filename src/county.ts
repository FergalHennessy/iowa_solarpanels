import './style.css'
import { setupCountyMap } from './state_map.ts'
import { list_options } from './select_options.ts'

const el = document.getElementById("app");

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  


<br><br><br>

  <div id="content">
    
  
    <h1>${el?.getAttribute("data-countyDisplayName")} Solar Zoning Regulations </h1>

    <br> 
    <p> County Website: <a href="${el?.getAttribute("data-countyWebsite")}">${el?.getAttribute("data-countyWebsite")} </a> </p>
    <p> ${el?.getAttribute("data-countyRegulationsDoc") === "" ? "No Document Available" : "<a href=\"" + el?.getAttribute("data-countyRegulationsDoc") + "\">Link to Regulations Document</a>"}
    <p> Location Restrictions: ${(el?.getAttribute("data-hasLocationRestriction") === null) ? "None" : el?.getAttribute("data-locationRestriction")} </p>
    <p> Acreage Restrictions: ${(el?.getAttribute("data-hasAcreageRestriction") === null) ? "None" : el?.getAttribute("data-acreageRestriction")} </p>
    <p> Ground Cover Restrictions: ${(el?.getAttribute("data-hasGroundCoverRestriction") === null) ? "None" : el?.getAttribute("data-groundCoverRestriction")} </p>
    <p> Screening Restrictions: ${(el?.getAttribute("data-hasScreeningRestriction") === null) ? "None" : el?.getAttribute("data-screeningRestriction")} </p>
    <p> Height Restrictions: ${(el?.getAttribute("data-hasHeightRestriction") === null) ? "None" : el?.getAttribute("data-heightRestriction")} </p>
    

    <div id="map"></div>    
  
  </div>
  
`

const countyName = el?.getAttribute("data-countyDisplayName");
if (countyName) {
  setupCountyMap(countyName);
}