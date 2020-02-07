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

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : "",
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

  async validateForm() {
    const emailValid = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    if (this.state.firstname === "") {
      this.setState({
        error: "Firstname required!",
        errors: {
          firstname: true
        }
      });
      return false;
    } else if (this.state.email === "" || !emailValid) {
      this.setState({
        error: "Please enter a valid email!",
        errors: {
          email: true
        }
      });
      return false;
    } else if (this.state.password === "") {
      this.setState({
        error: "Password required!",
        errors: {
          password: true
        }
      });
      return false;
    }
    return true;
  }

  handleSignup = async e => {
    e.preventDefault();
    let validForm = await this.validateForm();
    if (!validForm) {
      return;
    }
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password
    };
    this.props.mappedRegister(user, this.props.history);
  };

  handleSignupFacebook = () => {};

  handleSignupGoogle = () => {};

  render() {
    const { classes, t } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
        className={classes.loginForm}
      >
        <Typography className={classes.loginTitle}>
          {t("signupToRENTGLOBAL")}
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
        <Column classes={{ box: classes.socialWrapper }}>
          <Box paddingTop justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={classes.socialButton}
              onClick={this.handleSignupFacebook}
            >
              {t("signupWith")}&nbsp;
              <Typography color="primary">{t("facebook")}</Typography>
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
        </Column>

        <Column paddingTopDouble classes={{ box: classes.switcherWrapper }}>
          <Box paddingTop>
            <Typography>
              {t("alreadyHaveAccount")}
              <Link to="/auth/login">&nbsp;{t("login")}</Link>
            </Typography>
          </Box>
        </Column>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(withTranslation("common")(RegisterForm));
