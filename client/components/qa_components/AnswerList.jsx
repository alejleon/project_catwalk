import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Answer from './Answer.jsx';

const AnswerList = (props) => {

  return (
    <React.Fragment>
      <Grid item xs={9}>
        {props.displayedAnswers.map((answer) => {
          return (
            <Answer answer={answer} />
          )
        })}
      </Grid>
    </React.Fragment>
  );
};

export default AnswerList;