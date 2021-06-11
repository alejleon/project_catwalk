import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import AnswerList from './AnswerList.jsx';

const Question = (props) => {
  // local State here
  // console.log(props.question.answers);


  return (
    <React.Fragment>
      <Grid item xs={9} style={{ background: 'SeaShell' }} key={props.question_id}>
        Q: {props.question.question_body}
      </Grid>
      <Grid item xs={9}>
        <AnswerList answers={props.question.answers}/>
      </Grid>
      <Grid item xs={9}>
            <Button>
              <Typography variant="button">
                Load More Answers
              </Typography>
            </Button>
          </Grid>
    </React.Fragment>
  );
};

export default Question;
