import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from './config/config.jsx';
import {Grid} from '@material-ui/core';

const Ratings = () => {

  //create a function that gets reviews ratings and gets the average of those


  const [rating, setRating] = useState(0);

  var getRating = (id) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews';

    axios.get(url, {
      headers: {
        Authorization: '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'
      },
      params: {
        product_id: 27189
      }
    })
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
    <Grid container style={{background: 'red'}}>
      <Grid item xs={12} >Hello From Ratings</Grid>
    </Grid>
  )


}

export default Ratings