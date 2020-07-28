import React from 'react';
import {Box, Grid, Button} from '@material-ui/core';
import { NavigateNextRounded, 
        NavigateBeforeRounded, 
        VolumeUpRounded, 
        ShuffleRounded, 
        QueueMusicRounded } from '@material-ui/icons';

    const icons = [ {icon: <NavigateBeforeRounded />}, 
                    {icon: <NavigateNextRounded />},
                    {icon: <VolumeUpRounded />}, 
                    {icon: <ShuffleRounded />}, 
                    {icon: <QueueMusicRounded />} 
                ]

const ControlBar = () => {
  return (
    <Box width="100%" pt={7}>
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

export default ControlBar;