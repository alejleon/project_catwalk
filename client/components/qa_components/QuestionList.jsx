import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import Question from './Question.jsx';


const QuestionList = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState([]);

  return (
    <React.Fragment>
      {props.displayedQs.map((question) => {
        return (
          <Question question={question} currentProduct={props.currentProduct}/>
        );
      })}
    </React.Fragment>
  );
};

export default QuestionList;