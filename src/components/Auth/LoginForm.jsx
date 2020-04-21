import React, { PureComponent } from "react";
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
  EmailIcon,
} from "../../common/base-components";
import Auth from "../../utils/auth";

const authObj = new Auth();

const styleSheet = (theme) => ({
  formWrapper: {
    width: "100%",
  },

  formTitle: {
    marginTop: 8,
    textAlign: "center",
  },

  fixedWidthButton: {
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

  recaptcha: {
    width: 200,
    height: 50,
  },
});

class LoginForm extends PureComponent {
  /**
   * @static Prop types of LoginForm component
   */
  static propTypes = {
    email: PropTypes.string,
    noTitle: PropTypes.bool,
    error: PropTypes.any,
    isLoading: PropTypes.bool,
    mappedLogin: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  /**
   * @member {Object} state State of LoginForm component
   */
  state = {
    email: this.props.email ? this.props.email : "",
    emailError: null,
    password: "",
    passwordError: null,
    isRemember: authObj.getRememberUser() === "true",
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
   * Submit the login form
   * @deprecated
   */
  handleSubmit = async (e) => {
    e.preventDefault();
    const validForm = await this.validateForm();
    if (!validForm) {
      return;
    }
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    if (payload.email !== "" && payload.password !== "") {
      this.props.mappedLogin(payload);
    }
  };

  /**
   * Toggle remembering user
   */
  handleToggleRememberUser = () => {
    const isRemember = !this.state.isRemember;
    this.setState({ isRemember });
    authObj.setRememberUser(isRemember);
  };

  /**
   * Submit the login form
   */
  handleLogin = async (e) => {
    e.preventDefault();
    const validForm = await this.validateForm();
    if (!validForm) {
      return;
    }
    const payload = {
      email: this.state.email,
      password: this.state.password,
    };
    if (payload.email !== "" && payload.password !== "") {
      this.props.mappedLogin(payload, this.props.history);
    }
  };

  /**
   * Login with facebook
   * @ignore
   */
  handleLoginFacebook = () => {};

  /**
   * Login with google
   * @ignore
   */
  handleLoginGoogle = () => {};

  /**
   * Verify recaptcha callback
   * @ignore
   */
  recaptchaVerifyCallback = () => {};

  /**
   * Load recaptcha callback
   * @ignore
   */
  recaptchaLoadCallback = () => {};

  /**
   * Renderer function
   */
  render() {
    const { noTitle, classes: s, t } = this.props;
    const { error, isLoading } = this.props;

    return (
      <form noValidate autoComplete="off" className={s.formWrapper}>
        {/* title */}
        {!noTitle && (
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
        )}

        {/* email */}
        <Box paddingTop>
          <TextField
            id="email"
            placeholder={t("email")}
            value={this.state.email}
            onChange={this.handleChange("email")}
            type="email"
            variant="outlined"
            startAdornment={<EmailIcon className={s.outlineIcon} />}
            error={!!this.state.emailError}
            helperText={this.state.emailError}
            fullWidth
          />
        </Box>

        {/* password */}
        <Box paddingTopHalf>
          <TextField
            id="password"
            placeholder={t("password")}
            value={this.state.password}
            onChange={this.handleChange("password")}
            type="password"
            variant="outlined"
            startAdornment={<LockIcon className={s.outlineIcon} />}
            error={!!this.state.passwordError}
            helperText={this.state.passwordError}
            fullWidth
          />
        </Box>

        {/* error message */}
        {error && error.type === "login" && (
          <Typography
            fontSizeS
            textErrorRed
            justifyChildrenEnd
            paddingTopHalf
            paddingRightHalf
          >
            {t("loginError")}
          </Typography>
        )}

        {/* remember user */}
        <Box paddingTopHalf justifyChildrenEnd fullWidth>
          <Checkbox
            variant="outlined"
            label={t("rememberMe")}
            className={s.fixedWidthButton}
            isChecked={this.state.isRemember}
            onChange={this.handleToggleRememberUser}
          />
        </Box>

        {/* TODO: recaptcha */}
        {/* <Box paddingTopHalf justifyChildrenEnd fullWidth>
          <div>
            <Recaptcha
              sitekey="6LeGjOQUAAAAAFd98e-aWPK0uNxQaoKOUNizoplv"
              verifyCallback={this.recaptchaVerifyCallback}
              onloadCallback={this.recaptchaLoadCallback}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </Box> */}

        {/* submit login */}
        <Box paddingTopHalf justifyChildrenEnd fullWidth>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            className={s.fixedWidthButton}
            onClick={this.handleLogin}
            loading={isLoading}
          >
            <Typography fontSizeS fontWeightBold>
              {t("login")}
            </Typography>
          </Button>
        </Box>

        <Column classes={{ box: s.moreWrapper }}>
          <Divider light />

          {/* forgot password */}
          <Box paddingTop paddingBottom>
            <Typography fontSizeS fontWeightBold>
              <Link variant="primary" to="/auth/reset-password">
                {t("forgotPassword")}
              </Link>
            </Typography>
          </Box>

          <HorizontalDivider text={t("or")} light />

          {/* login with facebook */}
          <Box paddingTop justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={s.fullWidth}
              onClick={this.handleLoginFacebook}
            >
              {t("loginWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("facebook")}
              </Typography>
            </Button>
          </Box>

          {/* login with google */}
          <Box paddingTopHalf justifyChildrenEnd fullWidth>
            <Button
              type="submit"
              variant="secondary"
              size="medium"
              className={s.fullWidth}
              onClick={this.handleLoginGoogle}
            >
              {t("loginWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("google")}
              </Typography>
            </Button>
          </Box>
        </Column>

        {/* register */}
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

export default withStyles(styleSheet)(withTranslation("common")(LoginForm));
