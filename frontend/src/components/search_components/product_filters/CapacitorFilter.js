import React from 'react'

function CapacitorFilter({ queryVariables, setQueryVariables}) {

    const handleInputChange = (inputName, value) => {
        console.log("HANDLE", value)
  
        if (!isNaN(value)){
            value = Number(value)
        }
        if (value === 0 || value === "ALL"){
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



        <div class="d-flex flex-row align-items-center">
        <div class="filter-group">
            <label>Capacitance:</label>
            <select 
                id="diode-type" 
                class="form-select filter-field type diode"
                onChange={(e) => handleInputChange('capacitance', e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="10">10nF</option>
                <option value="15">15nF</option>
                <option value="22">22nF</option>
                <option value="47">47uF</option>
                <option value="100">100uF</option>
                <option value="220">220uF</option>
                <option value="330">330uF</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Voltage:</label>
            <select 
                id="mounting-surface" 
                class="form-select filter-field mounting-surface"
                onChange={(e) => handleInputChange('voltage', e.target.value)}
            >
                <option value="ALL">All</option>                
                <option value="10">10V</option>
                <option value="25">25V</option>
                <option value="35">35V</option>
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
    </div>

  )
}

export default CapacitorFilter