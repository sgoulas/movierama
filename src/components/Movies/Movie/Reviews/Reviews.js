import React from "react";
import Review from "./Review";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

const Reviews = ({ reviews }) => {
  const reviewsCopy = [...reviews];
  const firstTwoReviews = reviewsCopy.slice(0, 2);
  const reviewsExist = reviews.length !== 0;

  return (
    <>
      {reviewsExist && <Typography variant="h6">Reviews</Typography>}
      {firstTwoReviews.map(({ id, ...review }) => (
        <Review {...review} key={id} id={id} />
      ))}
    </>
  );
};

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.object),
};

export default Reviews;
