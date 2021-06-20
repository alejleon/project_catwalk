import React, {useState, useEffect} from 'react';
import ImageModal from './ImageModal.jsx'
import ImageMenu from './ImageMenu.jsx'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {SRLWrapper} from 'simple-react-lightbox'

const ImageGallery = ({currentStyle, currentProduct}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [arrayLength, setArrayLength] = useState(currentStyle.photos.length)
  const [modalStatus, setModalStatus] = useState(false);
  const options = {
    settings: {
      lighboxTransitionSpeed: 0.5,
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showNextButton: false,
      showPrevButton: false,
      showThumbnailsButton: false
    },
    thumbnails: {
      showThumbnails: false
    }
  }


  useEffect(() => {
      setArrayLength(currentStyle.photos.length)
  }, [currentStyle])


  const handleNextImageClick = () => {
    if (currentIndex === arrayLength - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlepreviousImageClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(arrayLength - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleModalOpen = () => {
    setModalStatus(true)
  }
  const handleModalClose = () => {
    setModalStatus(false)
  }


  return (

    currentStyle
     ?  <section id="slider" style={{height: "1300px", padding: "30px", marginRight: "30px", backgroundColor: "#e3e8e5", borderRadius: "20px"}}>
          <ArrowBack id="backButton" style={{margin: "5px"}} onClick={handlepreviousImageClick}/>
          <ArrowForward id="forwardButton" style={{margin: "5px"}} onClick={handleNextImageClick}/>
          <Grid container >

            <Grid item xs={12} style={{height: "1000px"}} >  {/* this is the image grid item */}
              <SRLWrapper options={options}>
              {currentStyle.photos.map((photo, index) => {
                return (

                    <div className={index === currentIndex ? 'slide active' : 'slide'} key={index} >

                      {index === currentIndex && (<img className="image" src={[photo.url]}/>)}

                    </div>

                )
              })}
              </SRLWrapper>
            </Grid>


            {/* Slogan and description */}
            <Grid item xs={2}></Grid>
            <Grid item xs={8} style={{marginTop: "40px", borderTop: "1px solid gray"}}></Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={10} >
              <Typography variant="h5" style={{margin: "30px 10px 10px 10px"}}>{currentProduct.slogan}</Typography>
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="body1" style={{margin: "5px 10px"}}>{currentProduct.description}</Typography>
            </Grid>
          </Grid>


        </section>




      : <div></div>


  )
}

export default ImageGallery