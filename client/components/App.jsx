
import React, { useState, useEffect } from 'react';
import RatingsReviews from './Ratings/RatingsReviews.jsx';
import QAMain from './qa_components/QAMain.jsx';
import Overview from './overview/Overview.jsx';
import Header from './AppBar.jsx';
import SimpleReactLightbox from 'simple-react-lightbox'
import axios from 'axios';
import GITHUB_API_TOKEN from '../config.js'
import { on, trackEvent, getHistory } from 'react-tracker'
import { Tracker, TracerProvider } from 'react-tracker';
import Button from '@material-ui/core/Button';

const tracker = new Tracker();

const App = () => {


  // 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx'

  const [currentProduct, setCurrentProduct] = useState(
    {
      "id": 27189,
      "campus": "hr-atx",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2021-06-04T21:11:24.988Z",
      "updated_at": "2021-06-04T21:11:24.988Z"
    }
  )
  const [ratingsAverage, setRatingsAverage] = useState(0)
  const [ratingsTotal, setRatingsTotal] = useState(0)
  const [products, setProducts] = useState();


  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products';
  const getAllProducts = () => {
    const config = {
      headers: { Authorization: GITHUB_API_TOKEN },
      params: {
        page: 1,
        count: 100
      }
    }

    axios.get(url, config)
      .then((results) => {
        console.log(results.data)
        setProducts(products => {
          return results.data;
        })
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
}

const selectRandomProduct = (e) => {
  const num = Math.floor(Math.random() * 11 );
  setCurrentProduct(products[num]);
};



  var getArrayAverage = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i]
    }
    return total / array.length;
  }


  const getAverageReviewRating = (id) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews';

    axios.get(url, {
      headers: { Authorization: GITHUB_API_TOKEN },
      params: { product_id: id }
    })
      .then(response => {
        let ratingsArr = []
        for (let i = 0; i < response.data.results.length; i++) {
          ratingsArr.push(response.data.results[i].rating)
        }
        setRatingsTotal(ratingsArr.length)
        return ratingsArr;
      })
      .then((ratings) => {
        let average = getArrayAverage(ratings);
        setRatingsAverage(average)
      })
      .catch(err => {
        console.error(err);
      })
  }

  useEffect(() => {
    getAverageReviewRating(currentProduct.id)
  }, [currentProduct])

  useEffect(() => {
    getAllProducts();
  }, [])

  const handleReviewAdd = (productId) => {
    getAverageReviewRating(productId)
  }



  return (
    <SimpleReactLightbox>
    <div>
      <Header />
      <Overview currentProduct={currentProduct} ratingsAverage={ratingsAverage} ratingsTotal={ratingsTotal} />
      <QAMain product_id={currentProduct.id} product={currentProduct} />
      <RatingsReviews product_id={currentProduct.id} addReview={handleReviewAdd} />
    </div>
    <Button onClick={selectRandomProduct}>Change Product</Button>
    </SimpleReactLightbox>
  );
}

export default App;