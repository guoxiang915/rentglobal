import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Hidden } from '@material-ui/core';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { AppSidebar } from '../Layout';
import { Row, Column } from '../../common/base-components';
import Profile from '../../containers/Layout/Profile';
import { uploadFile, downloadFile } from '../../api/endpoints';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1024 + 44,
    paddingLeft: 22,
    paddingRight: 22,
  },

  sidebarWrapper: {
    position: 'sticky',
    top: 0,
  },

  contentWrapper: {
    width: 'calc(100% - 151px)',
    overflowX: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
});

class Company extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
  };

  /** Render function */
  render() {
    const { classes, location } = this.props;
    const { user, userRole, phoneCodeSent, verifiedPhoneNumber } = this.props.auth;

    // TODO: requirements not specified when toggling roles
    if (
      user.roles.indexOf('company') === -1 &&
      location.pathname !== '/company/profile'
    ) {
      return <Redirect to="/company/profile" />;
    }

    if (userRole !== 'company') {
      this.props.onToggleRole('company');
    }

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            <Hidden smDown>
              <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
                <AppSidebar userRole={userRole} navigate={this.props.navigate} />
              </Column>
            </Hidden>
            <Column classes={{ box: classes.contentWrapper }} fullWidth>
              <Switch>
                <Route
                  path="/company/dashboard"
                  render={() => <React.Fragment></React.Fragment>}
                />
                <Route
                  path="/company/profile"
                  render={() => (
                    <Profile
                      updateUser={(field, user) =>
                        this.props.mappedupdateUser(
                          field,
                          user,
                          this.props.history
                        )
                      }
                      verifyPhoneNumber={(phoneNumber) =>
                        this.props.mappedverifyPhoneNumber(
                          phoneNumber
                        )   
                      }
                      verifyPhoneCode={(phoneCode) =>
                        this.props.mappedverifyPhoneCode(
                          phoneCode
                        )                   
                      }
                      verifiedPhoneNumber={verifiedPhoneNumber}
                      phoneCodeSent={phoneCodeSent}
                      uploadFile={uploadFile}
                      downloadFile={downloadFile}
                    />
                  )}
                />
                <Route render={() => <Redirect to="/company/dashboard" />} />
              </Switch>
            </Column>
          </Row>
        </Column>
      </div>
    );
  }
}

export default withRouter(
  withStyles(styleSheet)(withTranslation('common')(Company))
);
