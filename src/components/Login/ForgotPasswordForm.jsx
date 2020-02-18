import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "./Login.css";
import { withTranslation } from "react-i18next";
import {
  TextField,
  Button,
  Box,
  Column,
  Link,
  Divider,
  Typography
} from "../../common/base-components";
import { MailOutline } from "@material-ui/icons";

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
  }
});

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email ? this.props.email : "",
      emailError: null,
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

  handleResetPassword = e => {
    e.preventDefault();
    if (this.state.error) {
      return;
    }
    const payload = {
      email: this.state.email
    };
    if (payload.email !== "") {
      this.props.mappedForgotPassword(payload);
    }
  };

  render() {
    const { classes, t } = this.props;

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
          {t("forgotPassword")}
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
        <Box paddingTopHalf justifyChildrenEnd fullWidth paddingBottom>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            className={classes.submitButton}
            onClick={this.handleResetPassword}
            disabled={!this.state.email}
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
  t: PropTypes.func.isRequired
};

export default withStyles(styleSheet)(
  withTranslation("common")(ForgotPasswordForm)
);
