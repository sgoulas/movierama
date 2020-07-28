import serviceCall from "../serviceCall";
import {
  CURRENTLY_PLAYING_ENDPOINT,
  SEARCH_MOVIE,
  GENRE_LIST,
} from "../endpoints";

export const fetchCurrentlyPlayingMovies = async (page) => {
  const url = CURRENTLY_PLAYING_ENDPOINT;
  const payload = {
    language: "en-US",
    page,
  };

  try {
    const response = await serviceCall("GET", url, payload);
    const { results: playingMovies } = response.data;
    return Promise.resolve(playingMovies);
  } catch (err) {
    return await Promise.reject(err);
  }
};

export const searchMovie = async (query) => {
  const url = SEARCH_MOVIE;
  const payload = { language: "en-US", query };

  try {
    const response = await serviceCall("GET", url, payload);
    const { results } = response.data;
    return Promise.resolve(results);
  } catch (err) {
    return await Promise.reject(err);
  }
};

export const fetchGenreList = async () => {
  const url = GENRE_LIST;
  const payload = { language: "en-US" };

  try {
    const response = await serviceCall("GET", url, payload);
    const { genres } = response.data;
    return Promise.resolve(genres);
  } catch (err) {
    return await Promise.reject(err);
  }
};

export const fetchMovieReviews = async (movieID) => {
  const url = `/movie/${movieID}/reviews`;
  const payload = { language: "en-US" };

  try {
    const response = await serviceCall("GET", url, payload);
    const { results } = response.data;
    return Promise.resolve(results);
  } catch (err) {
    return await Promise.reject(err);
  }
};
