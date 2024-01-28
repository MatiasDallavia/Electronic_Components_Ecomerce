// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SearchDiode from "./components/search_components/SearchDiode";
import SearchCapacitor from "./components/search_components/SearchCapacitor";
import SearchInductor from "./components/search_components/SearchInductor";
import SearchResistor from "./components/search_components/SearchResistor";
import SearchTransistor from "./components/search_components/SearchTransistor";
import DiodeView from "./components/component_views/DiodeView.js"
import ResistorView from "./components/component_views/ResistorView.js";
import InductorView from "./components/component_views/InductorView.js";
import CapacitorView from "./components/component_views/CapacitorView.js";
import TransistorView from "./components/component_views/TransistorView.js";
import Login from "./components/Login";
import Register from "./components/Register";
import Cart from "./components/cart_components/Cart.js";
import PurchaseConfirmation from "./components/purchased_products/PurchaseConfirmation.js";

import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';



function App() {

  const HOST = process.env.REACT_APP_HOST;
  const PORT = process.env.REACT_APP_DJANGO_PORT;

  const uri = `${HOST}:${PORT}/graphql`

  const client = new ApolloClient({
    uri: uri,
    connectToDevTools: process.env.NODE_ENV === 'development',
    cache: new InMemoryCache(),
  });



  return (
    <div>
      <ApolloProvider client={client}>
        <Navbar />
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
      
          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </ApolloProvider>
  
    </div>
    );
}

export default App;