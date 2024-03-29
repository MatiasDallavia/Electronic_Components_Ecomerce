import React from 'react'
import { handleNestedFieldChange } from '../../../utils/callbacks';



function BJTFilter({setQueryVariables}) {
    

    return (
    <>
        <div className="filter-group me-3">
            <label for="typePNP" className="filter-label">Type PNP/NPN:</label>
            <select 
                id="typePNP" 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'bjtInput', 'bjtType')}
            >
                <option value="ALL">All</option>
                <option value="PNP">PNP</option>
                <option value="NPN">NPN</option>
            </select>
        </div>

        <div className="filter-group me-3">
            <label for="dcGain" className="filter-label">DC Current Gain:</label>
            <select 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'bjtInput', 'dcCurrentGain')}
            >
                <option value="ALL">All</option>
                <option value="100">100</option>
                <option value="150">150</option>
                <option value="200">200</option>
                <option value="300">300</option>
            </select>
        </div>


        <div className="filter-group me-3">
            <label for="dcGain" className="filter-label">Current Collector(IC):</label>
            <select 
                className="form-select filter-field type transistor"
                onChange={handleNestedFieldChange(setQueryVariables, 'bjtInput', 'icMax')}
            >
                <option value="ALL">All</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                <option value="2">2</option>
            </select>
        </div>


    </>
  )
}

export default BJTFilter