import React, { useState, useEffect } from 'react';
import ReviewListItem from './ReviewListItem.jsx';

let ReviewList = (props) => {
  let reviews = props.reviews.map((review) => {
    return <ReviewListItem data={review} key={review.review_id} />;
  });

  return (
    <div>
      {reviews}
    </div>
  );
};


export default ReviewList;