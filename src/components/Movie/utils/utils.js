export const getGenreNameByID = (genreList, genreID) => {
  const { name } = genreList.find(({ id }) => id === genreID);

  return name || "unresolved genre id";
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
