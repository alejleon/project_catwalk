import React, {useState, useEffect} from 'react';
import Checkout from './Checkout.jsx';
import {Grid} from '@material-ui/core';

const StyleSelector = ({currentStyles}) => {

  //will map over the individual skus and populate them here
  const [styles, setStyles] = useState([{photos: [{thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}]}])
  const [currentStyle, setCurrentStyle] = useState([])





  //this click function will set the current style to the clicked style
  //and will send the style up so that the imageGallery componenet can render it
  //Check the binding of this
  const handleStyleClick = () => {
    alert('clickity Click!')

      setCurrentStyle(style)

  }




  console.log(currentStyles)


  //will render depending on whether prorps is defined or not
  return (
    <Grid container style={{background: 'orange'}}>
      <Grid item xs={12}>Hello From StyleSelector</Grid>

      {currentStyles ?
       currentStyles.map((style) => {
         console.log(style)
         return (
         <Grid item xs={3} key={style.style_id}>
           <img src={style.photos[0].thumbnail_url} onClick={handleStyleClick.bind(this)} />
         </Grid>
         )
       }) :
       <Grid item xs={3}>
        <img src={styles[0].photos[0].thumbnail_url}/>
      </Grid>}


      <Grid item xs={12}>
        <Checkout />
      </Grid>
    </Grid>
  )

}

export default StyleSelector;