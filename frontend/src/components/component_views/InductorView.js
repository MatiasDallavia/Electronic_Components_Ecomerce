import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_INDUCTOR, singleInductorInput } from '../../graphql_queries/single_product_query/SingleInductorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { parseComponentAttributeText } from '../../utils/callbacks';
import { getInductorPackageImage } from '../../utils/getComponetImages';

import { addToCart, removeFromCart, isComponentInCart } from '../../utils/cartFunctions';
import {fetchData} from "../../utils/fetchData"


function InductorView() {
  const { inductorComponentID } = useParams();

  const [packageImage, setPackageImage] = useState()
  const [cartButton, setInCart] = useState(false);  
  const [inductor, setInductor] = useState({});
  const [inductorAttributes, setInductorAttributes] = useState([]);
  
  
  useEffect(() => {
    getInductor();
  }, []); 

  const getInductor = async () => {
    try {
      singleInductorInput.inputs.id = inductorComponentID;

      const data = await fetchData(GET_SINGLE_INDUCTOR, singleInductorInput);
      setInductor(data.inductorsQuery[0])

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{

    const attrToRemove = ["price", "amountAvailable", "componentType", "model"]
    
    setInCart(isComponentInCart("inductor", inductorComponentID))

    var attrs = Object.entries(inductor).filter(function ([key, value]) {
      return !attrToRemove.includes(key);
    });

    setInductorAttributes(attrs)
    setPackageImage(getInductorPackageImage(inductor))

  }, [inductor])

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
            {cartButton === false && (
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => { setInCart(true); addToCart("inductor", inductorComponentID);}}
                >
                  Add to Cart
                </button>
              )}
              {cartButton === true && (
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-block"
                  onClick={() => { setInCart(false); removeFromCart("inductor", inductorComponentID);}}
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