import React, {useState, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

const ImageGallery = ({currentStyle}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [ArrayLength, setArrayLength] = useState(currentStyle.photos.length)

  useEffect(() => {
      setArrayLength(currentStyle.photos.length)
  }, [currentStyle])


  const handleNextImageClick = () => {
    if (currentIndex === ArrayLength - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
    console.log(currentIndex)
  }



  const handlepreviousImageClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(ArrayLength - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
    console.log(currentIndex)
  }


  return (
    currentStyle
      ?  <section id="slider" >

              Hello from ImageGallery
          <Grid container >
        <ArrowBack id="backButton" onClick={handlepreviousImageClick}/>
        <ArrowForward id="forwardButton" onClick={handleNextImageClick}/>


            <Grid item xs={10}>
              {currentStyle.photos.map((photo, index) => {
                return (

                  <div className={index === currentIndex ? 'slide active' : 'slide'} key={index}>
                    {index === currentIndex && (<img className="image" src={[photo.url]} />)}

                  </div>
                  )
                })}



            </Grid>
          </Grid>
        </section>




      : <div style={{background: 'lavender', height: '1000px'}}>Hello From Image Gallery</div>

  )
}

export default ImageGallery