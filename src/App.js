import React, { useState, useCallback, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Jumbotron from "./components/Jumbotron";
import Grid from "@material-ui/core/Grid";
import Page from "./components/Page";
import UserInput from "./components/UserInput";
import Movies from "./components/Movies";
import {
  fetchCurrentlyPlayingMovies,
  searchMovie,
} from "./network/fetchFunctions";
import Footer from "./components/Footer";

const observerOptions = {
  rootMargin: "0px",
  threshold: 1.0,
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [resultsPage, setResultsPage] = useState(1);
  const [moviesPlayingNow, setMoviesPlayingNow] = useState([]);

  const observerTarget = document.getElementById("end-of-page");

  /**
   * intersection observer
   */
  useEffect(() => {
    let observer;
    if (observerTarget) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio) {
            setResultsPage((prevResultsPage) => prevResultsPage + 1);
          }
        });
      }, observerOptions);

      observer.observe(observerTarget);
    }

    return () => (observerTarget ? observer.unobserve() : null);
  }, [observerTarget]);

  const updateSearchTermCallback = useCallback(
    (newSearchTerm) => setSearchTerm(newSearchTerm),
    [setSearchTerm]
  );

  useEffect(() => {
    fetchCurrentlyPlayingMovies(resultsPage).then((movies) =>
      setMoviesPlayingNow((prevMovies) => prevMovies.concat(movies))
    );
  }, [resultsPage]);

  /**
   * fetch on search term change
   */
  useEffect(() => {
    if (searchTerm) {
      searchMovie(searchTerm).then((queryResult) =>
        setSearchResults(queryResult)
      );
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const moviesToDisplay =
    searchResults.length !== 0 ? (
      <Movies moviesArray={searchResults} />
    ) : (
      <Movies moviesArray={moviesPlayingNow} />
    );

  return (
    <>
      <CssBaseline />
      <Jumbotron />
      <Page>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <UserInput updateSearchTerm={updateSearchTermCallback} />
          </Grid>
          <Grid item>{moviesToDisplay}</Grid>
        </Grid>
        <Footer />
      </Page>
    </>
  );
};

export default App;
