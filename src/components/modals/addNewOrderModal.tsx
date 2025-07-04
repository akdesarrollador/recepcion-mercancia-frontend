import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme";
import Backdrop from "@mui/material/Backdrop";
import SpinnerLoader from "../loader/spinnerLoader";
import { useState, useRef, useCallback } from "react";
import SimpleTextInput from "../inputs/simpleTextInput";
import {
  sxFormBox,
  sxIconButton,
  sxOrderInfoBoxes,
} from "../../styles/sxScanOrder";
import useInputFocus from "../../hooks/useInputFocus";
import { FileDigit, Search } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import { getPurchaseOrder } from "../../api/purchaseOrder";
import useGlobalStore from "../../store/useGlobalStore";
import OrderInfoBox from "../box/orderInfoBox";
import { useAuthStore } from "../../store/useAuthStore";
import { AddNewOrderModalProps } from "../../utils/interfaces/component.props";
import { OrdenCompraDetectadaInterface } from "../../utils/interfaces/ordenes-compra.interfaces";

const AddNewOrderModal = ({
  open,
  onClose,
  loading,
  label,
  colorAcceptButton,
  textAcceptButton,
  colorCancelButton,
  textCancelButton,
  loaderText,
}: AddNewOrderModalProps) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [purchaseOrderDetected, setPurchaseOrderDetected] =
    useState<OrdenCompraDetectadaInterface | null>(null);

  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const textFieldRef = useInputFocus();
  const {
    openSnackbar,
    ordenesCompraData,
    addOrdenCompra
  } = useGlobalStore();
  const { tienda } = useAuthStore();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedOrder = orderNumber.trim();
      if (!trimmedOrder) return;

      setIsLoading(true);
      try {
        const response = await getPurchaseOrder(trimmedOrder);

        if (response?.status === 404) {
          openSnackbar("Orden de compra no encontrada.", "error");
          return setPurchaseOrderDetected(null);
        }

        if (response?.status === 200) {
          if (response?.data?.productos?.length === 0) {
            openSnackbar(
              "La orden no tiene productos en esta sede.",
              "warning"
            );
            return setPurchaseOrderDetected(null);
          }

          if (
            response?.data?.ordenCompra?.numeroOrden ===
            ordenesCompraData?.ordenes_compra[0]?.numero_orden
          ) {
            openSnackbar(
              "La orden de compra ingresada corresponde con la orden en curso.",
              "error"
            );
            return setPurchaseOrderDetected(null);
          }

          if (
            response?.data?.ordenCompra?.proveedor?.codigo !==
            (ordenesCompraData?.ordenes_compra[0]?.proveedor?.codigo)
          ) {
            openSnackbar(
              "La orden de compra ingresada corresponde a un proveedor diferente.",
              "error"
            );
            return setPurchaseOrderDetected(null);
          }

          setPurchaseOrderDetected(response.data);
        } else {
          openSnackbar("No se encontró la orden de compra.", "error");
          setPurchaseOrderDetected(null);
        }
      } catch (error) {
        setPurchaseOrderDetected(null);
        console.error("Error al buscar la orden de compra:", error);
      } finally {
        setIsLoading(false);
        setOrderNumber("");
      }
    },
    [orderNumber, ordenesCompraData?.ordenes_compra, openSnackbar]
  );

  const handleClose = () => {
    setPurchaseOrderDetected(null);
    setOrderNumber("");
    setIsLoading(false);
    onClose();
  };

  const handleAddNewOrder = () => {
    if (!purchaseOrderDetected) {
      return openSnackbar(
        "Por favor, ingresa una orden de compra válida.",
        "warning"
      );
    }

    addOrdenCompra(purchaseOrderDetected);
    openSnackbar(
      `Orden de compra ${purchaseOrderDetected.ordenCompra.numeroOrden} añadida a la recepción.`,
      "success"
    );

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "90%",
          height: "30%",
          maxWidth: "90%",
          maxHeight: "30%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          p: 3,
        },
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading || false}
      >
        <SpinnerLoader text={loaderText} />
      </Backdrop>

      {/* Aquí puedes agregar el contenido del modal de confirmación */}
      <Typography
        noWrap
        sx={{
          color: "#000000",
          fontWeight: "bold",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            variant="int"
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
        {purchaseOrderDetected && (
          <>
            <OrderInfoBox label="Recibiendo en" value={tienda || ""} />
            <OrderInfoBox
              label="Orden de compra"
              value={purchaseOrderDetected?.ordenCompra.numeroOrden}
            />
            <OrderInfoBox
              label="Proveedor"
              value={purchaseOrderDetected?.ordenCompra?.proveedor?.nombre}
            />
          </>
        )}
      </Box>

      {/* Agrega más contenido según sea necesario */}
      <Box sx={{ mt: 2, gap: 1.5, display: "flex", flexDirection: "row" }}>
        <Button
          onClick={handleClose}
          sx={{
            width: "50%",
            backgroundColor: colorCancelButton || "#b4b4b4",
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {textCancelButton || "Cancelar"}
        </Button>
        <Button
          onClick={handleAddNewOrder}
          disabled={isLoading || purchaseOrderDetected === null}
          sx={{
            width: "50%",
            backgroundColor: colorAcceptButton || theme.palette.primary.main,
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "10px",
            textTransform: "none",
            fontWeight: "bold",
            ":disabled": { opacity: 0.6, cursor: "not-allowed" },
          }}
        >
          {textAcceptButton || "Añadir"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default AddNewOrderModal;
