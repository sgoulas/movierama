import React from "react";
import Trailer from "./Trailer";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const Trailers = ({ movieTrailers }) => {
  return (
    <>
      <Typography variant="h6">Trailers</Typography>
      <Divider />
      <Grid container direction="row" justify="center" alignItems="center">
        {movieTrailers.map(({ id, key: youtubeKey, ...trailer }) => (
          <Grid item key={id}>
            <Trailer {...trailer} youtubeKey={youtubeKey} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Trailers;
