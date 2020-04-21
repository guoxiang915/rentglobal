import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { I18nextProvider } from 'react-i18next';
import configureStore from './store/configureStore';
import routes from './routes';
import theme from './common/config/theme';
import i18n from './i18n';

import './assets/font/AvenirNextLTPro/AvenirNextLTPro-Regular.otf';
import './common/styles/global.css';

// Configure store
const store = configureStore();

// Configure browser history
const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n} initialLanguage="en">
      <MuiThemeProvider theme={theme}>
        <Main history={history} />
      </MuiThemeProvider>
    </I18nextProvider>
  </Provider>
);

const Main = ({ history }) => (
  <ConnectedRouter history={history}>{routes}</ConnectedRouter>
);

export default App;
