import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

import { INITIAL_DETAIL_STATE } from "../constant";
import createSafeContext from "../lib/createSafeContext";
import { useLazyGetAppendedVideosQuery } from "../store/slices/discover";

export const [useDetailModal, Provider] = createSafeContext();

export default function DetailModalProvider({ children }) {
  const location = useLocation();
  const [detail, setDetail] = useState(INITIAL_DETAIL_STATE);

  const [getAppendedVideos] = useLazyGetAppendedVideosQuery();

  const handleChangeDetail = useCallback(async (newDetailType) => {
    if (newDetailType.id && newDetailType.mediaType) {
      const response = await getAppendedVideos({
        mediaType: newDetailType.mediaType,
        id: newDetailType.id,
      }).unwrap();
      setDetail({ ...newDetailType, mediaDetail: response });
    } else {
      setDetail(INITIAL_DETAIL_STATE);
    }
  }, [getAppendedVideos]);

  useEffect(() => {
    setDetail(INITIAL_DETAIL_STATE);
  }, [location.pathname]);

  return (
    <Provider value={{ detail, setDetailType: handleChangeDetail }}>
      {children}
    </Provider>
  );
}
