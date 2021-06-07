import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';






const Question = (props) => {

  return (
    <Grid item xs={9} style={{ background: 'SeaShell' }}>
      <Typography>Q: Question will go here? Do you like to eat sushi?
      </Typography>
    </Grid>
  );
};

export default Question;