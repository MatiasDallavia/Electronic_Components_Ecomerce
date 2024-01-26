import { gql } from '@apollo/client';

const CAPTURE_ORDER = gql`
mutation captureOrder($inputs: ConfirmOrderInput!){
  captureOrder(inputs: $inputs) {
    
    
    purchases{
        quantity
        componentNode{
            __typename
            ... on BJTType {
              model
              price
              mountingTechnology
              package
              componentType
            }
            ... on MOSFETType {
              model
              price
              mountingTechnology
              package
              componentType
            }
            ... on IGBTType {
              model
              price
              mountingTechnology
              package
              componentType
            }
            ... on ResistorType {
              resistance
              power
              price
              mountingTechnology
              package
              componentType
            }
            ... on CapacitorType {
              capacitance
              price
              mountingTechnology
              package
              componentType
            }
            ... on InductorType {
              inductance
              price
              mountingTechnology
              package
              componentType
            }
            ... on DiodeType {
              model
              price
              mountingTechnology
              package
              componentType
            }
        }
    }
  }
}
`;

const captureOrderInput = {
    "inputs":{
       "token": "3RV98659TR3421007",
       "username": "matias"
      
    }
}    
  
  
  
  export {CAPTURE_ORDER, captureOrderInput}    