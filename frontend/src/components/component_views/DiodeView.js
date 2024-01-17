import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_DIODE, singleDiodeInput } from '../../graphql_queries/single_product_query/SingleDiodeQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { diodeImages } from "../../images/components/component_images_objects/diodePackages";
import { parseComponentAttributeText } from '../../utils/callbacks';

function DiodeView() {
  const [cartButton, setInCart] = useState(false);
  const { diodeComponentID } = useParams();
  singleDiodeInput.inputs.id = diodeComponentID;

  const { loading, error, data } = useQuery(GET_SINGLE_DIODE, { variables: singleDiodeInput });
  const diode = data ? data.diodeListQuery[0] : [];
  const excludedFields = new Set(['__typename', 'componentType', 'model', 'price', 'amountAvailable']);

  const diodeAttributes = Object.entries(diode)
    .filter(([key]) => !excludedFields.has(key))
    .map(([key, value]) => [key, value]);

  const packageImage = diodeImages[diode.package];

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-4">
          <div className="container d-flex flex-column align-items-center justify-content-between main-attributes">
            <div>
              <img id="cover-image-product" src={packageImage} alt="Diode Package" />
              <table>
                <tbody>
                  <tr>
                    <td className="ModelCell">Model</td>
                    <th className="ModelCell">{diode.model}</th>
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
                </tbody>
              </table>
            </div>
            {cartButton === false && 
              <button 
                type="button" 
                className="btn btn-success btn-lg btn-block"
                onClick={() => setInCart(true)}
              >
                Add to Cart
              </button>
            }
            {cartButton === true && 
              <button 
                type="button" 
                className="btn btn-warning btn-lg btn-block"
                onClick={() => setInCart(false)}
              >
                Remove from Cart
              </button>
            }
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
              {diodeAttributes.map(([attr, value]) => (
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

export default DiodeView;
