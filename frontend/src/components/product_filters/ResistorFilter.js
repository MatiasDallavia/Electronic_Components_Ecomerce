import React from 'react'

function ResistorFilter() {
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
            <label>Resistance:</label>
            <select class="form-select filter-field raiting resistnace">
                <option>1k</option>
                <option>NPN</option>
            </select>
        </div>

        <div class="filter-group">
            <label >Rating Power:</label>
            <select class="form-select filter-field raiting tolerance">
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

export default ResistorFilter