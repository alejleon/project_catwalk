
import React, { useState } from 'react';
import RatingsReviews from './Ratings/RatingsReviews.jsx';
import QAMain from './qa_components/QAMain.jsx';
import Overview from './overview/Overview.jsx';
import Header from './qa_components/AppBar.jsx';
import axios from 'axios';
import GITHUB_API_TOKEN from '../config.js'

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


  var getArrayAverage = (array) => {
    let total = 0;
    for (let i = 0; i < array.length; i++) {
      total += array[i]
    }
    return total/array.length;
  }


  const getAverageReviewRating = (id) => {
    let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews';

    axios.get(url, {
      headers: {Authorization: GITHUB_API_TOKEN},
      params: {product_id: id}
    })
      .then(response => {
        let ratingsArr = []
        for (let i = 0; i < response.data.results.length; i++) {
          ratingsArr.push(response.data.results[i].rating)
        }
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

  getAverageReviewRating(currentProduct.id)

  const handleReviewAdd = (productId) => {
    getArrayAverageRating(productId)     //TODO///////////////////////////////////
  }



  return (
    <div>
      <Header />
      <Overview currentProduct={currentProduct} ratingsAverage={ratingsAverage}/>
<<<<<<< HEAD
      <QAMain product={currentProduct.id}/>
=======
      <QAMain />
>>>>>>> 4986dd31274839f98639f9a7772d223139cf3c28
      <RatingsReviews product_id={currentProduct.id} />
    </div>
  );
}

export default App;