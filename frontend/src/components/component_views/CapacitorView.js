import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_SINGLE_CAPACITOR, SingleCapacitorInput } from '../../graphql_queries/single_product_query/SingleCapacitorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { parseComponentAttributeText } from '../../utils/callbacks';
import { getCapacitorImage } from '../../utils/getComponetImages';

import { addToCart, removeFromCart, isComponentInCart } from '../../utils/cartFunctions';

import {fetchData} from "../../utils/fetchData"


function CapacitorView() {
  const { capacitorComponentID } = useParams();

  const [cartButton, setInCart] = useState(false);  
  const [image, setImage] = useState();
  const [capacitor, setCapacitor] = useState({});
  const [capacitorAttributes, setCapacitorAttributes] = useState([]);
  
  
  useEffect(() => {
    getCapacitor();
  }, []); 

  const getCapacitor = async () => {
    try {
      SingleCapacitorInput.inputs.id = capacitorComponentID;

      const data = await fetchData(GET_SINGLE_CAPACITOR, SingleCapacitorInput);
      console.log(data.capacitorsQuery)
      setCapacitor(data.capacitorsQuery[0])
      setImage(getCapacitorImage(data.capacitorsQuery[0]))

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{

    const attrToRemove = ["price", "amountAvailable", "componentType"]
    
    setInCart(isComponentInCart("capacitor", capacitorComponentID))

    var attrs = Object.entries(capacitor).filter(function ([key, value]) {
      return !attrToRemove.includes(key);
    });
    console.log(attrs)

    setCapacitorAttributes(attrs)

  }, [capacitor])

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
                  onClick={() => { setInCart(true); addToCart("capacitor", capacitorComponentID);}}
                >
                  Add to Cart
                </button>
              )}
              {cartButton === true && (
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-block"
                  onClick={() => { setInCart(false); removeFromCart("capacitor", capacitorComponentID);}}
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