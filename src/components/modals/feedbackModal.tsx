import { Button, Dialog, Typography, Box } from "@mui/material";
import theme from "../../theme/theme";
import { Inbox } from 'lucide-react';


interface FeedbackModalProps {
    open: boolean;
    onClose: () => void;
}

const FeedbackModal = ({
    open,
    onClose,
}: FeedbackModalProps) => {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: "50%",
                    height: "25%",
                    maxWidth: "50%",
                    maxHeight: "25%",
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
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Inbox width={40} height={40} color="#959595" />
            </Box>

            {/* Título fijo en la parte superior */}
            <Box sx={{ mt: -1 }}>
                <Typography
                    // noWrap
                    sx={{
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textAlign: "center",
                    }}
                >
                    ¿Tienes una propuesta o encontraste un error?
                </Typography>
            </Box>

            <Box sx={{ mt: -1 }}>
                <Typography sx={{
                    color: "#000000",
                    fontWeight: "bold",
                    fontSize: "14px",
                    textAlign: "center",
                }}>Escríbenos al siguiente correo:</Typography>
                <Typography sx={{
                    color: theme.palette.primary.main,
                    fontWeight: "bold",
                    fontSize: "14px",
                    textAlign: "center",
                }}>innovacion@alkosto.com</Typography>
            </Box>

            {/* Botón fijo en la parte inferior */}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    onClick={onClose}
                    sx={{
                        bgcolor: "#B4B4B4",
                        color: "#FFFFFF",
                        width: "90%",
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

export default FeedbackModal;
