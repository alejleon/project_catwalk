import React, { useState } from 'react';
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
  const classes = useStyles();


  return (
    <Grid container >
      <Grid item xs={9} style={{ background: 'SeaShell' }}>
        <Typography>Q: Question will go here? Do you like to eat sushi?
      </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>Helpful? Yes | Add Answer here</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography> A: Answer will go here. Spicy Tuna is the best </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography> A: Answer will go here. I like tempura. </Typography>
      </Grid>
    </Grid>




  );
};

export default QACard;