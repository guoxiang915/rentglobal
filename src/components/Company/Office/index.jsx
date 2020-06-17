import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import {
  Row,
  Column,
  Box,
  Typography,
  Button,
  CarouselWrapper
} from "../../../common/base-components";
import {
  TabWrapper,
  StatisticBox,
  OfficeItem
} from "../../../common/base-layouts";
import { ConditionalWrapper } from "../../../utils/helpers";
import {
  getRecentViewOffices,
  getOfficesHistory,
  getFavoriteOffices,
} from "../../../api/endpoints";

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

  statisticWrapper: {
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "nowrap",
      overflowX: "auto"
    }
  },

  officesTabWrapper: {
    paddingTop: 20,
    paddingBottom: 56
  },

  carouselWrapper: {
    marginLeft: -10
  },

  addOfficeButton: {
    width: "unset",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  }
});

class Offices extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { recentViewOffices: [], officesHistory: [], favoriteOffices: [] };

  /** Navigation */
  navigate = path => () => {
    this.props.navigate(path);
  };

  /** Get landlord offices */
  componentDidMount() {
    getRecentViewOffices().then(
      response => this.setState({ recentViewOffices: response.data.docs }),
      () => {}
    );
    getOfficesHistory().then(
      response => {
        if (response.status === 200)
          this.setState({ officesHistory: response.data.docs });
      },
      () => {}
    );
    getFavoriteOffices().then(
      response => {
        if (response.status === 200)
          this.setState({ favoriteOffices: response.data.docs });
      },
      () => {}
    );
  }

  /** navigate to office detail page */
  handleNavigateOfficeDetail = (office, t) => () => {
    if (office.published === true) {
      this.props.navigate(
        "offices",
        `${office._id}/${office.location.country}/${t(office.officeType)}/${
          office.numberOfEmployees
        } ${t("employees")}/${office.refId}-${office.title}`.replace(
          /\s+/g,
          "-"
        )
      );
    } else {
      this.props.navigate("offices", `${office._id}/edit`);
    }
  };

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const { recentViewOffices, officesHistory, favoriteOffices } = this.state;

    const statistics = {
      followUpRequests: { value: 8, variant: "primary" },
      reviews: { value: 1 },
    };

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          <Grid
            container
            direction="row"
            wrap="wrap"
            justify="space-between"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              {/* title */}
              <Typography fontSizeM textSecondary>
                {t("offices")}
              </Typography>
            </Grid>
            <Grid item className={s.addOfficeButton}>
              <Button
                variant="secondary"
                shadow
                onClick={this.navigate("offices/add")}
                className={s.addOfficeButton}
              >
                {t("addNewOffice")}
              </Button>
            </Grid>
          </Grid>
        </Row>

        {/* requests tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper title={`${t("requests")} (10)`} open insideOpen>
            <Row
              fullWidth
              paddingTopDouble
              classes={{ box: s.statisticWrapper }}
            >
              <ConditionalWrapper
                condition={isWidthDown("xs", width)}
                wrapper={children => (
                  <CarouselWrapper
                    itemWidth={212}
                    itemOffset={0}
                    className={s.carouselWrapper}
                  >
                    {children}
                  </CarouselWrapper>
                )}
              >
                {Object.entries(statistics).map(([key, stat]) => (
                  <React.Fragment key={key}>
                    <Box paddingRightHalf={!isWidthDown("xs", width)}>
                      <StatisticBox title={t(key)} statistics={[stat]} />
                    </Box>
                  </React.Fragment>
                ))}
              </ConditionalWrapper>
            </Row>
          </TabWrapper>
        </Row>

        {/* Recent view offices tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper
            title={`${t("recentViewOffices")} (${recentViewOffices?.length})`}
            open
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate("/company/offices/recent-views")}
              >
                <Typography fontSizeS>{t("viewAll")}</Typography>
              </Button>
            }
          >
            <Row
              paddingTopDouble
              fullWidth
              noOverflow
              wrap={isWidthDown("xs", width)}
            >
              <ConditionalWrapper
                condition={!isWidthDown("xs", width)}
                wrapper={children => (
                  <CarouselWrapper
                    itemWidth={
                      isWidthDown("xs", width) ? "calc(100% + 20px)" : 255
                    }
                    itemOffset={0}
                    className={s.carouselWrapper}
                  >
                    {children}
                  </CarouselWrapper>
                )}
              >
                {recentViewOffices.map((office, index) => (
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      width: isWidthDown("xs", width) ? "100%" : 235,
                      height: "100%",
                      marginBottom: isWidthDown("xs", width) ? 28 : 0
                    }}
                    key={index}
                  >
                    <OfficeItem
                      office={office}
                      // errorMsg="pending"
                      setFavorite
                      onClick={this.handleNavigateOfficeDetail(office, t)}
                      fullWidth
                    />
                  </div>
                ))}
              </ConditionalWrapper>
            </Row>
          </TabWrapper>
        </Row>

        {/* offices history tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper
            title={`${t("officesHistory")} (${officesHistory?.length})`}
            open
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate("/company/offices/history")}
              >
                <Typography fontSizeS>{t("viewAll")}</Typography>
              </Button>
            }
          >
            <Row
              paddingTopDouble
              fullWidth
              noOverflow
              wrap={isWidthDown("xs", width)}
            >
              <ConditionalWrapper
                condition={!isWidthDown("xs", width)}
                wrapper={children => (
                  <CarouselWrapper
                    itemWidth={
                      isWidthDown("xs", width) ? "calc(100% + 20px)" : 255
                    }
                    itemOffset={0}
                    className={s.carouselWrapper}
                  >
                    {children}
                  </CarouselWrapper>
                )}
              >
                {officesHistory.map((office, index) => (
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      width: isWidthDown("xs", width) ? "100%" : 235,
                      height: "100%",
                      marginBottom: isWidthDown("xs", width) ? 28 : 0
                    }}
                    key={index}
                  >
                    <OfficeItem
                      office={office}
                      // errorMsg="pending"
                      setFavorite
                      onClick={this.handleNavigateOfficeDetail(office, t)}
                      fullWidth
                    />
                  </div>
                ))}
              </ConditionalWrapper>
            </Row>
          </TabWrapper>
        </Row>

        {/* recent favorite offices tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper
            title={`${t("recentFavoriteOffices")} (${favoriteOffices?.length})`}
            open
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate("/company/offices/favorite")}
              >
                <Typography fontSizeS>{t("allFavorites")}</Typography>
              </Button>
            }
          >
            <Row
              paddingTopDouble
              fullWidth
              noOverflow
              wrap={isWidthDown("xs", width)}
            >
              <ConditionalWrapper
                condition={!isWidthDown("xs", width)}
                wrapper={children => (
                  <CarouselWrapper
                    itemWidth={
                      isWidthDown("xs", width) ? "calc(100% + 20px)" : 255
                    }
                    itemOffset={0}
                    className={s.carouselWrapper}
                  >
                    {children}
                  </CarouselWrapper>
                )}
              >
                {favoriteOffices.map((office, index) => (
                  <div
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      width: isWidthDown("xs", width) ? "100%" : 235,
                      height: "100%",
                      marginBottom: isWidthDown("xs", width) ? 28 : 0
                    }}
                    key={index}
                  >
                    <OfficeItem
                      office={office}
                      // errorMsg="pending"
                      setFavorite
                      onClick={this.handleNavigateOfficeDetail(office, t)}
                      fullWidth
                    />
                  </div>
                ))}
              </ConditionalWrapper>
            </Row>
          </TabWrapper>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(Offices))
);
