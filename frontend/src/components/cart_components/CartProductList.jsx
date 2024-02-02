import React from 'react'
import CartItemTableRow from './CartItemTableRow'

function CartProductList( {
            productsInCart,
            setProductsToPurchase,
            productsToPurchase,
            removeItemFromList,
            serTotalValue,
            totalValue
        }
        ) {
  return (
    <div className="col-md-6 col-lg-6 order-md-last align-self-start">

        <h5 style={{ marginLeft: '120px' }}>Select the number of units for every component</h5>
        <ul className="list-group mb-3 cart-items-row">
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
    )
}

export default CartProductList