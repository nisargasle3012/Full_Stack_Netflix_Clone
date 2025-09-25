import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Box from "@mui/material/Box";

import DetailModal from "../components/DetailModal";
import VideoPortalContainer from "../components/VideoPortalContainer";
import DetailModalProvider from "../providers/DetailModalProvider";
import PortalProvider from "../providers/PortalProvider";
import { MAIN_PATH } from "../constant";
import { Footer, MainHeader } from "../components/layouts";
import MainLoadingScreen from "../components/MainLoadingScreen";

export default function MainLayout() {
  const location = useLocation();
  const navigation = useNavigation();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <MainHeader />
      {navigation.state !== "idle" && <MainLoadingScreen />}
      <DetailModalProvider>
        <DetailModal />
        <PortalProvider>
          <Outlet />
          <VideoPortalContainer />
        </PortalProvider>
      </DetailModalProvider>
      {location.pathname !== `/${MAIN_PATH.watch}` && <Footer />}
    </Box>
  );
}
