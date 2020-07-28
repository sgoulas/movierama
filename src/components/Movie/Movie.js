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
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Poster from "./Poster";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import GenresContext from "../../Context/GenresContext";
import { getGenreNameByID } from "./utils";
import {
  fetchMovieReviews,
  fetchSimilarMovies,
} from "../../network/fetchFunctions";
import Reviews from "./Reviews";
import SimilarMovies from "./SimilarMovies";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
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
    backgroundColor: red[500],
  },
  genreList: {
    fontStyle: "italic",
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      fetchMovieReviews(id).then((newUserReviews) =>
        setUsersReviews(newUserReviews)
      );
      fetchSimilarMovies(id).then((newSimilarMovies) =>
        setSimilarMovies(newSimilarMovies)
      );
    }
  }, [expanded, id]);

  const movieTitle = <Typography variant="h4">{title}</Typography>;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {vote_average}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
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
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
          <Typography paragraph>Overview:</Typography>
          <Typography paragraph>{overview}</Typography>
        </CardContent>
        <CardContent>
          <Typography className={classes.review}>
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
