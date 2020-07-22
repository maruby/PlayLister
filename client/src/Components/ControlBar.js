import React from 'react';
import {Grid, Button} from '@material-ui/core';

import './Main.css'


const ControlBar = () => {
  return (
      <Grid 
          container
          direction="row"
          alignItems="center"
          justify="space-around"
      >
          <Button color="primary">Primary</Button>
          <Button color="primary">Primary</Button>
          <Button color="primary">Primary</Button>
      </Grid>
  );
}

export default ControlBar;