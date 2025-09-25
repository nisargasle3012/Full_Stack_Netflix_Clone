import { TMDB_V3_API_KEY } from "../../constant";
import { tmdbApi } from "./apiSlice";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

// ✅ Function to create a fresh item state
const createItemState = () => ({
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
});

// Slice
const discoverSlice = createSlice({
  name: "discover",
  initialState: {}, // start empty
  reducers: {
    setNextPage: (state, action) => {
      const { mediaType, itemKey } = action.payload;
      if (!state[mediaType]) state[mediaType] = {};
      if (!state[mediaType][itemKey]) state[mediaType][itemKey] = createItemState();

      state[mediaType][itemKey].page += 1;
    },
    initiateItem: (state, action) => {
      const { mediaType, itemKey } = action.payload;
      if (!state[mediaType]) state[mediaType] = {};
      if (!state[mediaType][itemKey]) state[mediaType][itemKey] = createItemState();
    },
  },
  extraReducers: (builder) => {
    const extendedApi = tmdbApi.injectEndpoints({ endpoints: () => ({}) }); // placeholder

    builder.addMatcher(
      isAnyOf(
        extendedApi.endpoints.getVideosByMediaTypeAndCustomGenre?.matchFulfilled,
        extendedApi.endpoints.getVideosByMediaTypeAndGenreId?.matchFulfilled
      ),
      (state, action) => {
        const { page, results, total_pages, total_results, mediaType, itemKey } =
          action.payload;

        if (!state[mediaType]) state[mediaType] = {};
        if (!state[mediaType][itemKey]) state[mediaType][itemKey] = createItemState();

        state[mediaType][itemKey].page = page;
        state[mediaType][itemKey].results.push(...results);
        state[mediaType][itemKey].total_pages = total_pages;
        state[mediaType][itemKey].total_results = total_results;
      }
    );
  },
});

export const { setNextPage, initiateItem } = discoverSlice.actions;
export default discoverSlice.reducer;

// RTK Query endpoints
export const extendedApi = tmdbApi.injectEndpoints({
  endpoints: (build) => ({
    getVideosByMediaTypeAndGenreId: build.query({
      query: ({ mediaType, genreId, page }) => ({
        url: `/discover/${mediaType}`,
        params: { api_key: TMDB_V3_API_KEY, with_genres: genreId, page },
      }),
      transformResponse: (response, _, { mediaType, genreId }) => ({
        ...response,
        mediaType,
        itemKey: genreId,
      }),
    }),
    getVideosByMediaTypeAndCustomGenre: build.query({
      query: ({ mediaType, apiString, page }) => ({
        url: `/${mediaType}/${apiString}`,
        params: { api_key: TMDB_V3_API_KEY, page },
      }),
      transformResponse: (response, _, { mediaType, apiString }) => ({
        ...response,
        mediaType,
        itemKey: apiString,
      }),
    }),
    getAppendedVideos: build.query({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}`,
        params: { api_key: TMDB_V3_API_KEY, append_to_response: "videos" },
      }),
    }),
    getSimilarVideos: build.query({
      query: ({ mediaType, id }) => ({
        url: `/${mediaType}/${id}/similar`,
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),
  }),
});

export const {
  useGetVideosByMediaTypeAndGenreIdQuery,
  useLazyGetVideosByMediaTypeAndGenreIdQuery,
  useGetVideosByMediaTypeAndCustomGenreQuery,
  useLazyGetVideosByMediaTypeAndCustomGenreQuery,
  useGetAppendedVideosQuery,
  useLazyGetAppendedVideosQuery,
  useGetSimilarVideosQuery,
  useLazyGetSimilarVideosQuery,
} = extendedApi;
