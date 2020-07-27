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

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsPage, setResultsPage] = useState(1);
  const [moviesPlayingNow, setMoviesPlayingNow] = useState([]);

  const updateSearchTermCallback = useCallback(
    (newSearchTerm) => setSearchTerm(newSearchTerm),
    [setSearchTerm]
  );

  useEffect(() => {
    const url = "https://api.themoviedb.org/3/movie/now_playing";
    const payload = {
      language: "en-US",
      page: resultsPage,
    };

    serviceCall("GET", url, payload)
      .then((response) => {
        const { results: playingMovies } = response.data;
        setMoviesPlayingNow(playingMovies);
      })
      .catch((err) => console.error(err));
  }, [resultsPage]);

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
