import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Tabs, Tab } from "@material-ui/core";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Box,
  Typography,
  CalendarIcon,
  CarouselWrapper
} from "../../../common/base-components";
import { TabWrapper, StatisticIconBox } from "../../../common/base-layouts";
import { ConditionalWrapper } from "../../../utils/helpers";
import CalendarOverview from "./CalendarOverview";
import CalendarSetting from "./CalendarSetting";

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: 120,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
      marginBottom: 80
    }
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
    padding: "16px 0px",
    marginRight: 28,
    [theme.breakpoints.down("xs")]: {
      marginRight: 16
    }
  },

  lightIcon: {
    color: theme.colors.primary.darkGrey,
    opacity: 0.15
  },

  tabWrapper: {
    paddingTop: 28
  },

  statisticBoxWrapper: {},

  statisticBox: {
    marginBottom: 10,
    padding: 0,
    paddingRight: 8,
    "&:last-of-type": {
      paddingRight: 0
    }
  }
});

class Calendar extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  statistics = [
    {
      title: "visitRequests",
      value: 4,
      icon: CalendarIcon,
      onClick: () => this.props.navigate("visit-requests")
    },
    {
      title: "personalEvents",
      value: 7,
      icon: CalendarIcon
    },
    {
      title: "acceptedVisitRequests",
      value: 18,
      icon: CalendarIcon
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      currentTab: "overview"
    };
  }

  handleChangeTab = (e, currentTab) => this.setState({ currentTab });

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const { currentTab } = this.state;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/** title */}
        <Row fullWidth style={{ marginBottom: 45 }} alignChildrenStart>
          <Typography fontSizeM textSecondary>
            {t("calendar")}
          </Typography>
        </Row>

        {/** show statistics */}
        <Row
          classes={{ box: s.statisticBoxWrapper }}
          wrap
          fullWidth
          style={{ marginBottom: 42 }}
        >
          <ConditionalWrapper
            condition={isWidthDown("sm", width)}
            wrapper={children => (
              <TabWrapper
                open
                insideOpen
                title={t("stat")}
                bodyClass={s.tabWrapper}
              >
                <CarouselWrapper itemWidth={200} itemOffset={0}>
                  {children}
                </CarouselWrapper>
              </TabWrapper>
            )}
          >
            {this.statistics.map((stat, index) => (
              <React.Fragment key={index}>
                <Box classes={{ box: s.statisticBox }}>
                  <StatisticIconBox
                    icon={
                      <stat.icon
                        className={s.lightIcon}
                        style={{ width: 14, height: 13 }}
                      />
                    }
                    title={t(stat.title)}
                    statistics={[{ value: stat.value, variant: "primary" }]}
                    onClick={stat.onClick}
                  />
                </Box>
              </React.Fragment>
            ))}
          </ConditionalWrapper>
        </Row>

        <Row fullWidth style={{ marginBottom: 24 }}>
          {/** Tabs */}
          <Tabs
            value={currentTab}
            onChange={this.handleChangeTab}
            aria-label="wrapped label tabs"
            indicatorColor="primary"
            textColor="primary"
            classes={{ root: s.tabs, indicator: s.indicator }}
          >
            <Tab
              value={"overview"}
              label={
                <Row>
                  <CalendarIcon style={{ width: 18, height: 16 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("calendarOverview")}
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
            <Tab
              value={"setting"}
              label={
                <Row>
                  <CalendarIcon style={{ width: 18, height: 16 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("calendarSetting")}
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
          </Tabs>
        </Row>

        <Row fullWidth paddingBottom>
          {currentTab === "overview" && (
            <CalendarOverview navigate={this.props.navigate} />
          )}
          {currentTab === "setting" && (
            <CalendarSetting navigate={this.props.navigate} />
          )}
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(Calendar)))
);
