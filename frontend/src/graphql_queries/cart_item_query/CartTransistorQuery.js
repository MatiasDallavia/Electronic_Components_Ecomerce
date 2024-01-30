
const GET_TRANSISTOR_FOR_CART = `
query Transistors($inputs: TransistorInput!){
    transistorsQuery(inputs: $inputs) {
        __typename
        ... on BJTType {
            model
            price
            amountAvailable
        }
        ... on MOSFETType {
            model
            price
            amountAvailable
        }
        ... on IGBTType{
            model
            price
            amountAvailable
        }
    }
    }`;

    const singleTransistorInput = {
        inputs: {
            id: null,
            transistorType: null,
            model: null,
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
  
  
  export {GET_TRANSISTOR_FOR_CART, singleTransistorInput}    