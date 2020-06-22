import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace, Apps, ViewList } from "@material-ui/icons";
import { Tabs, Tab, Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  Divider,
} from "../../../common/base-components";
import {
  OfficeItem,
  OfficeListItem,
  SearchbarWithSorter,
} from "../../../common/base-layouts";
import { officeSortOptions } from "../../../utils/constants";

const OFFICES_PER_PAGE = 6;

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

  searchbarWrapper: {
    paddingTop: 28,
  },

  viewModeItem: {
    width: 36,
    height: 36,
    cursor: "pointer",
  },

  officeList: {
    paddingBottom: 60,
  },

  officeItemWrapper: {
    marginTop: 32,
    marginBottom: 27,
  },

  officeWrapper: {
    position: "relative",
    cursor: "pointer",
    width: 235,
    height: 300,
    // marginTop: 32,
    [theme.breakpoints.down("xs")]: {
      width: "calc(100vw - 44px)",
    },
  },

  offices: {
    // width: 1010,
    // [theme.breakpoints.down("md")]: {
    //   width: 753
    // },
    // [theme.breakpoints.down("sm")]: {
    //   width: 502
    // },
    // [theme.breakpoints.down("xs")]: {
    //   width: "100%"
    // }
    width: "100%",
  },

  pagination: {
    marginTop: 20,
    marginBottom: 60,
    color: theme.colors.primary.grey,
  },
});

class OfficeList extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    offices: [],
    dialog: null,
    currentTab: 0,
    viewMode: "list",
    query: "",
    sorter: officeSortOptions[0],
    page: 1,
    totalLength: 0,
    loading: false,
  };

  /** Get office using props */
  searchOffices = () => {
    const params = {
      // q: this.state.query,
      // page: this.state.page,
      // limit: OFFICES_PER_PAGE
      // sortby: this.state.sorter.field,
      // sortDirection: this.state.sorter.direction
    };
    this.setState({ loading: true });
    this.props.getOffices(params).then(
      (response) => {
        if (response.status === 200) {
          this.setState({
            offices: response.data.docs,
            totalLength: response.data.total,
            loading: false,
          });
        } else if (response.status === 404) {
          this.setState({ offices: [], loading: false });
        }
      },
      (error) => {
        if (error.response.status === 404) {
          this.setState({ offices: [], totalLength: 0, loading: false });
        }
      }
    );
  };

  componentDidMount() {
    this.searchOffices();
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

  /** Change view mode */
  handleChangeViewMode = (viewMode) => () => this.setState({ viewMode });

  /** Change office sort options */
  handleFilterChange = (filter) => {
    this.setState(filter, this.searchOffices);
  };

  /** Navigate to office detail */
  handleNavigateOfficeDetail = (office, t) => () => {
    this.props.navigate(
      "offices",
      `${office.refId}/${office.location.country}/${t(office.officeType)}/${
        office.numberOfEmployees
      } ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")
    );
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, this.searchOffices);
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const {
      offices,
      currentTab,
      viewMode,
      query,
      sorter,
      page,
      totalLength,
    } = this.state;
    const leasedOffices = offices.filter((item) => !!item.leasedBy);
    const availableOffices = offices.filter((item) => !item.leasedBy);

    const filteredOffices = offices.filter(
      (item) =>
        currentTab === 0 ||
        (currentTab === 1 && !!item.leasedBy) ||
        (currentTab === 2 && !item.leasedBy)
    );

    const pageCount = Math.ceil(totalLength / OFFICES_PER_PAGE);

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

        {/** Office search bar */}
        <Row fullWidth alignChildrenCenter style={{ marginTop: 24 }}>
          {!isWidthDown("xs", width) && (
            <React.Fragment>
              <Typography
                textSecondary={viewMode === "grid"}
                textMediumGrey={viewMode !== "grid"}
              >
                <Apps
                  className={s.viewModeItem}
                  onClick={this.handleChangeViewMode("grid")}
                />
              </Typography>
              <Typography
                paddingRight
                textSecondary={viewMode === "list"}
                textMediumGrey={viewMode !== "list"}
              >
                <ViewList
                  className={s.viewModeItem}
                  onClick={this.handleChangeViewMode("list")}
                />
              </Typography>
            </React.Fragment>
          )}
          <Box stretch>
            <SearchbarWithSorter
              query={query}
              sorter={sorter}
              sortOptions={officeSortOptions}
              title={t("search")}
              onChange={this.handleFilterChange}
            />
          </Box>
        </Row>

        {/** All offices tab panel */}
        {/* <Column classes={{ box: s.officeList }} fullWidth>
          {filteredOffices.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider />}
              <Row fullWidth classes={{ box: s.officeItemWrapper }}>
                <OfficeListItem
                  office={item}
                  goDetail={this.navigate(
                    "offices",
                    `${item._id}/${item.location.country}/${t(
                      item.officeType
                    )}/${item.numberOfEmployees} ${t("employees")}/${
                      item.refId
                    }-${item.title}`.replace(/\s+/g, "-")
                  )}
                />
              </Row>
            </React.Fragment>
          ))}
        </Column> */}

        <div
          className={clsx(s.offices)}
          style={{
            minHeight: 500,
            marginBottom: 40,
          }}
        >
          <Grid
            container
            direction='row'
            // spacing={2}
            wrap='wrap'
            className={s.offices}
            justify='space-between'
          >
            {viewMode === "grid" ? (
              filteredOffices.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  style={{
                    marginTop: 32,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className={s.officeWrapper}>
                    <OfficeItem
                      office={item}
                      setFavorite
                      onClick={this.handleNavigateOfficeDetail(item, t)}
                      fullWidth
                    />
                  </div>
                </Grid>
              ))
            ) : viewMode === "list" ? (
              <Grid item xs={12}>
                <Column classes={{ box: s.officeList }} fullWidth>
                  {filteredOffices.map((item, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <Divider />}
                      <Row fullWidth classes={{ box: s.officeItemWrapper }}>
                        <OfficeListItem
                          office={item}
                          goDetail={this.navigate(
                            "offices",
                            `${item._id}/${item.location.country}/${t(
                              item.officeType
                            )}/${item.numberOfEmployees} ${t("employees")}/${
                              item.refId
                            }-${item.title}`.replace(/\s+/g, "-")
                          )}
                        />
                      </Row>
                    </React.Fragment>
                  ))}
                </Column>
              </Grid>
            ) : null}
          </Grid>
        </div>

        <div className={clsx(s.offices)}>
          <Grid container>
            <Grid item xs={12}>
              <Divider />
              <Column>
                <Pagination
                  count={pageCount}
                  size={isWidthDown("xs", width) && "small"}
                  shape='rounded'
                  classes={{ root: s.pagination }}
                  onChange={this.handleChangePage}
                  page={page}
                />
              </Column>
            </Grid>
          </Grid>
        </div>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeList))
);
