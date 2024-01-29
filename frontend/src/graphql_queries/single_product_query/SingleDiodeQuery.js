import { gql } from '@apollo/client';

const GET_SINGLE_DIODE = gql`
    query Diodes($inputs: DiodeInput!){
    diodesQuery(inputs: $inputs) {
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            diodeType
            dcReverse
            current
            reverseRecovery
            componentType
        }
    }`;

const singleDiodeInput = {
        inputs: {
          id: null
        }
  }
  
  
  export {GET_SINGLE_DIODE, singleDiodeInput}    