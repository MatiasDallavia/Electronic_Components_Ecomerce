import { gql } from '@apollo/client';

const GET_DIODES = gql`
    query Diodes($inputs: DiodeInput!){
    diodeListQuery(inputs: $inputs) {
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
            diodeType
            dcReverse
            current
            reverseRecovery
            componentType
        }
    }`;

const diodeInput = {
        inputs: {
          model: null,
          mountingTechnology: "SMD",
          manufacturer: null,
          diodeType: null,
          dcReverse: null,
          current: null,  
        }
  }
  
  
  export {GET_DIODES, diodeInput}    