import React from 'react';
import Checkout from './Checkout.jsx';
import {Grid} from '@material-ui/core';

const StyleSelector = () => {

  //will map over the individual skus and populate them here


  return (
    <Grid container style={{background: 'orange'}}>
      <Grid item xs={12}>Hello From StyleSelector</Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>
      <Grid item xs={3}>
        Style
      </Grid>

      <Grid item xs={12}>
        <Checkout />
      </Grid>
    </Grid>
  )

}

export default StyleSelector;