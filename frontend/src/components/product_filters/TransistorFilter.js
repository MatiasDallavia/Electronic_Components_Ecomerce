import React from 'react'

function TransistorFilter() {
  return (
            <div class="d-flex flex-row align-items-center">
            <div class="filter-group">
                <label for="typeSelect">Type:</label>
                <select id="typeSelect" class="form-select filter-field type transistor">
                    <option>BJT</option>
                    <option>MOSFETs</option>
                    <option>IGBT</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="typePNP">Type PNP/NPN:</label>
                <select id="typePNP" class="form-select filter-field type transistor">
                    <option>PNP</option>
                    <option>NPN</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="ratingPower">Rating Power:</label>
                <select id="ratingPower" class="form-select filter-field raiting power">
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>25</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="mountingSurface">Mounting Surface:</label>
                <select id="mountingSurface" class="form-select filter-field mounting-surface">
                    <option>THT</option>
                    <option>SMD</option>
                </select>
            </div>

            <div class="filter-group">
                <label for="manufacturerSelect">Manufacturer:</label>
                <select id="manufacturerSelect" class="form-select filter-field manufacturer">
                    <option>Infineon</option>
                    <option>Texas Instruments</option>
                    <option>Siemens</option>
                    <option>Samsung</option>
                    <option>Fairchild</option>
                </select>
            </div>
        </div>
  )
}

export default TransistorFilter