import React from 'react';
import {Box, Grid, Card} from '@material-ui/core';

import Soundwave from './Soundwave.js';
import PlayButton from './PlayButton.js'
import ControlBar from './ControlBar.js'

import './Main.css'


const Main = () => {
  return (
    <Box className="main-background">
      <Grid 
          container
          direction="row"
          alignItems="center"
          justify="center"
      >
        <PlayButton />
        <Card
        className="main-card"
        >
          <Soundwave />
          <ControlBar />
        </Card>
      </Grid>
    </Box>
  );
}

export default Main;
