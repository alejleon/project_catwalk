import React, {useState, useEffect} from 'react';
import AddToCart from './AddToCart.jsx';
import Grid from '@material-ui/core/Grid';

const StyleSelector = ({currentStyles, currentStyle, handleStyleClick}) => {

  //will map over the individual skus and populate them here
  const [styles, setStyles] = useState([{photos: [{thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}]}])



  //will render depending on whether props is defined or not

  //

  return (
    <Grid container spacing={0} style={{background: 'white', margin: "10px", padding: "10px", height: "100%"}}>


      {currentStyles ?
       currentStyles.map((style) => {
         return (
         <Grid item xs={3} key={style.style_id}>
           <img src={style.photos[0].thumbnail_url} style={{height: "75px", width: "75px", borderRadius: "50%", margin: "15px"}} onClick={() => {handleStyleClick(style)}} />
         </Grid>
         )
       }) :
       <Grid item xs={3}>
         <img src={styles[0].photos[0].thumbnail_url}/>
      </Grid>}


      <Grid item xs={12}>
        <AddToCart currentStyle={currentStyle}/>
      </Grid>
    </Grid>
  )


}

export default StyleSelector;