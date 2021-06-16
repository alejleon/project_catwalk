import React, {useState, useEffect} from 'react';
import {Grid, Select, MenuItem, Button, InputLabel} from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import GITHUB_API_TOKEN from '../../config.js';
import axios from 'axios';

const Checkout = ({currentStyle}) => {
// console.log(currentStyle)
  const [currentSku, setCurrentSku] = useState(1)
  const [skuQty, setSkuQty] = useState([0])
  const [quantitySelected, setQuantitySelected] = useState(0)


useEffect(() => {
  setCurrentSku(1)
  setSkuQty([0])
  setQuantitySelected(0)
}, [currentStyle])


useEffect(() => {
  setSkuQty(renderQtyDropdown())
}, [currentSku])



  const renderQtyDropdown = () => {
    if (currentSku !== undefined && currentSku !== 1) {
      var counter = []
      for (let i = 1; i <= 15 && i< currentStyle.skus[currentSku].quantity; i++) {
        counter.push(i)
        }
      return counter;
    }
  }


  const handleAddToCart = function(id) {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/cart';
    for (let i = 0; i < quantitySelected; i++) {
      axios.post(url,
        {sku_id: id},
        {headers: {
          Authorization: GITHUB_API_TOKEN
        }})
        .catch((err) => {
          console.error(err)
        })
    }
  }


  const handleSizeSelect = (e) => {
      setCurrentSku(e.target.value)
  }
  const handleQuantitySelection = (e) => {
    setQuantitySelected(e.target.value)
  }


  if (currentStyle === 0) {
    return (<></>)
  } else {
    var skus = Object.entries(currentStyle.skus)

    return (
      <Grid container spacing={0} style={{background: 'white', height: "150%", margin: "10px", padding: "10px"}}>
        <Grid item xs={6}>
        <InputLabel >
            Size
          </InputLabel>
          <Select displayEmpty defaultValue="" onChange={handleSizeSelect} variant="outlined" style={{width: "200px"}}>
            <MenuItem disabled value="">Select Size</MenuItem>
            {skus.map((sku) => {
              return(
                sku[1].quantity && <MenuItem value={sku[0]} key={sku[0]}>{sku[1].size}</MenuItem>
              )
            })}
          </Select>
        </Grid>


        <Grid item xs={4}>
        <InputLabel >
            Quantity
          </InputLabel>


          {currentSku !== 1
          ? <Select displayEmpty defaultValue="" onChange={handleQuantitySelection} variant="outlined" style={{width: "75px"}}>
            <MenuItem value ="" disabled>0</MenuItem>
            { skuQty
              ? skuQty.map((number) => {
                return (
                <MenuItem value={number} key={number}>{number}</MenuItem>
                )
              })
              :<></>
            }
            </Select>
          : <Select disabled displayEmpty defaultValue="" variant="outlined" style={{width: "75px"}}>
              <MenuItem>0</MenuItem>
            </Select>
        }

        </Grid>



        <Grid item xs={12}>
          { currentSku !== 1 && quantitySelected
            ?  <Button variant="outlined" endIcon={<ShoppingCartOutlinedIcon />} size="large" onClick={() => {
              handleAddToCart(currentSku)
            }}>Add To Cart</Button>
            : <Button disabled variant="outlined" endIcon={<ShoppingCartOutlinedIcon />} size="large">Add To Cart</Button>
          }
          </Grid>
      </Grid>
    )
  }
}

export default Checkout;