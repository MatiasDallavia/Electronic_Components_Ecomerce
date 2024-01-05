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
            <Link to="/" class="navbar-brand">Electronic Components</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto align-items-start"> 
                    <li class="nav-item">
                        < div class="nav-link mt-1 mt-md-0" aria-disabled="true" onClick={redirectToCart}>
                            Cart
                            <span class="badge bg-primary rounded-pill m-1">3</span>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Search Products</a>
                        <ul className="dropdown-menu">
                            <li><Link to="/product-search/transistors" className="dropdown-item">Transistors</Link></li>
                            <li><Link to="/product-search/resistors" className="dropdown-item">Resistors</Link></li>
                            <li><Link to="/product-search/diodes" className="dropdown-item">Diodes</Link></li>
                            <li><Link to="/product-search/capacitors" className="dropdown-item">Capacitors</Link></li>
                            <li><Link to="/product-search/inductors" className="dropdown-item">Inductors</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

  );
}

export default Navbar;