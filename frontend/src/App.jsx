import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchDiode from "./components/search_components/SearchDiode";
import SearchCapacitor from "./components/search_components/SearchCapacitor";
import SearchInductor from "./components/search_components/SearchInductor";
import SearchResistor from "./components/search_components/SearchResistor";
import SearchTransistor from "./components/search_components/SearchTransistor";
import DiodeView from "./components/component_views/DiodeView.jsx"
import ResistorView from "./components/component_views/ResistorView.jsx";
import InductorView from "./components/component_views/InductorView.jsx";
import CapacitorView from "./components/component_views/CapacitorView.jsx";
import TransistorView from "./components/component_views/TransistorView.jsx";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/cart_components/Cart.jsx";
import PurchaseConfirmation from "./components/purchased_products/PurchaseConfirmation.jsx";
import { isUserLogin } from "./utils/token.js";

function App() {
  const [isLogin, setIsLogin] = useState(isUserLogin())


  return (
    <div>
        <Navbar isLogin={isLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="transistor">
            <Route path="search/" element={<SearchTransistor/>} />
            <Route path="view/:transistorType/:transistorComponentID" element={<TransistorView />} />
          </Route>
          <Route path="resistor">
            <Route path="search/" element={<SearchResistor/>} />
            <Route path="view/:resistorComponentID" element={<ResistorView />} />
          </Route>
          <Route path="capacitor">
            <Route path="search/" element={<SearchCapacitor/>} />
            <Route path="view/:capacitorComponentID" element={<CapacitorView />} />
          </Route>
          <Route path="inductor">
            <Route path="search/" element={<SearchInductor/>} />
            <Route path="view/:inductorComponentID" element={<InductorView />} />
          </Route>
          <Route path="diode">
            <Route path="search/" element={<SearchDiode/>} />
            <Route path="view/:diodeComponentID" element={<DiodeView />} />
          </Route>

          <Route path="purchase-confirmation" element={<PurchaseConfirmation/>}/>
      
          
          <Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
          <Route path="/register" element={<Register setIsLogin={setIsLogin}/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
  
    </div>
    );
}

export default App
