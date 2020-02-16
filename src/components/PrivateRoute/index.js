import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../../utils/auth";
import AppWrapper from "../../containers/AppWrapper";
import { AppFooter } from "../Layout";
// import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import { Column } from "../../common/base-components";
import SendVerificationForm from "../Login/SendVerificationForm";

import HeaderImage from "../../assets/img/img_header@2x.jpg";

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
  },

  backgroundWrapper: {
    width: "100%",
    height: theme.spacing(6),
    background: `transparent url(${HeaderImage}) 0% 0% no-repeat padding-box`,
    backgroundSize: "cover",
    [theme.breakpoints.down("sm")]: {
      background: "white"
    }
  },

  loginWrapper: {
    textAlign: "center",
    alignItems: "center",
    padding: "20px 0px",
    backgroundColor: "white"
  },

  loginCard: {
    width: "100%",
    maxWidth: 450,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    padding: "10px 40px 20px 40px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.down("sm")]: {
      border: "none"
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

  UNSAFE_componentWillMount() {
    // check authenticated user
    this.authenticate().then(() => {
      console.log("Authenticated");
    });
  }

  authenticate = async () => {
    let token = await authObj.getToken();
    if (token) {
      await this.props.mappedAuthenticate(token, this.props.history);
    }
  };

  render() {
    const {
      classes,
      component: Component,
      noHeader,
      noFooter,
      ...rest
    } = this.props;
    const { isLoggedIn, isActivated } = this.props.auth;

    console.log(isLoggedIn, isActivated);

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
                {isLoggedIn && !isActivated ? (
                  <Switch>
                    <Route
                      path="/auth/send-verification"
                      render={() => (
                        <div>
                          <div className={classes.backgroundWrapper}></div>
                          <div className={classes.loginWrapper}>
                            <Column classes={{ box: classes.loginCard }}>
                              <SendVerificationForm
                                email={this.state.email}
                                {...props}
                              />
                            </Column>
                          </div>
                        </div>
                      )}
                    />
                    <Route
                      render={() => <Redirect to="/auth/send-verification" />}
                    />
                  </Switch>
                ) : (
                  <Component {...props} />
                )}
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
