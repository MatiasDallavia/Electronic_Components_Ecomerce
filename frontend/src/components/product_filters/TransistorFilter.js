import React, { useState } from 'react';
import BJTFilter from './BJTFilter';
import MOSFETFilter from './MOSFETFilter';
import IGBTFilter from './IGBTFilter';

function TransistorFilter({queryVariables, setQueryVariables}) {
  const [transistorType, setTransistorType] = useState('BJT');


  const transistorFilterChange = (transistorType) => {
    setTransistorType(transistorType)
  }


  const handleInputChange = (inputName, value) => {

    if (value === "null" || value === "ALL"){
        value = null
    }
    if (!isNaN(value) && inputName !== "model"){
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
  };

  const handleNestedFieldChange = (inputName, transistorTypefield) => (e) => {

    
    let value = e.target.value;

    if (value === "null" || value === "ALL" || value === 0){
      value = null
    }
    if (!isNaN(value)){
        value = Number(value)
    }


    setQueryVariables((prevQueryVariables) => ({
      inputs: {
        ...prevQueryVariables.inputs,
        [inputName]: {
          ...prevQueryVariables.inputs[inputName],
          [transistorTypefield]: value
        }
      }
    }));
  };


  return (
    <div className="container mt-4 d-flex flex-wrap">
      <div className="filter-group me-3">
        <label htmlFor="typePNP" className="filter-label">Transistor Type:</label>
        <select
          id="typePNP"
          className="form-select filter-field type transistor"
          onChange={(e) => {
            handleInputChange('transistorType', e.target.value)
            transistorFilterChange(e.target.value)
          }}
          >
          <option value="BJT">BJT</option>
          <option value="MOSFET">MOSFET</option>
          <option value="IGBT">IGBT</option>
        </select>
      </div>


      <div class="filter-group me-3">
            <label for="model" class="filter-label">Model:</label>
            <input 
                class="form-control filter-field"
                type="text" 
                placeholder="Default input"
                onChange={(e) => handleInputChange('model', e.target.value)}
            />
      </div>

      {transistorType === 'BJT' && <BJTFilter handleNestedFieldChange={handleNestedFieldChange}/>}
      {transistorType === 'MOSFET' && <MOSFETFilter handleNestedFieldChange={handleNestedFieldChange}/>}
      {transistorType === 'IGBT' && <IGBTFilter handleNestedFieldChange={handleNestedFieldChange}/>}

      <div class="filter-group me-3">
            <label for="mountingSurface" class="filter-label">Mounting Surface:</label>
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
            <label for="manufacturerSelect" class="filter-label">Manufacturer:</label>
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
  );
}

export default TransistorFilter;