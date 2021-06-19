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
import FormBody from './FormBody.jsx';

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

let NewReviewForm = (props) => {

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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <FormBody classes={props.classes} product_id={props.product_id} metaData={props.metaData} />
      </Dialog >
    </div >
  );
}

export default NewReviewForm;