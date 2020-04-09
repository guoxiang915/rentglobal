import React from 'react';
import { Switch } from 'react-router-dom';
import Home from './containers/Home';
import AuthWrapper from './containers/Auth';
import PrivateRoute from './containers/Layout/PrivateRoute';
import Landlord from './containers/Landlord';
import Company from './containers/Company';
import PageNotFound from './containers/Landlord';
import OfficeDetail from './components/Home/OfficeDetail';

export default (
  <div>
    <Switch>
      <PrivateRoute exact path="/" component={Home} noSidebar />
      <PrivateRoute
        exact
        path="/offices/:id"
        component={({ match }) => <OfficeDetail officeId={match.params.id} />}
        noSidebar
      />
      <PrivateRoute path="/auth" component={AuthWrapper} noSidebar />
      <PrivateRoute path="/landlord" component={Landlord} authRequired />
      <PrivateRoute path="/company" component={Company} authRequired />
      <PrivateRoute component={PageNotFound} />
    </Switch>
  </div>
);
