/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createReception } from "../api/reception";
import { createReceivedProduct } from "../api/receivedProduct";
import { createBillImage } from "../api/billsImage";
import { useAuthStore } from "../store/useAuthStore";

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

  const finishReception = async (
    onSuccess?: () => void,
    onError?: () => void
  ) => {
    setLoading(true);
    try {
      if (!billImage) throw new Error("No hay imágenes");

      const result = await createReception({
        numeroOrden: purchaseOrderData?.ordenCompra?.numeroOrden ?? "",
        proveedor: purchaseOrderData?.ordenCompra?.proveedor?.nombre ?? "",
        sucursal: tienda || "",
      });

      if (result.status === 201) {
        await Promise.all([
          ...productsReceived.map((product: any) =>
            createReceivedProduct(
              product.code,
              product.description,
              product.units_odc,
              product.units,
              product.unitsPerPackage || 0,
              result.data.recepcion
            )
          ),
          createBillImage(
            billImage,
            result.data.recepcion,
            tienda || "",
            purchaseOrderData?.ordenCompra?.numeroOrden ?? ""
          ),
        ]);

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
      openSnackbar("Error al finalizar la recepción", "error");
      console.error(error);
      onError?.();
    } finally {
      setLoading(false);
    }
  };

  return { loading, finishReception };
};
