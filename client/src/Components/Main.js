import React from 'react';
import { Grid, Card, Box, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Waveform from './Waveform.js';
import ControlBar from './ControlBar.js'
import SearchBox from './SearchBox.js'
import Playlist from '../Features/Playlist/Playlist.js';
import { styles } from '../Theme';

const Main = (props) => {
  const { classes } = props;

  return (
      <Box className={classes.wrapper}>

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
            {/* <Waveform /> */}
            <Card className={classes.mainCard}>
              <Divider light />
              <ControlBar />
              <Divider light />
              <Playlist />
            </Card>
          </Box>
        </Grid>
      </Box>
  );
}

export default withStyles(styles)(Main);
