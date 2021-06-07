import React, { useState, useEffect, useRef } from 'react';
import ReviewList from './ReviewList.jsx';
import axios from 'axios';

//Should receive the current_item id number from App
const RatingsReviews = (props) => {

  const [ratings, setRatings] = useState({});
  const [recommend, setRecommend] = useState({});
  const [characteristics, setCharacteristics] = useState({});
  const [reviewList, setReviewList] = useState([]);
  const [sort, setSort] = useState('newest');

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/';
  const headers = {
    headers: { Authorization: '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' }
  };

  const page = useRef(1);

  let getReviews = (pageNum) => {
    axios.get(`${url}?product_id=${props.product_id}&page=${pageNum}&count=2&sort=${sort}`, headers)
      .then((response) => {
        console.log([...reviewList, ...response.data.results])
        setReviewList(reviewList => { return [...reviewList, ...response.data.results] });
      });
  };

  useEffect(() => {
    getReviews(page.current);
  }, []);

  let addReviews = (event) => {
    event.preventDefault();
    page.current++;
    getReviews(page.current);
    console.log(page.current);
  };

  return (
    <div>
      Coming to you live from Ratings and Reviews
      <button onClick={addReviews}>See More Reviews</button>
      <ReviewList reviews={reviewList} />
    </div>
  );
};

export default RatingsReviews;

/*
{
  ratings: {},
  recommend: {},
  characteristics: {},
  reviewList : []
}
*/