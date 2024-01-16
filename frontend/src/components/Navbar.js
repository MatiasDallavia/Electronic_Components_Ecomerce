import React from "react";
import { Link, useNavigate } from 'react-router-dom';



function Navbar() {


  const navigate = useNavigate();

  const redirectToCart = () => {
    navigate('/Cart');
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <div class="navbar-brand">Electronic Components</div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto align-items-start"> 
                <li class="nav-item">
                    <Link to="/" className="nav-link mt-1 mt-md-0">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to="/login" className="nav-link mt-1 mt-md-0">Login</Link>
                </li>
                    <li class="nav-item">
                        < div class="nav-link mt-1 mt-md-0" aria-disabled="true" onClick={redirectToCart}>
                            Cart
                            <span class="badge bg-primary rounded-pill m-1">3</span>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Search Products</a>
                        <ul className="dropdown-menu">
                            <li><Link to="/transistor/search" className="dropdown-item">Transistors</Link></li>
                            <li><Link to="/resistor/search" className="dropdown-item">Resistors</Link></li>
                            <li><Link to="/diode/search" className="dropdown-item">Diodes</Link></li>
                            <li><Link to="/capacitor/search" className="dropdown-item">Capacitors</Link></li>
                            <li><Link to="/inductor/search" className="dropdown-item">Inductors</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

  );
}

export default Navbar;