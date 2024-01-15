import { gql } from '@apollo/client';

const GET_RESISTORS = gql`
        query Resistors($inputs: ResistorInput!){
        resistorListQuery(inputs: $inputs) {
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
            componentType
            
        }
        }`;

const ResistorInput = {
        inputs: {
          model: null,
          mountingTechnology: null,
          manufacturer: null,
          resistance: null,
          tolerance: null,
          power: null
        }
  }
  
  
  export {GET_RESISTORS, ResistorInput}    