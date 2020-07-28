import React from "react";

const Trailer = ({ name, youtubeKey }) => {
  const trailerSrc = `https://www.youtube.com/embed/${youtubeKey}`;

  return (
    <iframe title={name} width="450 px" height="315" src={trailerSrc}></iframe>
  );
};

export default Trailer;
