import React from 'react'

function MOSFETFilter() {
  return (
    <>
        <div class="filter-group me-3">
            <label for="model" class="filter-label">Model:</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>


        <div class="filter-group me-3">
            <label for="vds" class="filter-label">Voltage Drain Source(Vds):</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>

        <div class="filter-group me-3">
            <label for="rdsOn" class="filter-label">Rds ON:</label>
            <input class="form-control filter-field" type="text" placeholder="Default input"/>
        </div>

        <div class="filter-group me-3">
            <label for="drive_voltage" class="filter-label">Drive Voltage:</label>
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

export default MOSFETFilter