import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';



const AddQuestionForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    // styles here
    form: {

    }


  }));

  // handle question submission
  const submitQuestion = (e) => {
    console.log('submitted')

    // fire off POST request
  }


  // Axios post Request

  return (

    <form>
      <TextField id="question"
        label="question"
        placeholder="What would you like to ask?"
        required="true"
        inputProps={{ maxLength: 1000 }}
        multiline="true"
        rows="8"
        fullWidth="true"
      />
      <br />
      <TextField id="nickname"
        label="nickname"
        placeholder="Example: jackson11!"
        required="true"
        inputProps={{ maxLength: 60 }}
        margin="normal"
      />
      <Typography>
        For privacy reasons, do not use your full name or email address
       </Typography>
      <TextField id="email"
        label="email"
        placeholder="Why did you like the product or not?"
        required="true"
        inputProps={{ maxLength: 60 }}
        margin="normal"/>
      <Typography>
        For authentication reasons, you will not be emailed
     </Typography>
     <br />
      <Button variant="contained">Submit Question</Button>




    </form>

  )
};



export default AddQuestionForm;