import React from 'react'
import {useState, useEffect} from 'react'


function ResistorFilter({queryVariables, setQueryVariables}) {


    const handleInputChange = (inputName, value) => {
        console.log("HANDLE")
        if (value === "All" || value === ""){
            value = null
        }
        if (!isNaN(value)){
            value = Number(value)
        }
        if (value === 0){
            value = null
        }


        switch (value) {
            case "Infineon":
            value = "INFINEON"
            break;
            case "Texas Instruments":
            value = "TEXAS_INSTRUMENTS"
            break;
            case "Siemens":
            value = "TEXAS_INSTRUMENTS"        
            break;
            case "Samsung":
            value = "SAMSUNG"        
            break;
            case "Fairchild":
            value = "FAIRCHILD"        
            break;                                                              
        }

        
        setQueryVariables({
          ...queryVariables,
          inputs: {
            ...queryVariables.inputs,
            [inputName]: value
          }
        });
        console.log(queryVariables)
      };

  return (
    <div class="d-flex flex-row align-items-center">

        <div class="filter-group me-3">
            <label for="resistance" class="filter-label">Tolerance:</label>
            <input 
                class="form-control filter-field" 
                type="text" placeholder="Default input"
                onChange={(e) => handleInputChange('tolerance', e.target.value)}
            />                
        </div>


        <div class="filter-group me-3">
            <label for="resistance" class="filter-label">Resistance:</label>
            <input 
                class="form-control filter-field" 
                type="text" placeholder="Default input"
                onChange={(e) => handleInputChange('resistance', e.target.value)}
            />                
        </div>


        <div class="filter-group me-3">
            <label for="power" class="filter-label">Power:</label>
            <input 
                class="form-control filter-field" 
                type="text" placeholder="Default input"
                onChange={(e) => handleInputChange('power', e.target.value)}
            />
        </div>

        <div class="filter-group">
            <label for="mountingSurface">Mounting Surface:</label>
            <select 
                id="mountingSurface" 
                class="form-select filter-field mounting-surface"
                onChange={(e) => handleInputChange('mountingTechnology', e.target.value)}
                >
                <option>All</option>                    
                <option>THT</option>
                <option>SMD</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="manufacturerSelect">Manufacturer:</label>
            <select 
                id="manufacturerSelect" 
                class="form-select filter-field manufacturer"
                onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                >
                <option>All</option>
                <option>Infineon</option>
                <option>Texas Instruments</option>
                <option>Siemens</option>
                <option>Samsung</option>
                <option>Fairchild</option>
            </select>
        </div>
    
    </div>

  )
};


export default ResistorFilter