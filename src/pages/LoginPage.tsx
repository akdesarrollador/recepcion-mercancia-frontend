import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ak_login from "../images/ak-login.png";
import fc_login from "../images/fc-login.png";
import hc_login from "../images/hc-login.png";
import { sxImageBox, sxLoginFormBox } from "../styles/sxLoginPage";
import ColoredTextInput from "../components/inputs/coloredTextInput";
import { useState } from "react";
import { LockKeyhole } from "lucide-react";
import SimpleButton from "../components/buttons/simpleButton";
import theme from "../theme/theme";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const isLoggedIn = true;
  const org = import.meta.env.VITE_ORGANIZATION;
  const navigate = useNavigate();

  // if(isLoggedIn) navigate("/");

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPassword("");
      navigate("/");
    }, 2000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: -1, p: 0 }}>
      {/* Imagen con la caja */}
      <Box
        component="img"
        src={org === "AK" ? ak_login : org === "FC" ? fc_login : hc_login}
        sx={sxImageBox}
      />

      {/* Texto de bienvenida */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ zIndex: 10, position: "relative" }} mt={-5}>
        <Typography fontWeight="bold" fontSize="32px">
          ¡Bienvenido!
        </Typography>
      </Box>

      {/* Formulario de inicio de sesión */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (password !== "") handleSubmit();
        }}
        sx={sxLoginFormBox}
      >
        <ColoredTextInput
          value={password}
          setValue={setPassword}
          placeholder="Ingresa tu clave de acceso asignada"
          label="Clave de acceso"
          borderColor={theme.palette.primary.main}
          icon={<LockKeyhole color={theme.palette.primary.main} />}
          password={true}
        />
        <SimpleButton
          backgroundColor={theme.palette.primary.main}
          label="Ingresar"
          onClick={handleSubmit}
          disabled={password === ""}
          loading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default LoginPage;