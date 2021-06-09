import React, { useRef, useEffect, useState } from 'react';

let Sidebar = (props) => {

  const [averageRating, setAverageRating] = useState(0);
  const [percentRecommend, setPercentRecommend] = useState(0);

  useEffect(() => {
    let totalRatings = 0;
    let totalPoints = 0;
    for (let starValue in props.metaData.ratings) {
      totalRatings += Number(props.metaData.ratings[starValue]);
      if (props.metaData.ratings[starValue]) {
        totalPoints += (Number(props.metaData.ratings[starValue]) * Number(starValue));
      }
    }
    setAverageRating(Number(totalPoints / totalRatings).toFixed(1));
  }, []);

  useEffect(() => {
    let didRecommend = Number(props.metaData.recommended['true']);
    let didNotRecommend = Number(props.metaData.recommended['false']);
    setPercentRecommend(Math.round((didRecommend / (didRecommend + didNotRecommend)) * 100));
  }, []);

  return (
    <div>
      <p>Ratings and Reviews</p> <br />
      <p>Average Rating: {averageRating > 0 ? averageRating : 0}</p> <br />
      <p>{percentRecommend > 0 ? percentRecommend : 0}% of users recommend this product</p>
      {props.metaData.ratings ? <div><p>1 Star: {props.metaData.ratings["1"] ? props.metaData.ratings["1"] : 0}</p> <br />
        <p>2 Star: {props.metaData.ratings['2'] ? props.metaData.ratings['2'] : 0}</p> <br />
        <p>3 Star: {props.metaData.ratings['3'] ? props.metaData.ratings['3'] : 0}</p> <br />
        <p>4 Star: {props.metaData.ratings['4'] ? props.metaData.ratings['4'] : 0}</p> <br />
        <p>5 Star: {props.metaData.ratings['5'] ? props.metaData.ratings['5'] : 0}</p> <br /> </div> : null}
    </div>
  );
};

export default Sidebar;