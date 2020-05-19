import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserHistory } from 'history';

import './index.css';
import App from '../App';
import configureStore from './store';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.hydrate(
  <ReduxProvider store={store}>
    <Router history={history}>
      <App />      
    </Router>
  </ReduxProvider>,
  document.getElementById('root')
);
