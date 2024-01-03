import React from 'react'

function DiodeFilter() {
  return (
    <div class="d-flex flex-row align-items-center">
        <div class="filter-group">
            <label>Type:</label>
            <select id="diode-type" class="form-select filter-field type diode">
                <option>Zener</option>
                <option>Schottky </option>
                <option>Rectifier</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Reverse Voltage:</label>
            <select id="reverse-voltage" class="form-select filter-field type raiting reverse-voltage">
                <option>10V</option>
                <option>20V</option>
            </select>
        </div>

        <div class="filter-group">
            <label>current:</label>
            <select id="rating-current" class="form-select filter-field raiting current">
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

export default DiodeFilter