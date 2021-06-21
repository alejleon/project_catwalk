import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';



const ImageMenu = ({currentStyle}) => {

  return (
    <Grid container>
      <Grid item xs={12} style={{height: "150px", maxHeight: "150px", border: "1px solid black", marginTop: "30px"}}>
      {currentStyle && currentStyle.photos.map((photo, index) => {
        return (
          <div className="thumbnailMenu" index={index}>
            <img className="menuImage" src={photo.thumbnail_url} />
          </div>
        )
      })}


      </Grid>
    </Grid>

  )


}

export default ImageMenu