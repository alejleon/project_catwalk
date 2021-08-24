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
        .then(() => {
          alert("Your item has been added to your shopping cart!")
        })
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
      // Select Size
      <Grid container spacing={4} style={{height: "100%", margin: "5px", padding: "20px"}}>
        <Grid item xs={6} style={{width: "200px", minWidth: "200px"}}>
          <FormControl>
            <InputLabel >
              Select Size
            </InputLabel>
            <Select displayEmpty defaultValue="" onChange={handleSizeSelect} color="primary" variant="outlined" style={{width: "180px", boxShadow: "5px 5px 7px -7px gray"}}>
              <MenuItem disabled >Select Size</MenuItem>
                {skus.map((sku) => {
                  return(
                    sku[1].quantity && <MenuItem value={sku[0]} key={sku[0]}>{sku[1].size}</MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Grid>


       {/* Select QTY */}
        <Grid item xs={4}>
          <FormControl>
            <InputLabel >
              Qty
              </InputLabel>

          {currentSku !== 1
          ? <Select displayEmpty defaultValue="" onChange={handleQuantitySelection} variant="outlined" style={{width: "75px", boxShadow: "5px 5px 7px -7px gray"}}>
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
          : <Select disabled displayEmpty color="primary" defaultValue="" variant="outlined" style={{width: "75px", boxShadow: "5px 5px 5px -6px gray"}}>
              <MenuItem>0</MenuItem>
            </Select>
          }
          </FormControl>
        </Grid>


       {/* Add to cart?| */}
        <Grid item xs={12}>
          <FormControl>
          { currentSku !== 1 && quantitySelected
            ?  <Button variant="outlined" endIcon={<ShoppingCartOutlinedIcon />} style={{width: "100%", color: "#94bfa2", border: "3px solid #94bfa2", fontWeight: "bold", boxShadow: "5px 5px 5px -5px gray"}} size="large" onClick={() => {
              handleAddToCart(currentSku)
            }}>Add To Cart</Button>
            : <Button disabled variant="outlined" endIcon={<ShoppingCartOutlinedIcon />} style={{width: "100%",  boxShadow: "5px 5px 5px -6px gray"}} size="large">Add To Cart</Button>
          }
          </FormControl>
          </Grid>
      </Grid>
    )
  }
}

export default Checkout;