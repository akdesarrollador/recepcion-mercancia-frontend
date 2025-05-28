import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RootLayout from "../components/layout/RootLayout";
import useFullScreen from "../hooks/useFullScreen";
import ReceptionPage from "../pages/ReceptionPage";

const Router = () => {
  const org = import.meta.env.VITE_ORGANIZATION;
  useFullScreen();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/iniciar-sesion" element={<LoginPage />} />

        <Route path="/" element={<RootLayout organization={org} />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        {/* <Route path="/" element={<RootLayout organization={org} noLogout />}> */}
          <Route path="/recepcion" element={<ReceptionPage />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
