import React from 'react';

const ImageGallery = ({currentStyles}) => {


  //get request with with all the styles for a particular product
  //and the images for said styles. will map over these and render them
  //onto the page. clicking on each style will enlarge the picture.
  //Probably wont need individual image components

// console.log(currentStyles)

  return (
    <div style={{background: 'orange'}}>
      Hello from ImageGallery
      {/* {currentStyles.results.} */}
    </div>
  )
}

export default ImageGallery