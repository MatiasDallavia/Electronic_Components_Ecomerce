import React from 'react'
import { handleNestedFieldChange } from '../../../uitls';


function IGBTFilter({setQueryVariables}) {
  return (
    <>

        <div class="filter-group me-3">
            <label for="vc" class="filter-label">Voltage Collector(vc):</label>
            <input 
                class="form-control filter-field" 
                type="text" 
                placeholder="Default input"
                onChange={handleNestedFieldChange(setQueryVariables, 'igbtInput','vc')}
                />
        </div>

        <div class="filter-group me-3">
            <label for="ic" class="filter-label">Current Collector:</label>
            <input 
                class="form-control filter-field" 
                type="text" 
                placeholder="Default input"
                onChange={handleNestedFieldChange(setQueryVariables, 'igbtInput','ic')}
            />
        </div>

        <div class="filter-group me-3">
            <label for="powerMax" class="filter-label">Power Max:</label>
            <input 
                class="form-control filter-field" 
                type="text" 
                placeholder="Default input"
                onChange={handleNestedFieldChange(setQueryVariables, 'igbtInput','powerMax')}
            />
        </div>
  
    </>
  )
}

export default IGBTFilter