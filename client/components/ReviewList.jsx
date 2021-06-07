import React, { useState, useEffect } from 'react';
import ReviewListItem from './ReviewListItem.jsx';

let ReviewList = (props) => {
  let reviews = props.reviews.map((review) => {
    return <ReviewListItem data={review} />;
  });

  return (
    <div>
      <h3>Here is the reviewList</h3>
      {reviews}
    </div>
  );
};


export default ReviewList;