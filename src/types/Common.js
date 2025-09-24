// import Movie if needed for reference
// const Movie = require("src/types/Movie"); // for CommonJS
// or keep ES6 import if your setup supports it
import { Movie } from "../types/Movie";

// MEDIA_TYPE enum converted to plain object
export const MEDIA_TYPE = {
  Movie: "movie",
  Tv: "tv",
};

// Company "type" as a JSDoc comment (optional for JS)
export const Company = {
  description: "",
  headquarters: "",
  homepage: "",
  id: 0,
  logo_path: "",
  name: "",
  origin_country: "",
  parent_company: null,
};

// Country "type"
export const Country = {
  iso_3166_1: "",
  english_name: "",
};

// Language "type"
export const Language = {
  iso_639_1: "",
  english_name: "",
  name: "",
};

// PaginatedResult "type"
export const PaginatedResult = {
  page: 0,
  total_pages: 0,
  total_results: 0,
};

// PaginatedMovieResult "type"
export const PaginatedMovieResult = {
  ...PaginatedResult,
  results: [], // array of movies
};
