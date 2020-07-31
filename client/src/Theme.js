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
    minHeight: '60%',
    minWidth: '100%',
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
  }
}

export {
  theme, 
  styles
}