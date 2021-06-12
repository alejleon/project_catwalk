import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';


const AddQuestionForm = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  let newQuestion;
  let product_id = 27189;

  const useStyles = makeStyles((theme) => ({
    // styles here
    form: {

    }


  }));

  // Handle form inputs
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleNicknameChange = (e) => {
    setName(e.target.value);
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value);

  }
  // handle form submission
  const submitQuestion = (e) => {
    e.preventDefault();
    // get info from the form submission
    console.log('submitted');
    newQuestion = {
      body,
      name,
      email
    }
    postQuestion(newQuestion, product_id);

    props.handleQClose();

  }


  // Axios POST request - add question to the database
  const postQuestion = (newQuestion, product_id) => {
    newQuestion.product_id = product_id;

    const config = {
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions',
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: newQuestion
    }

    axios(config)
      .then((result) => {
        console.log(result);
        props.getAllQuestions();

      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  }


  return (
    <form className="questionForm" onSubmit={submitQuestion}>
      <TextField id="question"
        label="question"
        value={body}
        onChange={handleBodyChange}
        placeholder="What would you like to ask?"
        required={true}
        inputProps={{ maxLength: 1000 }}
        multiline={true}
        rows="8"
        fullWidth={true}
      />
      <br />
      <TextField id="nickname"
        label="nickname"
        value={name}
        onChange={handleNicknameChange}
        placeholder="Example: jackson11!"
        required={true}
        inputProps={{ maxLength: 60 }}
        margin="normal"
      />
      <Typography>
        For privacy reasons, do not use your full name or email address
       </Typography>
      <TextField id="email"
        label="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Why did you like the product or not?"
        required={true}
        type="email"
        inputProps={{ maxLength: 60 }}
        margin="normal" />
      <Typography>
        For authentication reasons, you will not be emailed
     </Typography>
      <br />
      <br />
      <Button type="submit" variant="contained">Submit Question</Button>
    </form>


  )
};



export default AddQuestionForm;