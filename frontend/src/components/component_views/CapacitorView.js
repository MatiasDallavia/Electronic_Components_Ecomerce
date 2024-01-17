import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_CAPACITOR, SingleCapacitorInput } from '../../graphql_queries/single_product_query/SingleCapacitorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { parseComponentAttributeText } from '../../utils/callbacks';
import { getCapacitorImage } from '../../utils/getComponetImages';


function CapacitorView() {
  const [cartButton, setInCart] = useState(false);
  const { capacitorComponentID } = useParams();
  SingleCapacitorInput.inputs.id = capacitorComponentID;
  const { loading, error, data } = useQuery(GET_SINGLE_CAPACITOR, { variables: SingleCapacitorInput });

  const capacitor = data ? data.capacitorListQuery[0] : {};
  const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);
  const capacitorAttributes = Object.entries(capacitor)
    .filter(([key]) => !excludedFields.has(key))
    .map(([key, value]) => [key, value]);

  let image = getCapacitorImage(capacitor);

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-4">
          <div className="container d-flex flex-column align-items-center justify-content-between main-attributes">
            <div>
              <img id="cover-image-product" src={image} alt="Capacitor" />
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
            {cartButton === false && (
              <button
                type="button"
                className="btn btn-success btn-lg btn-block"
                onClick={() => setInCart(true)}
              >
                Add to Cart
              </button>
            )}
            {cartButton === true && (
              <button
                type="button"
                className="btn btn-warning btn-lg btn-block"
                onClick={() => setInCart(false)}
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
              {capacitorAttributes.map(([attr, value]) => (
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

export default CapacitorView;