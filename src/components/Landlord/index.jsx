import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppSidebar } from "../Layout";
import {
  Row,
  Column,
  ConfirmDialog,
  Typography,
  CloseIcon,
  CheckIcon,
  DeleteIcon
} from "../../common/base-components";
import Profile from "../Layout/Profile";
import Office from "./Office";
import OfficeDetail from "./Office/OfficeDetail";
import AddNewOffice from "../../containers/Landlord/Office/AddNewOffice";
import {
  uploadFile,
  downloadFile,
  deleteUserDocument,
  getOffices,
  getOfficeById,
  createOffice,
  updateOffice,
  createOfficeCoverPhotos,
  createOfficeServicesAmenities,
  publishOffice,
  unpublishOffice,
  deleteOfficePhoto,
  deleteOffice
} from "../../api/endpoints";

const styleSheet = theme => ({
  root: {
    maxWidth: 1024 + 44
  },

  sidebarWrapper: {
    position: "sticky",
    top: 0
  },

  contentWrapper: {
    width: "calc(100% - 204px)",
    overflowX: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
});

class Landlord extends Component {
  static propTypes = {
    navigate: PropTypes.func
  };

  state = { dialog: null };

  /** Call api to delete office */
  deleteOffice = officeId => () => {
    deleteOffice(officeId).then(response => {
      if (response.status === 200) {
        this.props.navigate("offices");
      }
    });
  };

  /**
   * Edit office
   * @deprecated
   */
  editOffice = officeId => () => {
    this.setState({ dialog: null }, () => {
      this.props.navigate("offices", `${officeId}/edit`);
    });
  };

  /** Event handler for edit office */
  handleEditOffice = officeId => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="primary"
          text={this.props.t("confirmEdit")}
          closeLabel={
            <>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </>
          }
          confirmLabel={
            <>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("ok")}</Typography>
            </>
          }
          onConfirm={this.editOffice(officeId)}
          onClose={this.closeDialog}
        />
      )
    });
  };

  /** Event handler for delete office */
  handleDeleteOffice = officeId => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="error"
          text={this.props.t("confirmDelete")}
          closeLabel={
            <>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </>
          }
          confirmLabel={
            <>
              <DeleteIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("delete")}</Typography>
            </>
          }
          onConfirm={this.deleteOffice(officeId)}
          onClose={this.closeDialog}
        />
      )
    });
  };

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { dialog } = this.state;

    if (user.roles.indexOf("landlord") === -1) {
      return <Redirect to="/" />;
    }

    if (user.role !== "landlord") {
      this.props.onToggleRole();
    }

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            <Hidden smDown>
              <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
                <AppSidebar role="landlord" navigate={this.props.navigate} />
              </Column>
            </Hidden>
            <Column classes={{ box: classes.contentWrapper }} fullWidth>
              <Switch>
                <Route path="/landlord/dashboard" render={props => <></>} />
                <Route
                  exact
                  path="/landlord/offices"
                  render={props => (
                    <Office
                      getOffices={getOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path={["/landlord/offices/add/:id", "/landlord/offices/add"]}
                  render={({ match }) => (
                    <AddNewOffice
                      officeId={match.params.id}
                      navigate={this.props.navigate}
                      getOfficeById={getOfficeById}
                      uploadFile={uploadFile}
                      createOffice={createOffice}
                      updateOffice={updateOffice}
                      deleteOfficePhoto={deleteOfficePhoto}
                      createOfficeCoverPhotos={createOfficeCoverPhotos}
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
                      uploadFile={uploadFile}
                      createOffice={createOffice}
                      updateOffice={updateOffice}
                      deleteOfficePhoto={deleteOfficePhoto}
                      createOfficeCoverPhotos={createOfficeCoverPhotos}
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
                  render={props => (
                    <Profile
                      {...this.props.auth}
                      role="landlord"
                      updateUser={(field, user) =>
                        this.props.mappedupdateUser(
                          field,
                          user,
                          this.props.history
                        )
                      }
                      uploadFile={uploadFile}
                      downloadFile={downloadFile}
                      deleteDocument={deleteUserDocument("landlord")}
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

export default withStyles(styleSheet)(withTranslation("common")(Landlord));
