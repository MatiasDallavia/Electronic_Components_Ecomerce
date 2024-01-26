import { gql } from '@apollo/client';

const GET_TRANSISTOR_FOR_CART = gql`
query Transistors($inputs: TransistorInput!){
    transistorsQuery(inputs: $inputs) {
        __typename
        ... on BJTType {
            model
            price
            amountAvailable
        }
        ... on MOSFETType {
            model
            price
            amountAvailable
        }
        ... on IGBTType{
            model
            price
            amountAvailable
        }
    }
    }`;

const singleTransistorInput = {
    inputs: {
        transistorType: null,
        id: null
        
      }
  }
  
  
  export {GET_TRANSISTOR_FOR_CART, singleTransistorInput}    