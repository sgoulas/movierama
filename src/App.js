import React, { useState, useCallback, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Jumbotron from "./components/Jumbotron";
import Grid from "@material-ui/core/Grid";
import Page from "./components/Page";
import UserInput from "./components/UserInput";
import Movies from "./components/Movies";
import serviceCall from "./network/serviceCall";
import Footer from "./components/Footer";

const observerOptions = {
  rootMargin: "0px",
  threshold: 1.0,
};

const fetchNextPage = async (page) => {
  const url = "https://api.themoviedb.org/3/movie/now_playing";
  const payload = {
    language: "en-US",
    page,
  };

  try {
    const response = await serviceCall("GET", url, payload);
    const { results: playingMovies } = response.data;
    return Promise.resolve(playingMovies);
  } catch (err) {
    return await Promise.reject(err);
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
    console.log("resultsPage", resultsPage);
    fetchNextPage(resultsPage).then((movies) =>
      setMoviesPlayingNow((prevMovies) => prevMovies.concat(movies))
    );
  }, [resultsPage]);

  /**
   * fetch on search term change
   */
  useEffect(() => {
    console.log("newSearchTerm", searchTerm);
    // TODO fetch data
  }, [searchTerm]);

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
          <Grid item>
            <Movies moviesPlayingNow={moviesPlayingNow} />
          </Grid>
        </Grid>
        <Footer />
      </Page>
    </>
  );
};

export default App;
