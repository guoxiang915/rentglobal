import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import AuthWrapper from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";

export default (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/auth" component={AuthWrapper} />
    </Switch>
  </div>
);
