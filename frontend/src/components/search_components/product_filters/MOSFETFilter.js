import React from 'react'
import { handleNestedFieldChange } from '../../../uitls';

function MOSFETFilter({setQueryVariables}) {
  return (
    <>

        <div class="filter-group me-3">
            <label for="vds" class="filter-label">Voltage Drain Source(Vds):</label>
            <input 
              class="form-control filter-field" 
              type="text" 
              placeholder="Default input"
              onChange={handleNestedFieldChange(setQueryVariables, 'mosfetInput','vds')}
            />
        </div>

        <div class="filter-group me-3">
            <label for="rdsOn" class="filter-label">Rds ON:</label>
            <input 
              class="form-control filter-field" 
              type="text" placeholder="Default input"
              onChange={handleNestedFieldChange(setQueryVariables, 'mosfetInput','rdsOn')}
            />
        </div>

        <div class="filter-group me-3">
            <label for="drive_voltage" class="filter-label">Drive Voltage:</label>
            <input 
              class="form-control filter-field" 
              type="text" 
              placeholder="Default input"
              onChange={handleNestedFieldChange(setQueryVariables, 'mosfetInput','driveVoltage')}
            />
        </div>
  
    </>
  )
}

export default MOSFETFilter