import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';

import { muiTheme } from './Theme.js'

// Redux configuration
// Needed for redux setup
import store from './App/Store';
import {Provider} from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
