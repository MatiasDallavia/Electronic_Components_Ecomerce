import React from 'react'
import { handleNestedFieldChange } from '../../../utils/callbacks';


function IGBTFilter({setQueryVariables}) {
  return (
    <>

        <div className="filter-group me-3">
            <label for="ic" className="filter-label">Current Collector:</label>
            <select 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'igbtInput', 'ic')}
            >
                <option value="ALL">All</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
                <option value="30">40</option>
                <option value="30">45</option>
            </select>
        </div>            



        <div className="filter-group me-3">
            <label for="ic" className="filter-label">Voltage Collector(vc):</label>
            <select 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'igbtInput', 'vc')}
            >
                <option value="ALL">All</option>
                <option value="600">600</option>
                <option value="800">800</option>
                <option value="1200">1200</option>
            </select>
        </div>            
  
    </>
  )
}

export default IGBTFilter