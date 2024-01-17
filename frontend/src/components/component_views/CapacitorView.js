import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CAPACITOR, SingleCapacitorInput } from '../../graphql_queries/single_product_query/SingleCapacitorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import {capacitorImages} from "../../images/components/component_images_objects/capacitorImages"

import { parseComponentAttributeText } from '../../uitls';




function CapacitorView() {

  const [cartButton, serInCart] = useState(false)


  const { capacitorComponentID } = useParams();
  SingleCapacitorInput.inputs.id =capacitorComponentID 
  const { loading, error, data } = useQuery(GET_SINGLE_CAPACITOR, {variables: SingleCapacitorInput});

  const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);

  const capacitor = data ? data.capacitorListQuery[0] : [];

  const capacitorAttributes = Object.keys(capacitor).map((key) => {
    if (!excludedFields.has(key)) {
        return [key,capacitor[key]];
    }
    return null;
    }).filter(Boolean);


    let image
   if (capacitor.package === "BULK" ) {
    if (capacitor.mountingTechnology === "THT"){

        const capacitance = capacitor.capacitance
        if (capacitance === "1000pF") {
            image = capacitorImages.C1000;
        } else if (capacitance > "680uF") {
            image = capacitorImages.C680;
        } else{
            image = capacitorImages.C10
        }
      }
    else{
        image = capacitorImages.ELECTROLYTIC_SMD
    }

   }
   console.log(typeof(capacitor.package))
   if (capacitor.capacitorType === "Ceramic Capacitor" ){
        if (capacitor.mountingTechnology === "THT"){
            if (capacitor.package === "104"){
                image = capacitorImages.C104
            }
            if (capacitor.package === "103"){
                image = capacitorImages.C103
            }
      } else{
            image = capacitorImages.P2220
      }
    }
   
    console.log(image)
  return (
    <div class="container pt-5">

        <div class="row">
        <div class="col-4" >
            
                <div class="container d-flex flex-column align-items-center justify-content-between main-attributes">
                        <div>
                        <img 
                            id="cover-image-product" 
                            src={image}
                        />

                        <table>
                            <tr>
                                <td>Price</td>
                                <td>${capacitor.price}</td>
                            </tr>
                            <tr>
                                <td>Units Available</td>
                                <td>{capacitor.amountAvailable}</td>
                            </tr>
                            <tr>
                                <td>Component Type</td>
                                <td>capacitor</td>
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
                       capacitorAttributes.map((attr) => (
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

export default CapacitorView