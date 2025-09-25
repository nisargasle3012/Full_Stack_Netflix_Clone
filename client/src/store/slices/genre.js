import { TMDB_V3_API_KEY } from "../../constant";
import { tmdbApi } from "./apiSlice";

const extendedApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getGenres: build.query({
      query: (mediaType) => ({
        url: `/genre/${mediaType}/list`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
      transformResponse: (response) => {
        return response.genres;
      },
    }),
  }),
});

export const { useGetGenresQuery, endpoints: genreSliceEndpoints } = extendedApi;
