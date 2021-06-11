import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from './config/config.jsx';
import StyleSelector from './StyleSelector.jsx';
import Rating from './Rating.jsx';
import getProducts from './utils.jsx';
import {Grid} from '@material-ui/core'

const ProductOverview = ({currentProduct, currentStyles, ratingsAverage}) => {

    // console.log(currentStyles.results)

    return (
      <Grid container style={{background: 'lavender'}}>
        <Grid item xs={12}>
        <p>{currentProduct.name}</p>
        </Grid>
        <Grid item xs={6}>
        <p>{currentProduct.category}</p>
        </Grid>

        <Grid item xs={6}>
          <Rating ratingsAverage={ratingsAverage}/>
        </Grid>

        <Grid item xs={12}>
        <p>{currentProduct.slogan}</p>
        </Grid>
        <Grid item xs={12}>
        <p>{currentProduct.description}</p>
        </Grid>
        <Grid item xs={4}>
        <p>Product Price</p>
        </Grid>
        <Grid item xs={8}>
        <p>Share Buttons</p>
        </Grid>

        <StyleSelector currentStyles={currentStyles.results}/>

      </Grid>

    )



}


export default ProductOverview