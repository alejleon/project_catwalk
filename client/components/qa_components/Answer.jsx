import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';


const Answer = (props) => {

  //format Date function
  const handleHelpful = (e) => {
    console.log('clicked');
  }

  // Click handler for marking an answer as Helpful


  return (
      <React.Fragment>
        <Typography>A: {props.answer.body} </Typography>
        <Typography variant="overline">By {props.answer.answerer_name}  | {props.answer.date.slice(0, 10)} | helpful  <span onClick={handleHelpful}><u>yes</u></span> ({props.answer.helpfulness}) | <span><u>report</u></span></Typography>
      </React.Fragment>
  )
};


export default Answer;
