import React, { useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import GITHUB_API_TOKEN from '../../config.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles';

let ReviewListItem = (props) => {
  const [helpful, setHelpful] = useState(false);
  const date = useRef(new moment(props.data.date).format("l"));
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/';
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
  };



  return (
    <Grid container direction="column" spacing={3}>
      <Grid container item direction="row" alignItems="center" justify="space-between" style={{ maxWidth: 600 }}>
        <Grid item>
          <Rating name="read-only" precision={0.25} value={props.data.rating > 0 ? props.data.rating : 0} readOnly />
        </Grid>
        <Grid item>
          <Grid item>{props.data.reviewer_name}, {date.current}</Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Typography noWrap variant="h5">{props.data.summary}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{props.data.body}</Typography>
      </Grid>
      <Grid container item direction="row" alignItems="center">
        <Typography>Helpful? ({helpful ? props.data.helpfulness + 1 : props.data.helpfulness})</Typography>
        <Button onClick={helpfulButton}>Helpful</Button>
      </Grid>

    </Grid >
  );
};

export default ReviewListItem;