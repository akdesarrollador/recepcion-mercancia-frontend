import { Button, Dialog, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";
import ItemsEnteredTable from "../tables/itemsEnteredTable";
import useGlobalStore from "../../store/useGlobalStore";

interface ReceptionProgressModalProps {
  open: boolean;
  onClose: () => void;
}

const ReceptionProgressModal = ({
  open,
  onClose,
}: ReceptionProgressModalProps) => {
    const { purchaseOrderData, productsReceived } = useGlobalStore();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "90%",
          height: "80vh",
          maxWidth: "90%",
          maxHeight: "80vh",
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
      {/* Título fijo en la parte superior */}
      <Box sx={{ mb: 2 }}>
        <Typography
          noWrap
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          Ítems ingresados: {productsReceived.length || 0} / {purchaseOrderData?.items.length || 0}
        </Typography>
      </Box>

      {/* Tabla en el medio, scroll si es necesario */}
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <ItemsEnteredTable />
      </Box>

      {/* Botón fijo en la parte inferior */}
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            bgcolor: "#B4B4B4",
            color: "#FFFFFF",
            width: "100%",
            textTransform: "none",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Regresar
        </Button>
      </Box>
    </Dialog>
  );
};

export default ReceptionProgressModal;
