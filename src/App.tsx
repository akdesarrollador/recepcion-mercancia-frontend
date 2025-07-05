import Router from "./routes/router";
import SnackBar from "./components/snackbar/Snackbar";
// import { useBlockDevTools } from "./hooks/useBlockDevTools";

function App() {
  // useBlockDevTools()

  return (
    <>
      <SnackBar />
      <Router />
    </>
  );
}

export default App;
