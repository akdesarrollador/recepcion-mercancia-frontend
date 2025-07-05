import { Button, Dialog, Typography, Box } from "@mui/material";
import AllOrdersTable from "../tables/allOrdersTable";

interface AllOrdersModalProps {
    open: boolean;
    onClose: () => void;
    allowDelete?: boolean;
}

const AllOrdersModal = ({
    open,
    onClose,
    allowDelete = false,
}: AllOrdersModalProps) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: "60%",
                    height: "30%",
                    maxWidth: "80%",
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
            {/* Título fijo en la parte superior */}
            <Box sx={{ mb: 2 }}>
                <Typography
                    noWrap
                    sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "14px",
                        textAlign: "center",
                    }}
                >
                    Ordenes en la recepción
                </Typography>
            </Box>

            {/* Tabla en el medio, scroll si es necesario */}
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
                <AllOrdersTable allowDelete={allowDelete} />
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
                    Cerrar
                </Button>
            </Box>
        </Dialog>
    );
};

export default AllOrdersModal;
