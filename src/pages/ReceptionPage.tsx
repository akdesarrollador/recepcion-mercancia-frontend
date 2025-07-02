/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import { Backdrop } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sxFatherBox } from "../styles/sxReceptionPage";
import useGlobalStore from "../store/useGlobalStore";
import ConfirmationModal from "../components/modals/confirmationModal";
import SpinnerLoader from "../components/loader/spinnerLoader";
import FullScreenModal from "../components/modals/fullScreenModal";
import { useReceptionSubmission } from "../hooks/useReceptionSubmission";
import ReceptionStepper from "../components/layout/ReceptionStepper";
import { useAuthStore } from "../store/useAuthStore";
import WarningModal from "../components/modals/warningModal";

const ReceptionPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const maxSteps = 3;
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) navigate("/iniciar-sesion");
  }, [isLoggedIn]);

  const {
    purchaseOrderData,
    productsReceived,
    billImage,
    resetStore,
    openSnackbar,
    jointReception,
    multiplePurchaseOrderData,
    setReceptionTimer,
    cleanProductsReceived,
  } = useGlobalStore();

  const { loading, finishReception, state } = useReceptionSubmission({
    purchaseOrderData,
    productsReceived,
    billImage,
    resetStore,
    openSnackbar,
    navigate,
  });

  const handleNext = () => {
    if (activeStep === maxSteps - 1) setOpenModal(true);
    else setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep === 0) {
      setReceptionTimer(0);
      navigate("/");
    } else if (activeStep === 1) {
      setOpenWarningModal(true);
    } else setActiveStep((prev) => prev - 1);
  };

  const handleAcceptWarning = () => {
    setReceptionTimer(0);
    setActiveStep((prev) => prev - 1);
    cleanProductsReceived();
    setOpenWarningModal(false)
  }

  const isNextDisabled =
    (!jointReception
      ? purchaseOrderData === null
      : multiplePurchaseOrderData === null) ||
    (activeStep === 1 && productsReceived.length === 0) ||
    (!jointReception
      ? purchaseOrderData?.productos?.length === 0
      : multiplePurchaseOrderData?.productos?.length === 0);

  return (
    <Box sx={sxFatherBox}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <SpinnerLoader />
      </Backdrop>

      <FullScreenModal open={false} onClose={() => { }} />

      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <ReceptionStepper
          activeStep={activeStep}
          maxSteps={maxSteps}
          onNext={handleNext}
          onBack={handleBack}
          isNextDisabled={isNextDisabled}
        />
      </Box>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAccept={() => finishReception(() => setOpenModal(false))}
        label="¿Está seguro de finalizar la recepción?"
        textCancelButton="Cancelar"
        textAcceptButton="Finalizar"
        loading={loading}
        loaderText={state}
      />

      <WarningModal
        open={openWarningModal}
        onClose={() => setOpenWarningModal(false)}
        onAccept={handleAcceptWarning}
        colorAcceptButton="#FFBC11"
        textAcceptButton="Aceptar"
        colorCancelButton="#B4B4B4"
        label="Al retroceder en este paso se perderá cualquier progreso que lleves con la recepción y deberás volver a escanear los productos."
      />
    </Box>
  );
};

export default ReceptionPage;
