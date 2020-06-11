import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import Search from "./components/Search";
import AuthWrapper from "./containers/Auth";
import PrivateRoute from "./containers/Layout/PrivateRoute";
import Landlord from "./containers/Landlord";
import Company from "./containers/Company";
import PageNotFound from "./components/Layout/PageNotFound";
import OfficeDetail from "./components/Home/OfficeDetail";

export default (
  <div>
    <Switch>
      <PrivateRoute exact path='/' component={Home} noSidebar />
      <PrivateRoute exact path='/search' component={Search} noSidebar />
      <PrivateRoute
        exact
        path='/offices/:id/:location/:officeType/:employeeNumber/:refId-:title'
        component={({ match, ...props }) => (
          <OfficeDetail refId={match.params.id} {...props} />
        )}
        noSidebar
      />
      <PrivateRoute path='/auth' component={AuthWrapper} noSidebar />
      <PrivateRoute
        path='/landlord'
        component={Landlord}
        authRequired
        userRole='landlord'
      />
      <PrivateRoute
        path='/company'
        component={Company}
        authRequired
        userRole='company'
      />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  </div>
);
