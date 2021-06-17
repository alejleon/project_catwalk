import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import moment from 'moment';
import GITHUB_API_TOKEN from '../../config.js';


const useStyles = makeStyles((theme) => ({
  // css styles go here
  button: {
    fontSize: 14,
    textTransform: 'capitalize',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
}));

const Answer = (props) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [reported, setReported] = useState(false);

  const classes = useStyles();
  const date = new moment(props.answer.date).format("l");

  //format Date function
  const handleHelpful = (e) => {
    console.log('clicked');
  }

  //ANSWER ID = props.answer.answer_id

  // Logic for marking an answer as helpful
  const markAnswerHelpful = (e) => {
    const queryParam = props.answer.answer_id;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/answers/${queryParam}/helpful`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!isHelpful) {
      console.log('mark this as helpful');
      axios(config)
        .then((result) => {
          setIsHelpful(true);
        })
        .catch((err) => {
          console.error("Error marking as helpful: ", error);
        })
    }
  };

  // Logic for Reporting an Answer
  const reportAnswer = (e) => {
    const queryParam = props.answer.answer_id;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/answers/${queryParam}/report`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!reported) {
      axios(config)
        .then((result) => {
          setReported(true);
        })
        .catch((err) => {
          console.error("Error reporting answer: ", error);
        })
    }
  };

  const photoItem = props.answer.photos.map((photo, index) => {
    console.log(photo);
    return (
      <img src={photo.url} width="250px" height="auto" style={{margin: '5px'}} />
      );
  });

  console.log('photoItem', props.answer.photos)

  return (
    <React.Fragment>
      <Typography component="div">
        <Box fontWeight="fontWeightBold" display="inline" >A: </Box> {props.answer.body}
      </Typography>
      <Box>
        {photoItem}

      </Box>
      <Typography variant="overline">
        <Box style={{ textIndent: '25px' }}>
          By {props.answer.answerer_name}  |  {date}  |  helpful  <Box className={classes.button} display="inline" onClick={markAnswerHelpful}>
            yes</Box>  ({isHelpful ? props.answer.helpfulness + 1 : props.answer.helpfulness})
          |  {reported ? Reported :
            <Box className={classes.button} display="inline" onClick={reportAnswer}>Report</Box>}
        </Box>
      </Typography>
    </React.Fragment>
  )
};

export default Answer;
// {props.answer.date.slice(0, 10)}