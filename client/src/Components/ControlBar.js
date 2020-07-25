import React from 'react';
import {Box, Grid, Button} from '@material-ui/core';
import { NavigateNextRounded, 
        NavigateBeforeRounded, 
        VolumeUpRounded, 
        ShuffleRounded, 
        QueueMusicRounded } from '@material-ui/icons';

    const icons = [ {icon: <NavigateNextRounded />}, 
                    {icon: <NavigateBeforeRounded />},
                    {icon: <VolumeUpRounded />}, 
                    {icon: <ShuffleRounded />}, 
                    {icon: <QueueMusicRounded />} 
                ]


const ControlBar = () => {
  return (
      <Box pt={7}>
        <Grid 
            container
            direction="row"
            alignItems="center"
            justify="space-around"
        >
            {icons.map(i => <Button color="primary">{i.icon}</Button>)}
        </Grid>
      </Box>
  );
}

export default ControlBar;