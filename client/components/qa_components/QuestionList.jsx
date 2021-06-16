import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Question from './Question.jsx';

const QuestionList = (props) => {

  return (
    <React.Fragment>
      {props.displayedQs.map((question, index) => {
        return (
          <Question question={question} key={index} currentProduct={props.currentProduct}/>
          );
        })}
    </React.Fragment>
  );
};

export default QuestionList;