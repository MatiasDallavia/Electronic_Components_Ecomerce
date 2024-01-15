import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_RESISTOR, singleResistorInput } from '../../graphql_queries/single_product_query/SingleResistorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import {resistorImages} from "../../images/components/component_images_objects/resistorPackages"

import { parseComponentAttributeText } from '../../uitls';




function ResistorView() {

  const [cartButton, serInCart] = useState(false)


  const { resistorComponentID } = useParams();
  singleResistorInput.inputs.id = resistorComponentID 
  const { loading, error, data } = useQuery(GET_SINGLE_RESISTOR, {variables: singleResistorInput});

  const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);

  const resistor = data ? data.resistorListQuery[0] : [];

  const resistorAttributes = Object.keys(resistor).map((key) => {
    if (!excludedFields.has(key)) {
        return [key, resistor[key]];
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
                            src={
                                resistor.power > 9 && resistor.mountingTechnology === "THT" ? resistorImages["Watt10"] :
                                resistor.power > 4 && resistor.mountingTechnology === "THT" ? resistorImages["Watt5"] :
                                resistor.power > 1 && resistor.mountingTechnology === "THT" ? resistorImages["Watt3"] :
                                resistor.power > 0 && resistor.mountingTechnology === "THT" ? resistorImages["quarterWatt"] :
                                resistor.mountingTechnology === "SMD" ? resistorImages[resistor.package] :
                                null
                            }
                        />

                        <table>
                            <tr>
                                <td>Price</td>
                                <td>${resistor.price}</td>
                            </tr>
                            <tr>
                                <td>Units Available</td>
                                <td>{resistor.amountAvailable}</td>
                            </tr>
                            <tr>
                                <td>Component Type</td>
                                <td>Resistor</td>
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
                        resistorAttributes.map((attr) => (
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

export default ResistorView