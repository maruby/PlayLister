import { createMuiTheme } from '@material-ui/core/styles';
import { purple, grey } from '@material-ui/core/colors';


const muiTheme = createMuiTheme({
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
    paddingTop: '5rem'
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
    marginBottom: "5em"
  },
  controlBar: {
    paddingTop: "0.3em"
  },
  dialogTitle: {
    margin: 0,
    padding: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: 1,
    color: grey[500],
  }
}

export {
  muiTheme, 
  styles
}