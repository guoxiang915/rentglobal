import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Auth from "../../utils/auth";
import Spinner from "../Spinner";
import AppWrapper from "../../containers/AppWrapper";

const authObj = new Auth();

{
  /*const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render = {
        props => auth.isLoggedIn === true ? (
                <Component {...props}/>
            ) : (
                <Redirect to="/login"/>
            )

    } />
);
*/
}

class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isAuthenticated: false
    };
  }

  componentWillMount() {
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

    if (!isLoading) return <Spinner />;

    return (
      <Route
        {...rest}
        render={props => {
          // return isLoggedIn ? (
          //   <Component {...props} />
          // ) : (
          //   <Redirect
          //     to={{
          //       pathname: "/login"
          //     }}
          //   />
          // );
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
