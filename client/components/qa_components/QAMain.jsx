import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import token from '../overview/config/config.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '75%',
    margin: '10%'
  }
}));

const QAMain = (props) => {
  // Deal with state
  const [productId, setProductId] = useState(27189); //props.product_id
  const [questionId, setQuestionId] = useState([]); // is this redundant? Check
  const [productQs, setProductQs] = useState([]);    // list of all questions for a product_id
  const [displayedQs, setDisplayedQs] = useState([]);
  const [countQs, setCountQs] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(0);

  // use styles
  const classes = useStyles();

  // useRef to be able to increase the count number without it resetting
  const getCount = useRef(1);

  // Axios
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions';

  const getAllQuestions = () => {
    const config = {
      headers: { Authorization: token },
      params: { product_id: productId }
    }

    axios.get(url, config)
      .then((results) => {
        setProductQs(productQs => {
          return [...productQs, ...results.data.results];
        });
        setCountQs(countQs => {
          return results.data.results.length;
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }

  const getDisplayedQuestions = (pageNum) => {
    const config = {
      headers: { Authorization: token },
      params: {
        product_id: productId,
        page: pageNum,
        count: 1
      }
    }
    // axios request to get the questions based on product_id passed down as props
    axios.get(url, config)
      .then((results) => {
        var qId = results.data.results.map((question) => {
          return question.question_id
        });

        // NEEED TO SORT ALL THE DATA BEFORE SETTING STATE
        setDisplayedQs(displayedQs => {
          return [...displayedQs, ...results.data.results];
        });
        setQuestionId(questionId => {
          return [...questionId, ...qId]
        });
        setDisplayedCount(displayedCount => {
          return displayedCount + results.data.results.length;
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  };


  const moreQuestions = (e) => {
    getCount.current++;
    getDisplayedQuestions(getCount.current);
  }

  // on page load this is like componenetDidMount
  useEffect(() => {
    getDisplayedQuestions(getCount.current);
    getAllQuestions();
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
        <QuestionList displayedQs={displayedQs} />
        <Grid item xs={10}>
          <Button variant="outlined" color="primary" onClick={moreQuestions}>MORE ANSWERED QUESTIONS</Button>
          <Button variant="outlined" color="secondary">ADD A QUESTION</Button>
        </Grid>
      </Grid>
    </div >


  );
};

export default QAMain;