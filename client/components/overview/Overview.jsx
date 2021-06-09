import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from './config/config.jsx'
import ImageGallery from './ImageGallery.jsx';
import ProductOverview from './ProductOverview.jsx';
import {Grid} from '@material-ui/core';


const Overview = (props) => {


  //Will need to do a get request to retrieve all the styles for the current product
  //From here, it will be passed down as props to both the images branch and the styles branch

  const getStyles = () => {
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${props.product.id}/styles`;
    let options = {headers: {
      Authorization: API_KEY.API_KEY
    }}
    axios.get(url, options)
      .then((styles) => {
        console.log(styles)
      })

  }

  console.log(props.product)

  return (
    <div>
      Hello from Overview!
      <Grid container style={{background: 'yellow'}}>
        <Grid item xs={8}>
          <ImageGallery currentProduct={props.product}/>
        </Grid>
        <Grid item xs={4}>
          <ProductOverview currentProduct={props.product} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Overview;