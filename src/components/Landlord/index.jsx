import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppSidebar } from "../Layout";
import { Row, Column } from "../../common/base-components";
import Profile from "./Profile";
import Offices from "./Offices";
import api from "../../api/api";

const styleSheet = () => ({
  root: {
    maxWidth: 1024 + 44
  },
  sidebarWrapper: {
    position: "sticky"
  }
});

class Landlord extends Component {
  static propTypes = {
    navigate: PropTypes.func
  };

  uploadFile = file => {
    return api.post("/file/upload", file);
  };

  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

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
                <Route path="/landlord/offices" render={props => <Offices />} />
                <Route
                  path="/landlord/profile"
                  render={props => (
                    <Profile
                      user={user}
                      mappedupdateUser={this.props.mappedupdateUser}
                      // mappedUploadUserImage={this.props.mappedUploadUserImage}
                      uploadFile={this.uploadFile}
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
