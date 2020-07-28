import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

const Review = ({ author, content, id, url }) => {
  return (
    <>
      <Divider />
      <br />
      <div key={id}>
        <Typography variant="caption">{author}</Typography>
        <br />
        <br />
        <Typography variant="body2">{content}</Typography>
        <br />
      </div>
    </>
  );
};

Review.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
};

export default Review;
