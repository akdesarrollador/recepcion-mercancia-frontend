import Box from "@mui/material/Box";
import { CirclePlus } from "lucide-react";
import { AddButtonProps } from "../../utils/interfaces/componentsProps";

const AddButton: React.FC<AddButtonProps> = ({
  width = "15%",
  borderRadius = "10px",
  backgroundColor = "#747474",
  height = "34px",
  iconColor = "#fff",
  iconWidth = "20px",
  iconHeight = "20px",
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: width,
        borderRadius: borderRadius,
        bgcolor: backgroundColor,
        height: height,
        alignSelf: "self-end",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CirclePlus color={iconColor} width={iconWidth} height={iconHeight} />
    </Box>
  );
};

export default AddButton;
