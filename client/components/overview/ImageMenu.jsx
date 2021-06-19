import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';



const ImageMenu = ({currentStyle}) => {

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>helloooo!</h1>

        {currentStyle.photos.map((photo, index) => {
          return (

              <div className="imageMenu" key={index}>
                <img src={photo.thumbnail_url} />
              </div>

          )
        })}



      </Grid>
    </Grid>

  )


}

export default ImageMenu