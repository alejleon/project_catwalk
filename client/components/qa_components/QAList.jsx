import React, { useState } from 'react';
import QACard from './QACard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, Typography, Paper, CssBaseline } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';


const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '75%',
    margin: '10%'
  }

}));


const QAList = (props) => {
  const classes = useStyles();

  // props.product_id  = product id
  var productId = 27188

  // Deal with state
  const [question, setQuestion] = useState({ question: undefined });
  const [productQs, setProductQs] = useState([]);    // list of all questions for a product_id

  const config = {
    headers: { Authorization: token },
    params: { product_id: productId }
  }

  const getQuestions = () => {
    // axios request to get the questions based on product_id passed down as props
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions', config)
      .then((results) => {
        // need to set State
        setProductQs(results.data.results);
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  };

  const handleClick = (e) => {
    console.log('clicked');
    getQuestions();

  }



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
        <QACard productQs={productQs}/>
        <Grid item xs={9} style={{ background: 'SeaShell' }}>
          <Typography>By Username  | DATE | HELPFUL | REPORT  </Typography>
        </Grid>
        <Grid item xs={4}>
        <Button onClick={handleClick}>Get request</Button>
      </Grid>
        <Grid item xs={10}>
          <Button variant="outlined" color="primary">MORE ANSWERED QUESTIONS</Button>
          <Button variant="outlined" color="secondary">ADD A QUESTION</Button>
        </Grid>
      </Grid>
    </div >


  );
};

export default QAList;