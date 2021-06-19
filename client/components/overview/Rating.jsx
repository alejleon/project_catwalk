import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating'


const Ratings = ({ratingsAverage, ratingsTotal}) => {


  return (
    <Grid container spacing={2} >
      <Grid item xs={3} style={{minWidth: "120px"}}>
      {ratingsTotal &&
        <Rating
          value={ratingsAverage}
          precision={0.25}
          disabled={true}
          name="unique-rating"
        />
      }

      </Grid>
      <Grid item xs={5}>
        <a href="#reviews" >See all {ratingsTotal} Reviews</a>
      </Grid>
    </Grid>
  )


}

export default Ratings