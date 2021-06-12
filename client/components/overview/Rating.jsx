import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';
import { Grid } from '@material-ui/core';

const Ratings = () => {

  const [rating, setRating] = useState(0);
<<<<<<< HEAD
=======

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews';
  const headers = {
    headers: {
      Authorization: GITHUB_API_TOKEN
    }
  };
  const params = {
    product_id: 27189
  }

  //create a function that gets reviews ratings and gets the average of those
>>>>>>> a540b1603987c7c11dccccee21020b196028d530
  var getRating = (id) => {

    axios.get(`${url}?product_id=${params.product_id}`, headers)
      .then((response => {
        // console.log(response)
      }))
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getRating()
  })






  return (
    <Grid container style={{ background: 'red' }}>
      <Grid item xs={12} >Hello From Ratings</Grid>
    </Grid>
  )


}

export default Ratings