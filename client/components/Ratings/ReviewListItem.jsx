import React, { useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import GITHUB_API_TOKEN from '../../config.js';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';

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
  review: {
    padding: 8,
    margin: 10,
    backgroundColor: '#e3e8e5',
    // boxShadow: '10px 10px 5px black'
  }
});

let ReviewListItem = (props) => {

  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  const [showMoreBody, setShowMoreBody] = useState(false);

  const date = useRef(new moment(props.data.date).format("l"));
  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/';
  const headers = {
    headers: { Authorization: GITHUB_API_TOKEN }
  };

  const handleShowMoreBody = (event) => {
    setShowMoreBody(!showMoreBody);
  }

  const helpfulButton = (event) => {
    event.preventDefault();
    if (!helpful) {
      axios.put(`${url}${props.data.review_id}/helpful`, null, headers)
        .then(response => {
          setHelpful(true);
        })
        .catch((err) => {
          console.log('Error setting helpful: ', err);
        })
    }
  };

  const reportButton = (event) => {
    event.preventDefault();
    if (!reported) {
      axios.put(`${url}${props.data.review_id}/report`, null, headers)
        .then(response => {
          setReported(true);
        })
        .catch((err) => {
          console.log('Error report review: ', err);
        })
    }

  }

  const handleImageClick = (event) => {

  }
  const classes = makeStyles(styles)();

  return (
    <div>
      {!reported
        ? < Paper className={classes.review} >
          <Grid container direction="column" spacing={3} >
            <Grid container item direction="row" alignItems="center" justify="space-between">
              {props.data.email
                ? <Grid item>
                  <Typography variant="caption" ><CheckIcon /> {'Verified Purchaser'}</Typography>
                </Grid> : null}
              <Grid item>
                <Rating name="read-only" precision={0.25} value={props.data.rating > 0 ? props.data.rating : 0} readOnly />
              </Grid>
              <Grid item>
                <Grid item>{props.data.reviewer_name}, {date.current}</Grid>
              </Grid>
            </Grid>
            {props.data.summary
              ? <Grid item>
                <Typography noWrap style={{ fontSize: 28, fontWeight: 'bold' }}>{props.data.summary.length > 60
                  ? `${props.data.summary.slice(0, 60)}...`
                  : props.data.summary}
                </Typography>
              </Grid>
              : null}
            <Grid item>
              {props.data.body.length > 250
                ? <Typography style={{ fontSize: 20 }}>{showMoreBody
                  ? `${props.data.body} ${<Button onClick={handleShowMoreBody}>'Show less...'</Button>}`
                  : `${props.data.body.slice(0, 250)} ${<Button onClick={handleShowMoreBody}>'Show more...'</Button>}`}
                </Typography>
                : <Typography style={{ fontSize: 20 }}>{props.data.body}</Typography>}
            </Grid>
            {props.data.response
              ? <div style={{ backgroundColor: '#E4E6EB' }}>
                <Typography variant="h6" >Response:</Typography>
                <Typography variant="body1">{props.data.response}</Typography>
              </div>
              : null}
            {props.data.recommend
              ? <Grid item>
                <Typography variant="body1"><CheckIcon /> {'I recommend this product'}</Typography>
              </Grid>
              : null}
            {props.data.photos.length > 0
              ? <div className={classes.sameLine} style={{ minHeight: 100, maxHeight: 100, minWidth: 500, maxWidth: 500 }}>
                {props.data.photos.map((image) => {
                  let imageUrl = image.url
                  return <Card classes={{ root: classes.card }} key={image.id} onClick={handleImageClick}>
                    <CardMedia
                      component="img"
                      image={imageUrl}
                      variant="outlined"
                    />
                  </Card>
                })}
              </div>
              : null}
            <Grid container item direction="row" alignItems="center">
              <Typography>Helpful? ({helpful ? props.data.helpfulness + 1 : props.data.helpfulness})</Typography>
              <Button onClick={helpfulButton}>Helpful</Button>
              <Divider orientation="vertical" flexItem />
              <Button onClick={reportButton}>Report</Button>
            </Grid>
          </Grid >
        </Paper >
        : null}
    </div>
  );
};

export default ReviewListItem;