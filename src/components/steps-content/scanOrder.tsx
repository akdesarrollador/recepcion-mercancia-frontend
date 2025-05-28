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
import { getPurchaseOrderData } from "../../utils/purchaseOrderData";
import OrderInfoBox from "../box/orderInfoBox";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade"; // Importa Fade

const ScanOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false); // Nuevo estado
  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const { purchaseOrderData, setPurchaseOrderData } = useGlobalStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      setLoading(true);
      setTimeout(() => {
        const orderData = getPurchaseOrderData(orderNumber);

        if (orderData) {
          setPurchaseOrderData(orderData);
          setShowNotFound(false); // Oculta el mensaje si encuentra la orden
        } else {
          setPurchaseOrderData(null);
          setShowNotFound(true); // Muestra el mensaje si no encuentra la orden
          setTimeout(() => setShowNotFound(false), 2000); // Oculta el mensaje después de 2 segundos
        }

        setLoading(false);
        setOrderNumber("");
      }, 2000);
    }
  };

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
            inputHeight="45px"
            inputWidth="100%"
            borderColor="DADADA"
            label="Orden de compra"
            placeholder="ej. 0000567483904246"
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
        {purchaseOrderData ? (
          <>
            <OrderInfoBox
              label="Orden de compra"
              value={purchaseOrderData?.orderNumber}
            />
            <OrderInfoBox
              label="Proveedor"
              value={purchaseOrderData?.supplierName}
            />
          </>
        ) : (
          <Fade in={showNotFound}>
            <Typography
              sx={{
                color: "#FF0000",
                fontWeight: "bold",
                fontSize: "14px",
                minHeight: "18px", // Para evitar salto de layout
                transition: "opacity 1s",
              }}
            >
              Orden de compra no encontrada.
            </Typography>
          </Fade>
        )}
      </Box>
    </Box>
  );
};

export default ScanOrder;