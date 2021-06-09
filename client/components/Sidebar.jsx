import React, { useRef, useEffect, useState } from 'react';

let Sidebar = (props) => {
  const averageRating = useRef(0);
  //IIFE to calculate the average rating
  (() => {
    let totalRatings = 0;
    let totalPoints = 0;
    for (let starValue in props.metaData.ratings) {
      totalRatings += Number(props.metaData.ratings[starValue]);
      if (props.metaData.ratings[starValue]) {
        totalPoints += (Number(props.metaData.ratings[starValue]) * Number(starValue));
      }
    }
    averageRating.current = Number(totalPoints / totalRatings).toFixed(1) || 0;
  })();

  return (
    <div>
      <p>Ratings and Reviews</p> <br />
      <p>Average Rating: {averageRating.current}</p> <br />
      {props.metaData.ratings ? <div><p>1 Star: {props.metaData.ratings["1"] ? props.metaData.ratings["1"] : 0}</p> <br />
        <p>2 Star: {props.metaData.ratings['2'] ? props.metaData.ratings['2'] : 0}</p> <br />
        <p>3 Star: {props.metaData.ratings['3'] ? props.metaData.ratings['3'] : 0}</p> <br />
        <p>4 Star: {props.metaData.ratings['4'] ? props.metaData.ratings['4'] : 0}</p> <br />
        <p>5 Star: {props.metaData.ratings['5'] ? props.metaData.ratings['5'] : 0}</p> <br /> </div> : null}


    </div>
  );
};

export default Sidebar;