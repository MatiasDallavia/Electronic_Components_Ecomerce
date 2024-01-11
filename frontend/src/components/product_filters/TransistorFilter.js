import React, { useState } from 'react';
import BJTFilter from './BJTFilter';
import MOSFETFilter from './MOSFETFilter';
import IGBTFilter from './IGBTFilter';

function TransistorFilter() {
  const [transistorType, setTransistorType] = useState('BJT');

  const handleTypeChange = (event) => {
    setTransistorType(event.target.value);
  };

  return (
    <div className="container mt-4 d-flex flex-wrap">
      <div className="filter-group me-3">
        <label htmlFor="typePNP" className="filter-label">Transistor Type:</label>
        <select
          id="typePNP"
          className="form-select filter-field type transistor"
          onChange={handleTypeChange}
        >
          <option value="BJT">BJT</option>
          <option value="MOSFET">MOSFET</option>
          <option value="IGBT">IGBT</option>
        </select>
      </div>

      {transistorType === 'BJT' && <BJTFilter />}
      {transistorType === 'MOSFET' && <MOSFETFilter />}
      {transistorType === 'IGBT' && <IGBTFilter />}
    </div>
  );
}

export default TransistorFilter;