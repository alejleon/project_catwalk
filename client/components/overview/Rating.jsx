import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating'


const Ratings = ({ratingsAverage}) => {


  return (
    <Grid container spacing={5} style={{background: 'lavender'}}>
      <Grid item xs={6}>

        <Rating
          value={ratingsAverage}
          precision={0.25}
          disabled={true}
          name="unique-rating"


        />


        {/* <StarRatings
          numberOfStars={5}
          rating={ratingsAverage}
          starRatedColor="rgb(171,22,37)"
          starHoverColor="rgb(230, 67, 47)"
          starEmptyColor="rgb(240,240,240)"
          starDimension="20px"
          starSpacing="2px"
        /> */}
      </Grid>
      <Grid item xs={4}>
        <a >See Reviews</a>
      </Grid>

    </Grid>
  )


}

export default Ratings