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
import PropTypes from "prop-types";
import GenresContext from "../../Context/GenresContext";
import getGenreNameByID from "./utils";
import { fetchMovieReviews } from "../../network/fetchFunctions";
import Reviews from "./Reviews";
import Review from "./Reviews/Review";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (expanded) {
      fetchMovieReviews(id).then((newUserReviews) =>
        setUsersReviews(newUserReviews)
      );
    }
  }, [expanded, id]);

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
        title={title}
        subheader={"Release date: ".concat(release_date)}
      />
      <CardContent>
        <Poster path={poster_path} alt={title} />
        <Typography variant="body2" color="textSecondary" component="p">
          {movieGenres.map((movieGenre, index) => (
            <span key={index}>{movieGenre} </span>
          ))}
        </Typography>
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
          <Reviews reviews={userReviews} />
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
