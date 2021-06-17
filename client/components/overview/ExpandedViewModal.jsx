import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import ModalImage from "react-modal-image";



const ExpandedViewModal = ({currentStyle}) => {


  if (currentStyle) {
    return (
      <ModalImage large={currentStyle.photos[0].url} />
    )

  }
  else {return null}

}

export default ExpandedViewModal