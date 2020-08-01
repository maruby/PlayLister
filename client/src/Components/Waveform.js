import React, { useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Box, Grid, Fab, } from '@material-ui/core';
import { PlayArrowRounded }from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Theme.js'


const Waveform = (props) => {  
  const { classes } = props
  const [playing, setPlaying] = useState(false) 
  const waveformRef = useRef();
  const  track = useRef()

  useEffect(() => { 
    const waveform = WaveSurfer.create({
      barWidth: 2,
      barHeight: 1.5,
      cursorWidth: 2,
      container: waveformRef.current,
      backend: 'MediaElement',
      // height: 1,
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
        minWidth={365}
        height="3.5rem"
        p={1}
        position="relative"
      >
        <Grid
          container
          direction="row"
          justify="center"
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