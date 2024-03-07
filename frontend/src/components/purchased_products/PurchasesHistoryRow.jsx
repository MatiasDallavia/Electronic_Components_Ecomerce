import React from 'react'
import image from '../../images/components/A_220.jpeg'
import {getCapacitorImage,getInductorPackageImage, getResistorImage} from "../../utils/getComponetImages"
import {diodeImages} from '../../images/components/component_images_objects/diodePackages';
import {transistorImages} from '../../images/components/component_images_objects/transistorImages';


function PurchasesHistoryRow({item}) {
  let productImage;
  let productName;
  
  const componentNode = item.componentNode
  const componentType = componentNode.componentType
  const productPackage = componentNode.package
  const price = componentNode.price


  switch(componentType){

    case "BJT":
    case "MOSFET":
    case "IGBT":
    productName = componentNode.model
    productImage = transistorImages[productPackage]
    break;
    case "diode":
    productImage = diodeImages[productPackage]
    productName = componentNode.model
    break
    case "capacitor":
    productImage = getCapacitorImage(componentNode)
    productName = "Capacitor " + componentNode.capacitance
    break;
    case "resistor":
    productName = "Resistor " + componentNode.resistance
    productImage = getResistorImage(componentNode)
    break;        
    case "inductor":
    productName = "Inductor " + componentNode.inductance
    productImage = getInductorPackageImage(componentNode)
    break;            
  }



  return (
    <tr className='column-values'>
        <td className="product-image"><img src={productImage}/></td>
        <td className="product-name">{productName  }</td>
        <td className="product-mounting-technology">{item.purchaseDate}</td>
        <td className="product-price">{price}</td>
        <td className="product-quantity">{item.quantity}</td>
        <td className="product-total">{item.quantity*price}</td> 
    </tr>
  )
}

export default PurchasesHistoryRow