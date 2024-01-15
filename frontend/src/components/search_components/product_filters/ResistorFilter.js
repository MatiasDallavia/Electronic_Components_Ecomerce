import React from 'react'
import {useState, useEffect} from 'react'


function ResistorFilter({setQueryVariables}) {


    const handleInputChange = (inputName, value) => {
        console.log("HANDLE")

        if (!isNaN(value)){
            value = Number(value)
        }
        if (value === "All" || value === 0){
            value = null
        }
        
        setQueryVariables((prevQueryVariables) => ({
          ...prevQueryVariables,
          inputs: {
            ...prevQueryVariables.inputs,
            [inputName]: value
          }
        }));
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
                <option value="ALL">All</option>                    
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
                <option value="ALL">All</option>                
                <option value="INFINEON">Infineon</option>
                <option value="TEXAS_INSTRUMENTS">Texas Instruments</option>
                <option value="SIEMENS">Siemens</option>
                <option value="SAMSUNG">Samsung</option>
                <option value="FAIRCHILD">Fairchild</option>
            </select>
        </div>
    
    </div>

  )
};


export default ResistorFilter