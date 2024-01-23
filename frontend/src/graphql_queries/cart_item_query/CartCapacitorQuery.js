import { gql } from '@apollo/client';

const GET_CAPACITOR_FROM_CART = gql`
    query Capacitors($inputs: CapacitorInput!){
        capacitorListQuery(inputs: $inputs) {
            price
            amountAvailable
            package
            capacitance
            componentType
        
        }
    }`;

const SingleCapacitorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_CAPACITOR_FROM_CART, SingleCapacitorInput}    