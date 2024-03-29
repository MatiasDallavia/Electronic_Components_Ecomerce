import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GET_SINGLE_RESISTOR, singleResistorInput } from '../../graphql_queries/single_product_query/SingleResistorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import { parseComponentAttributeText } from '../../utils/callbacks';
import { getResistorImage } from '../../utils/getComponetImages';
import { addToCart, removeFromCart, isComponentInCart } from '../../utils/cartFunctions';
import {fetchData} from "../../utils/fetchData"


function ResistorView() {

  const { resistorComponentID } = useParams();

  const [packageImage, setPackageImage] = useState()
  const [cartButton, setInCart] = useState(false);  
  const [resistor, setResistor] = useState({});
  const [resistorAttributes, setResistorAttributes] = useState([]);  

    useEffect(() => {
      getResistor();
    }, []); 
  
    const getResistor = async () => {
      try {
        singleResistorInput.inputs.id = resistorComponentID;
  
        const data = await fetchData(GET_SINGLE_RESISTOR, singleResistorInput);
        setResistor(data.resistorsQuery[0])
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(()=>{
  
      const attrToRemove = ["price", "amountAvailable", "componentType", "model"]
      
      setInCart(isComponentInCart("resistor", resistorComponentID))
  
      var attrs = Object.entries(resistor).filter(function ([key, value]) {
        return !attrToRemove.includes(key);
      });
  
      setResistorAttributes(attrs)
  
      setPackageImage(getResistorImage(resistor))
  
    }, [resistor])    


    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-4">
            <div className="container d-flex flex-column align-items-center justify-content-between main-attributes">
              <div>
                <img id="cover-image-product" src={packageImage} alt="Resistor" />
  
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
              {cartButton === false && (
                <button
                  type="button"
                  className="btn btn-success btn-lg btn-block"
                  onClick={() => { setInCart(true); addToCart("resistor", resistorComponentID);}}
                >
                  Add to Cart
                </button>
              )}
              {cartButton === true && (
                <button
                  type="button"
                  className="btn btn-warning btn-lg btn-block"
                  onClick={() => { setInCart(false); removeFromCart("resistor", resistorComponentID);}}
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
                {resistorAttributes.map(([attr, value]) => (
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
  

  export default ResistorView;