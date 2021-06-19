import React from 'react';
import {useLightbox} from 'simple-react-lightbox';

const ImageModal = ({modalStatus}) => {

  const { openLightbox, closeLightbox} = useLightbox()

  return (

      <h1>hello from modal</h1>


  )


}


export default ImageModal;