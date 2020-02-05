import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, Collapse, Typography, InputAdornment } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Login.css";
import { withTranslation } from "react-i18next";
import withMuiRoot from "../../withMuiRoot";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  Spinner
} from "../../common/base-components";
import { MailOutline, LockOpen } from "@material-ui/icons";

const styleSheet = theme => ({
  container: {
    textAlign: "center",
    alignItems: "center"
  },

  backgroundWrapper: {
    width: "100%",
    height: theme.spacing(5),
    background:
      "transparent url('assets/img/img_header.jpg') 0% 0% no-repeat padding-box"
  },

  loginWrapper: {
    backgroundColor: "white"
  },

  loginCard: {
    width: 450,
    padding: "10px 40px 20px 40px",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(6),
    marginLeft: "auto",
    marginRight: "auto"
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

  errorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
    fontSize: 12
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: null,
      password: "",
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

  render() {
    const { classes, t } = this.props;
    const { isLoggedIn, error, isLoading, loginMode } = this.props.auth;

    return (
      <div>
        <div className={classes.backgroundWrapper}></div>
        <div className={classes.container}>
          <Card className={classes.loginCard}>
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <Typography className={classes.loginTitle}>
                {t("loginToRENTGLOBAL")}
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
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange("password")}
                        type="password"
                        variant="outlined"
                        error={true}
                        helperText="Password should contain at least 6 characters"
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
                      >
                        {t("login")}
                      </Button>
                    </Box>
                  </>
                )}
                {/* <div className={classes.errorDiv}>
                  {error && <p>{error}</p>}
                  {!error && this.state.error && <p>{this.state.error}</p>}
                </div> */}
              </Collapse>
              {isLoading && <Spinner />}
            </form>
            {/* <div className="forgotContainer">
              <a className="link-forgot-password" tabIndex="1" href="">
                Forgot password?
              </a>
            </div> */}
          </Card>
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
