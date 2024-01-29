import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { GET_SINGLE_TRANSISTOR, singleTransistorInput } from '../../graphql_queries/single_product_query/SingleTransistorQuery';
import ProductCharacteristicRow from './ProductCharacteristicRow';

import {transistorImages} from "../../images/components/component_images_objects/transistorImages"

import { parseComponentAttributeText } from '../../utils/callbacks';
import { addToCart, removeFromCart, isComponentInCart } from '../../utils/cartFunctions';

import {fetchData} from "../../utils/fetchData"



function TransistorView() {

    const { transistorType, transistorComponentID } = useParams();  


    singleTransistorInput.inputs.id = transistorComponentID
    singleTransistorInput.inputs.transistorType = transistorType

    const [packageImage, setPackageImage] = useState()
    const [cartButton, setInCart] = useState(false);  
    const [transistor, setTransistor] = useState({});
    const [transistorAttributes, setTransistorAttributes] = useState([]);
    
    
    useEffect(() => {
      getTransistor();
    }, []); 
  
    const getTransistor = async () => {
      try {
        const data = await fetchData(GET_SINGLE_TRANSISTOR, singleTransistorInput);
        setTransistor(data.transistorsQuery[0])
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(()=>{

      const attrToRemove = ["price", "amountAvailable", "componentType"]
      
      setInCart(isComponentInCart("transistor", transistorComponentID))
  
      var attrs = Object.entries(transistor).filter(function ([key, value]) {
        return !attrToRemove.includes(key);
      });
  
      setTransistorAttributes(attrs)
      setPackageImage(transistorImages[transistor.package])
  
    }, [transistor])       


    return (
      <div className="container pt-5">
        <div className="row">
          <div className="col-4">
            <div className="container d-flex flex-column align-items-center justify-content-between main-attributes">
              <div>
                <img id="cover-image-product" src={packageImage} alt="Transistor" />
                <table>
                  <tr>
                    <td>Price</td>
                    <td>${transistor.price}</td>
                  </tr>
                  <tr>
                    <td>Units Available</td>
                    <td>{transistor.amountAvailable}</td>
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