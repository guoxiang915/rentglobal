import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Auth from "../../utils/auth";
import AppHeader from "../AppHeader";
import { AppFooter, AppSidebar } from "../Layout";
// import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import { Column, Spinner } from "../../common/base-components";
import SendVerificationForm from "../Login/SendVerificationForm";

import HeaderImage from "../../assets/img/img_header@2x.jpg";

const authObj = new Auth();

const styleSheet = theme => ({
  root: {
    height: "100vh",
    width: "100%"
  },

  headerWrapper: {
    position: "sticky",
    top: 0,
    zIndex: 1100,
    height: 100,
    [theme.breakpoints.down("sm")]: {
      height: 66
    }
  },

  bodyWrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
    overflow: "hidden"
  },

  bodyHeaderOffset: {
    height: "calc(100% - 100px)",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100% - 66px)"
    }
  },

  bodyContent: {
    width: "100%",
    height: "100%",
    overflowY: "auto"
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
    noFooter: PropTypes.bool,
    noSidebar: PropTypes.bool
  };

  state = {
    sidebarOpened: false,
    role: ""
  };

  UNSAFE_componentWillMount() {
    this.authenticate().then(() => {});
  }

  authenticate = async () => {
    // check authenticated user
    let token = await authObj.getToken();
    // if (token)
    await this.props.mappedAuthenticate(token, this.props.history);
  };

  // componentDidMount() {
  //   let role = "";
  //   if (this.props.location.pathname.indexOf("/landlord") !== -1)
  //     role = "landlord";
  //   else if (this.props.location.pathname.indexOf("/company") !== -1)
  //     role = "company";
  //   this.setState({ role });

  //   this.props.history.listen(location => {
  //     let role = "";
  //     if (location.pathname.indexOf("/landlord") !== -1) role = "landlord";
  //     else if (location.pathname.indexOf("/company") !== -1) role = "company";
  //     this.setState({ role });
  //   });
  // }

  navigate = (path, role) => {
    switch (path) {
      case "home":
        this.props.history.push("/");
        break;
      case "login":
        this.props.history.push("/auth/login");
        break;
      case "logout":
        authObj.removeToken();
        this.props.mappedlogout();
        this.props.history.push("/auth/login");
        break;
      case "register":
        if (role) {
          this.props.history.push(`/auth/register/${role}`);
        } else {
          this.props.history.push("/auth/register");
        }
        break;
      case "dashboard":
      case "profile":
        this.props.history.push(`/${role}/${path}`);
        break;
      default:
        this.props.history.push("/");
        break;
    }
    this.handleToggleSidebar(false);
  };

  handleToggleRole = role => {
    this.props.history.push(`/${role}`);
    this.handleToggleSidebar(false);
  };

  handleToggleSidebar = sidebarOpened => {
    this.setState({ sidebarOpened });
  };

  render() {
    const {
      classes,
      component: Component,
      noHeader,
      noFooter,
      authRequired,
      ...rest
    } = this.props;
    const { isLoggedIn, user, loaded } = this.props.auth;

    if (!loaded) {
      return <Spinner />;
    }

    const { sidebarOpened } = this.state;
    let role = "";
    if (isLoggedIn) {
      if (this.props.location.pathname.indexOf("/company") !== -1)
        role = "landlord";
      else role = "company";
    }

    return (
      <Route
        {...rest}
        render={props => {
          return (
            <>
              {authRequired && !isLoggedIn ? (
                <Redirect to="/auth/login" />
              ) : (
                <div className={classes.root}>
                  {/* show header bar */}
                  {!noHeader && (
                    <div className={classes.headerWrapper}>
                      <AppHeader
                        auth={this.props.auth}
                        role={role}
                        sidebarOpened={sidebarOpened}
                        location="Montreal"
                        language="en"
                        onToggleRole={this.handleToggleRole}
                        onToggleSidebar={this.handleToggleSidebar}
                        onSelectLocation={() => {}}
                        onSelectLanguage={() => {}}
                        navigate={this.navigate}
                      />
                    </div>
                  )}

                  {/* show body */}
                  <div
                    className={clsx(
                      classes.bodyWrapper,
                      !noHeader && classes.bodyHeaderOffset
                    )}
                  >
                    {/* show sidebar for mobile */}
                    {sidebarOpened && (
                      <AppSidebar
                        role={isLoggedIn ? role : ""}
                        onCollapse={() => this.handleToggleSidebar(false)}
                        onToggleRole={this.handleToggleRole}
                        navigate={this.navigate}
                      />
                    )}

                    <div className={classes.bodyContent}>
                      {/* show content wrapper */}
                      <div className={classes.contentWrapper}>
                        {isLoggedIn && !user.active ? (
                          // for not activated user, show send-verification page
                          <Switch>
                            <Route
                              path="/auth/send-verification"
                              render={() => (
                                <div>
                                  <div
                                    className={classes.backgroundWrapper}
                                  ></div>
                                  <div className={classes.loginWrapper}>
                                    <Column
                                      classes={{ box: classes.loginCard }}
                                    >
                                      <SendVerificationForm
                                        email={user.email}
                                        {...props}
                                      />
                                    </Column>
                                  </div>
                                </div>
                              )}
                            />
                            <Route
                              render={() => (
                                <Redirect to="/auth/send-verification" />
                              )}
                            />
                          </Switch>
                        ) : (
                          <Component {...props} />
                        )}
                      </div>

                      {/* show footer */}
                      {!noFooter && (
                        <div className={classes.footerWrapper}>
                          <AppFooter className={classes.footerWrapper} />
                        </div>
                      )}
                    </div>
                  </div>
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
