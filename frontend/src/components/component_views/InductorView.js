import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_INDUCTOR, singleInductorInput } from '../../graphql_queries/single_product_query/SingleInductorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import {inductorImages} from "../../images/components/component_images_objects/inductorImages"

import { parseComponentAttributeText } from '../../uitls';




function InductorView() {

  const [cartButton, serInCart] = useState(false)


  const { inductorComponentID } = useParams();
  singleInductorInput.inputs.id = inductorComponentID 
  console.log(singleInductorInput)

  const { loading, error, data } = useQuery(GET_SINGLE_INDUCTOR, {variables: singleInductorInput});
  const excludedFields = new Set(['__typename', 'package', 'componentType', 'model', 'price', 'amountAvailable']);

  const inductor = data ? data.inductorListQuery[0] : [];

  const inductorAttributes = Object.keys(inductor).map((key) => {
    if (!excludedFields.has(key)) {
        return [key, inductor[key]];
    }
    return null;
    }).filter(Boolean);

    let packageImage;
    const componentPackage = inductor.package
    switch (componentPackage){
        case "DIL":
            packageImage = inductorImages.DIL
        break
        case "2220":
            packageImage = inductorImages.P2220
        break
        case "330":
            packageImage = inductorImages.P330
        break
        case "220":
            packageImage = inductorImages.P220
        break
        case "101":
            packageImage = inductorImages.P101
        break
    }
    console.log(packageImage)
  return (
    <div class="container pt-5">

        <div class="row">
        <div class="col-4" >
            
                <div class="container d-flex flex-column align-items-center justify-content-between main-attributes">
                        <div>
                        <img 
                            id="cover-image-product" 
                            src={packageImage}
                        />

                        <table>
                            <tr>
                                <td>Price</td>
                                <td>${inductor.price}</td>
                            </tr>
                            <tr>
                                <td>Units Available</td>
                                <td>{inductor.amountAvailable}</td>
                            </tr>
                            <tr>
                                <td>Component Type</td>
                                <td>inductor</td>
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
                        inductorAttributes.map((attr) => (
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

export default InductorView