import React from 'react'

function InductorFilter({queryVariables, setQueryVariables}) {


    const handleInputChange = (inputName, value) => {
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
      };


  return (
    <div className="d-flex flex-row align-items-center">
        <div className="filter-group">
            <label>Type:</label>
                <select 
                    id="rating-current"
                    className="form-select filter-field type inductor"
                    onChange={(e) => handleInputChange('inductorType', e.target.value)}                
                >
                    <option value="ALL">All</option>
                    <option value="TOROID">Toroidal</option>
                    <option value="SOLENOID">Solenoid</option>
                </select>
        </div>
        

        <div className="filter-group">
            <label>Core Material:</label>
            <select 
                className="form-select filter-field type core-material"
                onChange={(e) => handleInputChange('coreMaterial', e.target.value)}
            >
                <option value="ALL">All</option>
                <option value="AIR">Air</option>
                <option value="FERRITE">Ferrite</option>
                <option value="ALLOY">Alloy</option>
            </select>
        </div>


        <div className="filter-group">
            <label>Inductance:</label>
            <select 
                className="form-select filter-field raiting inductance"
                onChange={(e) => handleInputChange('inductance', e.target.value)}                
            >
                <option value="ALL">All</option>
                <option value="10">10nH</option>
                <option value="22">22uH</option>
                <option value="33">33uH</option>
                <option value="47">47uH</option>
                <option value="150">150uH</option>
                <option value="220">220uH</option>
            </select>
        </div>

        <div className="filter-group">
            <label for="mountingSurface">Mounting Surface:</label>
            <select 
                id="mountingSurface"
                className="form-select filter-field mounting-surface"
                onChange={(e) => handleInputChange('mountingTechnology', e.target.value)}    
            >
                <option value="ALL">All</option>
                <option value="THT">THT</option>
                <option value="SMD">SMD</option>
            </select>
        </div>

        <div className="filter-group">
            <label for="manufacturerSelect">Manufacturer:</label>
            <select 
                id="manufacturerSelect"
                className="form-select filter-field manufacturer"
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