import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import AddQuestion from './AddQuestion.jsx';
import token from './config/config.js';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '80%',
    margin: '10%'
  }
}));

const QAMain = (props) => {
  const [currentProduct, setCurrentProduct] = useState({name: 'Camo Joggers'})
  const [productId, setProductId] = useState(27189); //props.product_id
  const [questionId, setQuestionId] = useState([]); // is this redundant? Check
  const [productQs, setProductQs] = useState([]);    // list of all questions for a product_id
  const [countQs, setCountQs] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(4);
  const [openQuestion, setOpenQuestion] = useState(false); // set Question dialog to false

  // use styles
  const classes = useStyles();


  // Axios HTTP GET Request for All Questions
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions';
  const getAllQuestions = () => {
    const config = {
      headers: { Authorization: token },
      params: {
        product_id: productId,
        page: 1,
        count: 100
      }
    }

    axios.get(url, config)
      .then((results) => {
        setProductQs(productQs => {
          return [...results.data.results];
        });
        setCountQs(countQs => {
          return results.data.results.length;
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  }

  // On "More answered questions" this expands the list to show all questions
  const allQuestions = (e) => {
    setDisplayedCount(countQs);
  }

  // Collapse displayed Questions to 1
  const collapseQuestions = (e) => {
    setDisplayedCount(1);
  }

  // Logic for opening Add Question Dialog
  const handleQOpen = () => {
    setOpenQuestion(true);
  }
  // Logic for closing Add Question Dialog
  const handleQClose = () => {
    setOpenQuestion(false);
  }

  // Get all Questions for a product on page load
  useEffect(() => {
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
        <QuestionList displayedQs={productQs.slice(0, displayedCount)} currentProduct={currentProduct} />
        <Grid item xs={10}>
          {displayedCount === countQs ?
          <Button variant="outlined" color="primary" onClick={collapseQuestions}>COLLAPSE QUESTIONS</Button>
           : <Button variant="outlined" color="primary" onClick={allQuestions}>MORE ANSWERED QUESTIONS</Button>}
          <Button variant="outlined" color="secondary" onClick={handleQOpen}>ADD A QUESTION</Button>
          <AddQuestion getAllQuestions={getAllQuestions} open={openQuestion} handleQClose={handleQClose} currentProduct={currentProduct}/>
        </Grid>
      </Grid>
    </div >


  );
};

export default QAMain;