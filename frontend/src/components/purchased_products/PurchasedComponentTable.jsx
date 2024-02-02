import React from 'react'
import PurchasedComponetRow from './PurchasedComponetRow'


function PurchasedComponentTable({purchasedItems}) {
  return (
    <div className="container d-flex flex-column align-items-center mt-5">
        <h1>Purchased Componentes</h1>
        <table className="purchased-products mt-5">
            <thead>
                <tr className="column-headears">
                    <th colSpan="2">Product</th>
                    <th>Mounting Technology</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                {purchasedItems.map((item) => <PurchasedComponetRow item={item}/>)}
            </tbody>
        </table>

    </div> 
    )
}

export default PurchasedComponentTable