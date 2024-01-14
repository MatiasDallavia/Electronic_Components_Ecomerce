import React from 'react'

function DiodeFilter({ queryVariables, setQueryVariables}) {

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
                id="diode-type" 
                class="form-select filter-field type diode"
                onChange={(e) => handleInputChange('diodeType', e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="ZENER">Zener</option>
                <option value="SCHOTTKY">Schottky </option>
                <option value="RECTIFIER">Rectifier</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Reverse Voltage:</label>
            <select 
                id="reverse-voltage" 
                class="form-select filter-field type raiting reverse-voltage"
                onChange={(e) => handleInputChange('dcReverse', e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="10">10V</option>
                <option value="20">20V</option>
            </select>
        </div>

        <div class="filter-group">
            <label>current:</label>
            <select 
                id="rating-current" 
                class="form-select filter-field raiting current"
                onChange={(e) => handleInputChange('current', e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="10">10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
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

export default DiodeFilter