import React from "react";
import { Rating } from "react-simple-star-rating";

const Star = ({ starClick, numberOfStars }) => {
  return (
    <div onClick={() => starClick(numberOfStars)}>
      <Rating
        initialValue={numberOfStars}
        size={25}
        fillColor="red"
        allowFraction={false}
        readonly
      />
    </div>
  );
};

export default Star;
