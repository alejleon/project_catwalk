import React, { useRef, useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Alert from '@material-ui/lab/Alert';

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
    padding: theme.spacing(2),
    marginRight: 10,
    fontSize: 10
  },
  sameLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2),
    marginRight: 10
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  }
});

const DialogContent = withStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  }
}))(MuiDialogContent);

const FormBody = (props) => {

  const [rating, setRating] = useState(3);
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

  const ratingDescription = useRef("Average");
  const userNameError = useRef(false);

  useEffect(() => {
    if (userName.length > 0 && userName.length <= 60) {
      userNameError.current = false;
    } else {
      userNameError.current = true;
    }
  }, [userName]);

  //God Bless Stack Overflow
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleRatingSelection = (event, newValue) => {
    if (newValue === 1) {
      ratingDescription.current = "Poor";
    } else if (newValue === 2) {
      ratingDescription.current = "Fair";
    } else if (newValue === 3) {
      ratingDescription.current = "Average";
    } else if (newValue === 4) {
      ratingDescription.current = "Good";
    } else if (newValue === 5) {
      ratingDescription.current = "Great"
    }
    setRating(newValue);

  };

  const handleFormChange = (event, setter) => {
    setter(event.target.value);
  };

  const valueText = (value) => {
    if (value === 1) {
      return 'Too Tight';
    } else if (value === 3) {
      return 'Perfect Fit';
    } else if (value === 5) {
      return 'Too Loose';
    } else {
      return value;
    }
  };

  const classes = makeStyles(styles)();

  return (
    <DialogContent dividers >
      <FormControl component="div" className={props.classes.formControl}>
        <div className={classes.sameLine}>
          <TextField
            error={userNameError.current}
            label="Username"
            type="text"
            id="margin-normal"
            placeholder="jackson11"
            value={userName}
            onChange={(event) => { handleFormChange(event, setUserName) }}
            className={classes.textField}
            helperText="For privacy reasons, do not use your full name or email address"
            margin="normal"
          />
          <TextField
            label="Email"
            type="email"
            id="margin-normal"
            placeholder="Jackson11@email.com"
            error={!validateEmail(email)}
            value={email}
            onChange={(event) => { handleFormChange(event, setEmail) }}
            className={classes.textField}
            helperText="For authentication reasons, you will not be emailed"
            margin="normal"
          />
        </div>
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <TextField
          label="Review Summary"
          id="margin-normal"
          placeholder="Summarize your review here..."
          className={classes.textField}
          helperText="Write a sumamry of your review for this product"
          margin="normal"
        />
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <TextField
          label="Review Body"
          id="margin-normal"
          placeholder="Your thoughts..."
          className={classes.textField}
          helperText="Tell us what you thought!"
          margin="normal"
          required={true}
        />
      </FormControl>
      <FormControl component="div" className={classes.sameLine}>
        <Rating name="new-review-rating" onChange={(event) => { handleFormChange(event, setRating) }} precision={1} value={Number(rating)} controlled="true" />
        <Typography variant="subtitle1">{ratingDescription.current}</Typography>
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Would you recommend this product? </Typography>
        <RadioGroup row aria-label="recommend" name="recommend" value={recommend} onChange={(event) => { handleFormChange(event, setRecommend) }}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup >
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Size: </Typography>
        <RadioGroup row aria-label="comfort" name="comfort" value={size} onChange={(event) => { handleFormChange(event, setSize) }}>
          <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
          <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
          <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
        </RadioGroup >
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Width: </Typography>
        <RadioGroup row aria-label="comfort" name="comfort" value={width} onChange={(event) => { handleFormChange(event, setWidth) }}>
          <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
          <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
          <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
        </RadioGroup >
      </FormControl>

      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Comfort: </Typography>
        <RadioGroup row aria-label="comfort" name="comfort" value={comfort} onChange={(event) => { handleFormChange(event, setComfort) }}>
          <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
          <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
          <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
        </RadioGroup >
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Length: </Typography>
        <RadioGroup row aria-label="comfort" name="comfort" value={length} onChange={(event) => { handleFormChange(event, setLength) }}>
          <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
          <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
          <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
        </RadioGroup >
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Quality: </Typography>
        <RadioGroup row aria-label="comfort" name="comfort" value={quality} onChange={(event) => { handleFormChange(event, setQuality) }}>
          <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
          <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
          <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
        </RadioGroup >
      </FormControl>
      <FormControl component="div" className={classes.row}>
        <Typography variant="subtitle1"> Fit: </Typography>
        <RadioGroup row aria-label="comfort" name="comfort" value={fit} onChange={(event) => { handleFormChange(event, setFit) }}>
          <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
          <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
          <FormControlLabel value="3" control={<Radio />} label="Perfect" />
          <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
          <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
        </RadioGroup >
      </FormControl>
      <FormControl>
        <Typography variant="subtitle1">Add Photos</Typography>
        <Input type="file">Choose File</Input>
      </FormControl>
    </DialogContent>
  );
};

export default FormBody;