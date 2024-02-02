import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import fairchildLogo from '../images/manufacturers/fairchild.png'
import seimensLogo from '../images/manufacturers/siemens.png'
import texasInstrumentsLogo from '../images/manufacturers/texas_instruments.png'
import InfineonLogo from '../images/manufacturers/infineon.png'
import SamsungLogo from '../images/manufacturers/samsumg.png'


import { transistorImages } from "../images/components/component_images_objects/transistorImages"
import { diodeImages } from "../images/components/component_images_objects/diodePackages";
import { getResistorImage } from '../utils/getComponetImages';
import { getInductorPackageImage } from '../utils/getComponetImages';
import { getCapacitorImage } from '../utils/getComponetImages';


function ProductTableRow({product}) {
  const navigate = useNavigate();
  const [ inCart, setInCart ] = useState(false)

  const redirectModelView = (productType ,productID) =>{

    const transistorTypes = ["BJT", "MOSFET", "IGBT"];
  
    if (transistorTypes.includes(productType)) {
      navigate(`/transistor/view/${productType}/${productID}`);
    } else {
      navigate(`/${productType}/view/${productID}`);
    }
  }

  const getProductInCart = () => {
    setInCart[!inCart];
  }


  let packageImage;
  switch (product?.componentType){
    case ("BJT"):
    case ("MOSFET"):
    case ("IGBT"):
    packageImage = transistorImages[product?.package]
    break
    case ("diode"):
    packageImage = diodeImages[product?.package]
    break
    case ("capacitor"):
    packageImage = getCapacitorImage(product)
    break
    case ("resistor"):
      packageImage = getResistorImage(product)
    break      
    case ("inductor"):
      packageImage = getInductorPackageImage(product)
    break     
  }

  return (
    <tr onClick={() => redirectModelView(product?.componentType, product?.id)}>
        <td className="table-row-product image">
          {<img src={packageImage} className="image-product"/>}


        </td>
        <td className="table-row-product description">{product?.description}</td>
        <td className="table-row-product price">${product?.price}</td>
        <td className="table-row-product in-stock">{product?.amountAvailable}</td>
        <td className="table-row-product mounting-technology">{product?.mountingTechnology}</td>
        <td className="table-row-product package">{product?.package}</td>
        <td className="table-row-product manufacturer">
            {product?.manufacturer == 'Infineon' && <img src={InfineonLogo} className="image-product"/>}
            {product?.manufacturer == 'Fairchild' && <img src={fairchildLogo} className="image-product"/>}
            {product?.manufacturer == 'Texas Instruments' && <img src={texasInstrumentsLogo} className="image-product"/>}
            {product?.manufacturer == 'Siemens' && <img src={seimensLogo} className="image-product"/>}
            {product?.manufacturer == 'Samsung' && <img src={SamsungLogo} className="image-product"/>}
        </td>

    </tr>
  )
}

export default ProductTableRow