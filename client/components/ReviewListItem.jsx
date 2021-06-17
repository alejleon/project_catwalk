import React, { useState } from 'react';
import axios from 'axios';
import GITHUB_API_TOKEN from './overview/config/config.jsx';

let ReviewListItem = (props) => {
  const [helpful, setHelpful] = useState(false);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/';
  const headers = {
    headers: { Authorization: GITHUB_API_TOKEN }
  };

  const helpfulButton = (event) => {
    event.preventDefault();
    if (!helpful) {
      axios.put(`${url}${props.data.review_id}/helpful`, null, headers)
        .then(response => {
          setHelpful(true);
        })
        .catch((err) => {
          console.log('Error setting helpful: ', err);
        })
    }
  }
  return (
    <div>
      <h3>Here is a review</h3>
      <p>summary: {props.data.summary}</p>
      <p>Helpful? {helpful ? props.data.helpfulness + 1 : props.data.helpfulness}</p>
      <p>Date: {props.data.date}</p>

      <button onClick={helpfulButton}>Helpful</button>
    </div>
  );
};

export default ReviewListItem;