import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Collapse, Typography } from "@material-ui/core";
import { MailOutline } from "@material-ui/icons";
import { Route } from "react-router-dom";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Spinner
} from "../../common/base-components";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
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
      emailError: null,
      password: "",
      passwordError: null,
      createPassword: "",
      createPasswordError: null,
      isRemember: false,
      error: null
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.auth.loginMode !== newProps.auth.loginMode) {
      let newRoute = "/auth";
      if (newProps.auth.loginMode === "login") {
        newRoute += "/login";
      } else if (newProps.auth.loginMode === "register") {
        newRoute += "/register";
      }

      if (newRoute !== this.props.match.path) {
        this.props.history.push(newRoute);
      }
    }
  }

  emailValidation = () => {
    const emailValid = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    if (!emailValid) {
      this.setState({ emailError: this.props.t("invalidEmail") });
    } else {
      this.setState({ emailError: null });
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });

    if (name === "email") {
      this.emailValidation();
    }
  };

  handleGetLoginMode = () => {
    this.emailValidation();
    if (!this.state.emailError) {
      this.props.getRegisteredUser(this.state.email);
    }
  };

  render() {
    const { classes, t } = this.props;
    const { isLoading, loginMode } = this.props.auth;
    const route = this.props.match.pathname;

    return (
      <div>
        <div className={classes.backgroundWrapper}></div>
        <div className={classes.loginWrapper}>
          <Column classes={{ box: classes.loginCard }}>
            {(route === "/auth" || !loginMode) && (
              <form
                onSubmit={this.handleSubmit}
                noValidate
                autoComplete="off"
                className={classes.fullWidth}
              >
                <Typography className={classes.loginTitle}>
                  {t("loginOrRegister")}
                </Typography>
                <Box paddingTop>
                  <TextField
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    variant="outlined"
                    startAdornment={<MailOutline color="secondary" />}
                    error={!!this.state.emailError}
                    helperText={this.state.emailError}
                    fullWidth
                  />
                </Box>
                {!isLoading && (
                  <Box
                    paddingTopHalf
                    justifyChildrenEnd
                    fullWidth
                    paddingBottom
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      size="medium"
                      className={classes.loginButton}
                      onClick={this.handleGetLoginMode}
                      disabled={!this.state.email}
                    >
                      {t("next")}
                    </Button>
                  </Box>
                )}
              </form>
            )}
            <Collapse
              in={!!loginMode}
              unmountOnExit
              className={classes.fullWidth}
            >
              <Route
                path="/auth/login"
                render={() => (
                  <LoginForm
                    email={this.state.email}
                    mappedLogin={this.props.mappedLogin}
                  />
                )}
              />
              <Route
                path="/auth/register"
                render={() => (
                  <RegisterForm
                    email={this.state.email}
                    mappedRegister={this.props.mappedRegister}
                  />
                )}
              />
              <Route
                path="/auth/forgot-password"
                render={() => (
                  <ForgotPasswordForm
                    email={this.state.email}
                    mappedResetPassword={() => {}}
                  />
                )}
              />
            </Collapse>

            {isLoading && (
              <Column paddingTop fullWidth>
                <Spinner />
              </Column>
            )}
          </Column>
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
