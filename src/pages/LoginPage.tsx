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
import FullScreenModal from "../components/modals/fullScreenModal";
import useFullScreenModal from "../hooks/useFullScreenModal";
import useInputFocus from "../hooks/useInputFocus";
import { useAuthStore } from "../store/useAuthStore";
import useGlobalStore from "../store/useGlobalStore";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const org = import.meta.env.VITE_ORGANIZATION;
  const [showFullScreenModal, setShowFullScreenModal] = useFullScreenModal();
  const textFieldRef = useInputFocus();
  const navigate = useNavigate();
  const { onLogin, isLoggedIn } = useAuthStore()
  const { openSnackbar } = useGlobalStore()

  if(isLoggedIn) navigate("/");

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await onLogin(password)
      openSnackbar(response.message, (response.codigo === 200 ? 'success' : 'error'))
      navigate("/");
    }  finally {
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: -1, p: 0 }}>
      {/* Modal para sugerir pantalla completa */}
      <FullScreenModal
        open={showFullScreenModal}
        onClose={() => setShowFullScreenModal(false)}
      />

      {/* Imagen con la caja */}
      <Box
        component="img"
        src={org === "AK" ? ak_login : org === "FC" ? fc_login : hc_login}
        sx={sxImageBox}
      />

      {/* Texto de bienvenida */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ zIndex: 10, position: "relative" }}
        mt={-5}
      >
        <Typography
          fontWeight="bold"
          fontSize="32px"
          sx={{ userSelect: "none" }}
        >
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
          ref={textFieldRef}
          autoFocus={true}
          autoComplete="off"
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
