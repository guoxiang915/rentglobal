import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Link,
  HorizontalDivider
} from "../../common/base-components";
import { MailOutline, LockOpen } from "@material-ui/icons";

const styleSheet = theme => ({
  formWrapper: {
    width: "100%"
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: "26px",
    fontSize: "20px",
    marginTop: 8,
    textAlign: "center"
  },

  submitButton: {
    width: 200
  },

  moreWrapper: {
    marginTop: 20
  },

  fullWidth: {
    width: "100%"
  },

  switchText: {
    fontSize: "14px"
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
    if (this.state.email === "" || !emailValid) {
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
      email: this.state.email,
      password: this.state.password
    };
    this.props.mappedRegister(user);
  };

  handleSignupFacebook = () => {};

  handleSignupGoogle = () => {};

  render() {
    const { registerMode, classes, t } = this.props;

    return (
      <form
        noValidate
        autoComplete="off"
        className={classes.formWrapper}
      >
        <Typography className={classes.formTitle}>
          {registerMode === "landlord"
            ? t("signupAsLandlord")
            : registerMode === "company"
            ? t("signupAsCompany")
            : t("signupToRENTGLOBAL")}
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
            value={this.state.password}
            onChange={this.handleChange("password")}
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
            className={classes.submitButton}
            onClick={this.handleSignup}
          >
            {t("signup")}
          </Button>
        </Box>
        <Column classes={{ box: classes.moreWrapper }}>
          <HorizontalDivider text={t("or")} light />
          <Box paddingTop justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={classes.fullWidth}
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
              className={classes.fullWidth}
              onClick={this.handleSignupGoogle}
            >
              {t("signupWith")}&nbsp;
              <Typography color="primary">{t("google")}</Typography>
            </Button>
          </Box>
        </Column>

        <Column paddingTopDouble>
          <Box paddingTop>
            <Typography color="secondary" className={classes.switchText}>
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
  t: PropTypes.func.isRequired,
  mappedRegister: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(withTranslation("common")(RegisterForm));
