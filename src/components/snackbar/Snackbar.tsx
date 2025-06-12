import useGlobalStore from "../../store/useGlobalStore";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const SnackBar = () => {
  const { snackbar, closeSnackbar } = useGlobalStore();

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.autoHide ? 1500 : null}
      onClose={closeSnackbar}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      // sx={{ mt: 5 }}
      TransitionComponent={Slide}
    >
      <Alert
        onClose={closeSnackbar}
        severity={snackbar.severity as "success" | "error" | "info" | "warning"}
        variant="filled"
        sx={{ width: "100%", borderRadius: 5 }}
      >
        {`${snackbar.message}`}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
