import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Hidden } from '@material-ui/core';
import clsx from 'clsx';
import {
  Switch, Route, Redirect, withRouter,
} from 'react-router-dom';
import { AppSidebar } from '../Layout';
import { Row, Column } from '../../common/base-components';
import Profile from '../../containers/Layout/Profile';
import Dashboard from "../../containers/Company/Dashboard";
import Preview from "../../containers/Company/Preview";
import Office from "./Office";
import OfficeList from "./Office/OfficeList";
import {
  uploadFile,
  downloadFile,
  getOffices,
  getRecentViewOffices,
  getOfficesHistory,
  getFavoriteOffices,
} from '../../api/endpoints';

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
      overflowX: 'visible',
    },

    '&.nosidebar': {
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
      user.roles.indexOf('company') === -1
      && location.pathname !== '/company/profile'
    ) {
      return <Redirect to="/company/profile" />;
    }

    if (userRole !== 'company') {
      this.props.onToggleRole('company');
    }

    let showAppSidebar = true;
    
    if (location.pathname === "/company/preview-profile") {
      showAppSidebar = false;
    }

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            {showAppSidebar &&
              <Hidden smDown>
                <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
                  <AppSidebar userRole={userRole} navigate={this.props.navigate} />
                </Column>
              </Hidden>
            }
            <Column classes={{ box: clsx(classes.contentWrapper, !showAppSidebar && 'nosidebar') }} fullWidth>
              <Switch>
                <Route
                  path="/company/dashboard"
                  render={() => (
                    <Dashboard
                      getOffices={getOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path='/company/offices'
                  render={() => <Office navigate={this.props.navigate} />}
                />
                <Route
                  exact
                  path='/company/offices/recent-views'
                  render={() => (
                    <OfficeList
                      getOffices={getRecentViewOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path='/company/offices/history'
                  render={() => (
                    <OfficeList
                      getOffices={getOfficesHistory}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path='/company/offices/favorite'
                  render={() => (
                    <OfficeList
                      getOffices={getFavoriteOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  path="/company/profile"
                  render={() => (
                    <Profile
                      updateUser={(field, user) => this.props.mappedupdateUser(
                        field,
                        user,
                        this.props.history,
                      )}
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
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  path="/company/preview-profile"
                  render={() => (
                    <Preview
                      navigate={this.props.navigate}
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
  withStyles(styleSheet)(withTranslation('common')(Company)),
);
