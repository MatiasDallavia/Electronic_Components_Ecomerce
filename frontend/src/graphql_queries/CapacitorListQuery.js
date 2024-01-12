import { gql } from '@apollo/client';

const GET_CAPACITORS = gql`
    query Capacitors($inputs: CapacitorInput!){
        capacitorListQuery(inputs: $inputs) {
    
            id
            productId
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
        
        }
    }`;

const capacitorInput = {
    inputs: {
      model: null,
      mountingTechnology: null,
      manufacturer: null,
      capacitorType: null,
      capacitance: null,
      voltage: null
    }
  }
  
  
  export {GET_CAPACITORS, capacitorInput}    