import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

const ImageGallery = ({currentStyle}) => {

  const [currentImage, setCurrentImage] = useState(0)

  if (currentStyle) {
    const photosArrayLength = currentStyle.photos.length
    console.log(photosArrayLength)
  }

  const handleNextImageClick = () => {
    console.log(photosArrayLength)
    if (photosArrayLength !== undefined) {
      setCurrentImage(currentImage === photosArrayLength -1 ? 0 : current + 1)
    } else {
      console.log('oops')
    }
  }
  const handlepreviousImageClick = () => {

  }


  return (
    currentStyle
      ?  <section >

              Hello from ImageGallery
          <Grid container >
        <ArrowBack id="backButton"/>
        <ArrowForward id="forwardButton" onClick={handleNextImageClick}/>
            <Grid item xs={10}>
              {currentStyle.photos.map((photo, index) => {
                return (
                  <img className="image" key= {index} src={[photo.url]} />
                  )
                })}

            </Grid>
          </Grid>
        </section>




      : <div style={{background: 'lavender', height: '1000px'}}>Hello From Image Gallery</div>

  )
}

export default ImageGallery