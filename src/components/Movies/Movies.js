import React from "react";
import Movie from "../Movie";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

const Movies = ({ moviesArray }) => {
  const movies = moviesArray.map(({ id, ...movie }) => (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={id}>
      <Movie {...movie} id={id} />
    </Grid>
  ));

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {movies}
    </Grid>
  );
};

Movies.propTypes = {
  moviesPlayingNow: PropTypes.arrayOf(PropTypes.object),
};

export default Movies;
