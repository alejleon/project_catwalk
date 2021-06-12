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

const useStyles = makeStyles((theme) => ({
  // css styles go here
  grid: {
    width: '80%',
    margin: '10%'
  }
}));

const QAMain = (props) => {
  const [currentProduct, setCurrentProduct] = useState({ name: 'Camo Joggers' })
  const [productId, setProductId] = useState(27189); //props.product_id
  const [questionId, setQuestionId] = useState([]); // is this redundant? Check
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


  // Axios HTTP GET Request for All Questions
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
  }

  // Collapse displayed Questions to 1
  const collapseQuestions = (e) => {
    setDisplayedCount(1);
  }

  // Logic for opening Add Question Dialog
  const handleQOpen = () => {
    setOpenQuestion(true);
  }
  // Logic for closing Add Question Dialog
  const handleQClose = () => {
    setOpenQuestion(false);
  }

  const handleSearchOnChange = (newValue) => {
    setSearchInput(newValue);
    if(newValue.length < 2) {
      setSearchInput("");
    }
  }

  useEffect(()=> {
    console.log('searchInput', searchInput);
    if(searchInput.length > 2) {
      setFilteredQ(productQs.filter((question) => {
        return question.question_body.toLowerCase().includes(searchInput.toLowerCase())
      }));
    }
    if (searchInput.length === 0) {
      setFilteredQ(displayedQuestions);
    }
  }, [searchInput]);

  useEffect(()=> {
    setFinalQuestions(filteredQ.length === 0 ? displayedQuestions : filteredQ);
  }, [filteredQ])


  // Get all Questions for a product on page load
  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
  setDisplayedQuestions(productQs.slice(0, displayedCount));
  }, [productQs]);


  return (
    <div>
      <Grid container spacing={4} className={classes.grid} style={{ background: 'white' }}>
        <Grid item xs={12}>
          <Typography>Questions & Answers</Typography>
        </Grid>
        <Search searchInput={searchInput} handleSearchOnChange={handleSearchOnChange}/>
        <QuestionList
          displayedQs={filteredQ.length === 0 ? displayedQuestions : filteredQ} currentProduct={currentProduct} />

          {/* {productQs.slice(0, displayedCount)} */}
        <Grid item xs={10}>
          {displayedCount === countQs ?
            <Button variant="outlined" color="primary" onClick={collapseQuestions}>COLLAPSE QUESTIONS</Button>
            : <Button variant="outlined" color="primary" onClick={allQuestions}>MORE ANSWERED QUESTIONS</Button>}
          <Button variant="outlined" color="secondary" onClick={handleQOpen}>ADD A QUESTION</Button>
          <AddQuestion getAllQuestions={getAllQuestions} open={openQuestion} handleQClose={handleQClose} currentProduct={currentProduct} />
        </Grid>
      </Grid>
    </div >


  );
};

export default QAMain;