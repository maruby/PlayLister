import { createMuiTheme } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';


const theme = createMuiTheme({
  palette: { 
    primary: {
      main: purple['A700'],
    },
    secondary: {
      main: purple[100]
    }
  }
});

const styles = {
  backgroundMain: {
    height: '100vh',
    backgroundImage: 'radial-gradient(at 50% bottom,#700099,#8504b3,#272626)'
  },
  mainCard: {
    paddingTop: '2rem'
  }, 
  searchBox: {
    '& label': {
      color: purple['A700']
    },
    '& label.Mui-focused': {
      color: purple[100],
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: purple['A700'],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: purple[100],
    },
    '& .MuiInput-underline:hover:not($disabled):not($focused):not($error):before': {
      borderBottom: `2px solid ${purple[100]} !important`
    }
  },
  wrapper: {
    height: "100%",
    width: "100%"
  },
  searchBoxWrapper: {
    width: "50%",
    paddingTop: "2em"
  },
  musicPlayerWrapper: {
    // minWidth: "15rem",
    width: "100%"
    // marginBottom: "5em"
  },
  controlBar: {
    padding: "0.3em 1rem",
    paddingBottom: "1.5em"
  },
  mainControlsWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "0.1rem"
  },
  playButton: {
    margin: "0 1.1rem"
  }
}

export {
  theme, 
  styles
}