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
  return `${value}`;
}

function YearsOfExperienceSlider() {
    const classes = useStyles();

    return (<div className={classes.root}>
        <Typography id="discrete-slider-small-steps" gutterBottom>
            Years of experience
        </Typography>
        <Slider
          defaultValue={5}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={5}
          marks
          min={0}
          max={45}
          valueLabelDisplay="auto"
        />
      </div>)
}

export default YearsOfExperienceSlider