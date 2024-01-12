import { gql } from '@apollo/client';

const GET_TRANSISTORS = gql`
query Transistors($inputs: TransistorInput!){
    transistorListQuery(inputs: $inputs) {
        __typename
        ... on BJTType {
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
        bjtType
        icMax
        vceSaturation
        dcCurrentGain  
        }
        ... on MOSFETType {
                id
                productId
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

const TransistorInput = {
    inputs: {
        transistorType: "BJT",
        model: "",
        mountingTechnology: null,
        manufacturer: null,
        bjtInput:{
          bjtType: null,
          icMax: null,
          dcCurrentGain: null
        },
        mosfetInput:{
          vds: null,
          driveVoltage: null,
          rdsOn: null
        },
        igbtInput: {
          vc: null,
          ic: null,
          powerMax: null
        }
      }
  }
  
  
  export {GET_TRANSISTORS, TransistorInput}    