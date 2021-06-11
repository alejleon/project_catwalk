import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Input } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';



const AddAnswerForm = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  let newAnswer;
  let question_id = 202639;

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

  const handleImageUpload = (e) => {
    console.log('testing');
    let img = (e.target.files)
    let imgURL = URL.createObjectURL(img[0])
    setImages([...images, imgURL])

    console.log('images', images)
    // const imageReader = new FileReader();
    // imageReader.readAsDataURL(files[0]);
    // imageReader.onload = (e) => {
    //   console.log("img data", e.target.result);
      // do axios request??

    };

    const imageItem = images.map((imageURL, index) => {
      return (
        <img src={imageURL} width="100px" height="100px" />
      );
    });




  // handle form submission
  const submitAnswer = (e) => {
    e.preventDefault();
    // get info from the form submission
    console.log({name, email, body, images});
   newAnswer = {
      body,
      name,
      email,
      photos
    }

    // postAnswer(newAnswer, question_id);
    props.handleAClose();

  }



  //newAnswer is an object and I need to format it
  // const postAnswer =(newAnswer, question_id) => {
  //   const queryParam = question_id;
  //   console.log(newAnswer);
  //   const config = {
  //     method: 'post',
  //     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`,
  //     headers: { Authorization: token,
  //     ContentType: 'application/json' },
  //     data: newAnswer
  //   }
  //   // axios(config)
  //   // .then((result)=> {
  //   //   console.log(result);
  //   // })
  //   // .catch((err) => {
  //   //   console.error('Error: ', err);
  //   // })
  // }

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