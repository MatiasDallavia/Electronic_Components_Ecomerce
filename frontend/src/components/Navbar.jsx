import React from "react";
import { Link, useNavigate } from 'react-router-dom';



function Navbar({isLogin}) {


  const navigate = useNavigate();

  const redirectToCart = () => {
    navigate('/Cart');
  };

  const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
  const username = localStorage.getItem("username");


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
            <div className="navbar-brand">Electronic Components</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto align-items-start"> 
                <li className="nav-item">
                    <Link to="/" className="nav-link mt-1 mt-md-0">Home</Link>
                </li>
                <li className="nav-item">
                    {
                        isLogin ? <Link to="/purchase-history" disabled className="nav-link mt-1 mt-md-0">{username}</Link> :
                        <Link to="/login" className="nav-link mt-1 mt-md-0">Login</Link>
                    }
                </li>
                    <li id="cart-icon" className="nav-item" onClick={redirectToCart}>
                        < div className="nav-link mt-1 mt-md-0" aria-disabled="true">
                            Cart
                            <span className="badge bg-primary rounded-pill m-1">{productsInCart.length}</span>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">Search Products</a>
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