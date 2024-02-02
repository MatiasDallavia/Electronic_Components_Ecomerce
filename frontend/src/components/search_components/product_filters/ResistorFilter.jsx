import React from 'react'


function ResistorFilter({setQueryVariables}) {


    const handleInputChange = (inputName, value) => {

        if (!isNaN(value)){
            value = Number(value)
        }
        if (value === "ALL" || value === 0){
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
            <label for="ic" class="filter-label">Resistance:</label>
            <select 
                class="form-select filter-field type transistor"
                onChange={(e) => handleInputChange('resistance', e.target.value)}                
            >
                <option value="ALL">All</option>
                <option value="100">100Ω,</option>
                <option value="220">220Ω,</option>
                <option value="470">470Ω,</option>
                <option value="1000">1kΩ,</option>
                <option value="3300">3.3kΩ,</option>
                <option value="4700">4.7kΩ,</option>
                <option value="2200">2.2kΩ,</option>
                <option value="20000">20kΩ,</option>
                <option value="33000">3.3kΩ,</option>
            </select>
        </div>     


        <div class="filter-group me-3">
            <label for="ic" class="filter-label">Tolerance:</label>
            <select 
                class="form-select filter-field type transistor"
                onChange={(e) => handleInputChange('tolerance', e.target.value)}                
            >
                <option value="ALL">All</option>
                <option value="1">1%,</option>
                <option value="5">5%,</option>

            </select>
        </div>          


        <div class="filter-group me-3">
            <label for="ic" class="filter-label">Power:</label>
            <select 
                class="form-select filter-field type transistor"
                onChange={(e) => handleInputChange('power', e.target.value)}                
            >
                <option value="ALL">All</option>
                <option value="0.25">250mW,</option>
                <option value="5">5w,</option>
            </select>
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