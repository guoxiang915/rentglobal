import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  EyeDisIcon,
  DeleteIcon,
  EditIcon
} from "../../../common/base-components";
import { KeyboardBackspace } from "@material-ui/icons";
import { OfficeDetailForm } from "./Forms";
import { Tabs } from "@material-ui/core";

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
  }
});

class OfficeDetail extends Component {
  static propTypes = {
    getOffices: PropTypes.func.isRequired,
    navigate: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { offices: [], dialog: null, currentTab: 0 };

  /** Get office from id */
  componentDidMount() {
    this.props.getOffices().then(
      response => this.setState({ offices: response.data }),
      error => {}
    );
  }

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate("back");
  };

  /** Change tab value */
  handleChangeTab = currentTab => {
    this.setState({ currentTab });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { offices, currentTab } = this.state;
    const leasedOffices = offices.filter(item => item.status === "leased");
    const availableOffices = offices.filter(item => item.status !== "leased");

    const filteredOffices = offices.filter(
      item =>
        currentTab === 0 ||
        (currentTab === 1 && item.status === "leased") ||
        (currentTab === 2 && item.status !== "leased")
    );

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom wrap>
          {/** title */}
          <Typography fontSizeM textSecondary>
            {t("offices")}
          </Typography>
          <Stretch />
          <Button
            link="secondary"
            background="secondaryLight"
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
          <Box paddingLeftHalf />
          <Button
            variant="secondary"
            shadow
            onClick={this.navigate("offices/add")}
            className={clsx(isWidthDown("xs", width) && s.fullWidth)}
          >
            {t("addNewOffice")}
          </Button>
        </Row>

        {/** Tabs */}
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          aria-label="wrapped label tabs"
          indicatorColor="primary"
          textColor="primary"
          className={s.tabs}
        >
          <Tab
            value={0}
            label={t("allOfficesList") + " (" + offices.length + ")"}
          />
          <Tab
            value={1}
            label={t("leased") + " (" + leasedOffices.length + ")"}
          />
          <Tab
            value={2}
            label={t("available") + " (" + availableOffices.length + ")"}
          />
        </Tabs>

        {/** All offices tab panel */}
        <Column classes={{ box: s.officeList }}>
          {filteredOffices.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider />}
              <Row fullWidth classes={{ box: s.officeItemWrapper }}>
                <OfficeListItem office={item} />
              </Row>
            </React.Fragment>
          ))}
        </Column>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeDetail))
);
