import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, Collapse, Typography, InputAdornment } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "./Login.css";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";
import {
  TextField,
  Button,
  Box,
  Column,
  Checkbox,
  Spinner,
  Link,
  Divider,
  HorizontalDivider
} from "../../common/base-components";
import { MailOutline, LockOpen } from "@material-ui/icons";

const styleSheet = theme => ({
  backgroundWrapper: {
    width: "100%",
    height: theme.spacing(6),
    background: `transparent url(${require("../../assets/img/img_header@2x.jpg")}) 0% 0% no-repeat padding-box`,
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

  loginForm: {
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

class Login extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.error) {
      return;
    }
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    if (payload.email !== "" && payload.password !== "") {
      this.props.mappedLogin(payload, this.props.history);
    }
  };

  handleToggleRememberUser = () => {
    this.setState({ isRemember: !this.state.isRemember });
  };

  handleLogin = () => {
    console.log("login");
  };

  handleLoginFacebook = () => {};

  handleLoginGoogle = () => {};

  handleSignup = () => {
    console.log("sign up");
  };

  handleSignupFacebook = () => {};

  handleSignupGoogle = () => {};

  render() {
    const { classes, t } = this.props;
    const { isLoggedIn, error, isLoading, loginMode } = this.props.auth;

    return (
      <div>
        <div className={classes.backgroundWrapper}></div>
        <div className={classes.loginWrapper}>
          <Column classes={{ box: classes.loginCard }}>
            <form
              onSubmit={this.handleSubmit}
              noValidate
              autoComplete="off"
              className={classes.loginForm}
            >
              <Typography className={classes.loginTitle}>
                {loginMode === "login"
                  ? t("loginToRENTGLOBAL")
                  : loginMode === "register"
                  ? t("signupToRENTGLOBAL")
                  : t("loginOrRegister")}
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
              {!loginMode && !isLoading && (
                <Box paddingTopHalf justifyChildrenEnd fullWidth paddingBottom>
                  <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    className={classes.loginButton}
                    onClick={this.handleGetLoginMode}
                    disabled={!this.state.email}
                    aria-expanded={!!loginMode}
                  >
                    {t("next")}
                  </Button>
                </Box>
              )}
              <Collapse in={!!loginMode} unmountOnExit>
                {loginMode === "login" && (
                  <>
                    <Box paddingTopHalf>
                      <TextField
                        id="password"
                        placeholder={t("password")}
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        type="password"
                        variant="outlined"
                        startAdornment={<LockOpen color="secondary" />}
                        fullWidth
                      />
                    </Box>
                    <Box paddingTopHalf justifyChildrenEnd fullWidth>
                      <Checkbox
                        variant="outlined"
                        label={t("rememberMe")}
                        className={classes.loginButton}
                        isChecked={this.state.isRemember}
                        onChange={this.handleToggleRememberUser}
                      />
                    </Box>
                    <Box paddingTopHalf justifyChildrenEnd fullWidth>
                      <Button
                        type="submit"
                        variant="contained"
                        size="medium"
                        className={classes.loginButton}
                        onClick={this.handleLogin}
                      >
                        {t("login")}
                      </Button>
                    </Box>
                  </>
                )}
                {loginMode === "register" && (
                  <>
                    <Box paddingTopHalf>
                      <TextField
                        id="createPassword"
                        placeholder={t("createPassword")}
                        value={this.state.createPassword}
                        onChange={this.handleChange("createPassword")}
                        type="password"
                        variant="outlined"
                        startAdornment={<LockOpen color="secondary" />}
                        fullWidth
                      />
                    </Box>
                    <Box paddingTopHalf justifyChildrenEnd fullWidth>
                      <Button
                        type="submit"
                        variant="contained"
                        size="medium"
                        className={classes.loginButton}
                        onClick={this.handleSignup}
                      >
                        {t("signup")}
                      </Button>
                    </Box>
                  </>
                )}

                <Column classes={{ box: classes.socialWrapper }}>
                  {loginMode === "login" && (
                    <>
                      <Divider light />
                      <Box paddingTop paddingBottom>
                        <Link variant="primary" to="/reset-password">
                          {t("forgotPassword")}
                        </Link>
                      </Box>
                    </>
                  )}
                  <HorizontalDivider text={t("or")} light />

                  {loginMode === "login" && (
                    <>
                      <Box paddingTop justifyChildrenEnd fullWidth>
                        <Button
                          type="submit"
                          variant="secondary"
                          size="medium"
                          className={classes.socialButton}
                          onClick={this.handleLoginFacebook}
                        >
                          {t("loginWith")}&nbsp;
                          <Typography color="primary">
                            {t("facebook")}
                          </Typography>
                        </Button>
                      </Box>
                      <Box paddingTopHalf justifyChildrenEnd fullWidth>
                        <Button
                          type="submit"
                          variant="secondary"
                          size="medium"
                          className={classes.socialButton}
                          onClick={this.handleLoginGoogle}
                        >
                          {t("loginWith")}&nbsp;
                          <Typography color="primary">{t("google")}</Typography>
                        </Button>
                      </Box>
                    </>
                  )}

                  {loginMode === "register" && (
                    <>
                      <Box paddingTop justifyChildrenEnd fullWidth>
                        <Button
                          type="submit"
                          variant="secondary"
                          size="medium"
                          className={classes.socialButton}
                          onClick={this.handleSignupFacebook}
                        >
                          {t("signupWith")}&nbsp;
                          <Typography color="primary">
                            {t("facebook")}
                          </Typography>
                        </Button>
                      </Box>
                      <Box paddingTopHalf justifyChildrenEnd fullWidth>
                        <Button
                          type="submit"
                          variant="secondary"
                          size="medium"
                          className={classes.socialButton}
                          onClick={this.handleSignupGoogle}
                        >
                          {t("signupWith")}&nbsp;
                          <Typography color="primary">{t("google")}</Typography>
                        </Button>
                      </Box>
                    </>
                  )}
                </Column>

                <Column
                  paddingTopDouble
                  classes={{ box: classes.switcherWrapper }}
                >
                  <Box paddingTop>
                    {loginMode === "login" && (
                      <Typography color="secondary" size="small">
                        {t("dontHaveAccount")}
                        <Link
                          onClick={() => this.props.switchLoginMode("register")}
                        >
                          &nbsp;{t("register")}
                        </Link>
                      </Typography>
                    )}
                    {loginMode === "register" && (
                      <Typography>
                        {t("alreadyHaveAccount")}
                        <Link
                          onClick={() => this.props.switchLoginMode("login")}
                        >
                          &nbsp;{t("login")}
                        </Link>
                      </Typography>
                    )}
                  </Box>
                </Column>
              </Collapse>

              {isLoading && (
                <Column paddingTop fullWidth>
                  <Spinner />
                </Column>
              )}
            </form>
            {/* <div className="forgotContainer">
              <a className="link-forgot-password" tabIndex="1" href="">
                Forgot password?
              </a>
            </div> */}
          </Column>
          {/* <div className="signUpContainer">
            <div className="signUpLink">
              <Button
                variant="contained"
                size="medium"
                color="primary"
                className={classes.button}
                component={Link}
                to="/register"
              >
                Create New Account
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withMuiRoot(
  withStyles(styleSheet)(withTranslation("common")(Login))
);
