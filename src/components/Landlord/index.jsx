import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import {
  AppSidebar,
  VisitRequestAcceptedDialog,
  VisitRequestDeclineDialog,
} from "../Layout";
import {
  Row,
  Column,
  ConfirmDialog,
  Typography,
  CloseIcon,
  CheckIcon,
  DeleteIcon,
} from "../../common/base-components";
import {
  uploadFile,
  downloadFile,
  getLandlordOffices,
  getLandlordApprovedOffices,
  getLandlordUnapprovedOffices,
  getOfficeById,
  getSimilarOffices,
  createOffice,
  updateOffice,
  createOfficeServicesAmenities,
  saveVisibility,
  publishOffice,
  unpublishOffice,
  uploadOfficePhoto,
  deleteOfficePhoto,
  deleteOffice,
} from "../../api/endpoints";
import Profile from "../../containers/Layout/Profile";
import Dashboard from "../../containers/Landlord/Dashboard";
import Calendar from "./Calendar";
import CalendarVisitRequests from "./Calendar/VisitRequests";
import Office from "./Office";
import OfficeDetail from "./Office/OfficeDetail";
import AddNewOffice from "../../containers/Landlord/Office/AddNewOffice";
import OfficeList from "./Office/OfficeList";
import UnapprovedOfficeList from "./Office/UnapprovedOfficeList";
import Notifications from "../Layout/Notifications";
import { notifications } from "../../common/mock/officeMockData";

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1024 + 44,
    paddingLeft: 22,
    paddingRight: 22,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  sidebarWrapper: {
    position: "sticky",
    top: 0,
  },

  contentWrapper: {
    width: "calc(100% - 151px)",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
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
        this.props.navigate("offices");
      }
    });
  };

  /**
   * Edit office
   * @deprecated
   */
  editOffice = (office) => () => {
    this.setState({ dialog: null }, () => {
      this.props.navigate("offices", `${office._id}/edit`);
    });
  };

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Event handler for edit office */
  handleEditOffice = (office) => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant='primary'
          text={this.props.t("confirmEdit")}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("ok")}</Typography>
            </React.Fragment>
          }
          onConfirm={this.editOffice(office)}
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
          variant='error'
          text={this.props.t("confirmDelete")}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <DeleteIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("delete")}</Typography>
            </React.Fragment>
          }
          onConfirm={this.deleteOffice(officeId)}
          onClose={this.closeDialog}
        />
      ),
    });
  };

  /** Event handler for accept visit request */
  handleAcceptVisitRequest = (visitRequest) => {
    this.setState({
      dialog: (
        <VisitRequestAcceptedDialog
          onClose={this.closeDialog}
          onBack={() => {
            this.props.navigate("/landlord/calendar");
          }}
        />
      ),
    });
  };

  /** Event handler for decline visit request */
  handleDeclineVisitRequest = (visitRequest) => {
    this.setState({
      dialog: (
        <VisitRequestDeclineDialog
          text={this.props.t("confirmDelete")}
          onClose={this.closeDialog}
          onSave={this.declineVisitRequest(visitRequest)}
        />
      ),
    });
  };

  approveVisitRequest = (visitRequest) => {
    /** Handle approve visit request by calling api */
    console.log(visitRequest);
    this.closeDialog();
  };

  declineVisitRequest = (visitRequest) => (msg) => {
    /** Handle reject visit request by calling api */
    console.log(visitRequest);
    this.closeDialog();
  };

  getNotifications = () => {
    return Promise.resolve({
      status: 200,
      data: { docs: notifications, totalLength: notifications.length },
    });
  };

  /** Render function */
  render() {
    const { classes } = this.props;
    const { userRole, phoneCodeSent, verifiedPhoneNumber } = this.props.auth;
    const { dialog } = this.state;

    // TODO: requirements not specified when toggling roles
    if (userRole !== "landlord") {
      this.props.onToggleRole("landlord");
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
                  path='/landlord/dashboard'
                  render={() => (
                    <Dashboard
                      getOffices={getLandlordOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/offices'
                  render={() => <Office navigate={this.props.navigate} />}
                />
                <Route
                  exact
                  path={[
                    "/landlord/offices/add/:id/:location/:officeType/:employeeNumber/:refId-:title",
                    "/landlord/offices/add",
                  ]}
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
                      saveVisibility={saveVisibility}
                      publishOffice={publishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/offices/all'
                  render={() => (
                    <OfficeList
                      getOffices={getLandlordApprovedOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/offices/unpublish'
                  render={() => (
                    <UnapprovedOfficeList
                      getOffices={getLandlordUnapprovedOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/offices/:id/:location/:officeType/:employeeNumber/:refId-:title'
                  render={({ match }) => (
                    <OfficeDetail
                      navigate={this.props.navigate}
                      officeId={match.params.id}
                      getOfficeById={getOfficeById}
                      getSimilarOffices={getSimilarOffices}
                      unpublishOffice={unpublishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                      onAcceptVisitRequest={this.handleAcceptVisitRequest}
                      onDeclineVisitRequest={this.handleDeclineVisitRequest}
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/offices/:id/edit'
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
                      saveVisibility={saveVisibility}
                      publishOffice={publishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                      editMode
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/calendar'
                  render={() => (
                    <Calendar
                      navigate={this.props.navigate}
                      onAcceptVisitRequest={this.handleAcceptVisitRequest}
                      onDeclineVisitRequest={this.handleDeclineVisitRequest}
                    />
                  )}
                />
                <Route
                  exact
                  path='/landlord/calendar/visit-requests'
                  render={() => (
                    <CalendarVisitRequests
                      navigate={this.props.navigate}
                      onAcceptVisitRequest={this.handleAcceptVisitRequest}
                      onDeclineVisitRequest={this.handleDeclineVisitRequest}
                    />
                  )}
                />
                <Route
                  path='/landlord/profile'
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
                        this.props.mappedverifyPhoneNumber(phoneNumber)
                      }
                      verifyPhoneCode={(phoneCode) =>
                        this.props.mappedverifyPhoneCode(phoneCode)
                      }
                      verifiedPhoneNumber={verifiedPhoneNumber}
                      phoneCodeSent={phoneCodeSent}
                      uploadFile={uploadFile}
                      downloadFile={downloadFile}
                    />
                  )}
                />
                <Route
                  path='/landlord/notifications'
                  render={() => (
                    <Notifications
                      navigate={this.props.navigate}
                      getNotifications={this.getNotifications}
                    />
                  )}
                />
                <Route render={() => <Redirect to='/landlord/dashboard' />} />
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
  withStyles(styleSheet)(withTranslation("common")(Landlord))
);
