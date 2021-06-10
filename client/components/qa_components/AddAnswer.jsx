import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import AddAnswerForm from './AddAnswerForm.jsx';

const AddAnswer = (props) => {

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleAClose}>
        <DialogTitle id="answer-dialog-title">Submit Your Answer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.currentProduct.name}: {props.question}
          </DialogContentText>
          <AddAnswerForm open={props.open} handleAClose={props.handleAClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddAnswer;