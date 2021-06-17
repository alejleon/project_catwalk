import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';



const AddAnswerForm = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  let newAnswer;
  let question_id = props.questionId;

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

  // this needs to resolve before we click submit
  //wrap in function and use async / await???
  const handleImageUpload = (e) => {
    let img = (e.target.files)
    let imgURL = URL.createObjectURL(img[0])
    setImages([...images, imgURL])
  };

  // Map over images to create thumbnails
    const imageItem = images.map((imageURL, index) => {
      return (
        <img src={imageURL} key={index} width="100px" height="100px" />
      );
    });


  // handle form submission
  const submitAnswer = (e) => {
    e.preventDefault();
   newAnswer = {
      body,
      name,
      email,
      photos: images
    }
   console.log("newAnswer", newAnswer);
    postAnswer(newAnswer, question_id);
    props.handleAClose();
  }

  const postAnswer =(newAnswer, question_id) => {
    const queryParam = question_id;
    console.log(newAnswer);
    const config = {
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`,
      headers: { Authorization: GITHUB_API_TOKEN,
      ContentType: 'application/json' },
      data: newAnswer
    }
    axios(config)
    .then((result)=> {
      console.log(result);
      props.getAnswers(question_id);
    })
    .catch((err) => {
      console.error('Error: ', err);
    })
  }

  return (
    <form className="answerForm" onSubmit={submitAnswer}>
      <TextField id="answer"
        label="answer"
        value ={body}
        onChange={handleBodyChange}
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
        value={name}
        onChange={handleNicknameChange}
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
        value={email}
        onChange={handleEmailChange}
        placeholder="Example: jack@email.com"
        required={true}
        type="email"
        inputProps={{ maxLength: 60 }}
      />
      <Typography>
        For authentication reasons, you will not be emailed
      </Typography>
      <br />
      <Typography>
        Upload your photos
      </Typography>
      {images.length < 5 ? <Input
        id="photos"
        type="file"
        onChange={handleImageUpload}
        inputProps={{
          multiple: true,
        }} /> : <div></div>}
        {images !== undefined ? <React.Fragment>{imageItem}</React.Fragment> : <div></div>}
      <br />
      <br />
      <Button type="submit" variant="contained">Submit Question</Button>
    </form>
  )
};

export default AddAnswerForm;