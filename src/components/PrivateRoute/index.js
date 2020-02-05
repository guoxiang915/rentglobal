import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../../utils/auth";
import AppWrapper from "../../containers/AppWrapper";
import AppFooter from "../Layout/AppFooter";

const authObj = new Auth();

class PrivateRoute extends React.Component {
  static propTypes = {
    component: PropTypes.any,
    noHeader: PropTypes.bool,
    noFooter: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isAuthenticated: false
    };
  }

  componentWillMount() {
    // check authenticated user
    this.authenticate().then(() => {
      console.log("Authenticated");
    });
  }

  authenticate = async () => {
    let token = await authObj.getToken();
    await this.props.mappedAuthenticate(token, this.props.history);
  };

  render() {
    const { component: Component, noHeader, noFooter, ...rest } = this.props;
    const { isLoggedIn, isLoading, loaded } = this.props.auth;

    return (
      <Route
        {...rest}
        render={props => {
          return (
            <>
              {!noHeader && <AppWrapper />}
              <Component {...props} />
              {!noFooter && <AppFooter />}
            </>
          );
        }}
      />
    );
  }
}

PrivateRoute = withRouter(PrivateRoute);

export default PrivateRoute;
