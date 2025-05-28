import Box from "@mui/material/Box";
import { Button, MobileStepper, Paper, Typography } from "@mui/material";
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

const ReceptionPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const maxSteps = 3;
  const { purchaseOrderData, productsReceived } = useGlobalStore();

  const handleNext = () => {
    if (activeStep === 2) {
      navigate("/");
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
              (activeStep === 1 && productsReceived.length === 0)
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
    </Box>
  );
};

export default ReceptionPage;
