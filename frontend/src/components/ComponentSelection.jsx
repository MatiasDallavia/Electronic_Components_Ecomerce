import React from 'react'
import TransistorIcon from '../images/icons/transistor.jpeg'
import ResistorIcon from '../images/icons/resistor.jpeg'
import CapacitorIcon from '../images/icons/capacitor.jpeg'
import DiodeIcon from '../images/icons/diode.jpeg'
import InductorIcon from '../images/icons/inductor.jpeg'
import { useNavigate } from "react-router-dom";


function ComponentSelection() {

  const navigate = useNavigate();

  function redirectSearchComponent(component){
    navigate(`${component}/search`)
  }
    
  return (
    <div className="container">
        <div className="d-flex justify-content-center flex-column m-5 align-items-center">
            <h2>What type of Component Are You Looking For?</h2>
        
            <div className="d-flex justify-content-center flex-md-row flex-column m-5 options">
                <div className="box-product" onClick={() => redirectSearchComponent("transistor")}>
                    <div className="component-content transistor">
                        <img src={TransistorIcon} className="icon-product" />
                        <p className="component-name">Transistor</p>
                    </div>
                </div>
                <div className="box-product" onClick={() => redirectSearchComponent("resistor")}>
                    <div className="component-content resistor">
                        <img src={ResistorIcon} style={{marginBottom: "35px"}} className="icon-product img-fluid" />
                        <p className="component-name">Resistor</p>
                    </div>
                </div>
                <div className="box-product">
                    <div className="component-content capacitor" onClick={() => redirectSearchComponent("capacitor")}>
                        <img src={CapacitorIcon} className="icon-product img-fluid" />
                        <p className="component-name">Capacitor</p>
                    </div>
                </div>
                <div className="box-product">
                    <div className="component-content diode" onClick={() => redirectSearchComponent("diode")}>
                        <img src={DiodeIcon} style={{marginBottom: "30px"}} className="icon-product img-fluid" />
                        <p className="component-name">Diode</p>
                    </div>
                </div>
                <div className="box-product">
                    <div className="component-content inductor" onClick={() => redirectSearchComponent("inductor")}>
                        <img src={InductorIcon} style={{marginBottom: "30px"}} className="icon-product img-fluid" />
                        <p className="component-name">Inductor</p>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default ComponentSelection