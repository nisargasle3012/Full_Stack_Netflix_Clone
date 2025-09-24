import React from "react";
import { useLoaderData } from "react-router-dom";
import { COMMON_TITLES } from "../constant";
import GridPage from "../components/GridPage";
import { MEDIA_TYPE } from "../types/Common";
import { genreSliceEndpoints } from "../store/slices/genre";
import store from "../store";

// Loader: fetches the genre either from COMMON_TITLES or via API
export async function loader({ params }) {
  const genreId = params.genreId;

  // Try common titles first
  let genre = COMMON_TITLES.find((t) => t.apiString === genreId);

  // If not found, fetch all genres from the store and match by ID
  if (!genre) {
    const genres = await store
      .dispatch(genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie))
      .unwrap();
    genre = genres?.find((g) => g.id.toString() === genreId);
  }

  return genre;
}

// Component: renders GridPage if genre is available
export default function GenreExplorePage() {
  const genre = useLoaderData();

  if (!genre) return null;

  return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
}
