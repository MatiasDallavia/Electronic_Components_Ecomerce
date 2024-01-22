import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Table from 'react-bootstrap/Table';
import image from '../images/components/A_220.jpeg'



function PurchaseConfirmation() {
  const { token } = useParams();
  console.log(token)
  return (
    // <div class="spinner-container">
    //     <div class="spinner"></div>
    // </div>
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
            <tr className='column-values'>
                <td class="product-image"><img src={image}/></td>
                <td class="product-name">Description</td>
                <td class="product-mounting-technology">SMD</td>
                <td class="product-price">44</td>
                <td class="product-quantity">23</td>
                <td class="product-total">23</td> 
            </tr>
            <tr className='column-values'>
                <td class="product-image"><img src={image}/></td>
                <td class="product-name">Description</td>
                <td class="product-mounting-technology">SMD</td>
                <td class="product-price">44</td>
                <td class="product-quantity">23</td>
                <td class="product-total">23</td> 
            </tr>            
        </tbody>
    </table>

    </div>    
    )
}

export default PurchaseConfirmation