import React from "react";
import useStyles from "./styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Jumbotron = () => {
  const classes = useStyles();
  const title = <Typography className={classes.title}>MovieRama</Typography>;
  const subTitle = (
    <Typography className={classes.subTitle}>Search for movies!</Typography>
  );

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{title}</Grid>
      <Grid item>{subTitle}</Grid>
    </Grid>
  );
};

export default Jumbotron;
