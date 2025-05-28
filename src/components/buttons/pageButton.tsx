import Box from "@mui/material/Box";
import { sxTextBox, sxFatherBox } from "../../styles/sxPageButton";
import { PageButtonProps } from "../../utils/interfaces/componentsProps";

const PageButton: React.FC<PageButtonProps> = ({
  onClick,
  icon,
  text,
  color,
}) => {
  return (
    <Box
      onClick={onClick}
      component="button"
      sx={{ ...sxFatherBox, color: color }}
    >
      {icon}
      <Box sx={sxTextBox}>{text}</Box>
    </Box>
  );
};

export default PageButton;
