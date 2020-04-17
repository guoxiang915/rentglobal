import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Link,
  Divider,
  Typography,
  EmailIcon,
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

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },
});

class ForgotPasswordForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : "",
      emailError: null,
      error: null,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
      [`${name}Error`]: null,
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
    }
    return true;
  }

  handleResetPassword = async (e) => {
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
    };
    if (payload.email !== "") {
      this.props.mappedForgotPassword(payload);
    }
  };

  render() {
    const { classes, t, isLoading } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Typography
          fontSizeM
          fontWeightBold
          textSecondary
          fullWidth
          paddingTopHalf
          justifyChildrenCenter
        >
          {t("forgotYourPassword")}
        </Typography>
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
        <Box paddingTopHalf justifyChildrenEnd fullWidth paddingBottom>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            className={classes.submitButton}
            onClick={this.handleResetPassword}
            disabled={!this.state.email}
            loading={isLoading}
          >
            <Typography fontSizeS fontWeightBold>
              {t("resetPassword")}
            </Typography>
          </Button>
        </Box>
        <Column classes={{ box: classes.moreWrapper }}>
          <Divider light />
          <Box paddingTop paddingBottom>
            <Typography fontSizeS fontWeightBold>
              <Link variant="primary" to="/auth/login">
                {t("login")}
              </Link>
            </Typography>
          </Box>
        </Column>
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default withStyles(styleSheet)(
  withTranslation("common")(ForgotPasswordForm)
);
