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
}

export {
  theme, 
  styles
}