
import React, {useState} from 'react';
import RatingsReviews from './RatingsReviews.jsx';
import QAMain from './qa_components/QAMain.jsx';
import Overview from './overview/Overview.jsx';

const App = () => {

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

  return (
    <div>
      <p>Hello From App!!!</p>
      <Overview product={currentProduct}/>
      <QAMain />
      <RatingsReviews product_id={27190} />
    </div>
  );
}

export default App;