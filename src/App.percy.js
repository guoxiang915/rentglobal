import React from "react";
import { Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserHistory } from "history";

import configureStore from "./client/store";
import App from "./App";

const store = configureStore();
const history = createBrowserHistory();

percySnapshot("App", () => {
  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </ReduxProvider>
  );
});
