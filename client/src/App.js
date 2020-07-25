import React from 'react';
import { Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import Main from './Components/Main'
import { styles } from './Theme'


function App(props) {
  const { classes } = props

  return (
    <div className={classes.backgroundMain}>
      <Box 
        display='flex'
        height='100%'
        width='100%'
      >
        <Main />
      </Box>
    </div>
  );
}

export default withStyles(styles)(App);
