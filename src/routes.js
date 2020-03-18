import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import AuthWrapper from "./containers/Auth";
import PrivateRoute from "./containers/Layout/PrivateRoute";
import Landlord from "./containers/Landlord";
import Company from "./containers/Company";
import PageNotFound from "./containers/Landlord";

export default (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Home} noSidebar />
      <PrivateRoute path="/auth" component={AuthWrapper} noSidebar />
      <PrivateRoute path="/landlord" component={Landlord} authRequired />
      <PrivateRoute path="/company" component={Company} authRequired />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  </div>
);
