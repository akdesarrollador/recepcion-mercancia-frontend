import { createTheme } from "@mui/material/styles";

const org = import.meta.env.VITE_ORGANIZATION;

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 980,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ['"Roboto"', "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: org === "AK" ? "#0054A6" : org === "FC" ? "#FFCD03" : "#9DC00E",
    },
  },
});

export default theme;
