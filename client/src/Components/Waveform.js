import React, { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Box, Grid, Fab, } from '@material-ui/core';
import { PlayArrowRounded }from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Theme.js'


const Waveform = (props) => {  
  const { classes } = props
  const [playing, setPlaying] = useState(false) // this.state lang to
  const waveformRef = useRef();
  const  track = useRef()

  useEffect(() => { //component did mount lang to
    const waveform = WaveSurfer.create({
      barWidth: 2,
      cursorWidth: 1,
      container: waveformRef.current,
      backend: 'MediaElement',
      height: 100,
      progressColor: '#e040fb',
      responsive: true,
      waveColor: '#e1bee7',
      cursorColor: '#ba68c8',
    }, []);

    waveform.load(track.current);
  });
  
    const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    return (
      <Box 
        position="absolute"
        top='31%'
        width="500px"
        height="300px"
      >
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
      >
        <Grid item xs={2}>
          <Fab color="primary">
            <PlayArrowRounded fontSize="large" />
          </Fab>
        </Grid>
          <Grid item xs={10}>
            <div ref={waveformRef} > </div>
              <audio ref={track} src={url} />
          </Grid>
      </Grid>
      </Box>
    );
  }


export default withStyles(styles)(Waveform);