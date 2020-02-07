import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../../utils/auth";
import AppWrapper from "../../containers/AppWrapper";
import { AppFooter } from "../Layout";
// import classes from "*.module.css";
import { withStyles } from "@material-ui/core";

const authObj = new Auth();

const styleSheet = theme => ({
  headerWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1100,
    height: 100,
    [theme.breakpoints.down("sm")]: {
      height: 66
    }
  },

  contentWrapper: {
    minHeight: "calc(100vh - 250px)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 166px)"
    }
  },

  footerWrapper: {
    height: 150,
    [theme.breakpoints.down("sm")]: {
      height: 100
    }
  }
});

class PrivateRoute extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
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
    const {
      classes,
      component: Component,
      noHeader,
      noFooter,
      ...rest
    } = this.props;
    const { isLoggedIn, isLoading, loaded } = this.props.auth;

    return (
      <Route
        {...rest}
        render={props => {
          return (
            <>
              {!noHeader && (
                <div className={classes.headerWrapper}>
                  <AppWrapper />
                </div>
              )}
              <div className={classes.contentWrapper}>
                <Component {...props} />
              </div>
              {!noFooter && (
                <div className={classes.footerWrapper}>
                  <AppFooter className={classes.footerWrapper} />
                </div>
              )}
            </>
          );
        }}
      />
    );
  }
}

export default withRouter(withStyles(styleSheet)(PrivateRoute));
