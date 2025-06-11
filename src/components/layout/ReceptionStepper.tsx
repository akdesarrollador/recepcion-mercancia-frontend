// components/ReceptionStepper.tsx
import ReceptionSteps from "../../config/receptionSteps";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { sxContentBox, sxMobileStepper, sxTitlePaper } from "../../styles/sxReceptionPage";
import theme from "../../theme/theme";

interface ReceptionStepperProps {
  activeStep: number;
  maxSteps: number;
  onNext: () => void;
  onBack: () => void;
  isNextDisabled: boolean;
}

const ReceptionStepper = ({ activeStep, maxSteps, onNext, onBack, isNextDisabled }: ReceptionStepperProps) => {
  return (
    <>
      <Paper elevation={0} sx={{ ...sxTitlePaper, bgcolor: theme.palette.primary.main }}>
        <Typography sx={{ color: "white", fontWeight: "bold", textAlign: "center", userSelect: "none" }}>
          {ReceptionSteps[activeStep].label}
        </Typography>
      </Paper>
      <Box sx={{ ...sxContentBox, borderRightColor: theme.palette.primary.main, borderLeftColor: theme.palette.primary.main }}>
        {ReceptionSteps[activeStep].content}
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ ...sxMobileStepper, bgcolor: theme.palette.primary.main }}
        nextButton={
          <Button size="small" onClick={onNext} disabled={isNextDisabled} sx={{ color: "white", textTransform: "none" }}>
            {activeStep === maxSteps - 1 ? "Finalizar" : "Siguiente"}
            {theme.direction === "rtl" ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={onBack} sx={{ color: "white", textTransform: "none" }}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            Volver
          </Button>
        }
      />
    </>
  );
};

export default ReceptionStepper;
