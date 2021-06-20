import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FacebookShareButton, PinterestShareButton, TwitterShareButton} from 'react-share';
import {FacebookIcon, TwitterIcon, PinterestIcon} from 'react-share';
import GITHUB_API_TOKEN from '../../config.js';
import StyleSelector from './StyleSelector.jsx';
import Rating from './Rating.jsx';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

const ProductOverview = ({currentProduct, currentStyles, currentStyle, ratingsAverage, ratingsTotal, handleStyleClick}) => {

  const useStyles = makeStyles((theme) => ({
    grid:  {width: '80%',
    margin: '10%'}
  }))

  const classes = useStyles();
  // backgroundColor: "#cbd6cf"
    return (
      <Grid container spacing={5} style={{borderLeft: "2px solid gray", padding: "60px", margin: "30px"}}>
        {/* Category and Title */}
        <Grid item xs={6} style={{height: "15px"}}>
          <Typography variant="h6">{currentProduct.category}</Typography>
        </Grid>
        <Grid item xs={12} style={{height: "60px", minHeight: "65px", minWidth: "500px"}}>
          <Typography variant="h3">{currentProduct.name}</Typography>
        </Grid>

      {/* Ratings */}
        <Grid item xs={12} style={{}}>
          <Rating ratingsAverage={ratingsAverage} ratingsTotal={ratingsTotal}/>
        </Grid>

      {/* Sale Price/Regular Price */}
        {currentStyle.sale_price
          ?  <Grid item xs={12}>
               <Grid container>
                 <Grid item xs={2}>
                    <Typography variant="h6" style={{textDecorationLine: "line-through", minWidth: "330px"}}>${currentStyle.original_price} </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="h6" style={{color: 'red'}}>${currentStyle.sale_price}</Typography>
                  </Grid>
               </Grid>
             </Grid>

          :  <Grid item xs={12}>
              <Typography variant="h6">${currentStyle.original_price}</Typography>
            </Grid>
        }

        <Grid item xs={6}>
          <Typography style={{justify: "center"}}><b>STYLE ></b> {currentStyle.name}</Typography>
        </Grid>


        {/* Social Media Share */}
        {/* <Grid item xs={7}></Grid> */}
        <Grid item xs={5}>
          <Grid container space={1}>
            <Grid item xs={4} className="shareButtons">
              <FacebookShareButton url={document.location.href}><FacebookIcon size={40} round={true}/></FacebookShareButton>
            </Grid>
            <Grid item xs={4} className="shareButtons">
              <TwitterShareButton url={document.location.href}><TwitterIcon size={40} round={true}/></TwitterShareButton>
            </Grid>
            <Grid item xs={4} className="shareButtons">
              <PinterestShareButton url={document.location.href} media={currentStyle.photos[0].url}><PinterestIcon size={40} round={true}/></PinterestShareButton>
            </Grid>
          </Grid>
        </Grid>

        <StyleSelector
          currentStyles={currentStyles.results}
          currentStyle={currentStyle}
          handleStyleClick={handleStyleClick}
        />

      </Grid>

    )



}


export default ProductOverview


