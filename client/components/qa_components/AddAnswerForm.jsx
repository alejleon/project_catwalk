import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Input } from '@material-ui/core';
import axios from 'axios';
import token from '../../config.js';



const AddAnswerForm = (props) => {

  const useStyles = makeStyles((theme) => ({
    // styles here
    form: {
    }
  }));

  // handle answer submission
  const submitAnswer = (e) => {
    // GET INFO FROM THE FORM
    console.log('submitted')

    // fire off POST request
  }

  //newAnswer is an object and I need to format it
  const postAnswer = (newAnswer, question_id) => {
    const config = {
      headers: { Authorization: token },
    }
    const queryParam = question_id;
    axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, {
      body: newAnswer.body,
      name: newAnswer.name,
      email: newAnswer.email,
      photos: newAnswer.photos //an array of urls
    }, config)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  }

  return (

    <form>
      <TextField id="answer"
        label="answer"
        placeholder="Write your answer here"
        required={true}
        inputProps={{ maxLength: 1000 }}
        multiline={true}
        rows="8"
        fullWidth={true}
      />
      <br />
      <TextField id="nickname"
        label="nickname"
        placeholder="Example: jack543!"
        required={true}
        inputProps={{ maxLength: 60 }}
        margin="normal"
      />
      <Typography>
        For privacy reasons, do not use your full name or email address
      </Typography>
      <TextField id="email"
        label="email"
        placeholder="Example: jack@email.com"
        required={true}
        inputProps={{ maxLength: 60 }}
      />
      <Typography>
        For authentication reasons, you will not be emailed
      </Typography>
      <br />
      <Typography>
        Upload your photos
      </Typography>
      <Input
        id="photos"
        type="file"
        inputProps={{
          // input props here
          //accept
          multiple: true,

        }} />
      <Button variant="outlined">Upload Photos</Button>
      <br />
      <br />
      <Button variant="contained">Submit Question</Button>

    </form>

  )
};



export default AddAnswerForm;