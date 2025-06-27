/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createReception } from "../api/reception";
import { createBillImage } from "../api/billsImage";
import { useAuthStore } from "../store/useAuthStore";
import useGlobalStore from "../store/useGlobalStore";

// hooks/useReceptionSubmission.ts
export const useReceptionSubmission = ({
  purchaseOrderData,
  productsReceived,
  billImage,
  resetStore,
  openSnackbar,
  navigate,
}: any) => {
  const [loading, setLoading] = useState(false);
  const { tienda } = useAuthStore();
  const { jointReception, multiplePurchaseOrderData, receptionTimer } =
    useGlobalStore();
  const [state, setState] = useState("Iniciando...");

  const finishReception = async (
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    setLoading(true);
    try {
      if (!billImage) throw new Error("No hay imágenes");
      const productos_recibidos = productsReceived.map((product: any) => ({
        codigo: product.code,
        descripcion: product.description,
        unidades_odc: product.units_odc,
        unidades: product.units,
        unidades_por_bulto: product.unitsPerPackage || 0,
      }));

      let ordenes: string[];
      let proveedor: string;

      if (jointReception && multiplePurchaseOrderData) {
        ordenes = multiplePurchaseOrderData.ordenesCompra.map(
          (orden) => orden.numeroOrden
        );
        proveedor = multiplePurchaseOrderData.ordenesCompra[0].proveedor.nombre;
      } else {
        if (!purchaseOrderData?.ordenCompra?.numeroOrden) {
          throw new Error("Número de orden de compra no disponible");
        }
        ordenes = [purchaseOrderData.ordenCompra.numeroOrden];
        proveedor = purchaseOrderData.ordenCompra.proveedor?.nombre ?? "";
      }

      setState("Creando recepción...");

      const result = await createReception({
        ordenes,
        proveedor,
        codigoProveedor: !jointReception
          ? purchaseOrderData?.ordenCompra?.proveedor?.codigo
          : multiplePurchaseOrderData?.ordenesCompra[0]?.proveedor?.codigo,
        productos_recibidos,
        duracion: String(receptionTimer),
      });

      setState("Subiendo imagen...");
      if (result.status === 201) {
        await createBillImage(
          billImage,
          result.data.recepcion,
          tienda || "",
          !jointReception
            ? purchaseOrderData?.ordenCompra?.numeroOrden
            : multiplePurchaseOrderData?.ordenesCompra[0]?.numeroOrden
        );

        resetStore();
        navigate("/");
        openSnackbar(
          `Recepcion finalizada exitosamente. Su número de control es: ${result.data.confirmacion}`,
          "success",
          true
        );
        onSuccess?.();
      } else {
        throw new Error("Falló la creación");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al finalizar la recepción";

      openSnackbar(errorMessage, "error");
      console.error("Error en finishReception:", error);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return { loading, finishReception, state };
};
