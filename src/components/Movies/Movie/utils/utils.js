export const getGenreNameByID = (genreList, genreID) => {
  let match = "";
  const genre = genreList.find(({ id }) => id === genreID);
  if (genre) {
    const { name } = genre;
    match = name;
  }

  return match;
};

export const sortyByPopularity = (a, b) => {
  if (a.popularity < b.popularity) {
    return -1;
  }
  if (a.popularity > b.popularity) {
    return 1;
  }
  return 0;
};
