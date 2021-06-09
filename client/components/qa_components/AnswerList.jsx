import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import token from './config/config.js';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Answer from './Answer.jsx';

const AnswerList = (props) => {
  // will have to deal with local state
  // const [answers, setAnswers] = useState([]);
console.log('answers', props.displayedAnswers)



  return (
    <React.Fragment>
      <Grid item xs={9}>
      {props.displayedAnswers.map((answer) => {
        return (
          <Answer answer={answer} />
        )
      })}
      </Grid>

    </React.Fragment>
  );
};

export default AnswerList;
