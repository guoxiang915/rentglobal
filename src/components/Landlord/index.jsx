import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Hidden } from '@material-ui/core';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { AppSidebar } from '../Layout';
import {
  Row,
  Column,
  ConfirmDialog,
  Typography,
  CloseIcon,
  CheckIcon,
  DeleteIcon,
} from '../../common/base-components';
import {
  uploadFile,
  downloadFile,
  getOffices,
  getAvailableOffices,
  getUnpublishedOffices,
  getOfficeById,
  createOffice,
  updateOffice,
  createOfficeServicesAmenities,
  publishOffice,
  unpublishOffice,
  uploadOfficePhoto,
  deleteOfficePhoto,
  deleteOffice,
} from '../../api/endpoints';
import Profile from '../../containers/Layout/Profile';
import Dashboard from '../../containers/Landlord/Dashboard';
import Office from './Office';
import OfficeDetail from './Office/OfficeDetail';
import AddNewOffice from '../../containers/Landlord/Office/AddNewOffice';
import OfficeList from './Office/OfficeList';
import UnpublishedOfficeList from './Office/UnpublishedOfficeList';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1024 + 44,
    paddingLeft: 22,
    paddingRight: 22,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
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

class Landlord extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
  };

  state = { dialog: null };

  /** Call api to delete office */
  deleteOffice = (officeId) => () => {
    deleteOffice(officeId).then((response) => {
      if (response.status === 200) {
        this.props.navigate('offices');
      }
    });
  };

  /**
   * Edit office
   * @deprecated
   */
  editOffice = (officeId) => () => {
    this.setState({ dialog: null }, () => {
      this.props.navigate('offices', `${officeId}/edit`);
    });
  };

  /** Event handler for edit office */
  handleEditOffice = (officeId) => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="primary"
          text={this.props.t('confirmEdit')}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t('cancel')}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t('ok')}</Typography>
            </React.Fragment>
          }
          onConfirm={this.editOffice(officeId)}
          onClose={this.closeDialog}
        />
      ),
    });
  };

  /** Event handler for delete office */
  handleDeleteOffice = (officeId) => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="error"
          text={this.props.t('confirmDelete')}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t('cancel')}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <DeleteIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t('delete')}</Typography>
            </React.Fragment>
          }
          onConfirm={this.deleteOffice(officeId)}
          onClose={this.closeDialog}
        />
      ),
    });
  };

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Render function */
  render() {
    const { classes, location } = this.props;
    const { user, userRole, phoneCodeSent, verifiedPhoneNumber } = this.props.auth;
    const { dialog } = this.state;

    // TODO: requirements not specified when toggling roles
    if (
      user.roles.indexOf('landlord') === -1 &&
      location.pathname !== '/landlord/profile'
    ) {
      return <Redirect to="/landlord/profile/" />;
    }

    if (userRole !== 'landlord') {
      this.props.onToggleRole('landlord');
    }

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            <Hidden smDown>
              <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
                <AppSidebar
                  userRole={userRole}
                  navigate={this.props.navigate}
                />
              </Column>
            </Hidden>
            <Column classes={{ box: classes.contentWrapper }} fullWidth>
              <Switch>
                <Route
                  path="/landlord/dashboard"
                  render={() => (
                    <Dashboard
                      getOffices={getOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path="/landlord/offices"
                  render={() => (
                    <Office
                      getOffices={getOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path={['/landlord/offices/add/:id', '/landlord/offices/add']}
                  render={({ match }) => (
                    <AddNewOffice
                      officeId={match.params.id}
                      navigate={this.props.navigate}
                      getOfficeById={getOfficeById}
                      createOffice={createOffice}
                      updateOffice={updateOffice}
                      uploadOfficePhoto={uploadOfficePhoto}
                      deleteOfficePhoto={deleteOfficePhoto}
                      createOfficeServicesAmenities={
                        createOfficeServicesAmenities
                      }
                      publishOffice={publishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                    />
                  )}
                />
                <Route
                  exact
                  path="/landlord/offices/all"
                  render={() => (
                    <OfficeList
                      getOffices={getAvailableOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path="/landlord/offices/unpublish"
                  render={() => (
                    <UnpublishedOfficeList
                      getOffices={getUnpublishedOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path="/landlord/offices/:id"
                  render={({ match }) => (
                    <OfficeDetail
                      navigate={this.props.navigate}
                      officeId={match.params.id}
                      getOfficeById={getOfficeById}
                      unpublishOffice={unpublishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                    />
                  )}
                />
                <Route
                  exact
                  path="/landlord/offices/:id/edit"
                  render={({ match }) => (
                    <AddNewOffice
                      officeId={match.params.id}
                      navigate={this.props.navigate}
                      getOfficeById={getOfficeById}
                      createOffice={createOffice}
                      updateOffice={updateOffice}
                      uploadOfficePhoto={uploadOfficePhoto}
                      deleteOfficePhoto={deleteOfficePhoto}
                      createOfficeServicesAmenities={
                        createOfficeServicesAmenities
                      }
                      publishOffice={publishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                      editMode={true}
                    />
                  )}
                />
                <Route
                  path="/landlord/profile"
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
                <Route render={() => <Redirect to="/landlord/dashboard" />} />
              </Switch>
            </Column>
          </Row>
        </Column>

        {/** show dialogs */}
        {dialog}
      </div>
    );
  }
}

export default withRouter(
  withStyles(styleSheet)(withTranslation('common')(Landlord))
);
