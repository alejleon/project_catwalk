import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Answer from './Answer.jsx';

const AnswerList = (props) => {

  return (
    <React.Fragment>
      <Grid item xs={9}>
        {props.displayedAnswers.map((answer, index) => {
          return (
            <Answer answer={answer} key={index} getAnswers={props.getAnswers}
             questionId={props.questionId}/>
          )
        })}
      </Grid>
    </React.Fragment>
  );
};

export default AnswerList;