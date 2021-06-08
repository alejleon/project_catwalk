import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import AnswerList from './AnswerList.jsx';

const Question = (props) => {
  // local State here
  console.log(props.question.answers);


  return (
    <React.Fragment>
      <Grid item xs={9} style={{ background: 'SeaShell' }} key={props.question_id}>
        Q: {props.question.question_body}
      </Grid>
      <Grid item xs={9}>
        <AnswerList answers={props.question.answers}/>
      </Grid>
      <Grid item xs={9}>
            <Button>
              <Typography variant="button">
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
