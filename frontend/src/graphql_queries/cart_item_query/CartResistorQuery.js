import { gql } from '@apollo/client';

const GET_RESISTOR_FOR_CART = gql`
    query Resistors($inputs: ResistorInput!){
        resistorListQuery(inputs: $inputs) {
            model
            price
            resistance
            amountAvailable   
        }
    }`;

const singleResistorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_RESISTOR_FOR_CART, singleResistorInput}    