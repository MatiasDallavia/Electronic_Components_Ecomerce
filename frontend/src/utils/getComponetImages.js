import { inductorImages } from "../images/components/component_images_objects/inductorImages";
import {resistorImages} from "../images/components/component_images_objects/resistorPackages"
import {capacitorPackages} from "../images/components/component_images_objects/capacitorImages"


const getInductorPackageImage = (inductor) => {
    switch (inductor.package) {
      case "DIL":
        return inductorImages.DIL;
      case "2220":
        return inductorImages.P2220;
      case "330":
        return inductorImages.P330;
      case "220":
        return inductorImages.P220;
      case "101":
        return inductorImages.P101;
      default:
        return null;
    }
  };


const getResistorImage = (resistor) => {
  console.log("first")
  console.log(resistor)
    const { mountingTechnology, power, package: resistorPackage } = resistor;

    if (mountingTechnology === "THT") {
      return power === "250mW" ? resistorImages.quarterWatt : power === "5W" ? resistorImages.Watt5 : null;
    } else {
      return resistorPackage === "0402" ? resistorImages.A_0402 : resistorPackage === "0603" ? resistorImages.A_0603 : null;
    }
  };


function getCapacitorImage(capacitor) {
    if (capacitor.package === "BULK" && capacitor.mountingTechnology === "THT") {
      const capacitance = capacitor.capacitance;
      if (capacitance === "1000pF") {
        return capacitorPackages.C1000;
      } else if (capacitance === "680uF") {
        return capacitorPackages.C680;
      } else {
        return capacitorPackages.C10;
      }
    } else if (capacitor.capacitorType === "Ceramic Capacitor") {
      if (capacitor.mountingTechnology === "THT") {
        if (capacitor.package === "104") {
          return capacitorPackages.C104;
        }
        if (capacitor.package === "103") {
          return capacitorPackages.C103;
        }
      } else {
        return capacitorPackages.P2220;
      }
    } else {
      return capacitorPackages.ELECTROLYTIC_SMD;
    }
  }


export { getInductorPackageImage, getResistorImage, getCapacitorImage }  