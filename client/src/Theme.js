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
    backgroundImage: 'radial-gradient(at 50% bottom,#be00fe,#a306d8,#272626)'
  },
  mainCard: {
    height: '350px',
    width: '500px'
  }, 
}

export {
  theme, 
  styles
}