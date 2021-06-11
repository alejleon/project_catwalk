import React, {useState, useEffect} from 'react';
import axios from 'axios';
import GITHUB_API_TOKEN from '../../config.js';
import StyleSelector from './StyleSelector.jsx';
import Rating from './Rating.jsx';
import getProducts from './utils.jsx';
import {Grid} from '@material-ui/core'

const ProductOverview = ({currentProduct, currentStyles, ratingsAverage, handleStyleClick}) => {

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

        <StyleSelector
          currentStyles={currentStyles.results}
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