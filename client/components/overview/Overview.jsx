import React, {useState, useEffect} from 'react';
// import axios from 'axios';
// import API_KEY from './config/config.jsx'
import ImageGallery from './ImageGallery.jsx';
import ProductOverview from './ProductOverview.jsx';
import {Grid} from '@material-ui/core';


const Overview = (props) => {


  //Will need to do a get requestto retrieve all the styles for the current product
  //From here, it will be passed down as props to both the images branch and the styles branch


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