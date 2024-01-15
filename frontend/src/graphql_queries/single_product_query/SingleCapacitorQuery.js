import { gql } from '@apollo/client';

const GET_SINGLE_CAPACITOR = gql`
    query Capacitors($inputs: CapacitorInput!){
        capacitorListQuery(inputs: $inputs) {
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            capacitorType
            capacitance
            tolerance
            voltage
            esr
            componentType
        
        }
    }`;

const SingleCapacitorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_SINGLE_CAPACITOR, SingleCapacitorInput}    