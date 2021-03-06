import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Column, Spinner } from '../../common/base-components';
import LoginForm from './LoginForm';
import SelectRegisterForm from './SelectRegisterForm';
import RegisterForm from './RegisterForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import SendPasswordVerificationForm from './SendPasswordVerificationForm';
import SetNewPasswordForm from './SetNewPasswordForm';
import VerifyEmailSuccessForm from './VerifyEmailSuccessForm';
import VerifyEmailFailedForm from './VerifyEmailFailedForm';

import HeaderImage from '../../assets/img/img_header@2x.jpg';

const styleSheet = (theme) => ({
  root: {
    height: '100%',
    background: theme.colors.primary.white,
    minHeight: 'calc(100vh - 245px)',
  },

  backgroundWrapper: {
    width: '100%',
    height: theme.spacing(6),
    background: `transparent url(${HeaderImage}) 0% 0% no-repeat padding-box`,
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      background: 'white',
    },
  },

  loginWrapper: {
    textAlign: 'center',
    alignItems: 'center',
    padding: '20px 0px',
    backgroundColor: 'white',
  },

  loginCard: {
    width: '100%',
    maxWidth: 450,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    padding: '10px 40px 20px 40px',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('sm')]: {
      border: 'none',
    },
  },

  fullWidth: {
    width: '100%',
  },

  loginTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: '26px',
    fontSize: '20px',
    marginTop: 8,
    textAlign: 'center',
  },

  loginButton: {
    width: 200,
  },

  socialWrapper: {
    marginTop: 20,
  },

  socialButton: {
    width: '100%',
  },
});

class AuthWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isRemember: false,
      error: null,
    };
  }

  navigate = (route) => {
    this.props.history.push(`/auth/${route}`);
  };

  renderVerifyForm = ({ match, classes: s }) => {
    const { token } = match.params;

    const searchParams = new URLSearchParams(window.location.search);
    const redirect = searchParams.get("redirect");

    React.useMemo(() => {
      this.props.mappedVerifyEmail({ token, redirect }, this.props.history);
    }, [token, redirect]);
    return (
      <Column classes={{ box: s.loginCard }}>
        <Column paddingTop fullWidth>
          <Spinner />
        </Column>
      </Column>
    );
  };

  render() {
    const { classes: s } = this.props;
    const { isLoggedIn, isLoading, error } = this.props.auth;
    const VerifyForm = this.renderVerifyForm;

    return (
      <div className={s.root}>
        <div className={s.backgroundWrapper} />
        <div className={s.loginWrapper}>
          {!isLoggedIn ? (
            <Switch>
              {/* login form */}
              <Route
                exact
                path="/auth/login"
                render={() => (
                  <Column classes={{ box: s.loginCard }}>
                    <LoginForm
                      email={this.state.email}
                      mappedLogin={(payload) => this.props.mappedLogin(payload, this.props.history)}
                      error={error}
                      isLoading={isLoading}
                    />
                  </Column>
                )}
              />
              {/* select-register form */}
              <Route
                exact
                path="/auth/register"
                render={() => <SelectRegisterForm navigate={this.navigate} />}
              />
              {/* register form */}
              <Route
                exact
                path="/auth/register/:registerMode"
                render={({ match }) => (
                  <Column classes={{ box: s.loginCard }}>
                    <RegisterForm
                      email={this.state.email}
                      mappedRegister={(payload) => this.props.mappedRegister(payload, this.props.history)}
                      registerMode={match.params.registerMode}
                      error={error}
                      isLoading={isLoading}
                    />
                  </Column>
                )}
              />
              {/* verify email form */}
              <Route
                exact
                path="/auth/register/verify-email/:token"
                render={({ match }) => <VerifyForm match={match} classes={s} />}
              />
              {/* verify email success form */}
              <Route
                exact
                path="/auth/verify-email-success"
                render={({ location }) => (location.state && location.state.success ? (
                  <Column classes={{ box: s.loginCard }}>
                    <VerifyEmailSuccessForm navigate={this.navigate} redirect={location.state.redirect}/>
                  </Column>
                ) : (
                  <Redirect to="/auth/login" />
                ))}
              />
              {/* verify email failed form */}
              <Route
                exact
                path="/auth/verify-email-failed"
                render={({ location }) => (location.state && location.state.failed ? (
                  <Column classes={{ box: s.loginCard }}>
                    <VerifyEmailFailedForm navigate={this.navigate} />
                  </Column>
                ) : (
                  <Redirect to="/auth/login" />
                ))}
              />
              {/* forgot password form */}
              <Route
                exact
                path="/auth/reset-password"
                render={() => (
                  <Column classes={{ box: s.loginCard }}>
                    <ForgotPasswordForm
                      email={this.state.email}
                      isLoading={isLoading}
                      mappedForgotPassword={(payload) => this.props.mappedForgotPassword(
                        payload,
                        this.props.history,
                      )}
                    />
                  </Column>
                )}
              />
              {/* reset password form */}
              <Route
                path="/auth/reset-password/confirm"
                render={({ location }) => (location.state && location.state.email ? (
                  <Column classes={{ box: s.loginCard }}>
                    <SendPasswordVerificationForm
                      email={location.state.email}
                      navigate={this.navigate}
                    />
                  </Column>
                ) : (
                  <Redirect to="/auth/login" />
                ))}
              />
              {/* reset password confirm form */}
              <Route
                path="/auth/reset-password/update/:token"
                render={({ match }) => (
                  <Column classes={{ box: s.loginCard }}>
                    <SetNewPasswordForm
                      token={match.params.token}
                      mappedResetPassword={(payload) => this.props.mappedResetPassword(
                        payload,
                        this.props.history,
                      )}
                    />
                  </Column>
                )}
              />
              <Route render={() => <Redirect to="/auth/login" />} />
            </Switch>
          ) : (
            <Redirect to="/" />
          )}
        </div>
      </div>
    );
  }
}

AuthWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withStyles(styleSheet)(withTranslation('common')(AuthWrapper));
