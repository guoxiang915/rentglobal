import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button
} from "../../common/base-components";
import {
  TabWrapper,
  StatisticBox,
  OfficeItem
} from "../../common/base-layouts";
import Carousel from "@brainhubeu/react-carousel";

// import mock data
import { offices } from "../../common/mock/officeMockData";

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
    paddingTop: 20,
    paddingBottom: 56
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

  /**
   * Renderer function
   */
  render() {
    const { width, classes, t } = this.props;

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
          <TabWrapper title={t("requests") + " (10)"} open={true} insideOpen>
            <Row paddingTopDouble>
              <Box>
                <StatisticBox
                  title={t("followUpRequests")}
                  statistics={[{ value: 8, variant: "primary" }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t("moreInfoRequests")}
                  statistics={[{ value: 1 }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t("contactRequests")}
                  statistics={[{ value: 1 }]}
                />
              </Box>
            </Row>
          </TabWrapper>
        </Row>

        {/* office lists tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <TabWrapper
            title={t("officeLists")}
            open={true}
            insideOpen
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
          >
            <Row paddingTopDouble fullWidth>
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel
                  slidesPerPage={
                    isWidthDown("xs", width)
                      ? 1.3
                      : isWidthDown("sm", width)
                      ? 2
                      : isWidthDown("md", width)
                      ? 3
                      : 4
                  }
                  keepDirectionWhenDragging
                >
                  {offices.map((office, index) => (
                    <div style={{ position: "relative" }} key={index}>
                      <OfficeItem
                        office={office}
                        setFavorite={() => (office.favorite = !office.favorite)}
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
            title={t("needAttention")}
            open={true}
            insideOpen
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
          >
            <Row paddingTopDouble fullWidth>
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel
                  slidesPerPage={
                    isWidthDown("xs", width)
                      ? 1.3
                      : isWidthDown("sm", width)
                      ? 2
                      : isWidthDown("md", width)
                      ? 3
                      : 4
                  }
                  keepDirectionWhenDragging
                >
                  {offices
                    .filter(item => item.published === false)
                    .map((office, index) => (
                      <div style={{ position: "relative" }} key={index}>
                        <OfficeItem
                          office={office}
                          errorMsg="pending"
                          setFavorite={() =>
                            (office.favorite = !office.favorite)
                          }
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

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(Offices))
);
