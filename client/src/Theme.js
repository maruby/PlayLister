import { createMuiTheme } from '@material-ui/core/styles';
import { purple, grey } from '@material-ui/core/colors';


const muiTheme = createMuiTheme({
  palette: { 
    primary: {
      main: purple['A700'],
    },
    secondary: {
      main: purple[100]
    },
    warning: {
      light: purple[100],
      main: purple[500],
      dark: purple[700],
      contrastText: "rgba(0, 0, 0, 0.87)"
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    subtitle1:{
      fontSize: "extra-light",
      fontWeight: 200,
      color: grey[500]
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
    '& .MuiInput-underline': {
      color: purple[100],
      '&:before': {
        borderBottomColor: purple['A700']
      },
      '&:after': {
        borderBottomColor: purple[100]
      },
      '&:hover:not($disabled):not($focused):not($error):before': {
        borderBottom: `2px solid ${purple[100]} !important`
      }
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
    width: "100%"
  },
  controlBar: {
    padding: "0.3em 1rem",
    paddingBottom: "1.5em",
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
    margin: "0 1.1rem",
    paddingTop: "0.3em"
  },
  dialogTitle: {
    margin: 0,
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
    color: grey[500],
  },
  cardContent: {
    height:"100%",
    width:"100%",
    alignItems: "center",
    justifyContent:"center",
    padding:"10px",
    display: 'flex',
    flexDirection: 'column',
  },
  '@global': {
    '*::scrollbar-width': 'thin',

    '*::-webkit-scrollbar': {
      width: '0.4em'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    }
  }
}

export {
  muiTheme, 
  styles
}