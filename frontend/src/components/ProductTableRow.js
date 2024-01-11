import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import fairchildLogo from '../images/manufacturers/fairchild.png'
import seimensLogo from '../images/manufacturers/siemens.png'
import texasInstrumentsLogo from '../images/manufacturers/texas_instruments.png'
import InfineonLogo from '../images/manufacturers/infineon.png'

import inductor101 from '../images/components/A_101.webp'
import inductor220 from '../images/components/A_220.jpeg'
import inductor330 from '../images/components/A_330.jpg'


function ProductTableRow({props}) {
  const navigate = useNavigate();
  console.log(props[0]?.package)

  const redirectModelView = () =>{
    navigate("/product-view/23")
  }

  return (
    <tr onClick={redirectModelView}>
        <td class="table-row-product image">
          {props?.package == 'A_2220' && <img src={inductor220} class="image-product"/>}
          {props?.package == 'A_330' && <img src={inductor330} class="image-product"/>}
          {props?.package == 'A_101' && <img src={inductor101} class="image-product"/>}

        </td>
        <td class="table-row-product description">{props?.description}</td>
        <td class="table-row-product price">{props?.price}</td>
        <td class="table-row-product in-stock">{props?.amountAvailable}</td>
        <td class="table-row-product package">{props?.package}</td>
        <td class="table-row-product manufacturer">
            {props?.manufacturer == 'INFINEON' && <img src={InfineonLogo} class="image-product"/>}
            {props?.manufacturer == 'FAIRCHILD' && <img src={fairchildLogo} class="image-product"/>}
            {props?.manufacturer == 'TEXAS_INSTRUMENTS' && <img src={texasInstrumentsLogo} class="image-product"/>}
            {props?.manufacturer == 'SEIMENS' && <img src={seimensLogo} class="image-product"/>}
        </td>
        <td class="table-row-product in-cart">
            <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
        </td>
    </tr>
  )
}

export default ProductTableRow