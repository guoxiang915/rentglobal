import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import AuthWrapper from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";
import Landlord from "./containers/Landlord";

export default (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/auth" component={AuthWrapper} />
      <PrivateRoute path="/landlord" component={Landlord} authRequired />
    </Switch>
  </div>
);
