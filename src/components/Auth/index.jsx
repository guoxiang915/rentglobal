import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Column, Spinner } from "../../common/base-components";
import LoginForm from "./LoginForm";
import SelectRegisterForm from "./SelectRegisterForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import SendPasswordVerificationForm from "./SendPasswordVerificationForm";
import SetNewPasswordForm from "./SetNewPasswordForm";
import VerifyEmailSuccessForm from "./VerifyEmailSuccessForm";
import VerifyEmailFailedForm from "./VerifyEmailFailedForm";

import HeaderImage from "../../assets/img/img_header@2x.jpg";

import "./Login.css";

const styleSheet = theme => ({
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
  },

  fullWidth: {
    width: "100%"
  },

  loginTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: "26px",
    fontSize: "20px",
    marginTop: 8,
    textAlign: "center"
  },

  loginButton: {
    width: 200
  },

  socialWrapper: {
    marginTop: 20
  },

  socialButton: {
    width: "100%"
  }
});

class AuthWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isRemember: false,
      error: null
    };
  }

  navigate = route => {
    this.props.history.push(`/auth/${route}`);
  };

  render() {
    const { classes } = this.props;
    const { isLoggedIn, isLoading, error } = this.props.auth;

    return (
      <div>
        <div className={classes.backgroundWrapper}></div>
        <div className={classes.loginWrapper}>
          {// isLoading ? (
          //   <Column classes={{ box: classes.loginCard }}>
          //     <Column paddingTop fullWidth>
          //       <Spinner />
          //     </Column>
          //   </Column>
          // ) :
          !isLoggedIn && (
            <Switch>
              {/* login form */}
              <Route
                exact
                path="/auth/login"
                render={() => (
                  <Column classes={{ box: classes.loginCard }}>
                    <LoginForm
                      email={this.state.email}
                      mappedLogin={payload =>
                        this.props.mappedLogin(payload, this.props.history)
                      }
                      error={error}
                      isLoading={isLoading}
                    />
                  </Column>
                )}
              />
              {/* select-register form */}
              <Route
                exact
                path="/auth/register"
                render={() => <SelectRegisterForm navigate={this.navigate} />}
              />
              {/* register form */}
              <Route
                exact
                path="/auth/register/:registerMode"
                render={({ match }) => (
                  <Column classes={{ box: classes.loginCard }}>
                    <RegisterForm
                      email={this.state.email}
                      mappedRegister={payload =>
                        this.props.mappedRegister(payload, this.props.history)
                      }
                      registerMode={match.params["registerMode"]}
                      error={error}
                      isLoading={isLoading}
                    />
                  </Column>
                )}
              />
              {/* verify email form */}
              <Route
                exact
                path="/auth/register/verify-email/:token"
                render={({ match }) => {
                  this.props.mappedVerifyEmail(
                    { token: match.params["token"] },
                    this.props.history
                  );
                  return (
                    <Column classes={{ box: classes.loginCard }}>
                      <Column paddingTop fullWidth>
                        <Spinner />
                      </Column>
                    </Column>
                  );
                }}
              />
              {/* verify email success form */}
              <Route
                exact
                path="/auth/verify-email-success"
                render={({ location }) =>
                  location.state && location.state.success ? (
                    <Column classes={{ box: classes.loginCard }}>
                      <VerifyEmailSuccessForm navigate={this.navigate} />
                    </Column>
                  ) : (
                    <Redirect to="/auth/login" />
                  )
                }
              />
              {/* verify email failed form */}
              <Route
                exact
                path="/auth/verify-email-failed"
                render={({ location }) =>
                  location.state && location.state.failed ? (
                    <Column classes={{ box: classes.loginCard }}>
                      <VerifyEmailFailedForm navigate={this.navigate} />
                    </Column>
                  ) : (
                    <Redirect to="/auth/login" />
                  )
                }
              />
              {/* forgot password form */}
              <Route
                exact
                path="/auth/reset-password"
                render={() => (
                  <Column classes={{ box: classes.loginCard }}>
                    <ForgotPasswordForm
                      email={this.state.email}
                      mappedForgotPassword={payload =>
                        this.props.mappedForgotPassword(
                          payload,
                          this.props.history
                        )
                      }
                    />
                  </Column>
                )}
              />
              {/* reset password form */}
              <Route
                path="/auth/reset-password/confirm"
                render={({ location }) =>
                  location.state && location.state.email ? (
                    <Column classes={{ box: classes.loginCard }}>
                      <SendPasswordVerificationForm
                        email={location.state.email}
                        navigate={this.navigate}
                      />
                    </Column>
                  ) : (
                    <Redirect to="/auth/login" />
                  )
                }
              />
              {/* reset password confirm form */}
              <Route
                path="/auth/reset-password/update/:token"
                render={({ match }) => (
                  <Column classes={{ box: classes.loginCard }}>
                    <SetNewPasswordForm
                      token={match.params["token"]}
                      mappedResetPassword={payload =>
                        this.props.mappedResetPassword(
                          payload,
                          this.props.history
                        )
                      }
                    />
                  </Column>
                )}
              />
              <Route render={() => <Redirect to="/auth/login" />} />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

AuthWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(withTranslation("common")(AuthWrapper));
