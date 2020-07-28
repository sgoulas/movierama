const getGenreNameByID = (genreList, genreID) => {
  const { name } = genreList.find(({ id }) => id === genreID);

  return name || "unresolved genre id";
};

export default getGenreNameByID;
