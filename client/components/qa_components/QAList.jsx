import React, { useState } from 'react';
import QACard from './QACard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '100%',
    margin: '0px'
  }

}));


const QAList = (props) => {
  const classes = useStyles();


  return (
    <div>
      <CssBaseline />
      <Grid container spacing={4} className={classes.grid} style={{ background: 'white' }}>
        <Grid item xs={12}>
          <Typography>Questions & Answers</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>SEARCH COMPONENT GOES HERE</Typography>
        </Grid>
        <QACard />
        <Grid item xs={9} style={{ background: 'SeaShell'}}>
          <Typography> By Username  | DATE | HELPFUL  </Typography>
        </Grid>
      <Button variant="outlined" color="primary">MATTCHUU!</Button>
      <Button color="secondary">ADDIE!</Button>


      </Grid>
    </div >


  );
};

export default QAList;