
const GET_SINGLE_TRANSISTOR = `
query Transistors($inputs: TransistorInput!){
    transistorsQuery(inputs: $inputs) {
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
    "inputs": {
      "id": null,
      "transistorType": "IGBT",
      "model": "",
      "mountingTechnology": null,
      "manufacturer": null,
      "bjtInput":{
        "bjtType": null,
        "icMax": null,
        "dcCurrentGain": null
      },
      "mosfetInput":{
        "vds": null,
        "driveVoltage": null,
        "rdsOn": null
      },
      "igbtInput": {
        "vc": null,
        "ic": null,
        "powerMax": null
      }
    }
  }
  
  
  export {GET_SINGLE_TRANSISTOR, singleTransistorInput}    