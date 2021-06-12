import React, { useState, useEffect } from 'react';
import ReviewListItem from './ReviewListItem.jsx';
import Divider from '@material-ui/core/Divider';

let ReviewList = (props) => {
  let reviews = props.reviews.map((review) => {
    return (
      <div key={review.review_id}>
        <ReviewListItem data={review} />
        <Divider />
      </div>
    );
  });

  return (
    <div>
      {reviews}
    </div>
  );
};


export default ReviewList;