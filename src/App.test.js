import React from "react";
import ReactDOM from "react-dom";
import { Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { createBrowserHistory } from 'history';

import configureStore from './store/configureStore';
import App from "./App";

const store = configureStore();
const history = createBrowserHistory();

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <ReduxProvider store={store}>
      <Router history={history}>
        <App /> 
      </Router>
    </ReduxProvider>, div);
});
