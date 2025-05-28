import ScanOrder from "../components/steps-content/scanOrder";
import CheckMerchandise from "../components/steps-content/checkMerchandise";
import React from "react";

interface ReceptionStepsProps {
    label: string;
    content: React.ReactNode;
}

const ReceptionSteps: ReceptionStepsProps[] = [
  {
    label: "Escanear orden de compra",
    content: React.createElement(ScanOrder),
  },
  {
    label: "Verificar mercancía",
    content: React.createElement(CheckMerchandise),
  },
  {
    label: "Confirmar recepción",
    content: (`Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`),
  },
];

export default ReceptionSteps;