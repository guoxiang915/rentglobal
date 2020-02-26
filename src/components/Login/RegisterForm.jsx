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
  Typography
} from "../../common/base-components";
import {
  Business as LandlordIcon,
  PeopleOutline as CompanyIcon,
  MailOutline,
  LockOpen
} from "@material-ui/icons";

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

  handleSignup = async e => {
    e.preventDefault();
    const validForm = await this.validateForm();
    if (!validForm) {
      return;
    }
    const user = {
      email: this.state.email,
      password: this.state.password,
      role: this.props.registerMode,
      passwordLastUpdated: new Date()
    };
    this.props.mappedRegister(user);
  };

  handleSignupFacebook = () => {};

  handleSignupGoogle = () => {};

  render() {
    const { registerMode, classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Column paddingTopHalf fullWidth textLightGrey>
          {registerMode === "landlord" ? (
            <LandlordIcon fontSize="large" />
          ) : (
            <CompanyIcon fontSize="large" />
          )}
        </Column>
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
            error={!!this.state.passwordError}
            helperText={this.state.passwordError}
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
            <Typography fontSizeS fontWeightBold>
              {t("signup")}
            </Typography>
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
              onClick={this.handleSignupGoogle}
            >
              {t("signupWith")}&nbsp;
              <Typography textPrimary fontSizeS fontWeightBold>
                {t("google")}
              </Typography>
            </Button>
          </Box>
        </Column>

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
  mappedRegister: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(withTranslation("common")(RegisterForm));
