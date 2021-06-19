import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AnswerList from './AnswerList.jsx';
import AddAnswer from './AddAnswer.jsx';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';


const useStyles = makeStyles((theme) => ({
  button: {
    fontSize: 14,
    textTransform: 'capitalize',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'underline'
  },

  indent: {
    textIndent: '20px',
  }
}));

const Question = (props) => {

  const [allAnswers, setAllAnswers] = useState([]);
  const [allAnswersCount, setAllAnswersCount] = useState([]);
  const [displayedAnswersCount, setDisplayedAnswersCount] = useState(2);
  const [openAnswer, setOpenAnswer] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [reportedQ, setReportedQ] = useState(false);
  const [quesId, setQuesId] = useState(props.question.question_id)
  const questionId = props.question.question_id;

  // use styles
  const classes = useStyles();


  //*****************START ANSWER LOGIC*************************************/
  // Get all Answers to a particular question base on question_id
  const getAnswers = (questionId) => {
    const config = {
      headers: { Authorization: GITHUB_API_TOKEN },
      params: {
        page: 1,
        count: 100
      }
    }
    const queryParam = questionId;
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/answers`, config)
      .then((results) => {
        setAllAnswers(allAnswers => {
          return [...sortAnswers(results.data.results)]
        })
        setAllAnswersCount(allAnswers => {
          return results.data.results.length;
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      })
  }

  // Loads all answers to question
  const loadMoreAnswers = (e) => {
    setDisplayedAnswersCount(displayedAnswersCount + 2);
  }
  // Logic to collapse Answers down to 2
  const collapseAnswers = (e) => {
    setDisplayedAnswersCount(2);
  }
  // Logic to sort answers (seller comes first)
  const sortAnswers = (answers) => {
    const seller = answers.filter(answer => answer.answerer_name.toLowerCase() === 'seller');
    const rest = answers.filter(answer => answer.answerer_name.toLowerCase() !== 'seller');
    const sortedAnswers = seller.concat(rest);
    return sortedAnswers;
  };
  //*****************END ANSWER LOGIC*************************************/




  //*****************START ANSWER DIALOG LOGIC****************************/
  // Logic for opening Add Answer Dialog
  const handleAOpen = () => {
    setOpenAnswer(true);
  }
  // Logic for closing Add Answer Dialog
  const handleAClose = () => {
    setOpenAnswer(false);
  }
  //*****************END ANSWER DIALOG LOGIC*****************************/



  //*****************START MARK Q AS HELPFUL ****************************/
  // Logic for marking a question as helpful
  const markHelpful = (e) => {
    const queryParam = questionId;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/helpful`,
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
  //*****************END MARK Q AS HELPFUL ****************************/

  //*****************START REPORT Q ****************************/
  // Logic for Reporting a Question
  const reportQuestion = (e) => {
    console.log('reported');
    const queryParam = questionId;
    const config = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/${queryParam}/report`,
      headers: {
        Authorization: GITHUB_API_TOKEN,
        ContentType: 'application/json'
      },
      data: null
    }
    if (!reportedQ) {
      axios(config)
        .then((result) => {
          console.log(result);
          setReportedQ(true);
        })
        .catch((err) => {
          console.error("Error reporting question: ", error);
        })
    }
  };
  //*****************END REPORT Q ****************************/


  //*****************START useEffect LOGIC ****************************/
  // Gets all answers for a product on page load
  useEffect(() => {
    getAnswers(props.question.question_id);
  }, []);

  // UPDATE STATE BASED ON CHANGING PROPS
  useEffect(() => {
    getAnswers(props.question.question_id);
  }, [props.question.question_id]);

  useEffect(() => {
    sortAnswers(allAnswers);
  }, [allAnswers]);
  //*****************END useEffect LOGIC ****************************/


  return (
    <React.Fragment>
      <Grid container={true} spacing={1}>
        <Grid item xs={10} key={props.question_id} >
          <Typography variant="h6" >
            <Box fontWeight="fontWeightBold" display="inline">
              Q: {props.question.question_body}
            </Box>
            <Box className={classes.button} onClick={reportQuestion} style={{textIndent: '30px'}}>
              {reportedQ ? 'Reported' : 'Report Question'}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>
            <Box fontSize={14} >
              Helpful?&nbsp;
              <span className={classes.button} onClick={markHelpful}>
                Yes&nbsp;
              </span>
              ({isHelpful ? props.question.question_helpfulness + 1
                : props.question.question_helpfulness})
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>
            <Box className={classes.button} onClick={handleAOpen}>
              Add Answer
            </Box>
          </Typography>
          <AddAnswer open={openAnswer}
            handleAClose={handleAClose}
            currentProduct={props.currentProduct}
            question={props.question.question_body}
            getAnswers={getAnswers}
            questionId={questionId}
          />
        </Grid>
        <Grid item xs={9}>
          {allAnswers.length > 0 ?
            <AnswerList displayedAnswers={allAnswers.slice(0, displayedAnswersCount)}
              getAnswers={getAnswers} questionId={questionId} />
            : <Button onClick={handleAOpen}>
              <Typography variant="caption" className={classes.indent}>
                Add an answer
              </Typography>
            </Button>}
        </Grid>
        <Grid item xs={9}>
          <Box fontWeight="fontWeightBold">
            {displayedAnswersCount >= allAnswersCount ? ""
              : <Button onClick={loadMoreAnswers}>
                <Typography variant="caption" className={classes.indent}>
                  Load More Answers
                </Typography>
              </Button>}
            {displayedAnswersCount < 3 ? ""
              : <Button onClick={collapseAnswers}>
                <Typography variant="caption" className={classes.indent}>
                  Collapse Answers
                </Typography>
              </Button>}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Question;
