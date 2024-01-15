import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_DIODE, singleDiodeInput } from '../../graphql_queries/single_product_query/SingleDiodeQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import inductor330 from '../../images/components/A_330.jpg'

import { parseComponentAttributeText } from '../../uitls';




function DiodeView() {
 
  const ToggleInCart = (e) => {
        console.log("FUNC")
        const button = e.target
        console.log(button.innerHTML)
        if (button.className === "btn btn-success btn-lg btn-block"){
            button.className = "btn btn-warning btn-lg btn-block"
            button.innerHTML = "Remove from Cart"
        } else{
            button.className = "btn btn-success btn-lg btn-block"
            button.innerHTML = "Add to Cart"
        }
  }

  const { diodeComponentID } = useParams();
  console.log(diodeComponentID)
  singleDiodeInput.inputs.id = diodeComponentID 
  const { loading, error, data } = useQuery(GET_SINGLE_DIODE, {variables: singleDiodeInput});

  const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);

  const diode = data ? data.diodeListQuery[0] : [];

  const diodeAttributes = Object.keys(diode).map((key) => {
    if (!excludedFields.has(key)) {
        return [key, diode[key]];
    }
    return null;
    }).filter(Boolean);

  return (
    <div class="container pt-5">

        <div class="row">
        <div class="col-4" >
            
                <div class="container d-flex flex-column align-items-center justify-content-between main-attributes">
                        <div>
                        <img id="cover-image-product" src={inductor330}/>

                        <table>
                            <tr>
                            <td class="ModelCell">Model</td>
                            <th class="ModelCell">{diode.model}</th>
                            </tr>
                            <tr>
                            <td>Price</td>
                            <td>${diode.price}</td>
                            </tr>
                            <tr>
                            <td>Units Available</td>
                            <td>{diode.amountAvailable}</td>
                            </tr>
                            <tr>
                            <td>Component Type</td>
                            <td>Diode</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <label class=" d-flex flex-column align-items-center">Added to cart !</label>
                        <button 
                            type="button" 
                            class="btn btn-success btn-lg btn-block"
                            onClick={(e) => ToggleInCart(e)}
                        >Block level button</button>
                    </div>
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
                        diodeAttributes.map((attr) => (
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

export default DiodeView