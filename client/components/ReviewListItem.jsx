import React from 'react';

let ReviewListItem = (props) => {
  return (
    <div>
      <h3>Here is a review</h3>
      <p>{props.data.summary}</p>
    </div>
  );
};

export default ReviewListItem;