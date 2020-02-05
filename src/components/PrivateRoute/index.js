import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Auth from "../../utils/auth";
import AppWrapper from "../../containers/AppWrapper";

const authObj = new Auth();

class PrivateRoute extends React.Component {
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
    const { component: Component, isSimplePage, ...rest } = this.props;
    const { isLoggedIn, isLoading, loaded } = this.props.auth;

    return (
      <Route
        {...rest}
        render={props => {
          return (
            <>
              {!isSimplePage && <AppWrapper />}
              <Component {...props} />
            </>
          );
        }}
      />
    );
  }
}

PrivateRoute = withRouter(PrivateRoute);

export default PrivateRoute;
