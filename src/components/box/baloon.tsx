import Box from "@mui/material/Box";
import theme from "../../theme/theme";
import { IconButton } from "@mui/material";
import { BaloonProps } from "../../utils/interfaces/componentsProps";

const Baloon = ({ side, imgSrc, icon }: BaloonProps) => {
  return (
    <Box
      sx={{
        width: "90px",
        height: "90px",
        backgroundColor: theme.palette.primary.main,
        borderBottomRightRadius: side === "left" ? "40px" : "0px",
        borderBottomLeftRadius: side === "right" ? "40px" : "0px",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={imgSrc ? "90%" : "95%"}
        width={imgSrc ? "90%" : "110%"}
      >
        {imgSrc ? (
          <Box
            component="img"
            src={imgSrc}
            sx={{ width: "50%", height: "50%" }}
          />
        ) : (
          <IconButton>{icon}</IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Baloon;
