import React, { useRef, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import GITHUB_API_TOKEN from '../../config.js';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add'
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  paper: {
    minWidth: 700,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  button: {
    margin: 5
  },
  row: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justify: "space-between",
    padding: theme.spacing(2),
    marginRight: 10,
    fontSize: 10
  },
  sameLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "top",
    padding: theme.spacing(2),
    marginRight: 10,
    padding: 5
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  card: {
    maxWidth: '20%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'row',
    justify: 'space-around',
    margin: 2.5
  },
});

const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/';
const headers = {
  headers: { Authorization: GITHUB_API_TOKEN }
};

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const FormBody = (props) => {

  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState("");
  const [size, setSize] = useState("");
  const [width, setWidth] = useState("");
  const [comfort, setComfort] = useState("");
  const [length, setLength] = useState("");
  const [quality, setQuality] = useState("");
  const [fit, setFit] = useState("");
  const [summary, setSummary] = useState("");
  const [body, setBody] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [imageList, setImageList] = useState([]);

  const [ratingError, setRatingError] = useState(true);
  const [recommendError, setRecommendError] = useState(true);
  const validForm = useRef(false);
  const ratingDescription = useRef("");

  //God Bless Stack Overflow
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateUserName = (username) => {
    if (username.length > 0 && username.length <= 60) {
      return false; //valid
    } else {
      return true; //invalid
    }
  };

  const validateBody = (bodyText) => {
    if (bodyText.length >= 50 && bodyText.length <= 1000) {
      return false; //valid
    } else {
      return true; //invalid
    }
  };

  const validateSummary = (summaryText) => {
    if (summaryText.length <= 60) {
      return false; //valid
    } else {
      return true; //invalid
    }
  };

  const validateForm = () => {
    let characteristics = props.metaData.characteristics;
    //validate text inputs
    if (validateBody(body) || !validateEmail(email) || validateSummary(summary) || validateUserName(userName)) {
      validForm.current = false;
      //validate rating and recommendation
    } else if (rating === 0 || recommend === "") {
      validForm.current = false;
    } else if (
      //Validate characteristics have all been rated if they are valid matrics for the product
      characteristics.Size && size === "" ||
      characteristics.Width && width === "" ||
      characteristics.Comfort && comfort === "" ||
      characteristics.Quality && quality === "" ||
      characteristics.Length && length === "" ||
      characteristics.Fit && fit === ""
    ) {
      validForm.current = false;
    } else {
      validForm.current = true;
    }
  }

  const handleRatingSelection = (newValue) => {
    if (newValue === "1") {
      ratingDescription.current = "Poor";
    } else if (newValue === "2") {
      ratingDescription.current = "Fair";
    } else if (newValue === "3") {
      ratingDescription.current = "Average";
    } else if (newValue === "4") {
      ratingDescription.current = "Good";
    } else if (newValue === "5") {
      ratingDescription.current = "Great"
    }
    setRating(newValue);

  };

  const handleFormChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleNewImage = (event) => {
    console.log(URL.createObjectURL(event.target.files[0]));
    setImageList([...imageList, URL.createObjectURL(event.target.files[0])]);
  }

  const handleFormSubmission = () => {
    console.log('Form submitted');
    validateForm();

    if (validForm.current) {
      let recommended = recommend === "true" ? true : false;
      let characteristicsList = {};
      if (props.metaData.characteristics.Size) {
        characteristicsList["91250"] = Number(size);
      }

      if (props.metaData.characteristics.Width) {
        characteristicsList["91249"] = Number(width);
      }

      if (props.metaData.characteristics.Comfort) {
        characteristicsList["91247"] = Number(comfort);
      }

      if (props.metaData.characteristics.Length) {
        characteristicsList["91246"] = Number(length);
      }

      if (props.metaData.characteristics.Quality) {
        characteristicsList["91248"] = Number(quality);
      }

      if (props.metaData.characteristics.Fit) {
        characteristicsList["91245"] = Number(fit);
      }

      let newReview = {
        product_id: props.product_id,
        rating: Number(rating),
        summary: summary,
        body: body,
        recommend: recommended,
        name: userName,
        email: email,
        photos: imageList,
        characteristics: characteristicsList
      }
      axios.post(`${url}`, newReview, headers)
        .then((response) => {
          console.log('Successfully Posted Form');
        })
        .catch((err) => {
          console.log('Error posting form')
        })
    } else {
      alert('Form not valid');
    }
  };

  const classes = makeStyles(styles)();

  let imageListCards = imageList.map((image, index) => {
    return <image image={image} key={index} />
  });

  return (
    <div>
      <DialogContent dividers >
        <div className={classes.sameLine}>
          <FormControl component="div" className={props.classes.formControl}>
            <TextField
              error={validateUserName(userName)}
              label="Username"
              type="text"
              id="margin-normal"
              placeholder="jackson11"
              onChange={(event) => { handleFormChange(event, setUserName) }}
              className={classes.textField}
              helperText="For privacy reasons, do not use your full name or email address"
              margin="normal"
              required
            />
            {(userName.length < 1 || userName.length > 60)
              ? <Alert severity="error">{userName.length < 1 ? 'Username is required' : 'Username must be less than 60 characters'}</Alert>
              : null}
          </FormControl>
          <FormControl component="div" className={props.classes.formControl}>
            <TextField
              label="Email"
              type="email"
              id="margin-normal"
              placeholder="Jackson11@email.com"
              error={!validateEmail(email)}
              onChange={(event) => { handleFormChange(event, setEmail) }}
              className={classes.textField}
              helperText="For authentication reasons, you will not be emailed"
              margin="normal"
              required
            />
            {!validateEmail(email)
              ? <Alert severity="error">Not a valid email address</Alert>
              : null}
          </FormControl>
        </div>
        <FormControl component="div" className={classes.row}>
          <TextField
            label="Review Summary"
            id="margin-normal"
            placeholder="Example: Best purchase ever!"
            className={classes.textField}
            error={validateSummary(summary)}
            onChange={(event) => { handleFormChange(event, setSummary) }}
            helperText="Write a sumamry of your review for this product"
            margin="normal"
          />
          {summary.length > 60
            ? <Alert severity="error">Summary must be less than 60 characters</Alert>
            : null}
        </FormControl>
        <FormControl component="div" className={classes.row}>
          <TextField
            label="Review Body"
            id="margin-normal"
            placeholder="Your thoughts..."
            error={validateBody(body)}
            className={classes.textField}
            onChange={(event) => { handleFormChange(event, setBody) }}
            helperText="Tell us what you thought!"
            margin="normal"
            required
          />
          {body.length < 50 || body.length > 1000
            ? <Alert severity="error">{body.length < 50
              ? `${50 - body.length} more characters required`
              : `Exceeded character limit ${body.length} / 1000`}</Alert>
            : null}
        </FormControl>
        <FormControl component="div" className={props.classes.formControl}>
          <Typography variant="subtitle1"> How would you rate this product? </Typography>
          <Rating name="new-review-rating" onChange={(event) => { handleRatingSelection(event.target.value) }} precision={1} value={Number(rating)} controlled="true" />
          <Typography variant="subtitle1">{ratingDescription.current}</Typography>
        </FormControl>
        <FormControl component="div" className={classes.row}>
          <Typography variant="subtitle1"> Would you recommend this product? </Typography>
          <RadioGroup row aria-label="recommend" name="recommend" value={recommend} onChange={(event) => { handleFormChange(event, setRecommend) }}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup >
        </FormControl>
        {props.metaData.characteristics.Size
          ? <FormControl component="div" className={classes.row}>
            <Typography variant="h6"> Size: </Typography>
            <RadioGroup row aria-label="comfort" name="comfort" value={size} onChange={(event) => { handleFormChange(event, setSize) }}>
              <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
              <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
              <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
            </RadioGroup >
          </FormControl>
          : null}
        {props.metaData.characteristics.Width
          ? <FormControl component="div" className={classes.row}>
            <Typography variant="h6"> Width: </Typography>
            <RadioGroup row aria-label="comfort" name="comfort" value={width} onChange={(event) => { handleFormChange(event, setWidth) }}>
              <FormControlLabel value="1" control={<Radio />} label="Too Narrow" />
              <FormControlLabel value="2" control={<Radio />} label="Slightly Narrow" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="Slightly Wide" />
              <FormControlLabel value="5" control={<Radio />} label="Too Wide" />
            </RadioGroup >
          </FormControl>
          : null}

        {props.metaData.characteristics.Comfort
          ? <FormControl component="div" className={classes.row}>
            <Typography variant="h6"> Comfort: </Typography>
            <RadioGroup row aria-label="comfort" name="comfort" value={comfort} onChange={(event) => { handleFormChange(event, setComfort) }}>
              <FormControlLabel value="1" control={<Radio />} label="Uncomfortable" />
              <FormControlLabel value="2" control={<Radio />} label="Slight Uncomfortable" />
              <FormControlLabel value="3" control={<Radio />} label="Ok" />
              <FormControlLabel value="4" control={<Radio />} label="Comfortable" />
              <FormControlLabel value="5" control={<Radio />} label="Perfect" />
            </RadioGroup >
          </FormControl>
          : null}
        {props.metaData.characteristics.Length
          ? <FormControl component="div" className={classes.row}>
            <Typography variant="h6"> Length: </Typography>
            <RadioGroup row aria-label="comfort" name="comfort" value={length} onChange={(event) => { handleFormChange(event, setLength) }}>
              <FormControlLabel value="1" control={<Radio />} label="Runs Short" />
              <FormControlLabel value="2" control={<Radio />} label="Runs Slightly Short" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="Runs Slightly Long" />
              <FormControlLabel value="5" control={<Radio />} label="Runs Long" />
            </RadioGroup >
          </FormControl>
          : null}
        {props.metaData.characteristics.Quality
          ? <FormControl component="div" className={classes.row}>
            <Typography variant="h6"> Quality: </Typography>
            <RadioGroup row aria-label="comfort" name="comfort" value={quality} onChange={(event) => { handleFormChange(event, setQuality) }}>
              <FormControlLabel value="1" control={<Radio />} label="Poor" />
              <FormControlLabel value="2" control={<Radio />} label="Below Average" />
              <FormControlLabel value="3" control={<Radio />} label="What I Expected" />
              <FormControlLabel value="4" control={<Radio />} label="Pretty Great" />
              <FormControlLabel value="5" control={<Radio />} label="Perfect" />
            </RadioGroup >
          </FormControl>
          : null}
        {props.metaData.characteristics.Fit
          ? <FormControl component="div" className={classes.row}>
            <Typography variant="h6"> Fit: </Typography>
            <RadioGroup row aria-label="comfort" name="comfort" value={fit} onChange={(event) => { handleFormChange(event, setFit) }}>
              <FormControlLabel value="1" control={<Radio />} label="Runs Tight" />
              <FormControlLabel value="2" control={<Radio />} label="Runs Slightly Tight" />
              <FormControlLabel value="3" control={<Radio />} label="Perfect" />
              <FormControlLabel value="4" control={<Radio />} label="Runs Slightly Loose" />
              <FormControlLabel value="5" control={<Radio />} label="Runs Loose" />
            </RadioGroup >
          </FormControl>
          : null}
        <FormControl>
          <Typography variant="subtitle1">Add Photos</Typography>
          <Input
            type="file"
            onChange={handleNewImage}
            disabled={imageList.length >= 5}>Choose File</Input>
        </FormControl>
        <div className={classes.sameLine} style={{ minHeight: 100, maxHeight: 100, minWidth: 500, maxWidth: 500 }}>
          {imageList.map((image, index) => {
            return <Card classes={{ root: classes.card }} key={index}>
              <CardMedia
                component="img"
                image={image}
                variant="outlined"
              />
            </Card>
          })}
        </div>


      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormSubmission} color="primary">
          SUBMIT REVIEW
        </Button>
      </DialogActions>
    </div>
  );
};

export default FormBody;