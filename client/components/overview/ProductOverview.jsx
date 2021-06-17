import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FacebookShareButton, PinterestShareButton, TwitterShareButton} from 'react-share';
import {FacebookIcon, TwitterIcon, PinterestIcon} from 'react-share';
import GITHUB_API_TOKEN from '../../config.js';
import StyleSelector from './StyleSelector.jsx';
import Rating from './Rating.jsx';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const ProductOverview = ({currentProduct, currentStyles, currentStyle, ratingsAverage, ratingsTotal, handleStyleClick}) => {


// console.log(currentStyle)

    return (
      <Grid container spacing={5} style={{ background: 'lavender' }}>
        <Grid item xs={12}>
          <Typography variant="h4">{currentProduct.name}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="subtitle1">{currentProduct.category}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Rating ratingsAverage={ratingsAverage} ratingsTotal={ratingsTotal}/>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">{currentProduct.slogan}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" >{currentProduct.description}</Typography>
        </Grid>
        {currentStyle.sale_price
          ?  <Grid item xs={6}>
              <Typography variant="h5" style={{textDecorationLine: "line-through"}}>${currentStyle.original_price}</Typography>
              <Typography variant="h5" style={{color: 'red'}}>${currentStyle.sale_price}</Typography>
             </Grid>

          :  <Grid item xs={6}>
              <Typography variant="h5">${currentStyle.original_price}</Typography>
            </Grid>
        }
{console.log(document.location.href)}
        <Grid item xs={6}>
          <Grid container>
            <Grid item xs={4}>
              <FacebookShareButton url={document.location.href}><FacebookIcon size={52} round={true}/></FacebookShareButton>
            </Grid>
            <Grid item xs={4}>
              <TwitterShareButton url={document.location.href}><TwitterIcon size={52} round={true}/></TwitterShareButton>
            </Grid>
            <Grid item xs={4}>
              <PinterestShareButton url={document.location.href} media={currentStyle.photos[0].url}><PinterestIcon size={52} round={true}/></PinterestShareButton>
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



// const ProductOverview = (props) => {

//   const [products, setProducts] = useState([]);

//   const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products';
//   const headers = {
//     headers: {
//       Authorization: GITHUB_API_TOKEN
//     }
//   };
//   const params = {
//     product_id: props.currentProduct
//   }

//   useEffect(() => {
//     getProducts();
//   }, [])


//   var getProducts = function () {
//     axios.get(`${url}?product_id=${params.product_id}`, headers)
//       .then((listOfProducts) => {
//         console.log(listOfProducts.data[0].slogan)
//         setProducts(listOfProducts)
//       })
//       .catch((err) => { console.error(err) })
//   }


//   // console.log(products.data)

//   if (products === undefined) {
//     return (
//       <div></div>
//     )
//   } else {