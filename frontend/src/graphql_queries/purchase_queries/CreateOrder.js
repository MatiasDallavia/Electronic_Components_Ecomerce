import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
    mutation createOrder($inputs: CreateOrderInput!){
    createOrder(inputs: $inputs) {
            errors
            url
    }
}`;

const createOrderInpt = {
        "inputs":{
           "productsToPurchase": [
               {
               "componentType" : null,
               "componentId": null,
               "price": null,
               "quantity": null
               }   
           ]
         }
       }
  
  
  
  export {CREATE_ORDER, createOrderInpt}    