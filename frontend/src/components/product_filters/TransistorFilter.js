import React, { useState } from 'react';
import BJTFilter from './BJTFilter';
import MOSFETFilter from './MOSFETFilter';
import IGBTFilter from './IGBTFilter';

function TransistorFilter({queryVariables, setQueryVariables}) {
  const [transistorType, setTransistorType] = useState('BJT');

  const handleTypeChange = (event) => {
    setTransistorType(event.target.value);
  };


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
    <div className="container mt-4 d-flex flex-wrap">
      <div className="filter-group me-3">
        <label htmlFor="typePNP" className="filter-label">Transistor Type:</label>
        <select
          id="typePNP"
          className="form-select filter-field type transistor"
          onChange={(e) => handleInputChange('diodeType', e.target.value)}
          >
          <option value="BJT">BJT</option>
          <option value="MOSFET">MOSFET</option>
          <option value="IGBT">IGBT</option>
        </select>
      </div>

      {transistorType === 'BJT' && <BJTFilter handleInputChange={handleInputChange} queryVariables={queryVariables} setQueryVariables={setQueryVariables}/>}
      {transistorType === 'MOSFET' && <MOSFETFilter />}
      {transistorType === 'IGBT' && <IGBTFilter />}

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
            <select id="manufacturerSelect" class="form-select filter-field manufacturer">
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