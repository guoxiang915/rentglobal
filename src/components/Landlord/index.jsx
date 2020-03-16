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
import Profile from "./Profile";
import Office from "./Office";
import OfficeDetail from "./Office/OfficeDetail";
import AddNewOffice from "../../containers/Landlord/Office/AddNewOffice";
import api from "../../api/api";

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

  /**
   * Upload file to the api
   * @param {File} file File object to upload
   * @param {string} permission "public-read" or "private"
   */
  uploadFile = (file, permission) => {
    const formData = new FormData();
    formData.append("file", file);
    if (permission) {
      formData.append("permission", permission);
    }
    const config = {
      headers: { "Content-Type": undefined }
    };
    return api.post("/file/upload", formData, config);
  };

  /**
   * Download file from api
   * @param {string} fileId id of file to download
   * @param {string} fileName name of file to be downloaded
   */
  downloadFile = (fileId, fileName) => {
    api.get(`/file/${fileId}`, { responseType: "blob" }).then(response => {
      const url = window.URL.createObjectURL(response.data);
      const el = document.createElement("a");

      el.href = url;
      el.download = fileName;
      el.style.display = "none";
      document.body.appendChild(el);
      el.click();

      document.body.removeChild(el);
      window.URL.revokeObjectURL(url);
    });
  };

  /** Call api to get office list */
  getOffices = () => {
    return api.get("/users/me/offices");
  };

  /** Call api to get office from id */
  getOfficeById = officeId => {
    return api.get(`/users/me/offices/${officeId}`);
  };

  /** Call api to create office */
  createOffice = office => {
    return api.post("/offices/create", office);
  };

  /** Call api to update office */
  updateOffice = office => {
    return api.put(`/users/me/offices/${office._id}`, { office });
  };

  /** Call api to save cover-photos */
  createOfficeCoverPhotos = payload => {
    return api.post("/offices/create/cover-photos", payload);
  };

  /** Call api to save services & amenities of office */
  createOfficeServicesAmenities = payload => {
    return api.post("/offices/create/services-amenities", payload);
  };

  /** Call api to publish office */
  publishOffice = officeId => {
    return api.put(`/offices/publish/${officeId}`);
  };

  /** Call api to unpublish office */
  unpublishOffice = officeId => {
    return api.put(`/offices/unpublish/${officeId}`);
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

  closeDialog = () => {
    this.setState({ dialog: null });
  };

  deleteOffice = officeId => () => {
    api.delete(`/offices/delete/${officeId}`).then(response => {
      if (response.status === 200) {
        this.props.navigate("offices");
      }
    });
  };

  editOffice = officeId => () => {};

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;
    const { dialog } = this.state;

    if (user.role !== "landlord") {
      return <Redirect to="/" />;
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
                      getOffices={this.getOffices}
                      navigate={this.props.navigate}
                    />
                  )}
                />
                <Route
                  exact
                  path={["/landlord/offices/add/:id", "/landlord/offices/add"]}
                  render={({ match }) => (
                    <AddNewOffice
                      getOfficeById={this.getOfficeById}
                      officeId={match.params.id}
                      navigate={this.props.navigate}
                      uploadFile={this.uploadFile}
                      createOffice={this.createOffice}
                      updateOffice={this.updateOffice}
                      createOfficeCoverPhotos={this.createOfficeCoverPhotos}
                      createOfficeServicesAmenities={
                        this.createOfficeServicesAmenities
                      }
                      publishOffice={this.publishOffice}
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
                      getOfficeById={this.getOfficeById}
                      unpublishOffice={this.unpublishOffice}
                      onDeleteOffice={this.handleDeleteOffice}
                      onEditOffice={this.handleEditOffice}
                    />
                  )}
                />
                <Route
                  path="/landlord/profile"
                  render={props => (
                    <Profile
                      {...this.props.auth}
                      updateUser={(field, user) =>
                        this.props.mappedupdateUser(
                          field,
                          user,
                          this.props.history
                        )
                      }
                      uploadFile={this.uploadFile}
                      downloadFile={this.downloadFile}
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
