import Box from "@mui/material/Box";
import { Alert, Button, MobileStepper, Paper, Typography } from "@mui/material";
import { useState } from "react";
import theme from "../theme/theme";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  sxContentBox,
  sxFatherBox,
  sxMobileStepper,
  sxTitlePaper,
} from "../styles/sxReceptionPage";
import ReceptionSteps from "../config/receptionSteps";
import useGlobalStore from "../store/useGlobalStore";
import ReceptionConfirmationModal from "../components/modals/receptionConfirmationModal";
import Snackbar from "@mui/material/Snackbar";
import { SnackBarProps } from "../utils/interfaces/componentsProps";

const ReceptionPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sbProps, setSbProps] = useState<SnackBarProps>({
      severity: "error",
      message: "",
    });
  const navigate = useNavigate();
  const maxSteps = 3;
  const { purchaseOrderData, productsReceived, resetStore, billImage } =
    useGlobalStore();

  const handleNext = () => {
    if (activeStep === 2) {
      setOpenModal(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      // setPurchaseOrderData(null);
      navigate("/");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleFinishReception = () => {
    //enviar products received desde global store a la api
    //enviar la factura desde global store a la api
    if (
      billImage === null ) {
      setSbProps({
      severity: "error",
      message: "Debe adjuntar una imagen de la factura.",
      });
      setOpenSnackbar(true);
      return;
    }

    //resetear global store
    resetStore();
    setOpenModal(false);
    navigate("/");
  };

  return (
    <Box sx={sxFatherBox}>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <Paper
          square
          elevation={0}
          sx={{ ...sxTitlePaper, bgcolor: theme.palette.primary.main }}
        >
          <Typography
            sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
          >
            {ReceptionSteps[activeStep].label}
          </Typography>
        </Paper>
        <Box
          sx={{
            ...sxContentBox,
            borderRightColor: theme.palette.primary.main,
            borderLeftColor: theme.palette.primary.main,
          }}
        >
          {ReceptionSteps[activeStep].content}
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            ...sxMobileStepper,
            bgcolor: theme.palette.primary.main,
          }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={
                purchaseOrderData === null ||
                (activeStep === 1 && productsReceived.length === 0) ||
                (activeStep === 2 && billImage === null)
              }
              sx={{
                color: "white",
                textTransform: "none",
              }}
            >
              {activeStep === 2 ? "Finalizar" : "Siguiente"}
              {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 1}
              sx={{
                color: "white",
                textTransform: "none",
              }}
            >
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              Volver
            </Button>
          }
        />
      </Box>

      <ReceptionConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAccept={handleFinishReception}
      />

      {/* Snackbar de feedback */}
            <Snackbar
              open={openSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              sx={{ marginBottom: "60%", width: "85%", marginLeft: "5%" }}
              autoHideDuration={1500}
              onClose={() => setOpenSnackbar(false)}
            >
              <Alert
                severity={sbProps.severity}
                variant="filled"
                sx={{ width: "100%", borderRadius: "20px" }}
                onClose={() => setOpenSnackbar(false)}
              >
                {sbProps.message}
              </Alert>
            </Snackbar>
    </Box>
  );
};

export default ReceptionPage;
