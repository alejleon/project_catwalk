import React, { useState } from 'react';
import Question from './Question.jsx';
import Answer from './Answer.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '100%',
    margin: '0px'
  }

}));


const QACard = (props) => {
  console.log(props);
  const classes = useStyles();





  return (
    <Grid container >
      <Question productQs={props.productQs}/>
      <Grid item xs={3}>
        <Typography>Helpful? Yes | Add Answer here</Typography>
      </Grid>
      <Answer />
      <Answer />
    </Grid>




  );
};

export default QACard;