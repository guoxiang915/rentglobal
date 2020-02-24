import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { Hidden } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import AppSidebar from "../../containers/Layout/AppSidebar";
import { Row, Column } from "../../common/base-components";
import Profile from "./Profile";

const styleSheet = () => ({
  root: {
    maxWidth: 1024 + 44
  },
  sidebarWrapper: {
    position: "sticky"
  }
});

class Company extends Component {
  render() {
    const { classes } = this.props;
    const { user } = this.props.auth;

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            <Hidden smDown>
              <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
                <AppSidebar role="company" />
              </Column>
            </Hidden>
            <Column classes={{ box: classes.contentWrapper }} fullWidth>
              <Switch>
                <Route path="/company/dashboard" render={props => <></>} />
                <Route
                  path="/company/profile"
                  render={props => (
                    <Profile
                      user={user}
                      mappedupdateUser={this.props.mappedupdateUser}
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
