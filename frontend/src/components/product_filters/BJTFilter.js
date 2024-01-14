import React from 'react'





function BJTFilter({handleInputChange, queryVariables, setQueryVariables}) {
    

    return (
    <>
        <div class="filter-group me-3">
            <label for="model" class="filter-label">Model:</label>
            <input 
                class="form-control filter-field"
                type="text" 
                placeholder="Default input"
                onChange={(e) => handleInputChange('diodeType', e.target.value)}
            />
        </div>


        <div class="filter-group me-3">
            <label for="typePNP" class="filter-label">Type PNP/NPN:</label>
            <select 
                id="typePNP" 
                class="form-select filter-field type transistor"
                onChange={(e) => handleInputChange('diodeType', e.target.value)}
            >
                <option>PNP</option>
                <option>NPN</option>
            </select>
        </div>

        <div class="filter-group me-3">
            <label for="dcCurrentGain" class="filter-label">DC Current Gain:</label>
            <input 
                class="form-control filter-field"  
                type="text" 
                placeholder="Default input"
                onChange={(e) => handleInputChange('diodeType', e.target.value)}
            />
        </div>

        <div class="filter-group me-3">
            <label for="icMax" class="filter-label">Current Collector Max(IC):</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>


    </>
  )
}

export default BJTFilter