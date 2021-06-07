import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import Answer from './Answer.jsx';


const Question = (props) => {
  const QuestionItem = props.productQs.map((question) => {
    return (
      <React.Fragment>
        <Grid item xs={9} style={{ background: 'SeaShell' }} key={question.question_id}>
          Q: {question.question_body}
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body2">
          Helpful? Yes | Add Answer Here
          </Typography>
        </Grid>
        <Answer questionId={question.question_id} /> {/*pass questionID down as props? Does this work?*/}
      </React.Fragment>
    );

  });



  return (
    <React.Fragment>
      {QuestionItem}
    </React.Fragment>
  );
};

export default Question;