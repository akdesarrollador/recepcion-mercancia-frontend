import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import { styled } from '@mui/material/styles'
import { useNavigate } from "react-router-dom";
import ak_logo from "../../images/ak-logo.png"
import fc_logo from "../../images/fc-logo.png"
import hc_logo from "../../images/hc-logo.png"
import Baloon from '../box/baloon';
import { LogOut } from 'lucide-react';
import { sxNavbarBox } from "../../styles/sxRootLayout";

interface RootLayoutProps {
  organization: "AK" | "FC" | "HC";
  noLogout?: boolean;
}

const RootLayout: React.FC<RootLayoutProps> = ({
  organization,
  noLogout = false,
}) => {
  const navigate = useNavigate();
  const isLoggedIn = true;

  if (!isLoggedIn) navigate("/iniciar-sesion");

  const handleLogout = () => {
    navigate("/iniciar-sesion");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <Box sx={sxNavbarBox}>
        <Baloon side="left" imgSrc={organization === "AK" ? ak_logo : organization === "FC" ? fc_logo : hc_logo} />
        {!noLogout && (
            <Baloon 
                side="right" 
                icon={<LogOut color="white" width="30px" height="30px" onClick={handleLogout} />} 
            />
        )}
      </Box>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <ContentLayout />
        <Stack gap={2} p={5}>
          <Outlet />
        </Stack>
      </Box>
    </Box>
  );
};

export default RootLayout;

const ContentLayout = styled("div")(({theme}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
