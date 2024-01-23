import React from 'react';
import {useState, useEffect} from 'react';
import CartItemTableRow from './CartItemTableRow';
import {CREATE_ORDER, createOrderInput} from "../graphql_queries/purchase_queries/CreateOrder"
import {removeFromCart} from "../utils/cartFunctions"
import { useMutation } from '@apollo/client';

import { useNavigate } from "react-router-dom";


function Cart() {

  const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [totalValue, serTotalValue] = useState(0)
  const [productsToPurchase, setProductsToPurchase] = useState([])


  useEffect(() => {
    console.log(productsToPurchase);
    createOrderInput.inputs.productsToPurchase = productsToPurchase  
  }, [productsToPurchase]);  

  const removeItemFromList = (componentType, componentID) => {
    document.querySelector(`#${componentType + componentID}`).remove()
    removeFromCart(componentType, componentID)
  }


  const mutationVariables = createOrderInput

  const [createOrder, { loading, error, data }] = useMutation(CREATE_ORDER, {variables: createOrderInput});

  console.log(data)
  console.log(error)

  const handleCreateOrder = async () => {
    // Espera a que los cambios en productsToPurchase se reflejen
    // Llama a createOrder después de la actualización
    console.log("INPUTS: ", createOrderInput)
    const variables =   {
      inputs:{
         productsToPurchase: [
     
             {
             componentType : "MOSFET",
             componentId: "5",
             price: 10,
            quantity: 1
       
     
             },
             {
             componentType : "diode",
             componentId: "17",
             price: 1,
             quantity: 10
             }
          
             
             
         ]
       }
     }
     const vars = createOrderInput
     console.log("INPUTS2: ", variables)
    try {
      const result = await createOrder({
        variables: vars
      });
      console.log(result.data.createOrder.url); // Handle success
    } catch (errors) {
      console.log(errors); // Handle error
    }    
  };   


  return (
    <div className="container">
      <main>
        <div className="py-5 text-center">
          <h2>Cart</h2>
        </div>

        <div className="row">
          <div className="col-md-5 col-lg-6 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">List of Products</span>
              <span className="badge bg-primary rounded-pill">
                {productsInCart.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              {productsInCart.map((product) => (
                <CartItemTableRow
                setProductsToPurchase={setProductsToPurchase}
                productsToPurchase={productsToPurchase}
                  key={`${product[0]}-${product[1]}`}
                  removeItemFromList={removeItemFromList}
                  componentType={product[0]}
                  componentID={product[1]}
                  serTotalValue={serTotalValue}
                  totalValue={totalValue}
                />
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${totalValue}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-6">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate>
              <div className="row g-3 pb-4">
                <div className="col-4">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="1234 Main St"
                    required
                  />
                </div>
              </div>

              <div className="row g-3 pb-4">
                <div className="col-md-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <select className="form-select" id="country" required>
                    <option value="">Choose...</option>
                    <option>United States</option>
                    <option>Argentina</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select className="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="my-4" />
              <button
                  type="button"
                  className="mi-boton"
                  onClick={handleCreateOrder}
                >
                  Buy Now
                </button>              
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;