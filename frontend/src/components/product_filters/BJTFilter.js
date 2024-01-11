import React from 'react'

function BJTFilter() {
  return (
    <>
        <div class="filter-group me-3">
            <label for="model" class="filter-label">Model:</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>


        <div class="filter-group me-3">
            <label for="typePNP" class="filter-label">Type PNP/NPN:</label>
            <select id="typePNP" class="form-select filter-field type transistor">
                <option>PNP</option>
                <option>NPN</option>
            </select>
        </div>

        <div class="filter-group me-3">
            <label for="dcCurrentGain" class="filter-label">DC Current Gain:</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>

        <div class="filter-group me-3">
            <label for="icMax" class="filter-label">Current Collector Max(IC):</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>

        <div class="filter-group me-3">
            <label for="mountingSurface" class="filter-label">Mounting Surface:</label>
            <select id="mountingSurface" class="form-select filter-field mounting-surface">
                <option>THT</option>
                <option>SMD</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="manufacturerSelect" class="filter-label">Manufacturer:</label>
            <select id="manufacturerSelect" class="form-select filter-field manufacturer">
                <option>Infineon</option>
                <option>Texas Instruments</option>
                <option>Siemens</option>
                <option>Samsung</option>
                <option>Fairchild</option>
            </select>
        </div>
    </>
  )
}

export default BJTFilter