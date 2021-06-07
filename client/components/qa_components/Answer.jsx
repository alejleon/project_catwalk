import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';

const Answer = (props) => {
  // will have to deal with local state
  const [answers, setAnswers] = useState([]);


  // useRef to be able to increase the count number without it resetting
  const answerCount = useRef(1);

  const getAnswers = (questionId) => {
    const config = {
      headers: { Authorization: token },
      params: {
        page: 1,
        count: 2
      }
    }
    const queryParam = questionId;
    // axios request to get the answers based on product_id
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
      .then((results) => {
        //set state
        setAnswers(answers => {
          return [...answers, ...results.data.results]
        })
        console.log(results.data.results);
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  } //

  // on page load
  useEffect(() => {
    getAnswers(props.questionId);
  }, []);

  // need a load more answers function

  // need to map over the answers and create a jsx element for them

  return (
    <React.Fragment>

      <Grid item xs={9}>
        <Typography> A: Answer will go here. Spicy Tuna is the best </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="overline">By Username  | DATE | HELPFUL | REPORT  </Typography>
      </Grid>

    </React.Fragment>

  );
};

export default Answer;