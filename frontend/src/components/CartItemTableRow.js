import React, { useState } from 'react';
import minusIcon from '../images/icons/minus.png'
import plusIcon from '../images/icons/plus.png'


function CartItemTableRow() {

  const [count, setProductCount] = useState(0)
  const [productCountValue, setproductCountValue] = useState(0)

  let productValue = 5;


  function updateProductCount(count) {
    setProductCount((currentCount) => {
        if ( currentCount + count >= 0 ){  
         const newCount = currentCount + count
         setproductCountValue(newCount * productValue)         
         return newCount 
        }
        return 0
    })
  }

  return (
    <li className="list-group-item d-flex align-items-center lh-sm justify-content-between">
        <div>
            <h6 className="my-0">Product name</h6>
        </div>
        <div>
            <p id="product-price" style={{ margin: 'auto', color: 'red' }}>{productValue}</p>
        </div>
        <div className="d-flex align-items-center g-2">
            <img src={plusIcon} onClick={() => updateProductCount(1)} className="plus_minus_icon m-2" alt="..." />
            <p id="product-number" style={{ margin: 'auto', color: 'red' }}>{count}</p>
            <img src={minusIcon} onClick={() => updateProductCount(-1)} className="plus_minus_icon m-2" alt="..." />
        </div>
        <span className="text-body-secondary">${productCountValue}</span>
    </li>
    )
}

export default CartItemTableRow