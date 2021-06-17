import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating'


const Ratings = ({ratingsAverage, ratingsTotal}) => {


  return (
    <Grid container spacing={2} style={{background: 'lavender'}}>
      <Grid item xs={6}>

        <Rating
          value={ratingsAverage}
          precision={0.25}
          disabled={true}
          name="unique-rating"
        />

      </Grid>
      <Grid item xs={4}>
        <a href="#reviews" >See all {ratingsTotal} Reviews</a>
      </Grid>

    </Grid>
  )


}

export default Ratings