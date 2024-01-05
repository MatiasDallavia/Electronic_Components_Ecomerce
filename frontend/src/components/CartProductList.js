import React from 'react'
import CartItemTableRow from './CartItemTableRow'

function CartProductList() {
  return (
    <div className="col-md-5 col-lg-6 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">List of Products</span>
            <span className="badge bg-primary rounded-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
            
            <CartItemTableRow/>

            <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$20</strong>
            </li>
        </ul>
  </div>
    )
}

export default CartProductList