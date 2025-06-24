import Box from "@mui/material/Box";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import SimpleButton from "../components/buttons/simpleButton";
import theme from "../theme/theme";
import { FileScan } from "lucide-react";
import { PackageOpen } from "lucide-react";
import { ClipboardCheck } from "lucide-react";
import HomeInstruction from "../components/box/homeInstruction";
import {
  sxFatherBox,
  sxInstructionsBox,
  sxPageTitle,
} from "../styles/sxHomePage";
import { useNavigate } from "react-router-dom";
import useGlobalStore from "../store/useGlobalStore";
import useFullScreenModal from "../hooks/useFullScreenModal";
import FullScreenModal from "../components/modals/fullScreenModal";

const HomePage = () => {
  const navigate = useNavigate();
  const {
    setPurchaseOrderData,
    cleanProductsReceived,
    setJointReception,
    clearMultiplePurchaseOrderData,
  } = useGlobalStore();
  const [showFullScreenModal, setShowFullScreenModal] = useFullScreenModal();

  useEffect(() => {
    setPurchaseOrderData(null);
    cleanProductsReceived();
    clearMultiplePurchaseOrderData();
  }, [
    setPurchaseOrderData,
    cleanProductsReceived,
    clearMultiplePurchaseOrderData,
  ]);

  return (
    <Box sx={sxFatherBox}>
      <FullScreenModal
        open={showFullScreenModal}
        onClose={() => setShowFullScreenModal(false)}
      />

      <Typography sx={sxPageTitle}>Recepción de Mercancía</Typography>
      <Box sx={sxInstructionsBox}>
        <HomeInstruction
          title="Escanea el código de barras de la orden de compra"
          icon={
            <FileScan
              color={theme.palette.primary.main}
              width="42px"
              height="42px"
            ></FileScan>
          }
        />
        <HomeInstruction
          title="Verifica que la mercancía recibida pertenezca a la orden de compra"
          icon={
            <PackageOpen
              color={theme.palette.primary.main}
              width="42px"
              height="42px"
            ></PackageOpen>
          }
        />

        <HomeInstruction
          title="Confirma que la mercancía de la orden de compra se haya recibido completa"
          icon={
            <ClipboardCheck
              color={theme.palette.primary.main}
              width="42px"
              height="42px"
            ></ClipboardCheck>
          }
        />
      </Box>
      <SimpleButton
        backgroundColor={theme.palette.primary.main}
        label="Recepción Simple"
        onClick={() => {
          setJointReception(false);
          navigate("/recepcion");
        }}
      />
      <SimpleButton
        backgroundColor="FFFFFF"
        borderColor={theme.palette.primary.main}
        fontColor={theme.palette.primary.main}
        label="Recepción Conjunta"
        onClick={() => {
          setJointReception(true);
          navigate("/recepcion");
        }}
      />
    </Box>
  );
};

export default HomePage;
