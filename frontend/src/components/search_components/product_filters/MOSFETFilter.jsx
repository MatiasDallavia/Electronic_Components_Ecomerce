import React from 'react'
import { handleNestedFieldChange } from '../../../utils/callbacks';

function MOSFETFilter({setQueryVariables}) {
  return (
    <>
        <div className="filter-group me-3">
            <label for="currentCollector" className="filter-label">Voltage Drain Source(Vds):</label>
            <select 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'mosfetInput', 'vds')}
            >
                <option value="ALL">All</option>
                <option value="8">8</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        </div>    


        <div className="filter-group me-3">
            <label for="rdsON" className="filter-label">Rds ON:</label>
            <select 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'mosfetInput', 'rdsOn')}
            >
                <option value="ALL">All</option>
                <option value="0.08">0.08</option>
                <option value="0.05">0.05</option>
                <option value="0.1">0.1</option>
            </select>
        </div>    
          
  
    </>
  )
}

export default MOSFETFilter