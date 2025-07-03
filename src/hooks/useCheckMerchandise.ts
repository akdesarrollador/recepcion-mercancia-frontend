// hooks/useCheckMerchandise.ts
import { useState, useMemo, useCallback } from "react";
import { Option, SnackBarProps } from "../utils/interfaces/component.props";
import useGlobalStore from "../store/useGlobalStore";
import Producto from "../utils/interfaces/productos.interfaces";

const DEFAULT_UNIT: Option = { value: "Unidades", label: "U" };

export const useCheckMerchandise = () => {
  const {
    ordenesCompraData,
    addProductoRecibido,
    productosRecibidos,
  } = useGlobalStore();

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

  const isReceiveProductDisabled = useMemo(() => {
    return productosRecibidos.length === ordenesCompraData?.productos.length;
  }, [productosRecibidos.length, ordenesCompraData?.productos.length]);

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

      let matched = null;
      matched = ordenesCompraData?.productos.find(
        (item: Producto) => item.codigo === receivedProduct.trim()
      );

      if (!matched) {
        //enviar el producto al backend para que se valide si existe pero con otro codigo

        // si el backend dice que si existe, seteamos matched a true
        // otro if para chequear si matcheo, en el caso negativo, mostramos el snackbar de error
        if (!matched) {
          setSnackbar({
            severity: "error",
            message: "El producto no está en la orden.",
          });
          cleanFields();
          setLoading(false);
          return;
        }
      }

      if (matched.ya_recibido + Number(productAmount) > matched.cantidad_asignada) {
        setSnackbar({
          severity: "error",
          message:
            "La cantidad que estás recibiendo supera la cantidad solicitada.",
        });
        cleanFields();
        setLoading(false);
        return;
      }

      const alreadyReceived = productosRecibidos.some(
        (item) => item.codigo === receivedProduct.trim()
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

      addProductoRecibido({
        codigo: receivedProduct,
        descripcion: matched.descripcion,
        unidades: Number(productAmount),
        cantidad_asignada: matched.cantidad_asignada,
        unidades_por_bulto: matched.unidades_por_bulto,
      });

      setSnackbar({
        severity: "success",
        message: `Producto recibido: ${matched.descripcion}.`,
      });
      cleanFields();
      setLoading(false);
    },
    [ordenesCompraData?.productos, productAmount, productosRecibidos, addProductoRecibido, receivedProduct, cleanFields]
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
    isReceiveProductDisabled,
  };
};
