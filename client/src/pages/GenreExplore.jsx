import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { COMMON_TITLES } from "../constant";
import GridPage from "../components/GridPage";
import { MEDIA_TYPE } from "../types/Common";
import { genreSliceEndpoints } from "../store/slices/genre";
import store from "../store";

export async function loader({ params }) {
  const genreId = params.genreId;

  let genre = COMMON_TITLES.find((t) => t.apiString === genreId);

  // If not found, fetch all genres from the store and match by ID
  if (!genre) {
    try {
      const genres = await store
        .dispatch(genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie))
        .unwrap();
      genre = genres?.find((g) => g.id.toString() === genreId);
    } catch (err) {
      console.error("Failed to fetch genres:", err);
      // fallback: redirect to home
      throw redirect("/browse");
    }
  }

  if (!genre) {
    // genre still not found, redirect or return null
    throw redirect("/browse");
  }

  return genre;
}

// Component: renders GridPage if genre is available
export default function GenreExplorePage() {
  const genre = useLoaderData();

  return <GridPage mediaType={MEDIA_TYPE.Movie} genre={genre} />;
}
