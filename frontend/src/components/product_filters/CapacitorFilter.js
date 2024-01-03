import React from 'react'

function CapacitorFilter() {
  return (
    <div class="d-flex flex-row align-items-center">
        <div class="filter-group">
            <label for="typeCapacitor">Type:</label>
            <select id="typeSelect" class="form-select filter-field type capacitor">
                <option>Film</option>
                <option>Ceramic</option>
                <option>Electrolitic</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="raitingCapacitance">Capacitance:</label>
            <select id="typePNP" class="form-select filter-field type raiting">
                <option>100uF</option>
                <option>1000uF</option>
            </select>
        </div>

        <div class="filter-group">
            <label for="ratingVoltage">Voltage:</label>
            <select id="ratingVoltage" class="form-select filter-field raiting voltage">
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>25</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Mounting Surface:</label>
            <select id="mounting-surface" class="form-select filter-field mounting-surface">
                <option>THT</option>
                <option>SMD</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Manufacturer:</label>
            <select id="manufacturer" class="form-select filter-field manufacturer">
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

export default CapacitorFilter