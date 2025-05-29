import ScanOrder from "../components/steps-content/scanOrder";
import CheckMerchandise from "../components/steps-content/checkMerchandise";
import ConfirmReception from "../components/steps-content/confirmReception";
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
    content: React.createElement(ConfirmReception),
  },
];

export default ReceptionSteps;