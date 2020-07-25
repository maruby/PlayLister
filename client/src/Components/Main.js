import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Waveform from './Waveform.js';
import ControlBar from './ControlBar.js'
import SearchBox from './SearchBox.js'
import { styles } from '../Theme'

const Main = (props) => {
  const { classes } = props;

  return (
      <Grid 
          container
          direction="column"
          alignItems="center"
          justify="space-around"
      >
        <SearchBox />
        <Card className={classes.mainCard}>
          <Waveform />
          <ControlBar />
        </Card>
      </Grid>
  );
}

export default withStyles(styles)(Main);
