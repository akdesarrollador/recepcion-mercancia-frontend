import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import theme from "../../theme/theme";

interface ReceptionProgressModalProps {
  open: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

const ReceptionConfirmationModal = ({
  open,
  onClose,
  onAccept,
}: ReceptionProgressModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "90%",
          height: "15%",
          maxWidth: "90%",
          maxHeight: "15%",
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
        ¿Finalizar la recepción?
      </Typography>
      {/* Agrega más contenido según sea necesario */}
      <Box sx={{ mt: 2, gap: 1.5, display: "flex", flexDirection: "row" }}>
        <Button
          onClick={onClose}
          sx={{
            width: "50%",
            backgroundColor: "#b4b4b4",
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Regresar
        </Button>
        <Button
          onClick={onAccept}
          sx={{
            width: "50%",
            backgroundColor: theme.palette.primary.main,
            color: "#FFFFFF",
            borderRadius: "10px",
            fontSize: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Aceptar
        </Button>
      </Box>
    </Dialog>
  );
};

export default ReceptionConfirmationModal;
