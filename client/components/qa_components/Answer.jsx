import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';


const Answer = (props) => {
  // props.answers


  // if props.answers is empty


  return (
    <React.Fragment>
      {props.displayedAnswers.map((answer, index) => {
        return (
          <p>{answer.body}</p>
        )
      })}
      {/* <p>Answer Body</p> */}
      <Typography variant="overline">By username  | date | HELPFUL | REPORT  </Typography>
    </React.Fragment>
  )

};


export default Answer;
