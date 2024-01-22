import React from 'react'
import image from '../../images/components/A_220.jpeg'

function PurchasedComponetRow() {
  return (
    <tr className='column-values'>
        <td class="product-image"><img src={image}/></td>
        <td class="product-name">Description</td>
        <td class="product-mounting-technology">SMD</td>
        <td class="product-price">44</td>
        <td class="product-quantity">23</td>
        <td class="product-total">23</td> 
    </tr>
  )
}

export default PurchasedComponetRow