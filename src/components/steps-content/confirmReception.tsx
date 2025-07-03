import Box from "@mui/material/Box";
import AttachFile from "../buttons/attachFile";
import { ImageUp, ClipboardCheck } from "lucide-react";
import theme from "../../theme/theme";
import SimpleTextInput from "../inputs/simpleTextInput";
import useGlobalStore from "../../store/useGlobalStore";
import CircularWithValueLabel from "../loader/circularProgress";
import {
  sxFatherBox,
  sxIconAndProgressBox,
  sxIconProgressNumberBox,
  sxOrderProductsReceivedProductsBox,
  sxReceptionsProductsBox,
} from "../../styles/sxConfirmReception";

const ConfirmReception = () => {
  const {
    ordenesCompraData,
    productosRecibidos,
    jointReception,
  } = useGlobalStore();
  const circularValue = ordenesCompraData?.productos?.length &&
    ordenesCompraData?.productos?.length > 0
    ? (productosRecibidos.length / ordenesCompraData?.productos?.length) * 100
    : 0

  return (
    <Box sx={sxFatherBox}>
      {/* Contenedor del icono, el progreso y el numero de orden */}
      <Box sx={sxIconProgressNumberBox}>
        {/* Contenedor del icono y el progreso */}
        <Box sx={sxIconAndProgressBox}>
          <ClipboardCheck color={theme.palette.primary.main} size={60} />
          <CircularWithValueLabel value={circularValue} />
        </Box>

        {/* Contenedor del numero de orden */}
        <Box>
          <SimpleTextInput
            textAlign="center"
            fontSize="12px"
            inputWidth="100%"
            inputHeight="35px"
            readonly
            value={!jointReception ? ordenesCompraData?.ordenes_compra[0]?.numero_orden : "Multiorden"}
            setValue={() => { }}
          />
        </Box>
      </Box>

      {/* Contendor de los productos ingresados vs productos productos en la orden */}
      <Box sx={sxOrderProductsReceivedProductsBox}>
        {/* Productos en la orden */}
        <Box
          sx={{
            ...sxReceptionsProductsBox,
            borderRight: "2px solid #EFEFEF",
          }}
        >
          Productos en la orden
          <SimpleTextInput
            value={
              ordenesCompraData?.productos.length !== undefined
                ? ordenesCompraData.productos.length.toString()
                : ""
            }
            setValue={() => { }}
            textAlign="center"
            fontSize="12px"
            inputWidth="58px"
            inputHeight="25px"
            readonly
            backgroundColor="#F4F4F4"
          />
        </Box>

        {/* Productos ingresados */}
        <Box sx={sxReceptionsProductsBox}>
          Productos ingresados
          <SimpleTextInput
            value={
              productosRecibidos.length !== undefined
                ? productosRecibidos.length.toString()
                : ""
            }
            setValue={() => { }}
            textAlign="center"
            fontSize="12px"
            inputWidth="58px"
            inputHeight="25px"
            readonly
            backgroundColor="#F4F4F4"
          />
        </Box>
      </Box>

      {/* Adjuntar Factura input */}
      <Box sx={{ width: "90%", mt: 2 }}>
        <AttachFile
          icon={<ImageUp color={theme.palette.primary.main} />}
          text="Adjuntar factura"
          fontColor={theme.palette.primary.main}
          backgroundColor={`${theme.palette.primary.main}1A`} // 1A = 10% opacity in hex
          borderColor={theme.palette.primary.main}
          borderRadius="10px"
          width="100%"
          height="80px"
          fontSize="14px"
          padding="8px 12px"
        />
      </Box>
    </Box>
  );
};

export default ConfirmReception;
