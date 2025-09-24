import { Company, Country, Language } from './Common';
import { Genre } from './Genre';

// Appended_Video structure
export const Appended_Video = {
  id: "",
  iso_639_1: "",
  iso_3166_1: "",
  key: "",
  name: "",
  official: false,
  published_at: "",
  site: "",
  size: 0,
  type: "",
};

// MovieDetail structure
export const MovieDetail = {
  adult: false,
  backdrop_path: null,
  belongs_to_collection: null,
  budget: 0,
  genres: [], // array of Genre objects
  homepage: "",
  id: 0,
  imdb_id: "",
  original_language: "",
  original_title: "",
  overview: "",
  popularity: 0,
  poster_path: null,
  production_companies: [], // array of Company objects
  production_countries: [], // array of Country objects
  release_date: "",
  revenue: 0,
  runtime: 0,
  spoken_languages: [], // array of Language objects
  status: "",
  tagline: "",
  title: "",
  video: false,
  videos: { results: [] }, // array of Appended_Video objects
  vote_average: 0,
  vote_count: 0,
};

// Movie structure
export const Movie = {
  poster_path: null,
  adult: false,
  overview: "",
  release_date: "",
  genre_ids: [], // array of numbers
  id: 0,
  original_title: "",
  original_language: "",
  title: "",
  backdrop_path: null,
  popularity: 0,
  vote_count: 0,
  video: false,
  vote_average: 0,
};
