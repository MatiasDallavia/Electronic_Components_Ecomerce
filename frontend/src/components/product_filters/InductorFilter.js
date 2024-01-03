import React from 'react'

function InductorFilter() {
  return (
    <div class="d-flex flex-row align-items-center">
        <div class="filter-group">
            <label>Type:</label>
                <select id="rating-current" class="form-select filter-field type inductor">
                    <option>Toroidal</option>
                    <option>Solenoid</option>
                </select>
        </div>
        

        <div class="filter-group">
            <label>core-material:</label>
            <select class="form-select filter-field type core-material">
                <option>Air</option>
                <option>Ferrite</option>
                <option>Iron</option>
            </select>
        </div>


        <div class="filter-group">
            <label>core-material:</label>
            <select class="form-select filter-field raiting inductance">
                <option>Air</option>
                <option>Ferrite</option>
                <option>Iron</option>
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

export default InductorFilter