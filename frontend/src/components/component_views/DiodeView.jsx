import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_DIODE, singleDiodeInput } from '../../graphql_queries/single_product_query/SingleDiodeQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { diodeImages } from "../../images/components/component_images_objects/diodePackages";
import { parseComponentAttributeText } from '../../utils/callbacks';
import { addToCart, removeFromCart, isComponentInCart } from '../../utils/cartFunctions';

import {fetchData} from "../../utils/fetchData"


function DiodeView() {
  const { diodeComponentID } = useParams();
  singleDiodeInput.inputs.id = diodeComponentID;

  const [packageImage, setPackageImage] = useState()
  const [cartButton, setInCart] = useState(false);  
  const [diode, setDiode] = useState({});
  const [diodeAttributes, setDiodeAttributes] = useState([]);
  
  
  useEffect(() => {
    getDiode();
  }, []); 

  const getDiode = async () => {
    try {
      singleDiodeInput.inputs.id = diodeComponentID;

      const data = await fetchData(GET_SINGLE_DIODE, singleDiodeInput);
      setDiode(data.diodesQuery[0])

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{

    const attrToRemove = ["price", "amountAvailable", "componentType"]
    
    setInCart(isComponentInCart("diode", diodeComponentID))

    var attrs = Object.entries(diode).filter(function ([key, value]) {
      return !attrToRemove.includes(key);
    });
    setDiodeAttributes(attrs)

    setPackageImage(diodeImages[diode.package])

  }, [diode])

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
            {cartButton === false && (
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => { setInCart(true); addToCart("diode", diodeComponentID);}}
                >
                  Add to Cart
                </button>
              )}
              {cartButton === true && (
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-block"
                  onClick={() => { setInCart(false); removeFromCart("diode", diodeComponentID);}}
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
