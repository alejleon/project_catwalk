import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from '../../config.js'
import ImageGallery from './ImageGallery.jsx';
import ProductOverview from './ProductOverview.jsx';
import {Grid} from '@material-ui/core';


const Overview = ({currentProduct, ratingsAverage}) => {


  //Will need to do a get request to retrieve all the styles for the current product
  //From here, it will be passed down as props to both the images branch and the styles branch
  const [currentStyles, setCurrentStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState(null);


   //this click function will set the current style to the clicked style
  //and will send the style up so that the imageGallery componenet can render it
  //Check the binding of this
  const handleStyleClick = (style) => {
    alert('clickity Click!')
      setCurrentStyle(style)
  }





  const getStyles = () => {
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${JSON.stringify(currentProduct.id)}/styles`;

    axios.get(url, {
      headers: {Authorization: API_KEY}
    })
      .then((styles) => {
        setCurrentStyles(styles.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

   useEffect(()=> {
     getStyles()
   }, [])


  return (
    <div>
      Hello from Overview!
      <Grid container style={{background: 'yellow'}}>
        <Grid item xs={8}>
          <ImageGallery
            currentProduct={currentProduct}
            currentStyles={currentStyles}
            currentStyle={currentStyle}
          />
        </Grid>
        <Grid item xs={4}>
          <ProductOverview
            currentProduct={currentProduct}
            currentStyles={currentStyles}
            ratingsAverage={ratingsAverage}
            handleStyleClick={handleStyleClick}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Overview;