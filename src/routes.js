import React from "react";
import { Route, Switch } from "react-router-dom";
import AppWrapper from "./containers/AppWrapper";
import Home from "./containers/Home";
import AuthWrapper from "./containers/Login";
import PrivateRoute from "./containers/PrivateRoute";
import Register from "./containers/Register";

const SimplePageContainer = () => (
  <>
    <Switch>
      <Route path="/auth" component={AuthWrapper} />
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
      <PrivateRoute path="/auth" component={AuthWrapper} />
      {/* <PrivateRoute path="/register" component={Register} /> */}
      {/* <Route exact path={["/login", "/register"]} component={SimplePageContainer} />
      <Route component={WrappedPageContainer} /> */}
    </Switch>
  </div>
);
