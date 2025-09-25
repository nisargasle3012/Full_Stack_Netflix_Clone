import React from "react";
import Stack from "@mui/material/Stack";
import { COMMON_TITLES } from "../constant";
import HeroSection from "../components/HeroSection";
import SliderRowForGenre from "../components/VideoSlider";
import { genreSliceEndpoints, useGetGenresQuery } from "../store/slices/genre";
import { MEDIA_TYPE } from "../types/Common";
import store from "../store";

// Loader function to pre-fetch movie genres
export async function loader() {
  await store.dispatch(
    genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie)
  );
  return null;
}

export default function HomePage() {
  const { data: genres, isSuccess } = useGetGenresQuery(MEDIA_TYPE.Movie);

  if (isSuccess && genres && genres.length > 0) {
    return (
      <Stack spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        {[...COMMON_TITLES, ...genres].map((genre) => (
          <SliderRowForGenre
            key={genre.id || genre.name}
            genre={genre}
            mediaType={MEDIA_TYPE.Movie}
          />
        ))}
      </Stack>
    );
  }

  return null;
}