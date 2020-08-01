import React from 'react';
import {Box, Grid, Button} from '@material-ui/core';
import { NavigateNextRounded, 
        NavigateBeforeRounded, 
        VolumeUpRounded, 
        ShuffleRounded, 
        QueueMusicRounded } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Theme'

    const icons = [ {icon: <NavigateBeforeRounded />}, 
                    {icon: <NavigateNextRounded />},
                    {icon: <VolumeUpRounded />}, 
                    {icon: <ShuffleRounded />}, 
                    {icon: <QueueMusicRounded />} 
                ]

const ControlBar = (props) => {
  const {classes} = props;

  return (
    <Box className={classes.controlBar}>
        <Grid 
            container
            direction="row"
            alignItems="center"
            justify="space-around"
        >
            {icons.map((icon, i )=> 
              <Button key={`${i}`} color="primary">{icon.icon}</Button>
            )}
        </Grid>
      </Box>
  );
}

export default withStyles(styles)(ControlBar);