import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { PackageOpen } from "lucide-react";
import theme from "../../theme/theme";
import {
  sxFatherBox,
  sxIconAndNumberBox,
  sxFormBox,
  sxReceiveProductButton,
  sxFormSecondRowBox,
  sxFormFirstRowBox,
  sxSeeProgressButton,
  sxOrderNumberAndButtonBox,
} from "../../styles/sxCheckMerchandise";
import { useCheckMerchandise } from "../../hooks/useCheckMerchandise";
import SimpleTextInput from "../inputs/simpleTextInput";
import InputWithSelector from "../inputs/inputWithSelector";
import ReceptionProgressModal from "../modals/receptionProgressModal";
import SpinnerLoader from "../loader/spinnerLoader";
import useGlobalStore from "../../store/useGlobalStore";
import Typography from "@mui/material/Typography";
import formatCounter from "../../utils/formatCounter";
import AddNewOrderModal from "../modals/addNewOrderModal";

const CheckMerchandise: React.FC = () => {
  const {
    ordenesCompraData,
    setReceptionTimer,
    receptionTimer
  } = useGlobalStore();
  const [openModal, setOpenModal] = useState(false);
  const [openNewOrderModal, setOpenNewOrderModal] = useState(false);
  const {
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
    isReceiveProductDisabled
  } = useCheckMerchandise();
  // Inicializa el estado con el valor global actual
  const [time, setTime] = useState(receptionTimer || 0);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    const blockBack = () =>
      window.history.pushState(null, "", window.location.href);
    const confirmExit = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("popstate", blockBack);
    window.addEventListener("beforeunload", confirmExit);
    return () => {
      window.removeEventListener("popstate", blockBack);
      window.removeEventListener("beforeunload", confirmExit);
    };
  }, []);

  // Modifica el useEffect para usar el valor actualizado
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        setReceptionTimer(newTime);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [setReceptionTimer]); // Elimina 'time' de las dependencias

  return (
    <Box sx={sxFatherBox}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <SpinnerLoader />
      </Backdrop>

      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: theme.palette.primary.main,
          }}
        >
          {formatCounter(time)}
        </Typography>
      </Box>

      <Box sx={sxIconAndNumberBox}>
        <PackageOpen
          color={theme.palette.primary.main}
          width={60}
          height={60}
        />
        <Box sx={sxOrderNumberAndButtonBox}>
          <SimpleTextInput
            onTripleClick={() => setOpenNewOrderModal(true)}
            disableTextSelect={true}
            readonly
            inputWidth="50%"
            inputHeight="35px"
            fontSize="12px"
            value={
              ordenesCompraData?.ordenes_compra?.length
                && ordenesCompraData?.ordenes_compra?.length === 1 ?
                ordenesCompraData?.ordenes_compra[0]?.numero_orden :
                `${ordenesCompraData?.ordenes_compra?.[0]?.numero_orden}, (${(ordenesCompraData?.ordenes_compra?.length ?? 0) - 1} más)`
            }
            setValue={() => { }}
            textAlign="center"
          />
          <Button
            onClick={() => setOpenModal(true)}
            sx={{
              ...sxSeeProgressButton,
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
            }}
          >
            Ver Progreso
          </Button>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={sxFormBox}>
        <Box sx={sxFormFirstRowBox}>
          <SimpleTextInput
            disabled={isReceiveProductDisabled}
            autoComplete="off"
            autoFocus
            inputHeight="45px"
            inputWidth="100%"
            borderColor="#DADADA"
            label="Código del producto a recibir"
            placeholder="ej. 0000567483904246"
            value={receivedProduct}
            setValue={setReceivedProduct}
            fontSize="12px"
          />
          <Typography
            noWrap
            sx={{ fontSize: "8px", textAlign: "left", ml: "5px" }}
          >
            {ordenesCompraData?.productos?.find(
              (item) => item.codigo === receivedProduct.trim()
            )?.descripcion}
          </Typography>
        </Box>

        <Box sx={sxFormSecondRowBox}>
          <InputWithSelector
            disabled={isReceiveProductDisabled}
            textValue={productAmount}
            onTextChange={setProductAmount}
            selectedUnit={currentUnit}
            onUnitChange={setCurrentUnit}
            placeholder="Cantidad"
          />
          <SimpleTextInput
            disabled={currentUnit.label !== "B" || receivedProduct === ""}
            label="Unidades x Bulto"
            inputWidth="50%"
            inputHeight="45px"
            fontSize="12px"
            value={unitsPerPackage === 0 ? "" : unitsPerPackage.toString()}
            setValue={(value: string) => setUnitsPerPackage(Number(value))}
            borderColor="#DADADA"
            variant="int"
          />
        </Box>

        <Button
          onClick={handleSubmit}
          sx={{
            ...sxReceiveProductButton,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: `${theme.palette.primary.main}1A`,
            pointerEvents: isButtonDisabled ? "none" : "auto",
            opacity: isButtonDisabled ? 0.3 : 1,
          }}
        >
          Recibir ({totalToReceive} unidades)
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={!!snackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ width: "85%", marginLeft: "5%", mb: "6%" }}
        autoHideDuration={2000}
        onClose={() => setSnackbar(null)}
      >
        <Alert
          severity={snackbar?.severity || "info"}
          variant="filled"
          sx={{ width: "100%", borderRadius: "20px" }}
          onClose={() => setSnackbar(null)}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>

      <ReceptionProgressModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <AddNewOrderModal
        open={openNewOrderModal}
        onClose={() => setOpenNewOrderModal(false)}
        label="Añadir nueva orden a la recepción"
      />
    </Box>
  );
};

export default CheckMerchandise;
