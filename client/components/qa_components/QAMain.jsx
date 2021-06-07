import React, { useState, useEffect, useRef } from 'react';
import QACard from './QACard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '75%',
    margin: '10%'
  }
}));

const QAMain = (props) => {
  // Deal with state
  const [productId, setProductId] = useState([props.product_id]);
  const [questionId, setQuestionId] = useState([]); // is this redundant? Check
  const [productQs, setProductQs] = useState([]);    // list of all questions for a product_id
  // const [count, setCount] = useState(1);

  // use styles
  const classes = useStyles();

  // useRef to be able to increase the count number without it resetting
  const refCount = useRef(1);


  const getQuestions = (pageNum) => {
    const config = {
      headers: { Authorization: token },
      params: {
        product_id: 27188,
        page: pageNum,
        count: 4
      }
    }
    // axios request to get the questions based on product_id passed down as props
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions', config)
      .then((results) => {
        var qId = results.data.results.map((question) => {
          return question.question_id
        });
        setProductQs(productQs => {
          return [...productQs, ...results.data.results];
        });
        setQuestionId(questionId => {
          return [...questionId, ...qId]
        });
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
    }

    const moreQuestions = (e) => {
      // increase refCount
      refCount.current++;
      getQuestions(refCount.current);
    }
    // on page load this is like componenetDidMount
    useEffect(() => {
      getQuestions(refCount.current);
    }, []);


    return (
      <div>
        <CssBaseline />
        <Grid container spacing={4} className={classes.grid} style={{ background: 'white' }}>
          <Grid item xs={12}>
            <Typography>Questions & Answers</Typography>
          </Grid>
          <Grid item xs={12} style={{ background: 'red' }}>
            <Typography>SEARCH COMPONENT GOES HERE</Typography>
          </Grid>
          <QACard productQs={productQs} questionId={questionId} />
          {/* <Grid item xs={9} style={{ background: 'SeaShell' }}>
            <Typography>By Username  | DATE | HELPFUL | REPORT  </Typography>
          </Grid> */}
          <Grid item xs={10}>
            <Button variant="outlined" color="primary" onClick={moreQuestions}>MORE ANSWERED QUESTIONS</Button>
            <Button variant="outlined" color="secondary">ADD A QUESTION</Button>
          </Grid>
        </Grid>
      </div >


    );
  };

  export default QAMain;