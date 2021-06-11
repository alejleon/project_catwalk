import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
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