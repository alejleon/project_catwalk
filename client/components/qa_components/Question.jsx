import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';

const Question = (props) => {
  const [allAnswers, setAllAnswers] = useState([]); // all answers for ONE question
  const [allAnswersCount, setAllAnswersCount] = useState([]);
  const [displayedAnswersCount, setDisplayedAnswersCount] = useState(2);
  const [openAnswer, setOpenAnswer] = useState(false); // set Answer dialog to false
  const [isHelpful, setIsHelpful] = useState(false);
  const [resportedQ, setReportedQ] = useState(false);
  const questionId = props.question.question_id;


  // Get all Answers to a particular question base on question_id
  const getAnswers = (questionId) => {
    const config = {
      headers: { Authorization: GITHUB_API_TOKEN },
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
          return [...results.data.results]
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

  // Logic for marking a question as helpful
  const markHelpful = (e) => {
    const queryParam = questionId;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/helpful`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!isHelpful) {
      console.log('mark this as helpful');
      axios(config)
        .then((result) => {
          setIsHelpful(true);
        })
        .catch((err) => {
          console.error("Error marking as helpful: ", error);
        })
    }
  };

  // Logic for Reporting a Question
  const reportQuestion = (e) => {
    // console.log('reported');
    const queryParam = questionId;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/report`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!reportedQ) {
      axios(config)
        .then((result) => {
          setReportedQ(true);
          // props.getAnswers(props.questionId)
        })
        .catch((err) => {
          console.error("Error reporting question: ", error);
        })
    }
  };




  // Gets all answers for a product on page load
  useEffect(() => {
    getAnswers(questionId);
  }, []);

  return (
    <React.Fragment>
      <Grid container={true} spacing={2}>
        <Grid item xs={9} key={props.question_id} >
          <Typography variant="body1">
            Q: {props.question.question_body}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          Helpful?
          <Button style={{ maxWidth: '10x', maxHeight: '15px' }} onClick={markHelpful}>
            Yes ({isHelpful ? props.question.question_helpfulness + 1 : props.question.question_helpfulness})
          </Button>
          <AddAnswer open={openAnswer} handleAClose={handleAClose} currentProduct={props.currentProduct}
            question={props.question.question_body} getAnswers={getAnswers} questionId={questionId} />
        </Grid>
        <Grid item xs={9}>
          <Button style={{ maxWidth: '10x', maxHeight: '15px' }} onClick={handleAOpen}>
            Report Question
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button style={{ maxWidth: '10x', maxHeight: '15px' }} onClick={handleAOpen}>
            Add Answer
          </Button>
        </Grid>
        <Grid item xs={9}>
          {allAnswers.length > 0 ? <AnswerList displayedAnswers={allAnswers.slice(0, displayedAnswersCount)}
            getAnswers={getAnswers} questionId={questionId} />
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
        <Grid item xs={9}></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Question;

{/* <Button style={{ maxWidth: '10x', maxHeight: '15px' }} onClick={handleAOpen}>
Report
</Button> */}