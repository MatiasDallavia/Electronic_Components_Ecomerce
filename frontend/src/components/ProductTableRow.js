import React from 'react'
import { useNavigate } from 'react-router-dom';


function ProductTableRow() {
  
  const navigate = useNavigate();

  const redirectModelView = () =>{
    navigate("/product-view/23")
  }
   
  return (
    <tr onClick={redirectModelView}>
        <td class="table-row-product image">
            <img src="components/resistor2.jpeg" class="image-product"/>
        </td>

        <td class="table-row-product description">Otto</td>
        <td class="table-row-product price">@mdo</td>
        <td class="table-row-product in-stock">@mdo</td>
        <td class="table-row-product package">package</td>
        <td class="table-row-product manufacturer">
            <img src="fairchild.png" class="image-product"/>
        </td>
        <td class="table-row-product in-cart">
            <input class="form-check-input in-cart-checkbox" type="checkbox" value="in-cart" checked/>
        </td>
    </tr>
  )
}

export default ProductTableRow