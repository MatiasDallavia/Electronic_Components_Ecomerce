import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_TRANSISTOR, singleTransistorInput } from '../../graphql_queries/single_product_query/SingleTransistorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import {transistorImages} from "../../images/components/component_images_objects/transistorImages"

import { parseComponentAttributeText } from '../../uitls';




function TransistorView() {

  const [cartButton, serInCart] = useState(false)


  const { transistorType, transistorComponentID } = useParams();
  console.log(transistorType, transistorComponentID)
  singleTransistorInput.inputs.id = transistorComponentID 
  singleTransistorInput.inputs.transistorType = transistorType
  console.log(singleTransistorInput)

  const { loading, error, data } = useQuery(GET_SINGLE_TRANSISTOR, {variables: singleTransistorInput});


  const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);

  const transistor = data ? data.transistorListQuery[0] : [];
    console.log("2")
  console.log(transistor.package)
  
  let transistorPackage = transistor.package
  const transistorAttributes = Object.keys(transistor).map((key) => {
    if (!excludedFields.has(key)) {
        return [key,transistor[key]];
    }
    return null;
    }).filter(Boolean);

  return (
    <div class="container pt-5">

        <div class="row">
        <div class="col-4" >
            
                <div class="container d-flex flex-column align-items-center justify-content-between main-attributes">
                        <div>
                        <img 
                            id="cover-image-product" 
                            src={transistorImages["TO_220"]}
                        />

                        <table>
                            <tr>
                                <td>Price</td>
                                <td>${transistor.price}</td>
                            </tr>
                            <tr>
                                <td>Units Available</td>
                                <td>{transistor.amountAvailable}</td>
                            </tr>
                            <tr>
                                <td>Component Type</td>
                                <td>transistor</td>
                            </tr>
                        </table>
                    </div>
                        {cartButton === false && 
                        <button 
                            type="button" 
                            class="btn btn-success btn-lg btn-block"
                            onClick={(e) => serInCart(true)}
                        >
                            Add to Cart
                        </button>
                        }
                        {cartButton === true && 
                        <button 
                            type="button" 
                            class="btn btn-warning btn-lg btn-block"
                            onClick={(e) => serInCart(false)}
                        >
                            Remove from Cart
                        </button>
                        }
                </div>
        </div>
        <div class="col-8">
            <table class="table table-no-hover table-no-border table-striped product-attributes">
                <thead>
                <tr class="table-dark">
                    <th scope="col" colspan="2">Product Attributes</th>
                </tr>
                </thead>
                <tbody>
                    {
                       transistorAttributes.map((attr) => (
                            <ProductCharacteristicRow 
                                attribute={parseComponentAttributeText(attr[0])} 
                                value={attr[1]}
                            />
                        ))
                    }
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default TransistorView