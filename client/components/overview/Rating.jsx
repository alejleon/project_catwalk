import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from './config/config.jsx';
import {Grid} from '@material-ui/core';

const Ratings = ({ratingsAverage}) => {

  //create a function that gets reviews ratings and gets the average of those


  const [rating, setRating] = useState(0);





  return (
    <Grid container style={{background: 'red'}}>
      <Grid item xs={12} >{ratingsAverage + ' Stars'}</Grid>
    </Grid>
  )


}

export default Ratings