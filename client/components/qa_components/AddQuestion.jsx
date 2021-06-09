import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import axios from 'axios';
import token from './config/config.js';
import AddQuestionForm from './AddQuestionForm.jsx'

const AddQuestion = (props) => {


  return (

    <React.Fragment>

   <h1>Test?</h1>
   <AddQuestionForm />
    </React.Fragment>

  )
};



export default AddQuestion;