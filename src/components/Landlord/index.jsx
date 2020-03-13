import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppSidebar } from "../Layout";
import { Row, Column } from "../../common/base-components";
import Profile from "./Profile";
import Office from "./Office";
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

  /** Call api to create office */
  createOffice = office => {
    return api.post("/offices/create", office);
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
    return api.post(`/offices/publish/${officeId}`);
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

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
                  render={props => <Office navigate={this.props.navigate} />}
                />
                <Route
                  exact
                  path="/landlord/offices/add"
                  render={props => (
                    <AddNewOffice
                      navigate={this.props.navigate}
                      uploadFile={this.uploadFile}
                      createOffice={this.createOffice}
                      createOfficeCoverPhotos={this.createOfficeCoverPhotos}
                      createOfficeServicesAmenities={
                        this.createOfficeServicesAmenities
                      }
                      publishOffice={this.publishOffice}
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
      </div>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(Landlord));
