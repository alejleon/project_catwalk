import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from'@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
          <AddAnswerForm open={props.open} handleAClose={props.handleAClose}
           getAnswers={props.getAnswers} questionId={props.questionId} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default AddAnswer;