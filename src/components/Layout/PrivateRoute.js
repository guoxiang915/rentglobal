import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import Auth from "../../utils/auth";
import { AppHeader, AppFooter, AppSidebar, HelpDialog } from ".";
// import classes from "*.module.css";
import { withStyles } from "@material-ui/core";
import { Column, Spinner } from "../../common/base-components";
import SendVerificationForm from "../Auth/SendVerificationForm";

import HeaderImage from "../../assets/img/img_header@2x.jpg";

/** Token-based auth object */
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
    background: theme.colors.primary.whiteGrey,
    minHeight: "calc(100vh - 250px)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 166px)"
    }
  },

  footerWrapper: {
    height: 150,
    background: "white",
    [theme.breakpoints.down("sm")]: {
      height: 100
    }
  },

  sendVerificationWrapper: {
    background: theme.colors.primary.white,
    minHeight: "calc(100vh - 250px)",
    [theme.breakpoints.down("sm")]: {
      minHeight: "calc(100vh - 166px)"
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
    /** Component to show */
    component: PropTypes.any,
    /** AppHeader exists or not */
    noHeader: PropTypes.bool,
    /** AppFooter exists or not */
    noFooter: PropTypes.bool,
    /** AppSidebar exists or not */
    noSidebar: PropTypes.bool,
    /**
     * Auth required or not
     * @deprecated
     */
    authRequired: PropTypes.bool
  };

  state = {
    sidebarOpened: false,
    dialog: null
  };

  UNSAFE_componentWillMount() {
    this.authenticate();
  }

  authenticate = async () => {
    // check authenticated user
    let token = await authObj.getToken();
    // if (token)
    await this.props.mappedAuthenticate(token, this.props.history);
  };

  navigate = (path, payload) => {
    const { isLoggedIn, user } = this.props.auth;

    console.log(path);

    switch (path) {
      case "back":
        this.props.history.goBack();
        break;

      case "home":
        this.props.history.push("/");
        break;

      case "help":
        this.showHelpDialog();
        break;

      case "login":
      case "register":
      case "register/landlord":
      case "register/company":
      case "forgot-password":
        this.props.history.push(`/auth/${path}`);
        break;
      case "logout":
        authObj.removeToken();
        authObj.removeRefreshToken();
        this.props.mappedlogout();
        this.props.history.push("/auth/login");
        break;

      case "dashboard":
      case "profile":
      case "offices/add":
      case "offices/all":
      case "contracts":
      case "optimization":
        if (isLoggedIn) {
          const role = user.role;
          this.props.history.push(`/${role}/${path}/${payload ? payload : ""}`);
          break;
        }
        this.props.history.push("/");
        break;
      case "landlord/offices":
      case "offices":
        this.props.history.push(`/${path}/${payload ? payload : ""}`);
        break;

      default:
        this.props.history.push("/");
        break;
    }
    this.handleToggleSidebar(false);
  };

  /** Toggle user role between landlord/company */
  handleToggleRole = () => {
    const { user } = this.props.auth;
    this.props.mappedToggleRole(
      user.role === "landlord" ? "company" : "landlord",
      this.props.history
    );
    this.handleToggleSidebar(false);
  };

  /** Toggle sidebar */
  handleToggleSidebar = sidebarOpened => {
    this.setState({ sidebarOpened });
  };

  /** Show help dialog */
  showHelpDialog = () => {
    this.setState({
      dialog: <HelpDialog onClose={this.handleCloseDialog} />
    });
  };

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
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
    const { dialog } = this.state;

    if (!loaded) {
      return <Spinner />;
    }

    const { sidebarOpened } = this.state;

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
                        role={isLoggedIn ? user.role : ""}
                        onCollapse={() => this.handleToggleSidebar(false)}
                        onToggleRole={this.handleToggleRole}
                        navigate={this.navigate}
                      />
                    )}

                    <div className={classes.bodyContent}>
                      {/* show content wrapper */}
                      <div className={classes.contentWrapper}>
                        {isLoggedIn && !user.active ? (
                          /** for not activated user, show send-verification page */
                          <Switch>
                            <Route
                              path="/auth/send-verification"
                              render={() => (
                                <div
                                  className={classes.sendVerificationWrapper}
                                >
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
                          <Component
                            navigate={this.navigate}
                            {...props}
                            onToggleRole={this.handleToggleRole}
                          />
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

                  {/* show dialog */}
                  {dialog}
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
