import React, { useRef, useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

let Sidebar = (props) => {

  const [averageRating, setAverageRating] = useState(0);
  const [percentRecommend, setPercentRecommend] = useState(0);

  const oneStarRating = useRef(0);
  const twoStarRating = useRef(0);
  const threeStarRating = useRef(0);
  const fourStarRating = useRef(0);
  const fiveStarRating = useRef(0);

  useEffect(() => {
    let totalRatings = 0;
    let totalPoints = 0;
    for (let starValue in props.metaData.ratings) {
      totalRatings += Number(props.metaData.ratings[starValue]);
      if (props.metaData.ratings[starValue]) {
        totalPoints += (Number(props.metaData.ratings[starValue]) * Number(starValue));
      }
    }
    oneStarRating.current = Math.round(Number(props.metaData.ratings['1']) / totalRatings * 100);
    twoStarRating.current = Math.round(Number(props.metaData.ratings['2']) / totalRatings * 100);
    threeStarRating.current = Math.round(Number(props.metaData.ratings['3']) / totalRatings * 100);
    fourStarRating.current = Math.round(Number(props.metaData.ratings['4']) / totalRatings * 100);
    fiveStarRating.current = Math.round(Number(props.metaData.ratings['5']) / totalRatings * 100);

    // console.log(oneStarRating.current);
    setAverageRating(Number(totalPoints / totalRatings).toFixed(1));
  }, []);

  useEffect(() => {
    let didRecommend = Number(props.metaData.recommended['true']);
    let didNotRecommend = Number(props.metaData.recommended['false']);
    setPercentRecommend(Math.round((didRecommend / (didRecommend + didNotRecommend)) * 100));
  }, []);


  const theme = createMuiTheme({
    palette: {
      primary: {
        main: green[500],
      },
      secondary: {
        main: grey[400],
      }
    },
  });

  const useStyles = makeStyles((theme) => ({
    LinearProgress: {
      colorPrimary: {
        backgroundColor: green[400]
      },
      barColorPrimary: {
        backgroundColor: grey[400]
      },
      minWidth: 200,
      bar: {
        backgroundColor: grey[400]
      }
    }
  }));
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={1}>
      <MuiThemeProvider theme={theme}>
        <Grid container item spacing={1}>
          <Typography variant="caption">RATINGS & REVIEWS</Typography>
        </Grid>
        <Grid container item direction='column' spacing={1}>
          <Grid container item direction='row'>
            <Typography variant='h1'>{averageRating > 0 ? averageRating : 0}</Typography>
            <Rating name="read-only" precision={0.25} value={Number(averageRating) > 0 ? Number(averageRating) : 0} readOnly />
          </Grid>
          <Typography>{percentRecommend > 0 ? percentRecommend : 0}% of users recommend this product</Typography>
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography>5 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={fiveStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography>4 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={fourStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography>3 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={threeStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography>2 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={twoStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography>1 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={oneStarRating.current}
            color="primary"
          /> : null}
        </Grid>
      </MuiThemeProvider>
    </Grid>
  );
};

export default Sidebar;