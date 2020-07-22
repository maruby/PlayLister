import React from 'react';
import {Fab} from '@material-ui/core';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import './PlayButton.css'

const PlayButton = () => {

  return (
      <Fab 
      className="play_button"
      color="primary"
      >
        <PlayArrowRoundedIcon />
      </Fab>
  );
}

export default PlayButton;