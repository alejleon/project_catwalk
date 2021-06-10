import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import token from './config/config.js';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Answer from './Answer.jsx';

const AnswerList = (props) => {
  // will have to deal with local state
  // const [answers, setAnswers] = useState([]);



<<<<<<< HEAD


  // show answers on page load
  // useEffect(() => {
  //   props.getAnswers(props.questionId);
  // }, []);

  // /// map over answers and create a AnswerItem for each answer
  // const AnswerItem = props.displayedAnswers.map((answer, index) => {
  //   return (
  //     <React.Fragment>
  //     <p>{answer.body}</p>
  //     <Typography variant="overline">By {answer.answerer_name}  | {answer.date} | HELPFUL | REPORT  </Typography>
  //     </React.Fragment>
  //   )

  // });



=======
>>>>>>> ce0db2ce62915164d546fffdf41d53109a6a72e7
  return (
    <React.Fragment>
      <Grid item xs={9}>
       <Answer />
      </Grid>
      <Grid item xs={9}>
        {/* <Typography variant="overline">By Username  | DATE | HELPFUL | REPORT  </Typography> */}
      </Grid>
    </React.Fragment>
  );
};

export default AnswerList;
<<<<<<< HEAD

  // useRef to be able to increase the count number without it resetting
  // const answerCount = useRef(1);

  // const getAnswers = (questionId) => {
  //   const config = {
  //     headers: { Authorization: token },
  //     params: {
  //       page: 1,
  //       count: 2
  //     }
  //   }
  //   const queryParam = questionId;
  //   // axios request to get the answers based on product_id
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
  //     .then((results) => {
  //       //set state
  //       // NEED TO SORT THE DATA BEFORE SETTING STATE
  //       setAnswers(answers => {
  //         return [...answers, ...results.data.results]
  //       })
  //       console.log(results.data.results);
  //     })
  //     .catch((err) => {
  //       console.error('Error: ', err);
  //     })
  // } //

  // on page load
  // useEffect(() => {
  //   getAnswers(props.questionId);
  // }, []);

  // // need a load more answers function
  // const moreAnswers = (e) => {
  //   answerCount.current++;
  //   getAnswers(answerCount)
  // }

  // // need to map over the answers and create a jsx element for them

  // const answerItem = answers.map((answer) => {
  //   return (
  //     <h1></h1>

  //   );
  // })
=======
>>>>>>> ce0db2ce62915164d546fffdf41d53109a6a72e7
