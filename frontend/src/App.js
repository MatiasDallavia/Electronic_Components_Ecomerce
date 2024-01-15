// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchProducts from "./components/SearchProducts";
import SearchDiode from "./components/search_components/SearchDiode";
import SearchCapacitor from "./components/search_components/SearchCapacitor";
import SearchInductor from "./components/search_components/SearchInductor";
import SearchResistor from "./components/search_components/SearchResistor";
import SearchTransistor from "./components/search_components/SearchTransistor";
import ProductView from "./components/ProductView";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/Cart";

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="transistor">
            <Route path="search/" element={<SearchTransistor/>} />
            <Route path="view/:transistorComponentID" element={<ProductView />} />
          </Route>
          <Route path="resistor">
            <Route path="search/" element={<SearchResistor/>} />
            <Route path="view/:resistorComponentID" element={<ProductView />} />
          </Route>
          <Route path="capacitor">
            <Route path="search/" element={<SearchCapacitor/>} />
            <Route path="view/:capacitorComponentID" element={<ProductView />} />
          </Route>
          <Route path="inductor">
            <Route path="search/" element={<SearchInductor/>} />
            <Route path="view/:inductorComponentID" element={<ProductView />} />
          </Route>
          <Route path="diode">
            <Route path="search/" element={<SearchDiode/>} />
            <Route path="view/:diodeComponentID" element={<ProductView />} />
          </Route>


          
          <Route path="/product-search/:componentType" element={<SearchProducts/>} />
          <Route path="/view/:componentModel" element={<ProductView />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
    </div>
    );
}

export default App;