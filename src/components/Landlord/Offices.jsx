import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Stretch,
  Typography,
  Button
} from "../../common/base-components";
import { TabWrapper } from "../../common/base-layouts";

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27
    }
  },

  fullWidth: {
    width: "100%"
  },

  buttonIcon: {
    width: 20,
    height: 20
  },

  officesTabWrapper: {
    paddingTop: theme.spacing(4)
  }
});

class Offices extends Component {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {};

  /** Navigation */
  navigate = () => {};

  /** Toggling office tabs */
  handleToggleOpen = () => {};

  /**
   * Renderer function
   */
  render() {
    const { classes, t } = this.props;

    return (
      <Column
        classes={{ box: classes.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          {/* title */}
          <Typography fontSizeM textSecondary paddingBottom>
            {t("offices")}
          </Typography>
          <Stretch />
          <Button variant="secondary" shadow>
            {t("addNewOffice")}
          </Button>
        </Row>

        {/* requests tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper
            title={t("requests")}
            open={true}
            onToggleOpen={this.handleToggleOpen("requests")}
          />
        </Row>

        {/* office lists tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper
            title={t("officeLists")}
            open={true}
            onToggleOpen={this.handleToggleOpen("officeLists")}
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate("allOfficesList")}
              >
                <Typography paddingLeft fontSizeS>
                  {t("allOfficesList")}
                </Typography>
              </Button>
            }
          />
        </Row>

        {/* offices need attention tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper
            title={t("needAttention")}
            open={true}
            onToggleOpen={this.handleToggleOpen("needAttention")}
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate("allUnpublish")}
              >
                <Typography paddingLeft fontSizeS>
                  {t("allUnpublish")}
                </Typography>
              </Button>
            }
          />
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(Offices));
