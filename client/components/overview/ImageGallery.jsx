import React from 'react';
import {Grid} from '@material-ui/core';

const ImageGallery = ({currentStyle}) => {


  console.log(currentStyle)

  return (
    currentStyle
      ?  <Grid container style={{backgroundImage: `url(${currentStyle.photos[0].url})`, height: "1000px"}}>
          Hello from ImageGallery
        </Grid>
      : <div style={{background: 'orange', height: '1000px'}}>Hello From Image Gallery</div>

  )
}

export default ImageGallery