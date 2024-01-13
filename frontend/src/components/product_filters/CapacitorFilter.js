import React from 'react'

function CapacitorFilter({ queryVariables, setQueryVariables}) {

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
            <label for="typeCapacitor">Type:</label>
            <select 
                id="typeSelect" 
                class="form-select filter-field type capacitor"
                onChange={(e) => handleInputChange('capacitorType', e.target.value)}
            >
                <option value="ALL">All</option>                
                <option value="FILM">Film</option>
                <option value="CERAMIC">Ceramic</option>
                <option value="ELECTROLYTIC">Electrolytic</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="raitingCapacitance">Capacitance:</label>
            <select 
                id="typePNP"    
                class="form-select filter-field type raiting"
                onChange={(e) => handleInputChange('capacitance', e.target.value)}    
            >
                <option valuen="null">All</option>                
                <option value="100">100uF</option>
                <option value="1000">1000uF</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="ratingVoltage">Voltage:</label>
            <select 
                id="ratingVoltage" 
                class="form-select filter-field raiting voltage"
                onChange={(e) => handleInputChange('voltage', e.target.value)}
            >
                <option value="null">All</option>                
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Mounting Surface:</label>
            <select 
                id="mounting-surface" 
                class="form-select filter-field mounting-surface"
                onChange={(e) => handleInputChange('mountingTechnology', e.target.value)}
            >
                <option value="ALL">All</option>                
                <option value="THT">THT</option>
                <option value="SMD">SMD</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Manufacturer:</label>
            <select 
                id="manufacturer" 
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

export default CapacitorFilter