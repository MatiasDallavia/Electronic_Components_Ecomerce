import { gql } from '@apollo/client';

const GET_SINGLE_RESISTOR = gql`
    query Resistors($inputs: ResistorInput!){
        resistorListQuery(inputs: $inputs) {
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            resistorType
            resistance
            tolerance
            power
            componentType    
        
        }
    }`;

const singleResistorInput = {
    inputs: {
      id: null
    }
  }
  
  
  export {GET_SINGLE_RESISTOR, singleResistorInput}    