import React from "react";
import StarRating from "react-star-ratings";

const averageRating = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);

    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div>
        <StarRating
          rating={result}
          starRatedColor="darkgoldenrod"
          starHoverColor="#daaa19"
          starDimension="25px"
        />
      </div>
    );
  }
};

export default averageRating;
