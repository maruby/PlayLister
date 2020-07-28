import React from 'react';
import { Grid, Card, Box } from '@material-ui/core';
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
          xs={12}
      >
        
        <SearchBox />
        <Box component="div" minHeight={500} minWidth={370} position="relative">
          <Waveform />
          <Card className={classes.mainCard}>
            <ControlBar />
          </Card>
        </Box>
      </Grid>
  );
}

export default withStyles(styles)(Main);
