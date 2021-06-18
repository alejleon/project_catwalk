import React, {useState, useEffect} from 'react';
import ImageModal from './ImageModal.jsx'
import ExpandedViewModal from './ExpandedViewModal'
import ModalImage from "react-modal-image";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForwardIos';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Modal from "@material-ui/core/Modal"
import {SRLWrapper} from 'simple-react-lightbox'

const ImageGallery = ({currentStyle, currentProduct}) => {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [arrayLength, setArrayLength] = useState(currentStyle.photos.length)
  const [modalStatus, setModalStatus] = useState(false);


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
      ?  <section id="slider" style={{height: "1200px", padding: "30px", padding: "30px"}}>
          <Grid container >
            <ArrowBack id="backButton" onClick={handlepreviousImageClick}/>
            <ArrowForward id="forwardButton" onClick={handleNextImageClick}/>
            <Grid item xs={12}>

              <SRLWrapper>
              {currentStyle.photos.map((photo, index) => {
                return (

                    <div className={index === currentIndex ? 'slide active' : 'slide'} key={index}>
                      {index === currentIndex && (<img className="image" src={[photo.url]}/>)}

                    </div>

                )
              })}
              </SRLWrapper>



            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h5">{currentProduct.slogan}</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="body1">{currentProduct.description}</Typography>
            </Grid>

          </Grid>
        </section>




      : <div></div>


  )
}

export default ImageGallery