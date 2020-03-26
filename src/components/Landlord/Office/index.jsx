import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button
} from "../../../common/base-components";
import {
  TabWrapper,
  StatisticBox,
  OfficeItem
} from "../../../common/base-layouts";
import Carousel from "@brainhubeu/react-carousel";

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
  }
});

class Offices extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    getOffices: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { sliderCnt: 1, offices: [] };

  /** Element Ref to get element width */
  carouselRef = React.createRef();

  /** Navigation */
  navigate = path => () => {
    this.props.navigate(path);
  };

  componentDidMount() {
    this.setState({
      sliderCnt: this.carouselRef.current.getBoundingClientRect().width / 255
    });
    this.props.getOffices().then(
      response => this.setState({ offices: response.data }),
      error => {}
    );
  }

  /** navigate to office detail page */
  handleNavigateOfficeDetail = office => () => {
    if (office.published === true) {
      this.props.navigate("landlord/offices", office._id);
    } else {
      this.props.navigate("landlord/offices", `${office._id}/edit`);
    }
  };

  /** Set favorite of office */
  handleSetFavorite = office => () => {
    // TODO: call backend api to set favorite
    office.favorite = !office.favorite;
    this.setState({});
  };

  /**
   * Renderer function
   */
  render() {
    const { classes, t } = this.props;
    const { offices, sliderCnt } = this.state;

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
          <Typography fontSizeM textSecondary>
            {t("offices")}
          </Typography>
          <Stretch />
          <Button
            variant="secondary"
            shadow
            onClick={this.navigate("offices/add")}
          >
            {t("addNewOffice")}
          </Button>
        </Row>

        {/* requests tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper title={t("requests") + " (10)"} open={true} insideOpen>
            <Row
              fullWidth
              paddingTopDouble
              classes={{ box: classes.statisticWrapper }}
            >
              <Box>
                <StatisticBox
                  title={t("followUpRequests")}
                  statistics={[{ value: 8, variant: "primary" }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t("moreInfoReq")}
                  statistics={[{ value: 1 }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t("contactReq")}
                  statistics={[{ value: 1 }]}
                />
              </Box>
            </Row>
          </TabWrapper>
        </Row>

        {/* office lists tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper
            title={
              t("officeLists") +
              " (" +
              offices.filter(item => item.published === true).length +
              ")"
            }
            open={true}
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate("offices/all")}
              >
                <Typography paddingLeft fontSizeS>
                  {t("allOfficesList")}
                </Typography>
              </Button>
            }
          >
            <Row paddingTopDouble fullWidth noOverflow>
              <div
                style={{ width: "100%", height: "100%" }}
                ref={this.carouselRef}
              >
                <Carousel slidesPerPage={sliderCnt} keepDirectionWhenDragging>
                  {offices
                    .filter(item => item.published === true)
                    .map((office, index) => (
                      <div
                        style={{ position: "relative" }}
                        key={index}
                        onClick={this.handleNavigateOfficeDetail(office)}
                      >
                        <OfficeItem
                          office={office}
                          setFavorite={this.handleSetFavorite(office)}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </Row>
          </TabWrapper>
        </Row>

        {/* offices need attention tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper
            title={
              t("needAttention") +
              " (" +
              offices.filter(item => item.published === false).length +
              ")"
            }
            open={true}
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                // TODO: Show unpublish offices
                // onClick={this.navigate("allUnpublish")}
                onClick={this.navigate("offices/all")}
              >
                <Typography paddingLeft fontSizeS>
                  {t("allUnpublish")}
                </Typography>
              </Button>
            }
          >
            <Row paddingTopDouble fullWidth noOverflow>
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel slidesPerPage={sliderCnt} keepDirectionWhenDragging>
                  {offices
                    .filter(item => item.published === false)
                    .map((office, index) => (
                      <div
                        style={{ position: "relative" }}
                        key={index}
                        onClick={this.handleNavigateOfficeDetail(office)}
                      >
                        <OfficeItem
                          office={office}
                          errorMsg="pending"
                          setFavorite={this.handleSetFavorite(office)}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </Row>
          </TabWrapper>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(Offices));
