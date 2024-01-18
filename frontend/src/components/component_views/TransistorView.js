import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_TRANSISTOR, singleTransistorInput } from '../../graphql_queries/single_product_query/SingleTransistorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import {transistorImages} from "../../images/components/component_images_objects/transistorImages"

import { parseComponentAttributeText } from '../../utils/callbacks';
import { addToCart, removeFromCart, isComponentInCart } from '../../utils/cartFunctions';


function TransistorView() {

    const { transistorType, transistorComponentID } = useParams();
    const singleTransistorInput = { inputs: { id: transistorComponentID, transistorType } };
    const { loading, error, data } = useQuery(GET_SINGLE_TRANSISTOR, { variables: singleTransistorInput });
  
    const transistor = data ? data.transistorListQuery[0] : {};
    const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);
    const transistorAttributes = Object.keys(transistor)
      .filter((key) => !excludedFields.has(key))
      .map((key) => [key, transistor[key]])
      .filter(Boolean);

    const { package: transistorPackage, price, amountAvailable } = transistor;

    const isInCart = isComponentInCart(transistorType, transistorComponentID);
    const [cartButton, setInCart] = useState(isInCart);


    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-4">
            <div className="container d-flex flex-column align-items-center justify-content-between main-attributes">
              <div>
                <img id="cover-image-product" src={transistorImages[transistorPackage]} alt="Transistor" />
                <table>
                  <tr>
                    <td>Price</td>
                    <td>${price}</td>
                  </tr>
                  <tr>
                    <td>Units Available</td>
                    <td>{amountAvailable}</td>
                  </tr>
                  <tr>
                    <td>Component Type</td>
                    <td>transistor</td>
                  </tr>
                </table>
              </div>
              {cartButton === false && (
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => { setInCart(true); addToCart(transistorType, transistorComponentID);}}
                >
                  Add to Cart
                </button>
              )}
              {cartButton === true && (
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-block"
                  onClick={() => { setInCart(false); removeFromCart(transistorType, transistorComponentID);}}
                >
                  Remove from Cart
                </button>
              )}
            </div>
          </div>
          <div className="col-8">
            <table className="table table-no-hover table-no-border table-striped product-attributes">
              <thead>
                <tr className="table-dark">
                  <th scope="col" colSpan="2">Product Attributes</th>
                </tr>
              </thead>
              <tbody>
                {transistorAttributes.map(([attr, value]) => (
                  <ProductCharacteristicRow
                    key={attr}
                    attribute={parseComponentAttributeText(attr)}
                    value={value}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  
  export default TransistorView;