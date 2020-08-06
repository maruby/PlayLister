import React from 'react';
import {Box, Grid, Button, Typography} from '@material-ui/core';
import {ShuffleRounded, 
        QueueMusicRounded } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Theme';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

const ControlBar = (props) => {
  const {classes} = props;
  const {
    volume, 
    onVolumeChange, 
    onSeekChange,
    duration,
    played
  } = props;

  const formatDuration = (seconds) => {
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = pad(date.getUTCSeconds())
    if (hh) {
      return `${hh}:${pad(mm)}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  const pad = (string) => {
    return ('0' + string).slice(-2)
  }

  return (
    <Box className={classes.controlBar}>
        <Grid 
            container
            direction="row"
            alignItems="center"
            justify="center"
        >
            <Grid item>
              <VolumeDown color="primary" />
            </Grid>
            <Grid item xs={1} style={{padding:"0 0.5%"}}>
              <Slider 
                min={0}
                step={0.1}
                max={1}
                value={volume} 
                onChange={onVolumeChange} 
                aria-labelledby="continuous-slider" />
            </Grid>
            <Grid item>
              <VolumeUp color="primary" />
            </Grid>
            
            <Grid item style={{paddingLeft:"3%", paddingBottom:"0.3%"}}>
              <Typography variant="caption">
                {played ? formatDuration(played) : "0:00"}
              </Typography>
            </Grid>

            <Grid item xs style={{padding:"0 1%"}}>
              <Slider 
                min={0}
                step={1}
                max={duration}
                onChange={onSeekChange}
                value={played}
                aria-labelledby="continuous-slider" />
            </Grid>

            <Grid item style={{paddingBottom:"0.3%"}}>
              <Typography variant="caption">
                {duration ? formatDuration(duration) : "0:00"}
              </Typography>
            </Grid>

            <Grid item>
              <Button color="primary"><ShuffleRounded /></Button>
            </Grid>
            <Grid item>
              <Button color="primary"><QueueMusicRounded /></Button>
            </Grid>
        </Grid>
    </Box>
  );
}

export default withStyles(styles)(ControlBar);