// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchProducts from "./components/SearchProducts";
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
          <Route path="/product-search/:componentType" element={<SearchProducts/>} />
          <Route path="/product-view/:componentModel" element={<ProductView />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
    </div>
    );
}

export default App;