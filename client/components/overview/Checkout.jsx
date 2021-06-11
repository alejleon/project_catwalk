import React from 'react';
import {Grid} from '@material-ui/core';

const Checkout = () => {

  //map over the available


  return (
    <Grid container style={{background: 'aqua'}}>
      <Grid item xs={12}>
        Hello from the checkout
      </Grid>

      <Grid item xs={4}>
        <select>
          <option>Select Size</option>
        </select>
      </Grid>
      <Grid item xs={4}>
        <select>
          <option>Select Quantity</option>
        </select>
      </Grid>

      <Grid item xs={12}>
        <button>Add To Cart</button>
      </Grid>



    </Grid>


  )
}

export default Checkout;