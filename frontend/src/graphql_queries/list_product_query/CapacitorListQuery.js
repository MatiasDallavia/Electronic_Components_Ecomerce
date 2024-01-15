import { gql } from '@apollo/client';

const GET_LIST_CAPACITORS = gql`
    query Capacitors($inputs: CapacitorInput!){
        capacitorListQuery(inputs: $inputs) {
            id
            model
            description
            price
            amountAvailable
            manufacturer
            package
            componentType
        }
    }`;

const capacitorListInput = {
    inputs: {
      mountingTechnology: null,
      manufacturer: null,
      capacitorType: null,
      capacitance: null,
      voltage: null
    }
  }
  
  
  export {GET_LIST_CAPACITORS, capacitorListInput}    