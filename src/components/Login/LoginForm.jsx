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
  Typography,
  LockIcon,
  EmailIcon
} from "../../common/base-components";

const styleSheet = theme => ({
  formWrapper: {
    width: "100%"
  },

  formTitle: {
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
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: null
    });
  };

  async validateForm() {
    const emailValid = this.state.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    if (this.state.email === "") {
      this.setState({ emailError: this.props.t("emailRequired") });
      return false;
    } else if (!emailValid) {
      this.setState({ emailError: this.props.t("invalidEmailAddress") });
      return false;
    } else if (this.state.password === "") {
      this.setState({ passwordError: this.props.t("passwordRequired") });
      return false;
    }
    return true;
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.error) {
      return;
    }
    const validForm = await this.validateForm();
    if (!validForm) {
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

  handleLogin = async e => {
    e.preventDefault();
    if (this.state.error) {
      return;
    }
    const validForm = await this.validateForm();
    if (!validForm) {
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
            startAdornment={<EmailIcon className={classes.outlineIcon} />}
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
            startAdornment={<LockIcon className={classes.outlineIcon} />}
            error={!!this.state.passwordError}
            helperText={this.state.passwordError}
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
