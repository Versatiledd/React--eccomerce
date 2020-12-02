import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClick, numberOfStars }) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starHoverColor="#daaa19"
      starRatedColor="darkgoldenrod"
      starDimension="25px"
    />
  </>
);

export default Star;
