import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Hidden } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import { AppSidebar } from "../Layout";
import { Row, Column } from "../../common/base-components";
import Profile from "../Layout/Profile";
import {
  uploadFile,
  downloadFile,
  deleteUserDocument
} from "../../api/endpoints";

const styleSheet = () => ({
  root: {
    maxWidth: 1024 + 44
  },

  sidebarWrapper: {
    position: "sticky",
    top: 0
  }
});

class Company extends Component {
  static propTypes = {
    navigate: PropTypes.func
  };

  /** Render function */
  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

    if (user.roles.indexOf("company") === -1) {
      return <Redirect to="/" />;
    }

    if (user.role !== "company") {
      this.props.onToggleRole();
    }

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            <Hidden smDown>
              <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
                <AppSidebar role="company" navigate={this.props.navigate} />
              </Column>
            </Hidden>
            <Column classes={{ box: classes.contentWrapper }} fullWidth>
              <Switch>
                <Route path="/company/dashboard" render={props => <></>} />
                <Route
                  path="/company/profile"
                  render={props => (
                    <Profile
                      {...this.props.auth}
                      role="company"
                      updateUser={(field, user) =>
                        this.props.mappedupdateUser(
                          field,
                          user,
                          this.props.history
                        )
                      }
                      uploadFile={uploadFile}
                      downloadFile={downloadFile}
                      deleteDocument={deleteUserDocument("company")}
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

export default withStyles(styleSheet)(withTranslation("common")(Company));
