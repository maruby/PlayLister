import React, { useState } from 'react';
import { Grid, Card, Box, Divider, Fab, Collapse, Typography } from '@material-ui/core';
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
  PauseRounded,
}from '@material-ui/icons';
import { Common, PlaylistConstants, LoopConstants } from '../Utility/Constants.js'
import { selectPlaylist, shuffledNextInPlaylist, skipMusicInPlaylist } from './../Features/Playlist/PlaylistSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Main = (props) => {
  const { classes } = props;

  const parsedVolume = JSON.parse(localStorage.getItem('volume'));
  const parsedLoop = JSON.parse(localStorage.getItem('loop'));

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(parsedVolume ? parsedVolume : 0);
  const [reactPlayer, setReactPlayer] = useState({});
  const [duration, setDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [listCollapsed, setListCollapsed] = useState(false);
  const playlist = useSelector(selectPlaylist);
  const [playing, setPlaying] = useState(playlist);
  const [loop, setLoop] = useState(parsedLoop ? parsedLoop: LoopConstants.REPEAT_ALL);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Top most music in the playlist will always be set to current playing
    setPlaying(playlist[0]);
  }, [playlist]);

  useBeforeunload((event) => {
    localStorage.setItem('volume', JSON.stringify(volume)); // Save current volume value before leaving
    localStorage.setItem('playlist', JSON.stringify(playlist)); // Save current playlist
    localStorage.setItem('loop', JSON.stringify(loop)); // Save current loop
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

  const changeVideoTime = (newValue) => {
    reactPlayer.seekTo(parseFloat(newValue))
  }

  const onProgressHandler = (state) => {
    setElapsedTime(state.playedSeconds);
  }

  const playerRef = player => {
    setReactPlayer(player);
  }

  const onPlaylistClick = () => {
    setListCollapsed(!listCollapsed);
  }
  
  const previousButtonHandler = () => {
    dispatch(skipMusicInPlaylist(PlaylistConstants.PREVIOUS))
  }

  const nextButtonHandler = () => {
    if(loop === LoopConstants.REPEAT_ALL) {
      dispatch(skipMusicInPlaylist(PlaylistConstants.NEXT))
    }else if(loop === LoopConstants.REPEAT_ONE) {
      setTimeout(() => {
        setElapsedTime(0)
        changeVideoTime(0)
      }, 500)
    }else if(loop === LoopConstants.SHUFFLE) {
      dispatch(shuffledNextInPlaylist())
    }
  }

  const onClickLoop = () => {
    setLoop(loop === LoopConstants.SHUFFLE ? LoopConstants.REPEAT_ALL : loop + 1)
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
          <Box style={{
            boxShadow: "5px 10px 18px #000000",  
            position: "relative",
            width: "60%",
            height: "55%",
            paddingtop: "75%" }}
          >
          {playlist.length > 0 ? 
            <ReactPlayer
                ref={playerRef}
                url={ Common.YOUTUBE + playing } 
                height="100%"
                width="100%"
                playing={isPlaying}
                volume={volume}
                onDuration={onDuration}
                onProgress={onProgressHandler}
                onEnded={nextButtonHandler}
                config={{
                  playerVars: {
                    controls: 0,
                    start: 0,
                  }
                }}
                  />
                :
                <Box height="100%" width="100%" 
                display="flex" 
                alignItems="center"
                justifyContent="center">
                 <Card className={classes.cardContent}>
                   <Typography component="h1" variant="h1">
                      ┐(￣ヘ￣;)┌
                   </Typography>
                   <Typography variant="h5">
                      There is no video on your playlist
                   </Typography>
                 </Card>
                 </Box>
                }
              </Box>
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
          <Box className={classes.musicPlayerWrapper} zIndex="modal">
            <Box className={classes.mainControlsWrapper}>
                <Fab id="previous" color="secondary" size="small" onClick={previousButtonHandler}>
                  <SkipPreviousRounded color="primary" fontSize="small"/>
                </Fab>

                <Fab 
                  color="primary" 
                  size="large" 
                  className={classes.playButton} 
                  onClick={playOnClickHandler}>
                  {isPlaying ?
                    <PauseRounded fontSize="large" />
                    :
                    <PlayArrowRounded fontSize="large"/>}
                </Fab>

                <Fab id="next" color="secondary" size="small" onClick={nextButtonHandler}>
                  <SkipNextRounded color="primary" fontSize="small"/>
                </Fab>
            </Box>

            <Card className={classes.mainCard}>
              <ControlBar 
                volume={volume} 
                onVolumeChange={onVolumeChangeHandler}
                duration={duration}
                elapsedTime={elapsedTime}
                changeVideoTime={changeVideoTime}
                onPlaylistClick={onPlaylistClick}
                loop={loop}
                onClickLoop={onClickLoop}
                listCollapsed={listCollapsed}
              />
              <Divider light />
              <Collapse in={listCollapsed}>
                <Playlist />
              </Collapse>
            </Card>
          </Box>
        </Grid>
      </Box>
  );
}

export default withStyles(styles)(Main);
