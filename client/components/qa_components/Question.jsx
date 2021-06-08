import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import AnswerList from './AnswerList.jsx';
import axios from 'axios';
import token from './config/config.js';

const Question = (props) => {
  // local State here
  const [allAnswers, setAllAnswers] = useState([]); // all answers for ONE question
  const [displayedAnswers, setDisplayedAnswers] = useState([]);
  const [allAnswersCount, setAllAnswersCount] = useState([]);
  const [displayedAnswersCount, setDisplayedAnswersCount] = useState([]);

  const questionId = props.question.question_id;
  // console.log(questionId);

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

  const getDisplayedAnswers = (questionId, count) => {
    const config = {
      headers: { Authorization: token },
      params: {
        page: count,
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
    answerPageCount.current++;
    getDisplayedAnswers(questionId, answerPageCount.current);
  }


  // show answers on page load
  useEffect(() => {
    getAnswers(questionId);
    getDisplayedAnswers(questionId, answerPageCount.current);
  }, []);




  return (
    <React.Fragment>
      <Grid item xs={9} style={{ background: 'SeaShell' }} key={props.question_id}>
        Q: {props.question.question_body}
      </Grid>
      <Grid item xs={9}>
        <AnswerList displayedAnswers={displayedAnswers}/>
      </Grid>
      <Grid item xs={9}>
            <Button>
              <Typography variant="button" onClick={moreAnswers}>
                Load More Answers
              </Typography>
            </Button>
          </Grid>
    </React.Fragment>
  );
};

export default Question;
  // Map over each question and create a QuestionCard for each question
  // // console.log('our questions', props.displayedQs);




  // const QuestionCard = props.displayedQs.map((question) => {
  //   // if question has no anwsers
  //   if (Object.keys(question.answers).length === 0) {
  //     return (
  //       <React.Fragment>
  //         <Grid item xs={9} style={{ background: 'SeaShell' }} key={question.question_id}>
  //           Q: {question.question_body}
  //         </Grid>
  //         <Grid item xs={9}>
  //          <Answer getAnswers={getAnswers} displayedAnswers={displayedAnswers} questionId={question.question_id} />
  //         </Grid>
  //       </React.Fragment>
  //     )
  //   } else {
  //     return (
  //       <React.Fragment>
  //         <Grid item xs={9} style={{ background: 'SeaShell' }} key={question.question_id}>
  //           Q: {question.question_body}
  //         </Grid>
  //         <Grid item xs={3}>
  //           <Typography variant="body2">
  //             Helpful? Yes | Add Answer Here
  //         </Typography>
  //         </Grid>
  //         <Answer getAnswers={getAnswers} displayedAnswers={displayedAnswers} questionId={question.question_id} /> {/*pass questionID down as props? Does this work? YESSS*/}
  //         <Grid item xs={9}>
  //           <Button onClick={moreAnswers}>
  //             <Typography variant="button">
  //               Load More Answers
  //             </Typography>
  //           </Button>
  //         </Grid>
  //       </React.Fragment>
  //     );
  //   }
  // });
