import React, { useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import { PackageOpen } from "lucide-react";
import SimpleTextInput from "../inputs/simpleTextInput";
import useGlobalStore from "../../store/useGlobalStore";
import Button from "@mui/material/Button";
import {
  sxFatherBox,
  sxIconAndNumberBox,
  sxFormBox,
  sxReceiveProductButton,
  sxFormSecondRowBox,
  sxFormFirstRowBox,
  sxSeeProgressButton,
  sxOrderNumberAndButtonBox,
} from "../../styles/sxCheckMerchandise";
import InputWithSelector from "../inputs/inputWithSelector";
import { Option } from "../../utils/interfaces/componentsProps";
import Backdrop from "@mui/material/Backdrop";
import SpinnerLoader from "../loader/spinnerLoader";
import { PurchaseOrderItemInterface } from "../../utils/interfaces/purchaseOrderInterface";
import { Snackbar, Alert } from "@mui/material";
import { SnackBarProps } from "../../utils/interfaces/componentsProps";
import theme from "../../theme/theme";
import ReceptionProgressModal from "../modals/receptionProgressModal";

const DEFAULT_UNIT: Option = {
  value: "Unidades",
  label: "U",
};

const CheckMerchandise: React.FC = () => {
  const { purchaseOrderData, addProductReceived, productsReceived } = useGlobalStore();
  const [receivedProduct, setReceivedProduct] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [productAmount, setProductAmount] = useState<string>("");
  const [unitsPerPackage, setUnitsPerPackage] = useState<number>(0);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [sbProps, setSbProps] = useState<SnackBarProps>({
    severity: "error",
    message: "",
  });
  const [currentUnit, setCurrentUnit] = useState<Option>(DEFAULT_UNIT);

  // Limpia todos los campos del formulario
  const cleanAllFields = useCallback(() => {
    setReceivedProduct("");
    setProductAmount("");
    setUnitsPerPackage(0);
    setCurrentUnit(DEFAULT_UNIT);
  }, []);

  // Calcula el total a recibir
  const totalToReceive = useMemo(() => {
    if (!productAmount) return 0;
    if (!unitsPerPackage || currentUnit.label !== "B")
      return Number(productAmount) || 0;
    const total = Number(productAmount) * unitsPerPackage;
    return isNaN(total) ? 0 : total;
  }, [productAmount, unitsPerPackage, currentUnit.label]);

  // Maneja el submit del formulario
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      setTimeout(() => {
        if (receivedProduct.trim() && productAmount !== "") {
          const matchedProduct = purchaseOrderData?.items.find(
            (item: PurchaseOrderItemInterface) =>
              item.itemCode === receivedProduct.trim()
          );

          if (!matchedProduct) {
            setLoading(false);
            cleanAllFields();
            setSbProps({
              severity: "error",
              message: "El producto no está en la orden.",
            });
            setOpenSnackbar(true);
            return;
          }

          const alreadyReceived = productsReceived.find(
            (item) => item.productCode === receivedProduct.trim()
          );
          if (alreadyReceived) {
            setLoading(false);
            cleanAllFields();
            setSbProps({
              severity: "error",
              message: `El producto ${receivedProduct} ya ha sido recibido.`,
            });
            setOpenSnackbar(true);
            return;
          }

          addProductReceived({
            productCode: receivedProduct,
            productDescription: matchedProduct.description,
            productUnits: Number(productAmount),
            productUnitsPerPackage:
              unitsPerPackage > 0 ? unitsPerPackage : undefined,
          });

          setLoading(false);
          setSbProps({
            severity: "success",
            message: `Producto recibido: ${matchedProduct.description}.`,
          });
          cleanAllFields();
          setOpenSnackbar(true);
        } else {
          setLoading(false);
        }
      }, 2000);
    },
    [receivedProduct, productAmount, purchaseOrderData?.items, productsReceived, addProductReceived, unitsPerPackage, cleanAllFields]
  );

  // Deshabilita el botón si faltan datos
  const isButtonDisabled = useMemo(
    () =>
      !receivedProduct ||
      !productAmount ||
      (currentUnit.label === "B" && !unitsPerPackage),
    [receivedProduct, productAmount, currentUnit.label, unitsPerPackage]
  );

  return (
    <Box sx={sxFatherBox}>
      {/* Loader */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <SpinnerLoader />
      </Backdrop>

      {/* Icono, número de orden y boton de ver progreso */}
      <Box sx={sxIconAndNumberBox}>
        <PackageOpen
          color={theme.palette.primary.main}
          width={60}
          height={60}
        />
        <Box sx={sxOrderNumberAndButtonBox}>
          <SimpleTextInput
            textAlign="center"
            fontSize="12px"
            inputWidth="65%"
            inputHeight="35px"
            readonly
            value={purchaseOrderData?.orderNumber}
            setValue={() => {}}
          />
          <Button
            onClick={() => setOpenModal(true)}
            sx={{
              ...sxSeeProgressButton,
              border: `1px solid ${theme.palette.primary.main}`,
              color: theme.palette.primary.main,
            }}
          >
            Ver Progreso
          </Button>
        </Box>
      </Box>

      {/* Formulario */}
      <Box component="form" onSubmit={handleSubmit} sx={sxFormBox}>
        <Box sx={sxFormFirstRowBox}>
          <SimpleTextInput
            inputHeight="45px"
            inputWidth="100%"
            borderColor="#DADADA"
            label="Código del producto a recibir"
            placeholder="ej. 0000567483904246"
            value={receivedProduct}
            setValue={setReceivedProduct}
            fontSize="12px"
            disabled={productsReceived.length === purchaseOrderData?.items.length}
          />
        </Box>

        <Box sx={sxFormSecondRowBox}>
          <InputWithSelector
            textValue={productAmount}
            onTextChange={setProductAmount}
            selectedUnit={currentUnit}
            onUnitChange={setCurrentUnit}
            placeholder="Cantidad"
            disabled={productsReceived.length === purchaseOrderData?.items.length}
          />

          <SimpleTextInput
            disabled={currentUnit.label !== "B" || receivedProduct === ""}
            label="Unidades x Bulto"
            inputWidth="50%"
            inputHeight="45px"
            fontSize="12px"
            value={unitsPerPackage === 0 ? "" : unitsPerPackage.toString()}
            setValue={(value: string) => setUnitsPerPackage(Number(value))}
            borderColor="#DADADA"
          />
        </Box>

        <Button
          onClick={handleSubmit}
          sx={{
            ...sxReceiveProductButton,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            pointerEvents: isButtonDisabled ? "none" : "auto",
            opacity: isButtonDisabled ? 0.3 : 1,
          }}
        >
          Recibir ({totalToReceive} unidades)
        </Button>
      </Box>

      {/* Snackbar de feedback */}
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ marginBottom: "60%", width: "85%", marginLeft: "5%" }}
        autoHideDuration={1500}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={sbProps.severity}
          variant="filled"
          sx={{ width: "100%", borderRadius: "20px" }}
          onClose={() => setOpenSnackbar(false)}
        >
          {sbProps.message}
        </Alert>
      </Snackbar>

      <ReceptionProgressModal open={openModal} onClose={() => setOpenModal(false)} />
    </Box>
  );
};

export default CheckMerchandise;
