import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Collapse } from "@material-ui/core";
import { Route } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { Column, Spinner } from "../../common/base-components";
import LoginForm from "./LoginForm";
import SelectRegisterForm from "./SelectRegisterForm";
import RegisterForm from "./RegisterForm";
import SendVerificationForm from "./SendVerificationForm";
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

  render() {
    const { classes, t } = this.props;
    const { isLoading } = this.props.auth;

    return (
      <div>
        <div className={classes.backgroundWrapper}></div>
        <div className={classes.loginWrapper}>
          <Route
            exact
            path={["/auth", "/auth/login"]}
            render={() => (
              <Column classes={{ box: classes.loginCard }}>
                <LoginForm
                  email={this.state.email}
                  mappedLogin={this.props.mappedLogin}
                />
              </Column>
            )}
          />
          <Route
            exact
            path="/auth/select-register"
            render={() => <SelectRegisterForm />}
          />
          <Route
            exact
            path="/auth/register/:registerMode"
            render={({ match }) => (
              <Column classes={{ box: classes.loginCard }}>
                <RegisterForm
                  email={this.state.email}
                  mappedRegister={this.props.mappedRegister}
                  registerMode={match.params["registerMode"]}
                />
              </Column>
            )}
          />
          <Route
            path="/auth/send-verification"
            render={() => (
              <Column classes={{ box: classes.loginCard }}>
                <SendVerificationForm email={this.state.email} />
              </Column>
            )}
          />
          <Route
            path="/auth/forgot-password"
            render={() => (
              <Column classes={{ box: classes.loginCard }}>
                <ForgotPasswordForm
                  email={this.state.email}
                  mappedResetPassword={() => {}}
                />
              </Column>
            )}
          />

          {isLoading && (
            <Column paddingTop fullWidth>
              <Spinner />
            </Column>
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
