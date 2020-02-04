import React, { Component } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core";
import configureStore from "./store/configureStore";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

import "./common/styles/global.css";

const store = configureStore();
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router>
        <I18nextProvider i18n={i18n} initialLanguage="en">
          <Provider store={store}>
            <Main history={history} />
          </Provider>
        </I18nextProvider>
      </Router>
    );
  }
}

const Main = ({ history }) => {
  return <ConnectedRouter history={history}>{routes}</ConnectedRouter>;
};

export default App;
