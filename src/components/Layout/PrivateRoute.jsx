import React from 'react';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core';
import Auth from '../../utils/auth';
import {
  AppHeader, AppFooter, AppSidebar, HelpDialog,
} from '.';
import { Column, Spinner } from '../../common/base-components';
import { WelcomeRoleDialog } from './Dialogs';
import SendVerificationForm from '../Auth/SendVerificationForm';
import { Storage } from '../../utils/storage';

import HeaderImage from '../../assets/img/img_header@2x.jpg';
import i18n from '../../i18n';

/** Token-based auth object */
const authObj = new Auth();

/** Storage object */
const storage = new Storage();

const styleSheet = (theme) => ({
  root: {
    height: '100vh',
    width: '100%',
  },

  headerWrapper: {
    position: 'sticky',
    top: 0,
    zIndex: 1100,
    height: 95,
  },

  bodyWrapper: {
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },

  bodyHeaderOffset: {
    height: 'calc(100% - 95px)',
  },

  bodyContent: {
    width: '100%',
    height: '100%',
    overflowY: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },

  contentWrapper: {
    background: theme.colors.primary.whiteGrey,
    minHeight: 'calc(100vh - 245px)',
  },

  footerWrapper: {
    height: 150,
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
  },

  sendVerificationWrapper: {
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
});

class PrivateRoute extends React.Component {
  static propTypes = {
    classes: PropTypes.object,
    /** Component to show */
    component: PropTypes.any,
    /** AppHeader exists or not */
    noHeader: PropTypes.bool,
    /** AppFooter exists or not */
    noFooter: PropTypes.bool,
    /** AppSidebar exists or not */
    noSidebar: PropTypes.bool,
    /**
     * Auth required or not
     * @deprecated
     */
    authRequired: PropTypes.bool,
  };

  state = {
    sidebarOpened: false,
    dialog: null,
  };

  UNSAFE_componentWillMount() {
    this.authenticate();
  }

  authenticate = async () => {
    // check authenticated user
    const token = await authObj.getToken();
    // if (token)
    await this.props.mappedAuthenticate(token, this.props.history);
  };

  navigate = (path, payload) => {
    const { isLoggedIn, userRole, user } = this.props.auth;

    switch (path) {
    case 'back':
      this.props.history.goBack();
      break;

    case 'home':
      this.props.history.push('/');
      break;

    case 'help':
      this.showHelpDialog();
      break;

    case 'login':
    case 'register':
    case 'register/landlord':
    case 'register/company':
    case 'forgot-password':
      this.props.history.push(`/auth/${path}`);
      break;
    case 'logout':
      authObj.removeToken();
      authObj.removeRefreshToken();
      this.props.mappedlogout();
      this.props.history.push('/');
      break;
    case 'profile':
      if (isLoggedIn) {
        if (userRole === '') {
          const { history } = this.props;
          history.location.pathname = `/${user.roles[0]}/profile`;
          this.props.mappedToggleRole(user.roles[0], history);
        } else {
          this.props.history.push(
            `/${userRole}/${path}/${payload || ''}`,
          );
        }
      }
      break;

    case 'dashboard':
    case 'offices/add':
    case 'offices/all':
    case 'offices/unpublish':
    case 'contracts':
    case 'optimization':
      if (isLoggedIn) {
        this.props.history.push(
          `/${userRole}/${path}/${payload || ''}`,
        );
        break;
      }
      this.props.history.push('/');
      break;
    case 'offices':
      this.props.history.push(
        `${userRole ? `/${userRole}` : ''
        }/${path}/${payload || ''}`,
      );
      break;

    default:
      this.props.history.push('/');
      break;
    }
    this.handleToggleSidebar(false);
  };

  /** Toggle userRole between landlord/company */
  handleToggleRole = (setRole) => {
    const { user, userRole } = this.props.auth;
    const nextRole = typeof setRole === 'string'
      ? setRole
      : userRole === 'landlord'
        ? 'company'
        : 'landlord';
    if (nextRole && user?.roles.indexOf(nextRole) === -1) {
      const hideGuidance = storage.getBoolean(`${nextRole}HideGuide`);
      if (hideGuidance) {
        this.props.mappedToggleRole(nextRole, this.props.history);
      } else {
        this.setState({
          dialog: (
            <WelcomeRoleDialog
              role={nextRole}
              onClose={() => {
                this.props.mappedToggleRole(nextRole, this.props.history);
                this.handleCloseDialog();
              }}
            />
          ),
        });
      }
    } else {
      this.props.mappedToggleRole(nextRole, this.props.history);
    }
    this.handleToggleSidebar(false);
  };

  /** Toggle sidebar */
  handleToggleSidebar = (sidebarOpened) => {
    this.setState({ sidebarOpened });
  };

  /** Show help dialog */
  showHelpDialog = () => {
    this.setState({
      dialog: <HelpDialog onClose={this.handleCloseDialog} />,
    });
  };

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  render() {
    const {
      classes,
      component: Component,
      noHeader,
      noFooter,
      authRequired,
      userRole: requiredRole = '',
      ...rest
    } = this.props;
    const {
      isLoggedIn, user, userRole, loaded,
    } = this.props.auth;
    const { dialog } = this.state;

    if (userRole !== requiredRole) {
      this.handleToggleRole(requiredRole);
    }

    if (!loaded) {
      return <Spinner />;
    }

    const { sidebarOpened } = this.state;

    return (
      <Route
        {...rest}
        render={(props) => {
          return (
            <React.Fragment>
              {authRequired && !isLoggedIn ? (
                <Redirect to="/auth/login" />
              ) : (
                <div className={classes.root}>
                  {/* show header bar */}
                  {!noHeader && (
                    <div className={classes.headerWrapper}>
                      <AppHeader
                        auth={this.props.auth}
                        sidebarOpened={sidebarOpened}
                        location="Montreal"
                        language={this.props.app.language}
                        onToggleRole={this.handleToggleRole}
                        onToggleSidebar={this.handleToggleSidebar}
                        onSelectLocation={() => {}}
                        onSelectLanguage={(lang) => {
                          i18n.changeLanguage(lang);
                          this.props.mappedChangeLanguage(lang);
                        }}
                        navigate={this.navigate}
                      />
                    </div>
                  )}

                  {/* show body */}
                  <div
                    className={clsx(
                      classes.bodyWrapper,
                      !noHeader && classes.bodyHeaderOffset,
                    )}
                  >
                    {/* show sidebar for mobile */}
                    {sidebarOpened && (
                      <AppSidebar
                        userRole={userRole}
                        onCollapse={() => this.handleToggleSidebar(false)}
                        onToggleRole={this.handleToggleRole}
                        navigate={this.navigate}
                      />
                    )}

                    <div className={classes.bodyContent}>
                      {/* show content wrapper */}
                      <div className={classes.contentWrapper}>
                        {isLoggedIn && !user.active ? (
                          /** for not activated user, show send-verification page */
                          <Switch>
                            <Route
                              path="/auth/send-verification"
                              render={() => (
                                <div
                                  className={classes.sendVerificationWrapper}
                                >
                                  <div
                                    className={classes.backgroundWrapper}
                                  />
                                  <div className={classes.loginWrapper}>
                                    <Column
                                      classes={{ box: classes.loginCard }}
                                    >
                                      <SendVerificationForm
                                        email={user.email}
                                        {...props}
                                      />
                                    </Column>
                                  </div>
                                </div>
                              )}
                            />
                            <Route
                              render={() => (
                                <Redirect to="/auth/send-verification" />
                              )}
                            />
                          </Switch>
                        ) : (
                          <Component
                            navigate={this.navigate}
                            {...props}
                            onToggleRole={this.handleToggleRole}
                          />
                        )}
                      </div>

                      {/* show footer */}
                      {!noFooter && (
                        <div className={classes.footerWrapper}>
                          <AppFooter className={classes.footerWrapper} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* show dialog */}
                  {dialog}
                </div>
              )}
            </React.Fragment>
          );
        }}
      />
    );
  }
}

export default withRouter(withStyles(styleSheet)(PrivateRoute));
