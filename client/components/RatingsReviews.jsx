import React, { useState, useEffect, useRef } from 'react';
import ReviewList from './ReviewList.jsx';
import Sidebar from './Sidebar.jsx';
import axios from 'axios';
import GITHUB_API_TOKEN from './overview/config/config.jsx';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//Should receive the current_item id number from App
const RatingsReviews = (props) => {

  //State variables and setters
  const [reviewList, setReviewList] = useState([]);
  const [metaData, setMetaData] = useState([]);
  const [open, setOpen] = useState(false);
  const [addCount, setAddCount] = useState(1);

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/';
  const headers = {
    headers: { Authorization: GITHUB_API_TOKEN }
  };

  const sort = useRef('relevant');

  //Add reviews button click event handler. Renders 2 more reviews to the screen.
  const addReviews = (event) => {
    event.preventDefault();
    setAddCount(addCount + 1);
  };

  //Sort order change button click event handler. Resets the page number to 1 and sets the sort
  //order to the selected option.
  const handleSortChange = (event) => {
    sort.current = event.target.value;
    setAddCount(1);
  };



  //Get all reviews
  useEffect(() => {
    axios.get(`${url}?product_id=${props.product_id}&page=1&count=1000&sort=${sort.current}`, headers)
      .then((response) => {
        setReviewList(response.data.results);
      })
      .catch((err) => {
        console.log('Trouble retrieving two reviews. Error: ', err);
      })
  }, [sort.current]);


  //Get all review meta data
  useEffect(() => {
    axios.get(`${url}meta?product_id=${props.product_id}`, headers)
      .then((response) => {
        console.log(response.data);
        setMetaData(response.data);
      })
      .catch((err) => {
        console.log('Failed to retrieve metadata. Error: ', err);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

  const classes = useStyles();

  return (
    <Grid container direction="row" spacing={1}>
      <Grid container item xs={12} md={3} lg={3} spacing={1}>
        {metaData.ratings ? <Sidebar metaData={metaData} /> : null}
      </Grid>
      <Grid container item xs={12} md={9} lg={9} spacing={1} direction="column">
        <Grid container item direction="row" spacing={1}>
          <p>{reviewList.length} reviews, sorted by</p>
          <FormControl className={classes.formControl}>
            <Select
              labelId="open-select-label"
              id="open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sort.current}
              onChange={handleSortChange}
            >
              <MenuItem value={'relevant'}>relevant</MenuItem>
              <MenuItem value={'newest'}>newest</MenuItem>
              <MenuItem value={'helpful'}>helpful</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <ReviewList reviews={reviewList.slice(0, addCount * 2)} />
        {reviewList.length > addCount * 2 ? <Button
          onClick={addReviews}
          id="add-reviews"
          style={{ maxWidth: '200px', maxHeight: '80px', minWidth: '80px', minHeight: '80px' }}
        >See More Reviews
        </Button> : null}
      </Grid>
    </Grid >
  );
};

export default RatingsReviews;