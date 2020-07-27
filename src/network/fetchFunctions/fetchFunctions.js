import serviceCall from "../serviceCall";

export const fetchCurrentlyPlayingMovies = async (page) => {
  const url = "https://api.themoviedb.org/3/movie/now_playing";
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
