import React, {useState, useEffect} from 'react';
import axios from 'axios';
import API_KEY from '../../config.js'
import ImageGallery from './ImageGallery.jsx';
import ProductOverview from './ProductOverview.jsx';
import {makeStyles} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import {Grid} from '@material-ui/core';


const Overview = ({currentProduct, ratingsAverage}) => {

  const useStyles = makeStyles((theme) => ({
    // css styles go here
    grid: {
      width: '80%',
      margin: '10%'
    }
  }));

  //Will need to do a get request to retrieve all the styles for the current product
  //From here, it will be passed down as props to both the images branch and the styles branch
  const [currentStyles, setCurrentStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState(0);

  const classes = useStyles()


   //this click function will set the current style to the clicked style
  //and will send the style up so that the imageGallery componenet can render it
  //Check the binding of this
  const handleStyleClick = (style) => {
      setCurrentStyle(style)
  }

  const getStyles = () => {
    let url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${JSON.stringify(currentProduct.id)}/styles`;

    axios.get(url, {
      headers: {Authorization: API_KEY}
    })
      .then((styles) => {
        console.log(styles.data.results[0])
        setCurrentStyles(styles.data)
        setCurrentStyle(styles.data.results[0])
      })
      .catch((err) => {
        console.error(err)
      })
  }

   useEffect(()=> {
     getStyles()
   }, [])
  console.log(currentStyle)
  if (currentStyle) {
  return (
    <div>
      <CssBaseline />
      Hello from Overview!
      <Grid container  className={classes.grid} >
        <Grid item xs={7}>
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
            currentStyle={currentStyle}
            ratingsAverage={ratingsAverage}
            handleStyleClick={handleStyleClick}
          />
        </Grid>
      </Grid>
    </div>
  )
  } else {
    return null
  }
}

export default Overview;