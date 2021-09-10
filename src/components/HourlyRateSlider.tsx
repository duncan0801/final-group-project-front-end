import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value: number) {
  return `£${value}`;
}

function HourlyRateSlider() {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Typography id="discrete-slider-small-steps" gutterBottom>
            Hourly rate
        </Typography>
        <Slider
          defaultValue={10}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={10}
          marks
          min={10}
          max={100}
          valueLabelDisplay="auto"
        />
      </div>)
}

export default HourlyRateSlider