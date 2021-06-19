import React, { useRef, useEffect, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { green, grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Slider from '@material-ui/core/Slider';


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
    overrides: {
      MuiSlider: {
        root: {
          "&$disabled": {
            color: '#bdbdbd',
            mark: {
              backgroundColor: 'azure'
            }
          },
          height: 4
        },
        thumb: {
          color: 'black'
        },
        track: {
          color: '#bdbdbd',
          height: 4
        },
        rail: {
          color: '#bdbdbd',
          height: 4,
        },
        mark: {
          padding: 4,
          backgroundColor: '#fafafa'
        },
        markLabel: {
          fontWeight: 'bold'
        }
      },
      MuiLinearProgress: {
        root: {
          width: '75%',
          marginLeft: '5%',
          minHeight: 10
        },
        bar: {
          color: "green",
        },
        colorPrimary: {
          color: "green",
          backgroundColor: '#bdbdbd'
        },
        bar1Determinate: {
          color: 'gray'
        }
      },
      MuiTypography: {
        root: {
          marginRight: 10,
          fontWeight: 'bold'
        }
      }
    }
  });

  const useStyles = makeStyles((theme) => ({
    LinearProgress: {
      minWidth: 200,
    },
    slider: {
      root: {
        maxWidth: '100%',
        fontSize: 18,
      },
    }
  }));
  const classes = useStyles();

  return (
    <Grid container direction="column">
      <MuiThemeProvider theme={theme}>
        <Grid container item >
          <Typography style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>RATINGS  REVIEWS</Typography>
        </Grid>
        <Grid container item direction='column' >
          <Grid container item direction='row'>
            <Typography variant='h1'>{averageRating > 0 ? averageRating : 0}</Typography>
            <Rating name="read-only" precision={0.25} value={Number(averageRating) > 0 ? Number(averageRating) : 0} readOnly />
          </Grid>
          <Typography style={{ fontSize: 20 }}>{percentRecommend > 0 ? percentRecommend : 0}% of users recommend this product</Typography>
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography style={{ fontSize: 20 }}>5 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={fiveStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography style={{ fontSize: 20 }}>4 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={fourStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography style={{ fontSize: 20 }}> 3 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={threeStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography style={{ fontSize: 20 }}>2 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={twoStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container item direction="row" alignItems="center">
          <Typography style={{ fontSize: 20 }}>1 stars</Typography>
          {props.metaData.ratings ? <LinearProgress
            className={classes.LinearProgress}
            variant="determinate"
            value={oneStarRating.current}
            color="primary"
          /> : null}
        </Grid>
        <Grid container direction="column" alignItems="center" style={{}}>
          {props.metaData.characteristics.Size
            ? <Grid container item direction="column" alignItems="center" style={{ maxWidth: '80%' }}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Size</Typography>
              <Slider
                classes={{ root: classes.slider.root }}
                value={Number(props.metaData.characteristics.Size.value)}
                disabled={true}
                marks={[{ value: 1, label: "A size too small" }, { value: 2 }, { value: 3, label: "Perfect" },
                { value: 4 }, { value: 5, label: "A size too large" }]}
                min={1}
                max={5}
                step={1}
                aria-labelledby="continuous-slider" />
            </Grid>
            : null}
          {props.metaData.characteristics.Width
            ? <Grid container item direction="column" alignItems="center" style={{ maxWidth: '80%' }}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Width</Typography>
              <Slider
                classes={{ root: classes.slider.root }}
                value={Number(props.metaData.characteristics.Width.value)}
                disabled={true}
                marks={[{ value: 1, label: "Too Narrow" }, { value: 2 }, { value: 3, label: "Perfect" },
                { value: 4 }, { value: 5, label: "Too Wide" }]}
                min={1}
                max={5}
                step={1}
                aria-labelledby="continuous-slider" />
            </Grid>
            : null}
          {props.metaData.characteristics.Comfort
            ? <Grid container item direction="column" alignItems="center" style={{ maxWidth: '80%' }}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Comfort</Typography>
              <Slider
                classes={{ root: classes.slider.root }}
                value={Number(props.metaData.characteristics.Comfort.value)}
                disabled={true}
                marks={[{ value: 1, label: "Uncomfortable" }, { value: 2 }, { value: 3 },
                { value: 4 }, { value: 5, label: "Perfect" }]}
                min={1}
                max={5}
                step={1}
                aria-labelledby="continuous-slider" />
            </Grid>
            : null}
          {props.metaData.characteristics.Quality
            ? <Grid container item direction="column" alignItems="center" style={{ maxWidth: '80%' }}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Quality</Typography>
              <Slider
                classes={{ root: classes.slider.root }}
                value={Number(props.metaData.characteristics.Quality.value)}
                disabled={true}
                marks={[{ value: 1, label: "Poor" }, { value: 2 }, { value: 3, label: "What I expected" },
                { value: 4 }, { value: 5, label: "Perfect" }]}
                min={1}
                max={5}
                step={1}
                aria-labelledby="continuous-slider" />
            </Grid>
            : null}
          {props.metaData.characteristics.Length
            ? <Grid container item direction="column" alignItems="center" style={{ maxWidth: '80%' }}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Length</Typography>
              <Slider
                classes={{ root: classes.slider.root }}
                value={Number(props.metaData.characteristics.Length.value)}
                disabled={true}
                marks={[{ value: 1, label: "Runs Short" }, { value: 2 }, { value: 3, label: "Perfect" },
                { value: 4 }, { value: 5, label: "Runs Long" }]}
                min={1}
                max={5}
                step={1}
                aria-labelledby="continuous-slider" />
            </Grid>
            : null}
          {props.metaData.characteristics.Fit
            ? <Grid container item direction="column" alignItems="center" style={{ maxWidth: '80%' }}>
              <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Fit</Typography>
              <Slider
                classes={{ root: classes.slider.root }}
                value={Number(props.metaData.characteristics.Fit.value)}
                disabled={true}
                marks={[{ value: 1, label: "Runs Tight" }, { value: 2 }, { value: 3, label: "Perfect" },
                { value: 4 }, { value: 5, label: "Runs Long" }]}
                min={1}
                max={5}
                step={1}
                aria-labelledby="continuous-slider" />
            </Grid>
            : null}
        </Grid>
      </MuiThemeProvider >
    </Grid >
  );
};

export default Sidebar;