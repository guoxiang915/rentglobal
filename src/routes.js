import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import AuthWrapper from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";
import Landlord from "./containers/Landlord";
import Company from "./containers/Landlord";
import PageNotFound from "./containers/Landlord";

export default (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/auth" component={AuthWrapper} />
      <PrivateRoute path="/landlord" component={Landlord} authRequired />
      <PrivateRoute path="/company" component={Company} authRequired />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  </div>
);
