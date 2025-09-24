import { useCallback, useEffect } from "react";
import MainLoadingScreen from "../components/MainLoadingScreen";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  initiateItem,
  useLazyGetVideosByMediaTypeAndGenreIdQuery,
  useLazyGetVideosByMediaTypeAndCustomGenreQuery,
} from "../store/slices/discover";

export default function withPagination(Component, mediaType, genre) {
  return function WithPagination() {
    const dispatch = useAppDispatch();
    const itemKey = genre.id ?? genre.apiString;
    const mediaState = useAppSelector((state) => state.discover[mediaType]);
    const pageState = mediaState ? mediaState[itemKey] : undefined;

    const [getVideosByMediaTypeAndGenreId] =
      useLazyGetVideosByMediaTypeAndGenreIdQuery();
    const [getVideosByMediaTypeAndCustomGenre] =
      useLazyGetVideosByMediaTypeAndCustomGenreQuery();

    useEffect(() => {
      if (!mediaState || !pageState) {
        dispatch(initiateItem({ mediaType, itemKey }));
      }
    }, [mediaState, pageState]);

    useEffect(() => {
      if (pageState && pageState.page === 0) {
        handleNext(pageState.page + 1);
      }
    }, [pageState]);

    const handleNext = useCallback(
      (page) => {
        if (genre.id) {
          getVideosByMediaTypeAndGenreId({
            mediaType,
            genreId: genre.id,
            page,
          });
        } else {
          getVideosByMediaTypeAndCustomGenre({
            mediaType,
            apiString: genre.apiString,
            page,
          });
        }
      },
      [genre, mediaType, getVideosByMediaTypeAndGenreId, getVideosByMediaTypeAndCustomGenre]
    );

    if (pageState) {
      return <Component genre={genre} data={pageState} handleNext={handleNext} />;
    }

    return <MainLoadingScreen />;
  };
}
