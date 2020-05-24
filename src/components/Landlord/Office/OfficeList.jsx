import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace } from "@material-ui/icons";
import { Tabs, Tab } from "@material-ui/core";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  Divider,
} from "../../../common/base-components";
import { OfficeListItem } from "../../../common/base-layouts";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  addButton: {
    width: "100%",
    marginTop: 25,
  },

  tabs: {
    marginTop: 12,
    width: "100%",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  indicator: {
    borderRadius: 2,
    height: 4,
  },

  tab: {
    textTransform: "none",
    minWidth: 0,
    padding: "25px 0px",
    marginRight: 70,
    [theme.breakpoints.down("xs")]: {
      marginRight: 30,
    },
  },

  officeList: {
    paddingTop: 28,
    paddingBottom: 60,
  },

  officeItemWrapper: {
    marginTop: 30,
    marginBottom: 27,
  },
});

class OfficeList extends PureComponent {
  static propTypes = {
    getOffices: PropTypes.func.isRequired,
    navigate: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { offices: [], dialog: null, currentTab: 0 };

  /** Get office from id */
  componentDidMount() {
    this.props.getOffices().then(
      (response) => this.setState({ offices: response.data.docs }),
      () => {}
    );
  }

  /** Navigation function */
  navigate = (path, payload) => () => {
    this.props.navigate(path, payload);
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate("offices");
  };

  /** Change tab value */
  handleChangeTab = (e, currentTab) => {
    this.setState({ currentTab });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { offices, currentTab } = this.state;
    const leasedOffices = offices.filter((item) => !!item.leasedBy);
    const availableOffices = offices.filter((item) => !item.leasedBy);

    const filteredOffices = offices.filter(
      (item) =>
        currentTab === 0 ||
        (currentTab === 1 && !!item.leasedBy) ||
        (currentTab === 2 && !item.leasedBy)
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
            link='secondary'
            background='secondaryLight'
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
          <Box paddingLeftHalf />
          <Button
            variant='secondary'
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
          aria-label='wrapped label tabs'
          indicatorColor='primary'
          textColor='primary'
          classes={{ root: s.tabs, indicator: s.indicator }}
        >
          <Tab
            value={0}
            label={`${t("allOfficesList")} (${offices.length})`}
            classes={{ root: s.tab }}
          />
          <Tab
            value={1}
            label={`${t("leased")} (${leasedOffices.length})`}
            classes={{ root: s.tab }}
          />
          <Tab
            value={2}
            label={`${t("available")} (${availableOffices.length})`}
            classes={{ root: s.tab }}
          />
        </Tabs>

        {/** All offices tab panel */}
        <Column classes={{ box: s.officeList }} fullWidth>
          {filteredOffices.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider />}
              <Row fullWidth classes={{ box: s.officeItemWrapper }}>
                <OfficeListItem
                  office={item}
                  goDetail={this.navigate(
                    "offices",
                    `${item._id}/${item.location.country}/${item.officeType}/${item.numberOfEmployees} postes/${item.refId}-${item.title}`
                  )}
                />
              </Row>
            </React.Fragment>
          ))}
        </Column>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeList))
);
