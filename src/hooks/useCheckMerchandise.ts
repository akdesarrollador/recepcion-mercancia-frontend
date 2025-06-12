// hooks/useCheckMerchandise.ts
import { useState, useMemo, useCallback } from "react";
import { Option, SnackBarProps } from "../utils/interfaces/componentsProps";
import { Producto } from "../utils/interfaces/purchaseOrderInterface";
import useGlobalStore from "../store/useGlobalStore";

const DEFAULT_UNIT: Option = { value: "Unidades", label: "U" };

export const useCheckMerchandise = () => {
  const { purchaseOrderData, addProductReceived, productsReceived } =
    useGlobalStore();

  const [receivedProduct, setReceivedProduct] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [unitsPerPackage, setUnitsPerPackage] = useState(0);
  const [currentUnit, setCurrentUnit] = useState<Option>(DEFAULT_UNIT);
  const [snackbar, setSnackbar] = useState<SnackBarProps | null>(null);
  const [loading, setLoading] = useState(false);

  const totalToReceive = useMemo(() => {
    if (!productAmount) return 0;
    const base = Number(productAmount);
    return currentUnit.label === "B" && unitsPerPackage > 0
      ? base * unitsPerPackage
      : base;
  }, [productAmount, unitsPerPackage, currentUnit.label]);

  const isButtonDisabled = useMemo(
    () =>
      !receivedProduct ||
      !productAmount ||
      (currentUnit.label === "B" && !unitsPerPackage),
    [receivedProduct, productAmount, currentUnit.label, unitsPerPackage]
  );

  const cleanFields = useCallback(() => {
    setReceivedProduct("");
    setProductAmount("");
    setUnitsPerPackage(0);
    setCurrentUnit(DEFAULT_UNIT);
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>(
        'input[placeholder*="0000567483904246"]'
      );
      if (input) input.focus();
    }, 100);
  }, []);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      setLoading(true);

      const matched = purchaseOrderData?.productos.find(
        (item: Producto) => item.codigo === receivedProduct.trim()
      );

      if (!matched) {
        setSnackbar({
          severity: "error",
          message: "El producto no está en la orden.",
        });
        cleanFields();
        setLoading(false);
        return;
      }

      if (
        matched.recibido + Number(productAmount) >
        matched.solicitado_tienda
      ) {
        setSnackbar({
          severity: "error",
          message: "Supera la cantidad solicitada",
        });
        cleanFields();
        setLoading(false);
        return;
      }

      const alreadyReceived = productsReceived.some(
        (item) => item.code === receivedProduct.trim()
      );

      if (alreadyReceived) {
        setSnackbar({
          severity: "error",
          message: `El producto ${receivedProduct} ya ha sido recibido.`,
        });
        cleanFields();
        setLoading(false);
        return;
      }

      addProductReceived({
        code: receivedProduct,
        description: matched.descripcion,
        units: Number(productAmount),
        units_odc: matched.solicitado_tienda,
        unitsPerPackage,
      });

      setSnackbar({
        severity: "success",
        message: `Producto recibido: ${matched.descripcion}.`,
      });
      cleanFields();
      setLoading(false);
    },
    [
      purchaseOrderData?.productos,
      productAmount,
      productsReceived,
      addProductReceived,
      receivedProduct,
      unitsPerPackage,
      cleanFields,
    ]
  );

  return {
    receivedProduct,
    setReceivedProduct,
    productAmount,
    setProductAmount,
    unitsPerPackage,
    setUnitsPerPackage,
    currentUnit,
    setCurrentUnit,
    totalToReceive,
    isButtonDisabled,
    handleSubmit,
    snackbar,
    setSnackbar,
    loading,
  };
};
