import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import token from './config/config.js';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Answer from './Answer.jsx';

const AnswerList = (props) => {
  // will have to deal with local state
  // const [answers, setAnswers] = useState([]);



  return (
    <React.Fragment>
      <Grid item xs={9}>
       <Answer />
      </Grid>
      <Grid item xs={9}>
        {/* <Typography variant="overline">By Username  | DATE | HELPFUL | REPORT  </Typography> */}
      </Grid>
    </React.Fragment>
  );
};

export default AnswerList;
