import React from "react";
import PropTypes from "prop-types";

const Poster = ({ path, alt }) => {
  const src = `http://image.tmdb.org/t/p/w300${path}`;

  return <img src={src} alt={alt} />;
};

Poster.propTypes = {
  path: PropTypes.string.isRequired,
};

export default Poster;
