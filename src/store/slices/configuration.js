import { TMDB_V3_API_KEY } from "../../constant";
import { tmdbApi } from "./apiSlice";

export const extendedApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getConfiguration: build.query({
      query: () => ({
        url: "/configuration",
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),
  }),
});

export const { useGetConfigurationQuery } = extendedApi;
