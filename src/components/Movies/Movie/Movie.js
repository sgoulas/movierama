import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Poster from "./Poster";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { Divider } from "@material-ui/core";
import GenresContext from "../../../Context/GenresContext";
import { getGenreNameByID } from "./utils";
import {
  fetchMovieReviews,
  fetchSimilarMovies,
  fetchMovieTrailers,
} from "../../../network/fetchFunctions";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";
import Trailers from "./Trailers";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    backgroundColor: "#e9ecef",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#adb5bd",
  },
  rating: {
    color: "#fff",
  },
  genreList: {
    fontStyle: "italic",
  },
  title: {
    // color: "#fff",
  },
  review: {
    fontSize: "1rem",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "400",
    lineHeight: "1.5",
    letterSpacing: "0.00938em",
  },
}));

const Movie = ({
  id,
  poster_path,
  title,
  release_date,
  genre_ids,
  vote_average,
  overview,
}) => {
  const classes = useStyles();
  const genreList = useContext(GenresContext);
  const movieGenres = genre_ids.map((id) => getGenreNameByID(genreList, id));
  const [userReviews, setUsersReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      fetchMovieReviews(id).then((results) => setUsersReviews(results));
      fetchSimilarMovies(id).then((results) => setSimilarMovies(results));
      fetchMovieTrailers(id).then((results) => setMovieTrailers(results));
    }
  }, [expanded, id]);

  const movieTitle = (
    <Typography variant="h4" className={classes.title}>
      {title}
    </Typography>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <Typography className={classes.rating}>{vote_average}</Typography>
          </Avatar>
        }
        title={movieTitle}
        subheader={"Release date: ".concat(release_date)}
      />
      <CardContent>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Poster path={poster_path} alt={title} />
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className={classes.genreList}
            >
              {movieGenres.map((movieGenre, index) => (
                <span key={index}>{movieGenre} </span>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Overview:</Typography>
          <Divider />
          <br />
          <Typography paragraph>{overview}</Typography>
        </CardContent>
        <CardContent>
          {movieTrailers.length && <Trailers movieTrailers={movieTrailers} />}
        </CardContent>
        <CardContent>
          <Typography variant="h6" className={classes.review}>
            <Reviews reviews={userReviews} />
          </Typography>
        </CardContent>
        <CardContent>
          <SimilarMovies movies={similarMovies} />
        </CardContent>
      </Collapse>
    </Card>
  );
};

Movie.propTypes = {
  poster_path: PropTypes.string,
  title: PropTypes.string,
  release_date: PropTypes.string,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  vote_average: PropTypes.number,
  overview: PropTypes.string,
};

export default Movie;
