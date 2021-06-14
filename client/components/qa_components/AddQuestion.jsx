import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from'@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddQuestionForm from './AddQuestionForm.jsx'

const AddQuestion = (props) => {

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleQClose}>
        <DialogTitle id="question-dialog-title">Ask Your Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            About {props.currentProduct.name}
          </DialogContentText>
        <AddQuestionForm open={props.open} handleQClose={props.handleQClose} getAllQuestions={props.getAllQuestions}/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};



export default AddQuestion;