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
  Divider
} from "../../../common/base-components";
import { OfficeListItem } from "../../../common/base-layouts";
import { KeyboardBackspace } from "@material-ui/icons";
import { Tabs, Tab } from "@material-ui/core";
import { getOfficeStatus } from "../../../utils/validators";

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27
    }
  },

  addButton: {
    width: "100%",
    marginTop: 25
  },

  tabs: {
    marginTop: 12,
    width: "100%",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  indicator: {
    borderRadius: 2,
    height: 4
  },

  tab: {
    textTransform: "none",
    minWidth: 0,
    padding: "25px 0px",
    marginRight: 70,
    [theme.breakpoints.down("xs")]: {
      marginRight: 30
    }
  },

  officeList: {
    paddingTop: 28,
    paddingBottom: 60
  }
});

class UnpublishedOfficeList extends Component {
  static propTypes = {
    getOffices: PropTypes.func.isRequired,
    navigate: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    offices: [],
    pendingOffices: [],
    incompleteOffices: [],
    unpublishedOffices: [],
    dialog: null,
    currentTab: 0
  };

  /** Get office from id */
  componentDidMount() {
    this.props.getOffices().then(
      response =>
        this.setState({
          offices: response.data,
          pendingOffices: response.data.filter(
            office => getOfficeStatus(office).status === "pendingForApprove"
          ),
          incompleteOffices: response.data.filter(
            office => getOfficeStatus(office).status === "incomplete"
          ),
          unpublishedOffices: response.data.filter(
            office => getOfficeStatus(office).status === "unpublish"
          )
        }),
      error => {}
    );
  }

  /** Navigation function */
  navigate = path => () => {
    this.props.navigate(path);
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate("back");
  };

  /** Change tab value */
  handleChangeTab = (e, currentTab) => {
    console.log(currentTab);
    this.setState({ currentTab });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const {
      offices,
      pendingOffices,
      incompleteOffices,
      unpublishedOffices,
      currentTab
    } = this.state;

    const officeTabs = [
      { name: "allUnpublish", value: offices },
      { name: "pending", value: pendingOffices },
      { name: "incomplete", value: incompleteOffices },
      { name: "unpublish", value: unpublishedOffices }
    ];

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
            className={clsx(isWidthDown("xs", width) && s.addButton)}
          >
            {t("addNewOffice")}
          </Button>
        </Row>

        {/** Tabs */}
        <Tabs
          value={currentTab}
          onChange={this.handleChangeTab}
          aria-label="wrapped label tabs"
          indicatorColor="primary"
          textColor="primary"
          classes={{ root: s.tabs, indicator: s.indicator }}
        >
          {officeTabs.map((tab, index) => (
            <Tab
              value={index}
              key={index}
              label={t(tab.name) + " (" + tab.value.length + ")"}
              classes={{ root: s.tab }}
            />
          ))}
        </Tabs>

        {/** All offices tab panel */}
        <Column classes={{ box: s.officeList }} fullWidth>
          {officeTabs[currentTab].value.map((item, index) => (
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
  withStyles(styleSheet)(withTranslation("common")(UnpublishedOfficeList))
);
