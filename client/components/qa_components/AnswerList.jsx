import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import token from '../overview/config/config.jsx';
=======
>>>>>>> development
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Answer from './Answer.jsx';

const AnswerList = (props) => {

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