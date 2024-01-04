// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchProducts from "./components/SearchProducts";
import ProductView from "./components/ProductView";

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-search/:componentType" element={<SearchProducts />} />
          <Route path="/product-view/:componentModel" element={<ProductView />} />
        </Routes>
    </div>
    );
}

export default App;