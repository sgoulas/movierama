import React from "react";
import Review from "./Review";
import PropTypes from "prop-types";

const Reviews = ({ reviews }) => {
  const reviewsCopy = [...reviews];
  const firstTwoReviews = reviewsCopy.slice(0, 2);

  return firstTwoReviews.map(({ id, ...review }, index) => (
    <Review {...review} key={id.concat(`review-${index}`)} />
  ));
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};

export default Reviews;
