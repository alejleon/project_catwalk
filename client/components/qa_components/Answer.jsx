import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';

const Answer = (props) => {
  // will have to deal with local state

  // for each questionID

  // const getAnswers = (questionId) => {
  //   const config = {
  //     headers: { Authorization: token },
  //     params: {
  //       page: 1,
  //       count: 2
  //     }
  //   }

  //   const queryParam = questionId
  //   // axios request to get the answers based on product_id
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
  //     .then((results) => {
  //       //set state
  //       console.log(results.data);
  //     })
  //     .catch((err) => {
  //       console.error('Error: ', err);
  //     })
  // } //

  // on page load
  useEffect(() => {
    // getAnswers(props.questionId);
  }, []);



  return (
    <Grid item xs={9}>
      <Typography> A: Answer will go here. Spicy Tuna is the best </Typography>
    </Grid>
  );
};

export default Answer;