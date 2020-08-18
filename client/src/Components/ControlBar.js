import React, { useState, useEffect } from 'react';
import {Box, Grid, Button, Typography, Tooltip} from '@material-ui/core';
import {ShuffleRounded, 
        QueueMusicRounded,
        VolumeDownRounded,
        VolumeUpRounded,
        Repeat,
        RepeatOne
      } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Theme';
import Slider from '@material-ui/core/Slider';
import { LoopConstants, formatDuration } from '../Utility/Constants'

const ControlBar = (props) => {
  const {classes} = props;
  const {
    volume, 
    onVolumeChange,
    changeVideoTime,
    duration,
    elapsedTime,
    onPlaylistClick,
    loop,
    onClickLoop
  } = props;
  const [value, setValue] = useState(0) 
  const [isSeeking, setIsSeeking] = useState(false)
  const parsedLoop = JSON.parse(localStorage.getItem('loop'));
  const [loopTooltip, setLoopTooltip] = useState(parsedLoop ? parsedLoop : LoopConstants.DEFAULT)

  useEffect(() => {
    setLoopTooltip(
      loop === LoopConstants.REPEAT_ALL ? LoopConstants.REPEAT_ALL_TOOLTIP :
      loop === LoopConstants.REPEAT_ONE ? LoopConstants.REPEAT_ONE_TOOLTIP : 
      loop === LoopConstants.SHUFFLE ? LoopConstants.SHUFFLE_TOOLTIP :
      LoopConstants.DEFAULT
    )
  }, [loop])

  useEffect(() => {
    if(!isSeeking) {
      setValue(elapsedTime)
    }
  }, [isSeeking, elapsedTime])
 
  const onVideoSeekChange = (event, newValue) => {
    if(!isSeeking) {
      setIsSeeking(true)
    }

    setValue(newValue)
  }

  const onVideoSeekChangeCommitted = (event, newValue) => {
    setIsSeeking(false)
    changeVideoTime(newValue)
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
              <VolumeDownRounded color="primary" />
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
              <VolumeUpRounded color="primary" />
            </Grid>
            
            <Grid item style={{paddingLeft:"3%", paddingBottom:"0.3%"}}>
              <Typography variant="caption">
                {value ? formatDuration(value) : "0:00"}
              </Typography>
            </Grid>

            <Grid item xs style={{padding:"0 1%"}}>
              <Slider
                min={0}
                step={1}
                max={duration}
                value={value}
                onChange={onVideoSeekChange}
                onChangeCommitted={onVideoSeekChangeCommitted}
              />
            </Grid>

            <Grid item style={{paddingBottom:"0.3%"}}>
              <Typography variant="caption">
                {duration ? formatDuration(duration) : "0:00"}
              </Typography>
            </Grid>

            <Grid item>
              <Tooltip title={loopTooltip}>
                <Button color="primary" onClick={onClickLoop}>
                  {loop === LoopConstants.REPEAT_ALL ?
                    <Repeat />
                  :loop === LoopConstants.REPEAT_ONE ?
                    <RepeatOne />
                  :loop === LoopConstants.SHUFFLE ?
                    <ShuffleRounded />
                  : <span>LoopError</span>
                  }
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button color="primary" onClick={onPlaylistClick}><QueueMusicRounded /></Button>
            </Grid>
        </Grid>
    </Box>
  );
}

export default withStyles(styles)(ControlBar);