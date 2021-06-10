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


<<<<<<< HEAD
  // Map over each question and create a QuestionCard for each question
  // console.log('our questions', props.displayedQs);


  // const QuestionCard = props.displayedQs.map((question) => {
  //   return
  //   (<Question question={question} />)
    // if question has no anwsers
    // if (Object.keys(question.answers).length === 0) {
    //   return (
    //     <React.Fragment>
    //       <Grid item xs={9} style={{ background: 'SeaShell' }} key={question.question_id}>
    //         Q: {question.question_body}
    //       </Grid>
    //       <Grid item xs={9}>
    //        <Answer getAnswers={getAnswers} displayedAnswers={displayedAnswers} questionId={question.question_id} />
    //       </Grid>
    //     </React.Fragment>
    //   )
    // } else {
    //   return (
    //     <React.Fragment>
    //       <Grid item xs={9} style={{ background: 'SeaShell' }} key={question.question_id}>
    //         Q: {question.question_body}
    //       </Grid>
    //       <Grid item xs={3}>
    //         <Typography variant="body2">
    //           Helpful? Yes | Add Answer Here
    //       </Typography>
    //       </Grid>
    //       <Answer getAnswers={getAnswers} displayedAnswers={displayedAnswers} questionId={question.question_id} /> {/*pass questionID down as props? Does this work? YESSS*/}
    //       <Grid item xs={9}>
    //         <Button onClick={moreAnswers}>
    //           <Typography variant="button">
    //             Load More Answers
    //           </Typography>
    //         </Button>
    //       </Grid>
    //     </React.Fragment>

    // }

=======
>>>>>>> ce0db2ce62915164d546fffdf41d53109a6a72e7


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