import React from "react";
import PropTypes from "prop-types";

const Review = ({ author, content, id, url }) => {
  return (
    <div>
      <span>{author}</span>
      <span>{content}</span>
    </div>
  );
};

Review.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.number,
  url: PropTypes.string,
};

export default Review;
