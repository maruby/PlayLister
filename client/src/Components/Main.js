import React, {useState,} from 'react';
import { Grid, Card, Box, Divider, Fab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ControlBar from './ControlBar.js'
import SearchBox from './SearchBox.js'
import Playlist from '../Features/Playlist/Playlist.js';
import { styles } from '../Theme';
import ReactPlayer from 'react-player/youtube';
import { useBeforeunload } from 'react-beforeunload';
import { 
  PlayArrowRounded, 
  SkipNextRounded,
  SkipPreviousRounded,
  Pause,
}from '@material-ui/icons';

const Main = (props) => {
  const { classes } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(JSON.parse(localStorage.getItem('volume')));
  const [reactPlayer, setReactPlayer] = useState({});
  const [duration, setDuration] = useState(0);
  const [played, setPlayed] = useState(0);

  useBeforeunload((event) => {
    // Save current volume value before leaving
    localStorage.setItem('volume', JSON.stringify(volume));
  });

  const playOnClickHandler = (event) => {
    setIsPlaying(!isPlaying);
  }
  
  const onVolumeChangeHandler = (event, newValue) => {
    setVolume(newValue);
  }

  const onDuration = (duration) => {
    setDuration(duration);
  }

  const onSeekChangeHandler = (event, newValue) => {
    reactPlayer.seekTo(parseFloat(newValue))
  }

  const onProgressHandler = (state) => {
    setPlayed(state.playedSeconds);
  }

  const playerRef = player => {
    setReactPlayer(player);
  }

  return (
      <Box className={classes.wrapper}>
        <Grid 
            container
            direction="row"
            alignItems="center"
            justify="center"
            style={{position:"absolute"}}
            className={classes.wrapper}
        >
          <ReactPlayer
              ref={playerRef}
              url='https://www.youtube.com/watch?v=9T4MMIJSDfM' 
              height="480px"
              width="854px"
              playing={isPlaying}
              volume={volume}
              onDuration={onDuration}
              onProgress={onProgressHandler}
              config={{
                youtube: {
                  playerVars: { controls: 0 }
                }
              }}
              style={{
                  // display:"none",
                  shadow:"box"
                }}
              />
        </Grid>

        <Grid 
            container
            direction="column"
            alignItems="center"
            justify="flex-start"
            style={{position:"absolute"}}
        >
          <SearchBox className={classes.searchBoxWrapper} />
        </Grid>

        <Grid 
            container
            direction="column"
            alignItems="center"
            justify="flex-end"
            className={classes.wrapper}
        >
          <Box className={classes.musicPlayerWrapper}>
            <Box className={classes.mainControlsWrapper}>
                <Fab color="secondary" size="small">
                  <SkipPreviousRounded color="primary" fontSize="small"/>
                </Fab>

                <Fab 
                  color="primary" 
                  size="large" 
                  className={classes.playButton} 
                  onClick={playOnClickHandler}>
                  {isPlaying ?
                    <Pause fontSize="large" />
                    :
                    <PlayArrowRounded fontSize="large"/>}
                </Fab>

                <Fab color="secondary" size="small">
                  <SkipNextRounded color="primary" fontSize="small"/>
                </Fab>
            </Box>

            <Card className={classes.mainCard}>
              <ControlBar 
                volume={volume} 
                onVolumeChange={onVolumeChangeHandler}
                onSeekChange={onSeekChangeHandler}
                duration={duration}
                played={played}
              />
              <Divider light />
              <Playlist />
            </Card>
          </Box>
        </Grid>
      </Box>
  );
}

export default withStyles(styles)(Main);
