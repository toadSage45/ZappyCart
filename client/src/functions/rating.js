import React from "react";
import { Rating } from "react-simple-star-rating";

export const showAverage = (p) => {
    if (p && p.ratings) {
        let ratingsArray = p.ratings;
        let total = [];
        let length = ratingsArray.length;

        for (let i = 0; i < length; i++) {
            total[i] = ratingsArray[i].star;
        }

        let totalReduced = 0;
        for (let i = 0; i < length; i++) {
            totalReduced += total[i];
        }
        let highest = length * 5;
        let result = (totalReduced * 5) / highest;

        return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <Rating
                        initialValue={result}
                        size={25}
                        fillColor="red"
                        readonly
                        allowFraction
                    />
                    ({length})
                </span>
            </div>
        );
    }
};
