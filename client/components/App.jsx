import React from 'react';
import RatingsReviews from './RatingsReviews.jsx';
import QAMain from './qa_components/QAMain.jsx';

const App = () => {
  return (
    <div>
      <p>Hello From App!!!</p>
      <QAMain />
      <RatingsReviews product_id={27190} />
    </div>
  );
}

export default App;