import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';
import token from '../../config.js';

const Question = (props) => {
  const [allAnswers, setAllAnswers] = useState([]); // all answers for ONE question
  // const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [allAnswersCount, setAllAnswersCount] = useState([]);
  const [displayedAnswersCount, setDisplayedAnswersCount] = useState(2);
  const [openAnswer, setOpenAnswer] = useState(false); // set Answer dialog to false
  const [isHelpful, setIsHelpful] = useState(false);
  const questionId = props.question.question_id;


  // Get all Answers to a particular question base on question_id
  const getAnswers = (questionId) => {
    const config = {
      headers: { Authorization: token },
      params: {
        page: 1,
        count: 100
      }
    }
    const queryParam = questionId;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
      .then((results) => {
        // NEED TO SORT THE DATA BEFORE SETTING STATE
        setAllAnswers(allAnswers => {
          return [...allAnswers, ...results.data.results]
        })
        setAllAnswersCount(allAnswers => {
          return results.data.results.length;
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  }

  // Loads all answers to question
  const loadMoreAnswers = (e) => {
    setDisplayedAnswersCount(displayedAnswersCount + 2);
  }
  // Logic to collapse Answers down to 2
  const collapseAnswers = (e) => {
    setDisplayedAnswersCount(2);
  }

  // Logic for opening Add Answer Dialog
  const handleAOpen = () => {
    setOpenAnswer(true);
  }
  // Logic for closing Add Answer Dialog
  const handleAClose = () => {
    setOpenAnswer(false);
  }

  // Gets all answers for a product on page load
  useEffect(() => {
    getAnswers(questionId);
  }, []);

  return (
    <React.Fragment>
      <Grid item xs={9} key={props.question_id}>
        <Typography variant="body1">
          Q: {props.question.question_body}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        Helpful?
        <Button style={{ maxWidth: '10x', maxHeight: '15px' }}>
          Yes ({props.question.question_helpfulness})
        </Button>
        <Button style={{ maxWidth: '10x', maxHeight: '15px' }} onClick={handleAOpen}>
          Add Answer
        </Button>
        <AddAnswer open={openAnswer} handleAClose={handleAClose} currentProduct={props.currentProduct}
          question={props.question.question_body} />
      </Grid>
      <Grid item xs={9}>
        {allAnswers.length > 0 ? <AnswerList displayedAnswers={allAnswers.slice(0, displayedAnswersCount)} />
          : "There are no answers for this question"}
      </Grid>
      <Grid item xs={9}>
        {displayedAnswersCount >= allAnswersCount ? ""
          : <Button onClick={loadMoreAnswers}>
            Load More Answers
            </Button>}
        {displayedAnswersCount < 3 ? ""
          : <Button onClick={collapseAnswers}>
            Collapse Answers
            </Button>}
      </Grid>
    </React.Fragment>
  );
};

export default Question;
