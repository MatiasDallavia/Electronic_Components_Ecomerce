// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchProducts from "./components/SearchProducts";

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-search/:componentType" element={<SearchProducts />} />
        </Routes>
    </div>
    );
}

export default App;