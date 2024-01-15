import { gql } from '@apollo/client';

const GET_LIST_RESISTORS = gql`
        query Resistors($inputs: ResistorInput!){
        resistorListQuery(inputs: $inputs) {
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

const ResistorListInput = {
        inputs: {
          model: null,
          mountingTechnology: null,
          manufacturer: null,
          resistance: null,
          tolerance: null,
          power: null
        }
  }
  
  
  export {GET_LIST_RESISTORS, ResistorListInput}    