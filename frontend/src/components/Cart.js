import React from 'react';
import CartItemTableRow from './CartItemTableRow';

import {removeFromCart} from "../utils/cartFunctions"

function Cart() {

  const productsInCart = JSON.parse(localStorage.getItem('cart')) || [];

  const removeItemFromList = (componentType, componentID) => {
    document.querySelector(`#${componentType + componentID}`).remove()
    removeFromCart(componentType, componentID)
  }

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
              <span className="badge bg-primary rounded-pill">{productsInCart.length}</span>
            </h4>
            <ul className="list-group mb-3">

                {productsInCart.map((product) => <CartItemTableRow removeItemFromList={removeItemFromList} componentType={product[0]} componentID={product[1]}/> )}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>$20</strong>
                </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-6">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" noValidate>
              <div className="row g-3 pb-4">
                <div className='col-4'>
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
              </div>
              </div>

              <div className="row g-3 pb-4">
   
                <div className="col-md-3">
                  <label for="country" class="form-label">Country</label>
                    <select class="form-select" id="country" required>
                      <option value="">Choose...</option>
                      <option>United States</option>
                      <option>Argentina</option>
                    </select>
                  <div class="invalid-feedback">
                    Please select a valid country.
                  </div>
                </div>
                
                <div className="col-md-3">

                    <label for="state" class="form-label">State</label>
                    <select class="form-select" id="state" required>
                    <option value="">Choose...</option>
                    <option>California</option>
                    </select>
                    <div class="invalid-feedback">
                    Please provide a valid state.
                    </div>
                </div>
                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">
                    Zip
                  </label>
                  <input type="text" className="form-control" id="zip" placeholder="" required />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>
              <hr className="my-4" />
              <a href="#" className="mi-boton">
                Comprar Ahora
              </a>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cart;