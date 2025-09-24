import { useState, useCallback } from "react";
import createSafeContext from "../lib/createSafeContext";

export const [usePortal, Provider] = createSafeContext();
export const [usePortalData, PortalDataProvider] = createSafeContext();

export default function PortalProvider({ children }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const [miniModalMediaData, setMiniModalMediaData] = useState(null);

  const handleChangePortal = useCallback((anchor, video) => {
    setAnchorElement(anchor);
    setMiniModalMediaData(video);
  }, []);

  return (
    <Provider value={handleChangePortal}>
      <PortalDataProvider
        value={{
          anchorElement,
          miniModalMediaData,
        }}
      >
        {children}
      </PortalDataProvider>
    </Provider>
  );
}
