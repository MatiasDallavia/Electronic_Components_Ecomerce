import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';


import minusIcon from '../images/icons/minus.png'
import plusIcon from '../images/icons/plus.png'
import xIcon from '../images/icons/x.webp'

import {GET_CAPACITOR_FROM_CART} from "../graphql_queries/cart_item_query/CartCapacitorQuery"
import {GET_DIODE_FROM_CART} from "../graphql_queries/cart_item_query/CartDiodeQuery"
import {GET_RESISTOR_FOR_CART} from "../graphql_queries/cart_item_query/CartResistorQuery"
import {GET_TRANSISTOR_FOR_CART} from "../graphql_queries/cart_item_query/CartTransistorQuery"
import {GET_INDUCTOR_FROM_CART} from "../graphql_queries/cart_item_query/CartInductorQuery"


function CartItemTableRow({componentType, componentID, removeItemFromList}) {
    console.log("DENTRO")
  const [count, setProductCount] = useState(0)
  const [productCountValue, setproductCountValue] = useState(0)

  let queryComponentType;
  let querySchema;
  let inputVariables = {
    inputs:{
        id:componentID
        }
    }
  
    console.log(componentType)
    switch (componentType) {
        case "inductor":
          querySchema = GET_INDUCTOR_FROM_CART;
          queryComponentType = "inductorListQuery"
          break;
        case "capacitor":
           querySchema = GET_CAPACITOR_FROM_CART;
           queryComponentType = "capacitorListQuery"
           break;
        case "resistor":
          querySchema = GET_RESISTOR_FOR_CART
          queryComponentType = "resistorListQuery"
          break;          
        case "diode":
           querySchema = GET_DIODE_FROM_CART
           queryComponentType = "diodeListQuery"
           break;
        case "BJT":
        case "MOSFET":
        case "IGBT":
           querySchema = GET_TRANSISTOR_FOR_CART
           queryComponentType = "transistorListQuery"
           inputVariables.inputs.transistorType = componentType
           break;
     
      }
 
console.log(querySchema, queryComponentType)
console.log(inputVariables)

  const { loading, error, data } = useQuery(querySchema, { variables: inputVariables });
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

  console.log(component)
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
    <li id={componentType + componentID} className="list-group-item d-flex align-items-center justify-content-between cart-item-list">
        <div className="d-flex align-items-center pt-2">
            <img 
                className="x_icon" 
                src={xIcon} 
                alt="X Icon" 
                onClick={() => { removeItemFromList(componentType, componentID);}}
            />
            <h6 className="product-name">{productName}</h6>
        </div>
        <div className="d-flex align-items-center">
            <p style={{ color: 'red', margin: '0', marginRight: '10px' }}>{component.price}</p>
        </div>
        <div className="d-flex align-items-center">
            <img src={plusIcon} onClick={() => updateProductCount(1)} className="plus_minus_icon m-2" alt="Plus Icon" />
            <p style={{ width: "20px", color: 'red', margin: '0 10px' }}>{count}</p>
            <img src={minusIcon} onClick={() => updateProductCount(-1)} className="plus_minus_icon m-2" alt="Minus Icon" />
        </div>
        <p className="text-body-secondary product-price" style={{ width: "64px" ,margin: '0', marginLeft: '10px' }}>${productCountValue}</p>
    </li>
    )
}

export default CartItemTableRow