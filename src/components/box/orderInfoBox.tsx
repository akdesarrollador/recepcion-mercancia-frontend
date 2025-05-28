import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import theme from "../../theme/theme";

export interface OrderInfoBoxProps {
    label: string;
    value: string;
    labelColor?: string;
    valueColor?: string;
    labelFontSize?: string;
    valueFontSize?: string;
}

const OrderInfoBox: React.FC<OrderInfoBoxProps> = ({ label, value, labelColor = "#8F8F8F", valueColor = theme.palette.primary.main, labelFontSize = "12px", valueFontSize = "12px" }) => {
    return (
        <Box sx={{
            display: "flex", 
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: "10px",
            alignItems: "center",
        }}>
            <Typography sx={{ fontSize: labelFontSize, color: labelColor }}>{label}: </Typography>
            <Typography sx={{ fontSize: valueFontSize, color: valueColor }}>{value} </Typography>
        </Box>
    )
}

export default OrderInfoBox