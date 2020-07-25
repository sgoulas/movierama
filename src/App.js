import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Jumbotron from "./components/Jumbotron";
import Grid from "@material-ui/core/Grid";
import Page from "./components/Page";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Jumbotron />
      <Page>
        <div>
          <span>this is the main part of the page</span>
        </div>
      </Page>
    </>
  );
};

export default App;
