import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, CssBaseline } from '@material-ui/core';
import Answer from './Answer.jsx';


const Question = (props) => {
  const QuestionItem = props.productQs.map((question) => {
    return (
      <React.Fragment>
        <Grid item xs={9} style={{ background: 'SeaShell' }} key={question.question_id}>
          Q: {question.question_body}
        </Grid>
        <Answer questionId={props.questionId} />
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