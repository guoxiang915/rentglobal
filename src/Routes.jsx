import React from "react";
import { Switch } from "react-router-dom";
import Home from "./containers/Home";
import Search from "./components/Search";
import AuthWrapper from "./containers/Auth";
import Route from "./containers/Layout/PrivateRoute";
import Landlord from "./containers/Landlord";
import Company from "./containers/Company";
import PageNotFound from "./components/Layout/PageNotFound";
import OfficeDetail from "./components/Home/OfficeDetail";

const Routes = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home} noSidebar />
      <Route exact path='/search' component={Search} noSidebar />
      <Route
        exact
        path='/offices/:id/:location/:officeType/:employeeNumber/:refId-:title'
        component={({ match, ...props }) => (
          <OfficeDetail refId={match.params.id} {...props} />
        )}
        noSidebar
      />
      <Route path='/auth' component={AuthWrapper} noSidebar />
      <Route
        path='/landlord'
        component={Landlord}
        authRequired
        userRole='landlord'
      />
      <Route
        path='/company'
        component={Company}
        authRequired
        userRole='company'
      />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
