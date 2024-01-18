import React, {useState, useEffect} from 'react'
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
    console.log("productType:", productType);

    const transistorTypes = ["BJT", "MOSFET", "IGBT"];
    console.log("transistorTypes:", transistorTypes);
  
    if (transistorTypes.includes(productType)) {
      navigate(`/transistor/view/${productType}/${productID}`);
    } else {
      navigate(`/${productType}/view/${productID}`);
    }
  }

  const getProductInCart = () => {
    inCart = setInCart[!inCart];
  }


  console.log(product?.componentType)
  console.log(product?.package)
  console.log(transistorImages[product?.package])
  console.log(product)
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
  console.log(packageImage)
  return (
    <tr onClick={() => redirectModelView(product?.componentType, product?.id)}>
        <td class="table-row-product image">
          {<img src={packageImage} class="image-product"/>}


        </td>
        <td class="table-row-product description">{product?.description}</td>
        <td class="table-row-product price">{product?.price}</td>
        <td class="table-row-product in-stock">{product?.amountAvailable}</td>
        <td class="table-row-product mounting-technology">{product?.mountingTechnology}</td>
        <td class="table-row-product package">{product?.package}</td>
        <td class="table-row-product manufacturer">
            {product?.manufacturer == 'Infineon' && <img src={InfineonLogo} class="image-product"/>}
            {product?.manufacturer == 'Fairchild' && <img src={fairchildLogo} class="image-product"/>}
            {product?.manufacturer == 'Texas Instruments' && <img src={texasInstrumentsLogo} class="image-product"/>}
            {product?.manufacturer == 'Siemens' && <img src={seimensLogo} class="image-product"/>}
            {product?.manufacturer == 'Samsung' && <img src={SamsungLogo} class="image-product"/>}
        </td>

    </tr>
  )
}

export default ProductTableRow