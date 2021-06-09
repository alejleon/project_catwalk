import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import AnswerList from './AnswerList.jsx';
import Question from './Question.jsx';
import axios from 'axios';
import token from './config/config.js';


const QuestionList = (props) => {
  // local State here
  const [currentQuestion, setCurrentQuestion] = useState([]);

  return (
    <React.Fragment>
      {props.displayedQs.map((question) => {
        return (
          <Question question={question}/>
        )
      })}
    </React.Fragment>
  );
};

export default QuestionList;