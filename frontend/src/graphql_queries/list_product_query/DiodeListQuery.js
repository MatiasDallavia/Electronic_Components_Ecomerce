import { gql } from '@apollo/client';

const GET_LIST_DIODES = gql`
    query Diodes($inputs: DiodeInput!){
    diodeListQuery(inputs: $inputs) {
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

const diodeListInput = {
        inputs: {
          model: null,
          mountingTechnology: "SMD",
          manufacturer: null,
          diodeType: null,
          dcReverse: null,
          current: null,  
        }
  }
  
  
  export {GET_LIST_DIODES, diodeListInput}    