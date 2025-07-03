/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createReception } from "../api/reception";
import { createBillImage } from "../api/billsImage";
import { useAuthStore } from "../store/useAuthStore";
import useGlobalStore from "../store/useGlobalStore";
import { ProductoRecibidoInterface } from "../utils/interfaces/productos.interfaces";

// hooks/useReceptionSubmission.ts
export const useReceptionSubmission = ({
  purchaseOrderData,
  billImage,
  resetStore,
  openSnackbar,
  navigate,
}: any) => {
  const [loading, setLoading] = useState(false);
  const { tienda } = useAuthStore();
  const { receptionTimer, ordenesCompraData, productosRecibidos } = useGlobalStore();
  const [state, setState] = useState("Iniciando...");

  const finishReception = async (
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    setLoading(true);
    try {
      if (!billImage) throw new Error("No hay imágenes");

      const productos_recibidos = productosRecibidos.map((product: ProductoRecibidoInterface) => ({
        codigo: product.codigo,
        descripcion: product.descripcion,
        unidades_odc: product.cantidad_asignada,
        unidades: product.unidades,
        unidades_por_bulto: product.unidades_por_bulto || 0,
      }));

      let ordenes: string[];
      let proveedor: string;

      if (ordenesCompraData) {
        ordenes = ordenesCompraData.ordenes_compra.map(
          (orden) => orden.numero_orden
        );
        proveedor = ordenesCompraData.ordenes_compra[0].proveedor.nombre;
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
        codigoProveedor: ordenesCompraData?.ordenes_compra[0]?.proveedor?.codigo ?? "",
        productos_recibidos,
        duracion: String(receptionTimer),
      });

      setState("Subiendo imagen...");
      if (result.status === 201) {
        await createBillImage(
          billImage,
          result.data.recepcion,
          tienda || "",
          ordenesCompraData?.ordenes_compra[0]?.numero_orden ?? ""
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
