import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
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
          <FormControl>
            <InputLabel >
              Select Size
            </InputLabel>
            <Select displayEmpty defaultValue="" onChange={handleSizeSelect} variant="outlined" style={{width: "200px"}}>
              <MenuItem disabled >Select Size</MenuItem>
                {skus.map((sku) => {
                  return(
                    sku[1].quantity && <MenuItem value={sku[0]} key={sku[0]}>{sku[1].size}</MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Grid>


        <Grid item xs={4}>
          <FormControl>
            <InputLabel >
              Qty
              </InputLabel>


          {currentSku !== 1
          ? <Select displayEmpty defaultValue="" onChange={handleQuantitySelection} variant="outlined" style={{width: "75px"}}>
            <MenuItem disabled>0</MenuItem>
            { skuQty
              ? skuQty.map((number) => {
                return (
                <MenuItem value={number} key={number}>{number}</MenuItem>
                )
              })
              :<MenuItem>Select Size</MenuItem>
            }
            </Select>
          : <Select disabled displayEmpty defaultValue="" variant="outlined" style={{width: "75px"}}>
              <MenuItem>0</MenuItem>
            </Select>
          }
          </FormControl>
        </Grid>



        <Grid item xs={12}>
          <FormControl>
          { currentSku !== 1 && quantitySelected
            ?  <Button variant="outlined" endIcon={<ShoppingCartOutlinedIcon />} size="large" onClick={() => {
              handleAddToCart(currentSku)
            }}>Add To Cart</Button>
            : <Button disabled variant="outlined" endIcon={<ShoppingCartOutlinedIcon />} size="large">Add To Cart</Button>
          }
          </FormControl>
          </Grid>
      </Grid>
    )
  }
}

export default Checkout;