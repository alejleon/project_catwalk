import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import Question from './Question.jsx';

const QuestionList = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]); // all answers for ONE question
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [allAnswersCount, setAllAnswersCount] = useState([]);
  const [displayedAnswersCount, setDisplayedAnswersCount] = useState([]);

  // // get answers
  // const answerPageCount = useRef(1);
  // const getAnswers = (questionId) => {
  //   const config = {
  //     headers: { Authorization: GITHUB_API_TOKEN },
  //   }
  //   const queryParam = questionId;
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
  //     .then((results) => {
  //       // NEED TO SORT THE DATA BEFORE SETTING STATE
  //       setAllAnswers(allAnswers => {
  //         return [...allAnswers, ...results.data.results]
  //       })
  //       console.log(results.data.results);
  //     })
  //     .catch((err) => {
  //       console.error('Error: ', err);
  //     })
  // }

  // const getDisplayedAnswers = (questionId) => {
  //   const config = {
  //     headers: { Authorization: token },
  //     params: {
  //       page: 1,
  //       count: 2
  //     }
  //   }
  //   const queryParam = questionId;
  //   axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
  //     .then((results) => {
  //       // NEED TO SORT THE DATA BEFORE SETTING STATE
  //       setDisplayedAnswers(displayedAnswers => {
  //         return [...displayedAnswers, ...results.data.results]
  //       })
  //     })
  //     .catch((err) => {
  //       console.error('Error: ', err);
  //     })

  // };





  // // I believe I can get rid of the following:
  // // load answers
  // const moreAnswers = (e) => {
  //   console.log('clicked')
  //   console.log(props.displayedQs);
  //   // answerPageCount.current++;
  //   // getAnswers(answerPageCount.current);
  // }


  // show answers on page load
  useEffect(() => {
    // getAnswers(props.productId);
  }, []);
/////////////////////////////////////
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