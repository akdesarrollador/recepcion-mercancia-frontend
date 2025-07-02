import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme";
import Backdrop from "@mui/material/Backdrop";
import SpinnerLoader from "../loader/spinnerLoader";
import { TriangleAlert } from 'lucide-react';

interface WarningModalProps {
  open: boolean;
  onClose: () => void;
  onAccept?: () => void;
  loading?: boolean;
  label: string;
  colorAcceptButton?: string;
  textAcceptButton?: string;
  colorCancelButton?: string;
  textCancelButton?: string;
  loaderText?: string;
}

const WarningModal = ({
  open,
  onClose,
  onAccept,
  loading,
  label,
  colorAcceptButton,
  textAcceptButton,
  colorCancelButton,
  textCancelButton,
  loaderText,
}: WarningModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "60%",
          height: "20%",
          maxWidth: "80%",
          maxHeight: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "#FFFFFF",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          p: 3,
        },
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading || false}
      >
        <SpinnerLoader text={loaderText} />
      </Backdrop>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TriangleAlert width={42} height={42} color="#FFBC11" />
        {/* Aquí puedes agregar el contenido del modal de confirmación */}
        <Typography
          sx={{
            color: "#898989",
            fontWeight: "bold",
            fontSize: "10px",
            textAlign: "justify",
            lineHeight: "14px",
            width: "90%",
            marginTop: "12px",
          }}
        >
          {label}
        </Typography>
      </Box>
      {/* Agrega más contenido según sea necesario */}
      <Box sx={{ gap: 1.5, display: "flex", flexDirection: "row" }}>
        <Button
          onClick={onClose}
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
          onClick={onAccept}
          sx={{
            width: "50%",
            backgroundColor: colorAcceptButton || theme.palette.primary.main,
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {textAcceptButton || "Aceptar"}
        </Button>
      </Box>
    </Dialog>
  );
};

export default WarningModal;
