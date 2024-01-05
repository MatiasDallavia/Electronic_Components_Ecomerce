import React from 'react'
import { useNavigate } from 'react-router-dom';


function ProductTableRow() {
  
  const navigate = useNavigate();

  const redirectModelView = () =>{
    navigate("/product-view/23")
  }
   
  return (
    <tr onClick={redirectModelView}>
        <td class="product-characteristic image">
            <img src="components/resistor2.jpeg" class="image-product"/>
        </td>

        <td class="product-characteristic description">Otto</td>
        <td class="product-characteristic price">@mdo</td>
        <td class="product-characteristic in-stock">@mdo</td>
        <td class="product-characteristic package">package</td>
        <td class="product-characteristic manufacturer">
            <img src="fairchild.png" class="image-product"/>
        </td>
        <td class="product-characteristic in-cart">
            <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
        </td>
    </tr>
  )
}

export default ProductTableRow