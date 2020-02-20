import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Checkbox,
  Link,
  Divider,
  HorizontalDivider,
  Typography
} from "../../common/base-components";
import { MailOutline, LockOpen } from "@material-ui/icons";

const styleSheet = theme => ({
  formWrapper: {
    width: "100%"
  },

  formTitle: {
    // color: theme.colors.primary.darkGrey,
    // lineHeight: "26px",
    // fontSize: "20px",
    marginTop: 8,
    textAlign: "center"
  },

  fixedWidthButton: {
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

class LoginForm extends Component {
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
      this.props.mappedLogin(payload);
    }
  };

  handleToggleRememberUser = () => {
    this.setState({ isRemember: !this.state.isRemember });
  };

  handleLogin = e => {
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

  handleLoginFacebook = () => {};

  handleLoginGoogle = () => {};

  render() {
    const { classes, t } = this.props;

    return (
      <form
        // onSubmit={this.handleSubmit}
        noValidate
        autoComplete="off"
        className={classes.formWrapper}
      >
        <Typography
          fontSizeM
          fontWeightBold
          textSecondary
          fullWidth
          paddingTopHalf
          justifyChildrenCenter
        >
          {t("loginToRENTGLOBAL")}
        </Typography>
        <Box paddingTop>
          <TextField
            id="email"
            placeholder={t("email")}
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
            className={classes.fixedWidthButton}
            isChecked={this.state.isRemember}
            onChange={this.handleToggleRememberUser}
          />
        </Box>
        <Box paddingTopHalf justifyChildrenEnd fullWidth>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            className={classes.fixedWidthButton}
            onClick={this.handleLogin}
          >
            <Typography fontSizeS fontWeightBold>
              {t("login")}
            </Typography>
          </Button>
        </Box>
        <Column classes={{ box: classes.moreWrapper }}>
          <Divider light />
          <Box paddingTop paddingBottom>
            <Typography fontSizeS fontWeightBold>
              <Link variant="primary" to="/auth/reset-password">
                {t("forgotPassword")}
              </Link>
            </Typography>
          </Box>

          <HorizontalDivider text={t("or")} light />
          <Box paddingTop justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={classes.fullWidth}
              onClick={this.handleLoginFacebook}
            >
              {t("loginWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("facebook")}
              </Typography>
            </Button>
          </Box>
          <Box paddingTopHalf justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={classes.fullWidth}
              onClick={this.handleLoginGoogle}
            >
              {t("loginWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("google")}
              </Typography>
            </Button>
          </Box>
        </Column>

        <Column paddingTopDouble>
          <Box paddingTop>
            <Typography fontSizeXS textMediumGrey>
              {t("dontHaveAccount")}
              <Link variant="primary" to="/auth/register">
                &nbsp;{t("register")}
              </Link>
            </Typography>
          </Box>
        </Column>
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(withTranslation("common")(LoginForm));
