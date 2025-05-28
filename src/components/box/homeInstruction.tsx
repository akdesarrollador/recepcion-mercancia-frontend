import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface HomeInstructionProps {
  title: string;
  icon: React.ReactNode;
}

const HomeInstruction = ({ title, icon }: HomeInstructionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Typography
        sx={{
          marginLeft: "25px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "#b4b4b4",
          textAlign: "justify",
          alignContent: "center",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default HomeInstruction;
