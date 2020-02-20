import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import { Switch, Route, Redirect } from "react-router-dom";
import AppSidebar from "../../containers/Layout/AppSidebar";
import { Row, Column } from "../../common/base-components";
import Profile from "./Profile";

const styleSheet = theme => ({
  root: {
    maxWidth: 1024 + 44
  },
  sidebarWrapper: {
    position: "sticky"
  }
});

class Landlord extends Component {
  render() {
    const { classes, t } = this.props;
    const { isLoggedIn, user } = this.props.auth;

    return (
      <div>
        <Column fullWidth>
          <Row classes={{ box: classes.root }} fullWidth alignChildrenStart>
            <Column classes={{ box: classes.sidebarWrapper }} fullWdith>
              <AppSidebar role="landlord" />
            </Column>
            <Column classes={{ box: classes.contentWrapper }} fullWidth>
              <Switch>
                <Route
                  path="/landlord/dashboard"
                  render={props => <>Dashboard</>}
                />
                <Route
                  path="/landlord/profile"
                  render={props => <Profile user={user} />}
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
