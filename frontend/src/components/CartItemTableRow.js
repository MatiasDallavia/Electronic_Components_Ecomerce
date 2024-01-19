import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';


import minusIcon from '../images/icons/minus.png'
import plusIcon from '../images/icons/plus.png'
import { mockComponent } from 'react-dom/test-utils';


function CartItemTableRow({componentType, componentID}) {
    console.log("DENTRO")
  const [count, setProductCount] = useState(0)
  const [productCountValue, setproductCountValue] = useState(0)

  let productValue = 5;
  let queryComponentInputType;
  let queryComponentType;
  let productAttributes = "price inductance ";
  let inputVariables = {
    inputs:{
        id:componentID
        }
    }
  
    console.log(componentType)
    switch (componentType) {
        case "inductor":
          queryComponentType = "inductorListQuery";
          queryComponentInputType = "InductorInput";
           productAttributes = "price inductance amountAvailable"
          break;
        case "capacitor":
           queryComponentType = "capacitorListQuery";
           queryComponentInputType = "CapacitorInput";
           productAttributes = "price capacitance amountAvailable"
           break;
        case "resistor":
          queryComponentType = "resistorListQuery";
          queryComponentInputType = "ResistorInput";
          productAttributes = "price resistance amountAvailable"
          break;          
        case "diode":
           queryComponentType = "inductorListQuery";
           queryComponentInputType = "DiodeInput";
           productAttributes = "price model amountAvailable"
           break;
        case "BJT":
        case "MOSFET":
        case "IGBT":
           queryComponentType = "transistorListQuery";
           queryComponentInputType = "TransistorInput";
           break;
     
      }
 
console.log(queryComponentType, queryComponentInputType)
  const GET_PRODUCT = gql`
    query GetProducts($inputs: ${queryComponentInputType}!) {
      ${queryComponentType}(inputs: $inputs) {
        ${productAttributes}
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PRODUCT, { variables: inputVariables });
  console.log(data)
  console.log(error)

  const component = data ? data[queryComponentType][0] : [];

  function updateProductCount(count) {
    setProductCount((currentCount) => {
        if ( currentCount + count >= 0 ){  
         const newCount = currentCount + count
         const newValue = newCount * component.price
         setproductCountValue(newValue.toFixed(2))         
         return newCount 
        }
        return 0
    })
  }

    let productName;


    switch (componentType) {
        case "inductor":
            productName = componentType + " " + component.inductance        
          break;
        case "capacitor":
            productName = componentType + " " + component.capacitance        
           break;
        case "resistor":
            productName = componentType + " " +component.resistance        
          break;          
        case "diode":
        case "BJT":
        case "MOSFET":
        case "IGBT":
            productName = componentType + " " + component.model        

           break;
      }

  return (
    <li className="list-group-item d-flex align-items-center lh-sm justify-content-between">
        <div>
            <h6 className="my-0">{productName}</h6>
        </div>
        <div>
            <p id="product-price" style={{ margin: 'auto', color: 'red' }}>{component.price}</p>
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