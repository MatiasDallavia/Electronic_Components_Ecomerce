import { gql } from '@apollo/client';

const GET_SINGLE_TRANSISTOR = gql`
query Transistors($inputs: TransistorInput!){
    transistorListQuery(inputs: $inputs) {
        __typename
        ... on BJTType {
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package
            bjtType
            icMax
            vceSaturation
            dcCurrentGain
        }
        ... on MOSFETType {
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            isActive
            package
            vds
            driveVoltage
            rdsOn
            vgs
            inputCapacitance
        }
        ... on IGBTType{
            model
            description
            price
            mountingTechnology
            operatingTemperature
            amountAvailable
            manufacturer
            package          
            package
            vc
            ic
            vceOn
            powerMax
            td
            gc
        
        }
    }
    }`;

const singleTransistorInput = {
    inputs: {
        transistorType: null,
        id: null
        
      }
  }
  
  
  export {GET_SINGLE_TRANSISTOR, singleTransistorInput}    