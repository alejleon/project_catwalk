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
  const [allAnswers, setAllAnswers] = useState([]); // all answers for ONE question
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [allAnswersCount, setAllAnswersCount] = useState([]);
  const [displayedAnswersCount, setDisplayedAnswersCount] = useState([]);

  // get answers
  const answerPageCount = useRef(1);
  const getAnswers = (questionId) => {
    const config = {
      headers: { Authorization: token },
    }
    const queryParam = questionId;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
      .then((results) => {
        // NEED TO SORT THE DATA BEFORE SETTING STATE
        setAllAnswers(allAnswers => {
          return [...allAnswers, ...results.data.results]
        })
        console.log(results.data.results);
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  }

  const getDisplayedAnswers = (questionId) => {
    const config = {
      headers: { Authorization: token },
      params: {
        page: 1,
        count: 2
      }
    }
    const queryParam = questionId;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
      .then((results) => {
        // NEED TO SORT THE DATA BEFORE SETTING STATE
        setDisplayedAnswers(displayedAnswers => {
          return [...displayedAnswers, ...results.data.results]
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      })

  };



  // load answers
  const moreAnswers = (e) => {
    console.log('clicked')
    console.log(props.displayedQs);
    // answerPageCount.current++;
    // getAnswers(answerPageCount.current);
  }


  // show answers on page load
  useEffect(() => {
    // getAnswers(props.productId);
  }, []);




  return (
    <React.Fragment>
      {/* {QuestionCard} */}
      {props.displayedQs.map((question) => {
        return (
          <Question question={question}/>
        )
      })}
    </React.Fragment>
  );
};

export default QuestionList;