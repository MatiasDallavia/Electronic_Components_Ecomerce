import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_INDUCTOR, singleInductorInput } from '../../graphql_queries/single_product_query/SingleInductorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { parseComponentAttributeText } from '../../utils/callbacks';
import { getInductorPackageImage } from '../../utils/getComponetImages';


function InductorView() {
  const [cartButton, setInCart] = useState(false);
  const { inductorComponentID } = useParams();
  
  singleInductorInput.inputs.id = inductorComponentID;
  const { loading, error, data } = useQuery(GET_SINGLE_INDUCTOR, { variables: singleInductorInput });

  const inductor = data ? data.inductorListQuery[0] : [];
  const excludedFields = new Set(['__typename', 'package', 'componentType', 'model', 'price', 'amountAvailable']);

  const inductorAttributes = Object.entries(inductor)
    .filter(([key]) => !excludedFields.has(key))
    .map(([key, value]) => [key, value]);


  const packageImage = getInductorPackageImage(inductor);

  return (
    <div className="container pt-5">
      <div className="row">
        <div className="col-4">
          <div className="container d-flex flex-column align-items-center justify-content-between main-attributes">
            <div>
              <img id="cover-image-product" src={packageImage} alt="Package Image" />
              <table>
                <tbody>
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
              {inductorAttributes.map((attr) => (
                <ProductCharacteristicRow
                  key={attr[0]}
                  attribute={parseComponentAttributeText(attr[0])}
                  value={attr[1]}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


export default InductorView;