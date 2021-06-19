import React, {useState, useEffect} from 'react';
import AddToCart from './AddToCart.jsx';
import Grid from '@material-ui/core/Grid';

const StyleSelector = ({currentStyles, currentStyle, handleStyleClick}) => {

  //will map over the individual skus and populate them here
  const [styles, setStyles] = useState([{photos: [{thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'}]}])




  //

  return (
    <Grid container spacing={0} style={{margin: "10px", padding: "20px", height: "100%", borderTop: "1px solid gray"}}>


      {currentStyles ?
       currentStyles.map((style) => {
         return (
         <Grid item xs={3} key={style.style_id} style={{minWidth: "90px"}}>

           <div >
             <img className="styleThumb" src={style.photos[0].thumbnail_url} style={style.style_id === currentStyle.style_id ? {border: "4px solid #94bfa2" } : {}} onClick={() => {handleStyleClick(style)}} />
           </div>

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