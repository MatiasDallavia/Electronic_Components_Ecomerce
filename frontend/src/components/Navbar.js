import React from "react";

function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Electronic Components</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto align-items-start"> 
                    <li class="nav-item">
                        <a class="nav-link mt-1 mt-md-0" aria-disabled="true">
                            Cart
                            <span class="badge bg-primary rounded-pill m-1">3</span>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Search Products</a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#">Transistors</a></li>
                            <li><a class="dropdown-item" href="#">Resistors</a></li>
                            <li><a class="dropdown-item" href="#">Diode</a></li>
                            <li><a class="dropdown-item" href="#">Capacitors</a></li>
                            <li><a class="dropdown-item" href="#">Inductors</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

  );
}

export default Navbar;