import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import fairchildLogo from '../images/manufacturers/fairchild.png'
import seimensLogo from '../images/manufacturers/siemens.png'
import texasInstrumentsLogo from '../images/manufacturers/texas_instruments.png'
import InfineonLogo from '../images/manufacturers/infineon.png'

import inductor101 from '../images/components/A_101.webp'
import inductor220 from '../images/components/A_220.jpeg'
import inductor330 from '../images/components/A_330.jpg'


function ProductTableRow({product}) {
  const navigate = useNavigate();

  const redirectModelView = (productType ,productID) =>{
    console.log("productType:", productType);

    const transistorTypes = ["BJT", "MOSFET", "IGBT"];
    console.log("transistorTypes:", transistorTypes);
  
    if (transistorTypes.includes(productType)) {
      console.log("dentro");
      navigate(`/transistor/view/${productType}/${productID}`);
    } else {
      console.log("first");
      console.log(productType, productID);
      navigate(`/${productType}/view/${productID}`);
    }
  }

  return (
    <tr onClick={() => redirectModelView(product?.componentType, product?.id)}>
        <td class="table-row-product image">
          {product?.package == 'A_2220' && <img src={inductor220} class="image-product"/>}
          {product?.package == 'A_330' && <img src={inductor330} class="image-product"/>}
          {product?.package == 'A_101' && <img src={inductor101} class="image-product"/>}

        </td>
        <td class="table-row-product description">{product?.description}</td>
        <td class="table-row-product price">{product?.price}</td>
        <td class="table-row-product in-stock">{product?.amountAvailable}</td>
        <td class="table-row-product package">{product?.package}</td>
        <td class="table-row-product manufacturer">
            {product?.manufacturer == 'INFINEON' && <img src={InfineonLogo} class="image-product"/>}
            {product?.manufacturer == 'FAIRCHILD' && <img src={fairchildLogo} class="image-product"/>}
            {product?.manufacturer == 'TEXAS_INSTRUMENTS' && <img src={texasInstrumentsLogo} class="image-product"/>}
            {product?.manufacturer == 'SEIMENS' && <img src={seimensLogo} class="image-product"/>}
        </td>
        <td class="table-row-product in-cart">
            <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
        </td>
    </tr>
  )
}

export default ProductTableRow