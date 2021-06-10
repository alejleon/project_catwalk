import React, {useState, useEffect} from 'react';
import Checkout from './Checkout.jsx';
import {Grid} from '@material-ui/core';

const StyleSelector = ({currentStyles}) => {

  //will map over the individual skus and populate them here
  const [styles, setStyles] = useState([{photos: [{thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}]}])

  console.log(currentStyles)




  return (
    <Grid container style={{background: 'orange'}}>
      <Grid item xs={12}>Hello From StyleSelector</Grid>


      {styles.map((style) => {
        return (
          <Grid item xs={3}>
            <img src={style.photos[0].thumbnail_url} />
          </Grid>
        )
      })}

{/*


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
      </Grid> */}

      <Grid item xs={12}>
        <Checkout />
      </Grid>
    </Grid>
  )

}

export default StyleSelector;