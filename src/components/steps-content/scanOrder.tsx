import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { FileScan, FileDigit, Search } from "lucide-react";
import SimpleTextInput from "../inputs/simpleTextInput";
import theme from "../../theme/theme";
import IconButton from "@mui/material/IconButton";
import {
  sxFatherBox,
  sxFormBox,
  sxIconButton,
  sxOrderInfoBoxes,
  sxSecondaryBox,
} from "../../styles/sxScanOrder";
import Backdrop from "@mui/material/Backdrop";
import SpinnerLoader from "../loader/spinnerLoader";
import useGlobalStore from "../../store/useGlobalStore";
import OrderInfoBox from "../box/orderInfoBox";
import useInputFocus from "../../hooks/useInputFocus";
import { getPurchaseOrder } from "../../api/purchaseOrder";
import { useAuthStore } from "../../store/useAuthStore";

const ScanOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const { purchaseOrderData, setPurchaseOrderData, openSnackbar } =
    useGlobalStore();
  const { tienda } = useAuthStore(); // Obtiene la tienda actual del store
  const textFieldRef = useInputFocus(); // Hook para manejar el foco del input

  const handleSubmit = React.useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedOrder = orderNumber.trim();
      if (!trimmedOrder) return;

      setLoading(true);
      try {
        const response = await getPurchaseOrder(trimmedOrder);
        if (response?.status === 200) {
          setPurchaseOrderData(response.data);
          if (response?.data?.productos?.length === 0) {
            openSnackbar(
              "La orden no tiene productos en esta sede.",
              "warning"
            );
          }
        } else {
          openSnackbar("No se encontró la orden de compra.", "error");
          setPurchaseOrderData(null);
        }
      } catch (error) {
        openSnackbar(
          "Error al buscar la orden de compra. Por favor, inténtalo de nuevo.",
          "error"
        );
        setPurchaseOrderData(null);
        console.error("Error al buscar la orden de compra:", error);
      } finally {
        setLoading(false);
        setOrderNumber("");
      }
    },
    [orderNumber, setPurchaseOrderData, openSnackbar]
  );

  return (
    <Box sx={sxFatherBox}>
      {/* Carga el loader */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <SpinnerLoader />
      </Backdrop>

      {/* Icono de escaneo */}
      <FileScan color={theme.palette.primary.main} width={60} height={60} />

      <Box sx={sxSecondaryBox}>
        <Box component="form" onSubmit={handleSubmit} sx={sxFormBox}>
          <SimpleTextInput
            autoComplete="off"
            autoFocus={true}
            inputRef={textFieldRef} // Asigna el ref al input
            inputHeight="45px"
            inputWidth="100%"
            borderColor="DADADA"
            label="Orden de compra"
            placeholder="ej. 0000012345"
            value={orderNumber}
            setValue={setOrderNumber}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter" && orderNumber.trim()) {
                iconButtonRef.current?.click();
              }
            }}
            fontSize="12px"
            icon={<FileDigit color="#00000084" width={16} height={16} />}
          />

          <IconButton
            ref={iconButtonRef}
            type="submit"
            sx={{
              ...sxIconButton,
              opacity: orderNumber ? 1 : 0.3,
            }}
            disabled={!orderNumber || loading}
          >
            <Search color={theme.palette.primary.main} width={20} height={20} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={sxOrderInfoBoxes}>
        {purchaseOrderData && (
          <>
            <OrderInfoBox
              label="Recibiendo en"
              value={tienda || ""}
              // value={purchaseOrderData?.ordenCompra?.recibirEn}
            />
            <OrderInfoBox
              label="Orden de compra"
              value={purchaseOrderData?.ordenCompra.numeroOrden}
            />
            <OrderInfoBox
              label="Proveedor"
              value={purchaseOrderData?.ordenCompra?.proveedor?.nombre}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default ScanOrder;
