import React from "react";
import { Route, Switch } from "react-router-dom";
import AppWrapper from "./containers/AppWrapper";
import Home from "./containers/Home";
import Login from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";
import Register from "./containers/Register";

const SimplePageContainer = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </>
);

const WrappedPageContainer = () => (
  <>
    <AppWrapper />
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </>
);

export default (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute path="/login" component={Login} />
      <PrivateRoute path="/register" component={Register} />
      {/* <Route exact path={["/login", "/register"]} component={SimplePageContainer} />
      <Route component={WrappedPageContainer} /> */}
    </Switch>
  </div>
);
