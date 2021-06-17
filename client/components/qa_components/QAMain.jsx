import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import QuestionList from './QuestionList.jsx';
import AddQuestion from './AddQuestion.jsx';
import Search from './Search.jsx';
import GITHUB_API_TOKEN from '../../config.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';

const primary = green[500];

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '80%',
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '5px',
    marginBottom: '5px'
  },

  btn: {
    marginRight: '20px'
  }
}));

const QAMain = (props) => {
  const [currentProduct, setCurrentProduct] = useState(props.product);
  const [productId, setProductId] = useState(props.product_id); //props.product_id
  const [productQs, setProductQs] = useState([]);    // list of all questions for a product_id
  const [countQs, setCountQs] = useState(0);
  const [displayedCount, setDisplayedCount] = useState(4);
  const [openQuestion, setOpenQuestion] = useState(false); // set Question dialog to false
  const [searchInput, setSearchInput] = useState("");
  const [filteredQ, setFilteredQ] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [finalQuestions, setFinalQuestions] = useState([]);


  // use styles
  const classes = useStyles();

  //***************** START GET QUESTIONS LOGIC *************************************/
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions';
  const getAllQuestions = () => {
    const config = {
      headers: { Authorization: GITHUB_API_TOKEN },
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
    setDisplayedQuestions(productQs);
  }

  // Collapse displayed Questions to 1
  const collapseQuestions = (e) => {
    setDisplayedQuestions(productQs.slice(0, 4));
    setDisplayedCount(4);
  }
  //***************** END GET QUESTIONS LOGIC *************************************/

  //***************** START ADD QUESTION DIALOG LOGIC ****************************/
  // Logic for opening Add Question Dialog
  const handleQOpen = () => {
    setOpenQuestion(true);
  }
  // Logic for closing Add Question Dialog
  const handleQClose = () => {
    setOpenQuestion(false);
  }
  //***************** END ADD QUESTION DIALOG LOGIC **************************/

  //***************** START SEARCH LOGIC *************************************/
  const handleSearchOnChange = (newValue) => {
    setSearchInput(newValue);
    if (newValue.length < 2) {
      setSearchInput("");
    }
  }

  const handleSearchClear = () => {
    setSearchInput("");
  }
  //***************** END SEARCH LOGIC *************************************/

  //***************** START useEffect LOGIC *********************************/
  useEffect(() => {
    // console.log('searchInput', searchInput);
    if (searchInput.length > 2) {
      setFilteredQ(productQs.filter((question) => {
        return question.question_body.toLowerCase().includes(searchInput.toLowerCase())
      }));
    }
    if (searchInput.length === 0) {
      setFilteredQ(displayedQuestions);
    }
  }, [searchInput]);

  useEffect(() => {
    setFinalQuestions(filteredQ.length === 0 ? displayedQuestions : filteredQ);
  }, [filteredQ])

  // Get all Questions for a product on page load
  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    setDisplayedQuestions(productQs.slice(0, displayedCount));
  }, [productQs]);

  useEffect(() => {
    setCurrentProduct(props.product);
  }, [props.product]);

  useEffect(() => {
    setProductId(props.product_id);
  }, [props.product_id]);
  //***************** END useEffect LOGIC *********************************/


  return (
    <div>
      <Grid container spacing={0} className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h5">Questions & Answers</Typography>
        </Grid>
        <Grid item xs={12}>
          <Search searchInput={searchInput} handleSearchOnChange={handleSearchOnChange}
            handleSearchClear={handleSearchClear} />
          <br />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid container item xs={12} style={
          { background: '#fafafa', maxHeight: '600px', overflowY: 'auto', overflowX: 'hidden' }}>
          <QuestionList
            displayedQs={filteredQ.length === 0 ? displayedQuestions : filteredQ}
            currentProduct={currentProduct} />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={10}>
            {displayedCount === countQs ?
              <Button variant="contained" className={classes.btn}
                onClick={collapseQuestions}>
                COLLAPSE QUESTIONS
              </Button>
              : <Button className={classes.btn} variant="contained"
                onClick={allQuestions}
              >MORE ANSWERED QUESTIONS
              </Button>}
            <Button
              variant="contained"
              onClick={handleQOpen}>
              ADD A QUESTION
            </Button>
            <AddQuestion
              getAllQuestions={getAllQuestions}
              open={openQuestion}
              handleQClose={handleQClose}
              currentProduct={currentProduct} />
          </Grid>
        </Grid>
      </Grid>
    </div >
  );
};

export default QAMain;