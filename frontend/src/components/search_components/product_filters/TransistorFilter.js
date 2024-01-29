import React from 'react';
import BJTFilter from './BJTFilter';
import MOSFETFilter from './MOSFETFilter';
import IGBTFilter from './IGBTFilter';
import { handleInputChange } from '../../../utils/callbacks';


function TransistorFilter({transistorType, transistorTypeFilterChange, setQueryVariables}) {

  return (
    <div className="container mt-4 d-flex flex-wrap">
      <div className="filter-group me-3">
        <label htmlFor="typePNP" className="filter-label">Transistor Type:</label>
        <select
          id="typePNP"
          className="form-select filter-field type transistor"
          onChange={(e) => {
            handleInputChange(setQueryVariables, 'transistorType', e.target.value)
            transistorTypeFilterChange(e.target.value)
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
                className="form-control filter-field model"
                type="text" 
                placeholder="Default input"
                onChange={(e) => handleInputChange(setQueryVariables, 'model', e.target.value)}
            />
      </div>

      {transistorType === 'BJT' && 
      <BJTFilter setQueryVariables={setQueryVariables}/>}
      {transistorType === 'MOSFET' &&
      <MOSFETFilter setQueryVariables={setQueryVariables}/>}
      {transistorType === 'IGBT' && 
      <IGBTFilter setQueryVariables={setQueryVariables}/>}

        <div class="filter-group">
            <label for="manufacturerSelect" class="filter-label">Manufacturer:</label>
            <select 
              id="manufacturerSelect" 
              class="form-select filter-field manufacturer"
              onChange={(e) => handleInputChange(setQueryVariables, 'manufacturer', e.target.value)}
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