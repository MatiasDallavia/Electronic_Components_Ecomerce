import React from 'react'
import TransistorIcon from '../images/icons/transistor.jpeg'
import ResistorIcon from '../images/icons/resistor.jpeg'
import CapacitorIcon from '../images/icons/capacitor.jpeg'
import DiodeIcon from '../images/icons/diode.jpeg'
import InductorIcon from '../images/icons/inductor.jpeg'

function ComponentSelection() {
  return (
    <div class="container">
        <div class="d-flex justify-content-center flex-column m-5 align-items-center">
            <h2>What type of Component Are You Looking For?</h2>
        
            <div class="d-flex justify-content-center flex-md-row flex-column m-5 options">
                <div class="box-product">
                    <div class="component-content transistor">
                        <img src={TransistorIcon} class="icon-product" />
                        <p class="component-name">Transistor</p>
                    </div>
                </div>
                <div class="box-product">
                    <div class="component-content resistor">
                        <img src={ResistorIcon} style={{marginBottom: "35px"}} class="icon-product img-fluid" />
                        <p class="component-name">Resistor</p>
                    </div>
                </div>
                <div class="box-product">
                    <div class="component-content capacitor">
                        <img src={CapacitorIcon} class="icon-product img-fluid" />
                        <p class="component-name">Capacitor</p>
                    </div>
                </div>
                <div class="box-product">
                    <div class="component-content diode">
                        <img src={DiodeIcon} style={{marginBottom: "30px"}} class="icon-product img-fluid" />
                        <p class="component-name">Diode</p>
                    </div>
                </div>
                <div class="box-product">
                    <div class="component-content inductor">
                        <img src={InductorIcon} style={{marginBottom: "30px"}} class="icon-product img-fluid" />
                        <p class="component-name">Inductor</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ComponentSelection