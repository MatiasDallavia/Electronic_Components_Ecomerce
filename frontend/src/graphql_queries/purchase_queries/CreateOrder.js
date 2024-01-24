import { gql } from '@apollo/client';

const CREATE_ORDER = gql`
    mutation createOrder($inputs: CreateOrderInput!){
        createOrder(inputs: $inputs) {
                errors
                url
    }
}`;

const createOrderInput = {
  "inputs":{
      "productsToPurchase": [

      ]
    }
  }
  
  
  
export {CREATE_ORDER, createOrderInput}    