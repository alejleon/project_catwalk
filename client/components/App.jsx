
import React, { useState, useEffect } from 'react';
import RatingsReviews from './Ratings/RatingsReviews.jsx';
import QAMain from './qa_components/QAMain.jsx';
import Overview from './overview/Overview.jsx';
<<<<<<< HEAD
import Header from './AppBar.jsx';
=======
import SimpleReactLightbox from 'simple-react-lightbox'
import Header from './qa_components/AppBar.jsx';
>>>>>>> e66e595ddd90cce6f831ed4f429abeac0b8af7bc
import axios from 'axios';
import GITHUB_API_TOKEN from '../config.js'
import { on, trackEvent, getHistory } from 'react-tracker'
import { Tracker, TracerProvider } from 'react-tracker';

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


  const handleReviewAdd = (productId) => {
    getAverageReviewRating(productId)
  }



  return (
    <SimpleReactLightbox>
    <div>

      <Header />
      <Overview currentProduct={currentProduct} ratingsAverage={ratingsAverage} ratingsTotal={ratingsTotal}/>
      <QAMain product_id={currentProduct.id} product={currentProduct}/>
      <RatingsReviews product_id={currentProduct.id} addReview={handleReviewAdd} />
    </div>
    </SimpleReactLightbox>
  );
}

export default App;