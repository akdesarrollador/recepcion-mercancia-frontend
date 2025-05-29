import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import theme from "../../theme/theme";

interface FullScreenModalProps {
  open: boolean;
  onClose: () => void;
}

const FullScreenModal = ({ open, onClose }: FullScreenModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "90%",
          height: "55%",
          maxWidth: "90%",
          maxHeight: "55%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          p: 3,
          gap: 2,
        },
      }}
    >
      <TouchAppOutlinedIcon sx={{ width: "60px", height: "60px", color: "#afafaf" }} />
      {/* Aquí puedes agregar el contenido del modal de confirmación */}
      <Typography
        sx={{
          color: "#000000",
          fontWeight: "bold",
          fontSize: "12px",
          textAlign: "justify",
        }}
      >
        Toca dos veces cualquier parte de la aplicación para activar la
        pantalla completa en cualquier momento y disfrutar de una mejor
        experiencia de usuario.
      </Typography>

      <Button
        onClick={onClose}
        sx={{
          width: "100%",
          backgroundColor: theme.palette.primary.main,
          color: "#FFFFFF",
          borderRadius: "10px",
          fontSize: "10px",
          textTransform: "none",
          fontWeight: "bold",
        }}
      >
        Entendido
      </Button>
    </Dialog>
  );
};

export default FullScreenModal;
