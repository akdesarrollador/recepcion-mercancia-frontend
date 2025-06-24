import ScanOrder from "../components/steps-content/scanOrder";
import CheckMerchandise from "../components/steps-content/checkMerchandise";
import ConfirmReception from "../components/steps-content/confirmReception";
import ScanMultipleOrder from "../components/steps-content/scanMultipleOrders";
import useGlobalStore from "../store/useGlobalStore";
import React from "react";

interface ReceptionStepsProps {
  label: string;
  content: React.ReactNode;
}

function useReceptionSteps(): ReceptionStepsProps[] {
  const jointReception = useGlobalStore((state) => state.jointReception);

  return [
    {
      label: !jointReception
        ? "Escanear orden de compra"
        : "Escanear órdenes de compra",
      content: !jointReception
        ? React.createElement(ScanOrder)
        : React.createElement(ScanMultipleOrder),
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
}

export default useReceptionSteps;
