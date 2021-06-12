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
import Slider from '@material-ui/core/Slider';


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
    marginRight: 10
  },
  sameLine: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2),
    marginRight: 10
  }
});

let NewReviewForm = (props) => {

  const [rating, setRating] = useState(3);
  const [recommend, setRecommend] = useState("");
  const [comfort, setComfort] = useState("");

  const ratingDescription = useRef("Average");

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setRecommend("");
  };

  const handleFormSubmission = () => {
    console.log('Form submitted');
    handleClose();
  }

  const handleRecommendRadio = (event) => {
    setRecommend(event.target.value);
  };

  const handleComfortRadio = (event) => {
    console.log(comfort);
    setComfort(event.target.value);
  }

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

  }
  const classes = makeStyles(styles)();

  return (
    <div>
      <Button
        className={props.classes.button}
        endIcon={<AddIcon />}
        variant="contained"
        onClick={handleClickOpen}
        id="add-reviews"
        style={{ maxWidth: '150px', maxHeight: '50px', minWidth: '150px', minHeight: '50px' }}
      >ADD REVIEW
          </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" maxWidth="md" classes={{ paper: classes.paper }} open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          ADD REVIEW
        </DialogTitle>
        <DialogContent dividers >
          <FormControl component="fieldset" className={props.classes.formControl}>
            <div className={classes.sameLine}>
              <Rating name="new-review-rating" onChange={handleRatingSelection} precision={1} value={rating} controlled="true" />
              <Typography variant="subtitle1">{ratingDescription.current}</Typography>
            </div>
            <div className={classes.row}>
              <Typography variant="subtitle1"> Do you recommend this product? </Typography>
              <RadioGroup row aria-label="recommend" name="recommend" value={recommend} onChange={handleRecommendRadio}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup >
            </div>
            <div className={classes.row}>
              <Typography variant="subtitle1"> Comfort: </Typography>
              <RadioGroup row aria-label="comfort" name="comfort" value={comfort} onChange={handleComfortRadio}>
                <FormControlLabel value="1" control={<Radio />} label="A Size Too Small" />
                <FormControlLabel value="2" control={<Radio />} label="1/2 Size Too Small" />
                <FormControlLabel value="3" control={<Radio />} label="Perfect" />
                <FormControlLabel value="4" control={<Radio />} label="1/2 Size Too Large" />
                <FormControlLabel value="5" control={<Radio />} label="A Size Too Large" />
              </RadioGroup >
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleFormSubmission} color="primary">
            SUBMIT REVIEW
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewReviewForm;