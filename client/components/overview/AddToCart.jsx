import React, {useState, useEffect} from 'react';
import {Grid, Select, MenuItem, Button, InputLabel} from '@material-ui/core';
import GITHUB_API_TOKEN from '../../config.js';
import axios from 'axios';

const Checkout = ({currentStyle}) => {
// console.log(currentStyle)
  const [currentSku, setCurrentSku] = useState(1)
  const [quantitySelected, setQuantitySelected] = useState(0)


  const renderQtyDropdown = () => {
    if (currentSku !== undefined && currentSku !== 1) {
      var counter = []
      for (let i = 1; i <= 15 && i< currentStyle.skus[currentSku].quantity; i++) {
        counter.push(i)
        }
      return counter;
    }
  }

  const skuQty = renderQtyDropdown();


  const handleAddToCart = function(id) {
    const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/cart';

    for (let i = 0; i < quantitySelected; i++) {
      console.log(typeof id, id)
      axios.post(url,
        {'sku_id': id},
        {headers: {
          "Authorization": GITHUB_API_TOKEN
        }})
    }
  }


  const handleSizeSelect = function(e) {
      setCurrentSku(e.target.value)
  }


  const handleQuantitySelection = (e) => {
    setQuantitySelected(e.target.value)
  }


  if (currentStyle === 0) {

    return (
      <Grid container spacing={5} style={{background: 'white', height: "400px"}}>
        <Grid item xs={12}>
          Hello from the checkout
        </Grid>
        <Grid item xs={6}>

          <InputLabel >
            Size
          </InputLabel>
          <Select defaultValue="" variant="outlined" style={{width: "200px"}}>
            <MenuItem value="" >Select Size</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={4}>
        <InputLabel >
            Quantity
          </InputLabel>
          <Select defaultValue="" variant="outlined" style={{width: "75px"}}>
            <MenuItem>Select Quantity</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined">Add To Cart</Button>
        </Grid>
      </Grid>
    )

  } else {
    var skus = Object.entries(currentStyle.skus)


    return (
      <Grid container spacing={5} style={{background: 'white', height: "400px"}}>
        <Grid item xs={12}>
          Hello from the checkout
        </Grid>


        <Grid item xs={6}>
        <InputLabel >
            Size
          </InputLabel>
          <Select defaultValue="" onChange={handleSizeSelect} variant="outlined" style={{width: "200px"}}>
            <MenuItem>Select Size</MenuItem>
            {skus.map((sku) => {
              return(
                <MenuItem value={sku[0]} key={sku[0]}>{sku[1].size}</MenuItem>
              )
            })}
          </Select>
        </Grid>


        <Grid item xs={4}>
        <InputLabel >
            Quantity
          </InputLabel>
          <Select defaultValue="" onChange={handleQuantitySelection} variant="outlined" style={{width: "75px"}}>
            <MenuItem>Select Quantity</MenuItem>
            { skuQty
              ? skuQty.map((number) => {
                return (
                  <MenuItem value={number} key={number}>{number}</MenuItem>
                )
              })
              : <MenuItem>Select a style first</MenuItem>
            }

          </Select>
        </Grid>

        <Grid item xs={12}>
          <Button variant="outlined" onClick={() => {
            handleAddToCart(JSON.stringify(currentSku))
          }}>Add To Cart</Button>
        </Grid>
      </Grid>
    )
  }
}

export default Checkout;