import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Link,
  HorizontalDivider,
  Typography,
  UsersIcon,
  BuildingsIcon,
  EmailIcon,
  LockIcon,
} from "../../common/base-components";

const styleSheet = (theme) => ({
  formWrapper: {
    width: "100%",
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: "26px",
    fontSize: "20px",
    marginTop: 8,
    textAlign: "center",
  },

  submitButton: {
    width: 200,
  },

  moreWrapper: {
    marginTop: 20,
  },

  fullWidth: {
    width: "100%",
  },

  switchText: {
    fontSize: "14px",
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },
});

class RegisterForm extends Component {
  /**
   * @static Prop types of RegisterForm component
   */
  static propTypes = {
    email: PropTypes.string,
    mappedRegister: PropTypes.func.isRequired,
    registerMode: PropTypes.string.isRequired,
    error: PropTypes.any,
    isLoading: PropTypes.bool,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  /**
   * @member {Object} state State of RegisterForm component
   */
  state = {
    email: this.props.email ? this.props.email : "",
    emailError: null,
    password: "",
    passwordError: null,
    isRemember: false,
  };

  /**
   * Event handler for changing textfields
   * @param {string} name Field name to update the state
   * @returns {Function} Event handler
   */
  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: null,
    });
  };

  /**
   * Check form validations
   * @async
   */
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

  /**
   * Submit the register form
   */
  handleSignup = async (e) => {
    e.preventDefault();
    const validForm = await this.validateForm();
    if (!validForm) {
      return;
    }
    const user = {
      email: this.state.email,
      password: this.state.password,
      role: this.props.registerMode,
      passwordLastUpdated: new Date(),
    };
    this.props.mappedRegister(user);
  };

  /**
   * Register with facebook
   * @ignore
   */
  handleSignupFacebook = () => {};

  /**
   * Register with google
   * @ignore
   */
  handleSignupGoogle = () => {};

  /**
   * Renderer function
   */
  render() {
    const { error, isLoading, registerMode } = this.props;
    const { classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Column paddingTopHalf fullWidth textLightGrey>
          {registerMode === "landlord" ? (
            <BuildingsIcon fontSize="large" className={classes.outlineIcon} />
          ) : (
            <UsersIcon fontSize="large" className={classes.outlineIcon} />
          )}
        </Column>

        {/* title */}
        <Typography
          fontSizeM
          fontWeightBold
          textSecondary
          fullWidth
          paddingTop
          justifyChildrenCenter
        >
          {registerMode === "landlord"
            ? t("signupAsLandlord")
            : registerMode === "company"
              ? t("signupAsCompany")
              : t("signupToRENTGLOBAL")}
        </Typography>

        {/* email */}
        <Box paddingTop>
          <TextField
            id="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange("email")}
            type="email"
            variant="outlined"
            startAdornment={<EmailIcon className={classes.outlineIcon} />}
            error={!!this.state.emailError}
            helperText={this.state.emailError}
            fullWidth
          />
        </Box>

        {/* password */}
        <Box paddingTopHalf>
          <TextField
            id="createPassword"
            placeholder={t("createPassword")}
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

        {/* error message */}
        {error && error.type === "register" && (
          <Typography
            fontSizeS
            textErrorRed
            justifyChildrenEnd
            paddingTopHalf
            paddingRightHalf
          >
            {t(`registerError_${error.msg}`)}
          </Typography>
        )}

        {/* submit button */}
        <Box paddingTopHalf justifyChildrenEnd fullWidth>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            className={classes.submitButton}
            onClick={this.handleSignup}
            loading={isLoading}
          >
            <Typography fontSizeS fontWeightBold>
              {t("signup")}
            </Typography>
          </Button>
        </Box>

        <Column classes={{ box: classes.moreWrapper }}>
          <HorizontalDivider text={t("or")} light />

          {/* signup with facebook */}
          <Box paddingTop justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={classes.fullWidth}
              onClick={this.handleSignupFacebook}
            >
              {t("signupWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("facebook")}
              </Typography>
            </Button>
          </Box>

          {/* signup with google */}
          <Box paddingTopHalf justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={classes.fullWidth}
              onClick={this.handleSignupGoogle}
            >
              {t("signupWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("google")}
              </Typography>
            </Button>
          </Box>
        </Column>

        {/* login */}
        <Column paddingTopDouble>
          <Box paddingTop>
            <Typography textMediumGrey fontSizeXS>
              {t("alreadyHaveAccount")}
              <Link to="/auth/login" variant="primary">
                &nbsp;{t("login")}
              </Link>
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
  mappedRegister: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(withTranslation("common")(RegisterForm));
