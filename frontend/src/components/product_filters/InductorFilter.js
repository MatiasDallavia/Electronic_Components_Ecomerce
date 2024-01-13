import React from 'react'

function InductorFilter({queryVariables, setQueryVariables}) {


    const handleInputChange = (inputName, value) => {
        console.log("HANDLE")
        if (value === "null" || value === "ALL"){
            value = null
        }
        if (!isNaN(value)){
            value = Number(value)
        }
        if (value === 0){
            value = null
        }

        console.log("1: ", queryVariables)
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
        <div class="filter-group">
            <label>Type:</label>
                <select 
                    id="rating-current"
                    class="form-select filter-field type inductor"
                    onChange={(e) => handleInputChange('inductorType', e.target.value)}                
                >
                    <option value="ALL">All</option>
                    <option value="TOROID">Toroidal</option>
                    <option value="SOLENOID">Solenoid</option>
                </select>
        </div>
        

        <div class="filter-group">
            <label>Core Material:</label>
            <select 
                class="form-select filter-field type core-material"
                onChange={(e) => handleInputChange('coreMaterial', e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="AIR">Air</option>
                <option value="FERRITE">Ferrite</option>
                <option value="ALLOY">Alloy</option>
            </select>
        </div>


        <div class="filter-group">
            <label>Inductance:</label>
            <select 
                class="form-select filter-field raiting inductance"
                onChange={(e) => handleInputChange('inductance', e.target.value)}                
            >
                <option value="ALL">All</option>
                <option value="330">330uH</option>
                <option value="1000">1000uH</option>
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
                <option value="THT">THT</option>
                <option value="SMD">SMD</option>
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
}

export default InductorFilter