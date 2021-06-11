import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from './config/config.jsx';
import {Grid} from '@material-ui/core';
import StarRatings from 'react-star-ratings';

const Ratings = ({ratingsAverage}) => {


  return (
    <Grid container style={{background: 'pink'}}>
      <Grid item xs={6}>
        <StarRatings
          numberOfStars={5}
          rating={ratingsAverage}
          starRatedColor="rgb(171,22,37)"
          starHoverColor="rgb(230, 67, 47)"
          starEmptyColor="rgb(240,240,240)"
          starDimension="20px"
          starSpacing="2px"
        />
      </Grid>
      <Grid item xs={4}>
        <a >See Reviews</a>
      </Grid>
    </Grid>
  )


}

export default Ratings