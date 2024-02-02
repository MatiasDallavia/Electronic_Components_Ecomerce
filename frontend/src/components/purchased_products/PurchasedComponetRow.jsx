import React from 'react'
import image from '../../images/components/A_220.jpeg'
import {getCapacitorImage,getInductorPackageImage, getResistorImage} from "../../utils/getComponetImages"
import {diodeImages} from '../../images/components/component_images_objects/diodePackages';
import {transistorImages} from '../../images/components/component_images_objects/transistorImages';


function PurchasedComponetRow({item}) {
  let productImage;
  let productName;
  
  const componentNode = item.componentNode
  const componentType = componentNode.componentType
  const productPackage = componentNode.package
  const price = componentNode.price
  const mountingTechnology = componentNode.mountingTechnology


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
        <td class="product-image"><img src={productImage}/></td>
        <td class="product-name">{productName  }</td>
        <td class="product-mounting-technology">{mountingTechnology}</td>
        <td class="product-price">{price}</td>
        <td class="product-quantity">{item.quantity}</td>
        <td class="product-total">{item.quantity*price}</td> 
    </tr>
  )
}

export default PurchasedComponetRow