import { gql } from '@apollo/client';

const CAPTURE_ORDER = gql`
    mutation captureOrder($inputs: ConfirmOrderInput!){
    captureOrder(inputs: $inputs) {
        
        errors
        purchases{
            package
            componentName
            price
            quantity
            totalPrice
            mountingTechnology
    }}
    }`;

const captureOrderInpt = {
    "inputs":{
       "token": "3RV98659TR3421007",
       "username": "matias"
      
    }
}    
  
  
  
  export {CAPTURE_ORDER, captureOrderInpt}    