import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Input } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';



const AddAnswerForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    // styles here
    form: {

    }


  }));

  // handle answer submission
  const submitAnswer = (e) => {
    console.log('submitted')

    // fire off POST request
  }


  // Axios post Request

  return (

    <form>
      <TextField id="answer"
        label="answer"
        placeholder="Write your answer here"
        required= {true}
        inputProps={{ maxLength: 1000 }}
        multiline= {true}
        rows="8"
        fullWidth= {true}
      />
      <br />
      <TextField id="nickname"
        label="nickname"
        placeholder="Example: jack543!"
        required= {true}
        inputProps={{ maxLength: 60 }}
        margin="normal"
      />
      <Typography>
        For privacy reasons, do not use your full name or email address
       </Typography>
      <TextField id="email"
        label="email"
        placeholder="Example: jack@email.com"
        required= {true}
        inputProps={{ maxLength: 60 }}
        margin="normal"/>
      <Typography>
        For authentication reasons, you will not be emailed
     </Typography>
     <br />
     <Typograpy>Upload your photos</Typograpy>
    <Input />
    <Input
        id="photos"
        type="file"
        margin="normal"
        inputProps={{
         // input props here
         //accept
         multiple: true,

        }} />
        <br />
        <Button variant="outlined">Upload Photos</Button>
        <br />
        <br />
      <Button variant="contained">Submit Question</Button>

    </form>

  )
};



export default AddAnswerForm;