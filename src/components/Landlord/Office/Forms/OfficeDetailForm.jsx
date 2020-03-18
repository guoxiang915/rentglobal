import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Box,
  Row,
  Column,
  Typography,
  ArrowUpIcon,
  ArrowDownIcon,
  StarIcon,
  MapPointerIcon,
  Link
} from "../../../../common/base-components";
import { TabWrapper, StatisticBox } from "../../../../common/base-layouts";
import { servicesCategories } from "../../../../utils/constants";
import Carousel from "@brainhubeu/react-carousel";

const styleSheet = theme => ({
  root: {},

  imageWrapper: {
    width: "calc(100% - 188px)",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },

  coverPhotoWrapper: {
    width: "100%",
    position: "relative",
    paddingTop: "50%",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    borderRadius: 8
  },

  coverPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "hidden",
    borderRadius: 8
  },

  coverPhotoContent: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8
  },

  imageNavWrapper: {
    width: 178,
    marginLeft: 10,
    top: 0,
    bottom: 0,
    right: 0
  },

  imageNavButton: {
    width: 24,
    height: 14
  },

  imageNav: {
    width: "100%",
    height: "calc(100% - 50px)",
    margin: "10px 5px",
    overflow: "hidden",
    position: "relative"
  },

  imageNavList: {
    position: "absolute"
  },

  coverPhotoNav: {
    width: 168,
    height: 126,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    borderRadius: 8,
    marginBottom: 15
  },

  detailsWrapper: {
    width: "100%",
    paddingTop: 50,
    flexWrap: "wrap"
  },

  mainDetailsWrapper: {
    flexGrow: 2
  },

  detailsTabWrapper: {
    width: "100%",
    paddingBottom: 60,
    [theme.breakpoints.down("xs")]: {
      paddingBottom: 45
    }
  },

  infoRow: {
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 8
    }
  },

  infoLabel: {
    minWidth: 210,
    width: "45%",
    fontSize: "15px",
    lineHeight: "20px",
    minHeight: 20,
    marginBottom: 4,
    alignItems: "flex-start",
    color: theme.colors.primary.darkGrey
  },

  infoValue: {
    width: "54%",
    fontSize: "19px",
    lineHeight: "26px",
    minHeight: 26,
    marginBottom: 4,
    fontWeight: "bold",
    alignItems: "flex-start",
    color: theme.colors.primary.darkGrey
  },

  description: {},

  statisticWrapper: {
    width: 192,
    height: 116
  },

  servicesWrapper: {
    flexGrow: 1,
    padding: "0px 22px",
    borderLeft: `1px solid ${theme.colors.primary.borderGrey}`,
    marginLeft: 37,
    [theme.breakpoints.down("xs")]: {
      border: "none",
      borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
      padding: "42px 0px 0px",
      margin: 0
    }
  },

  serviceCategoryWrapper: {
    marginTop: 23
  },

  serviceCategoryBody: {
    //   paddingLeft: 60
  },

  serviceCategoryIcon: {
    width: 24,
    height: 24,
    color: theme.colors.primary.borderGrey
  },

  serviceOption: {
    paddingLeft: 40
  }
});

class OfficeDetailForm extends Component {
  static propTypes = {
    office: PropTypes.object.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { currentPhoto: 0 };

  /** Prev/Next current photo */
  handlePrevPhoto = () => {
    this.setState({ currentPhoto: Math.max(this.state.currentPhoto - 1, 0) });
  };

  handleNextPhoto = () => {
    this.setState({
      currentPhoto: Math.min(
        this.state.currentPhoto + 1,
        this.props.office.coverPhotos.length - 1
      )
    });
  };

  /**
   * Renderer function
   */
  render() {
    const { office, classes: s, t, width } = this.props;
    const { currentPhoto } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** Show office coverPhotos */}
        {isWidthDown("xs", width) ? (
          <div className={s.imageWrapper}>
            <Carousel slidesPerPage={1.2} keepDirectionWhenDragging>
              {office.coverPhotos &&
                office.coverPhotos.map(photo => (
                  <div className={s.coverPhotoWrapper}>
                    <div className={s.coverPhoto}>
                      <img
                        src={photo.bucketPath}
                        className={s.coverPhotoContent}
                        alt=""
                      />
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
        ) : (
          <Row fullWidth relative>
            <Box classes={{ box: s.imageWrapper }}>
              <div className={s.coverPhotoWrapper}>
                <div className={s.coverPhoto}>
                  <img
                    src={
                      office.coverPhotos &&
                      office.coverPhotos.length !== 0 &&
                      office.coverPhotos[currentPhoto].bucketPath
                    }
                    className={s.coverPhotoContent}
                    alt=""
                  />
                </div>
              </div>
            </Box>
            <Column absolute classes={{ box: s.imageNavWrapper }}>
              <Link
                to="#"
                variant="normalLight"
                onClick={this.handlePrevPhoto}
                disabled={currentPhoto <= 0}
              >
                <ArrowUpIcon className={s.imageNavButton} />
              </Link>
              <Box classes={{ box: s.imageNav }}>
                <Column
                  style={{ top: -currentPhoto * 140 }}
                  classes={{ box: s.imageNavList }}
                >
                  {office.coverPhotos &&
                    office.coverPhotos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo.bucketPath}
                        className={s.coverPhotoNav}
                        alt=""
                      />
                    ))}
                </Column>
              </Box>
              <Link
                to="#"
                variant="normalLight"
                onClick={this.handleNextPhoto}
                disabled={currentPhoto <= 0}
              >
                <ArrowDownIcon className={s.imageNavButton} />
              </Link>
            </Column>
          </Row>
        )}

        <Row paddingTop />

        {/** Show office main info (title, type, priceMonthly, rating) */}
        <Row paddingTopHalf fontSizeM textBlackGrey fontWeightBold>
          {office.title}
        </Row>
        <Row paddingTopHalf fontSizeM textSecondary>
          {t(office.officeType)}
        </Row>
        <Row paddingTopHalf fontSizeS textPrimary>
          {t("dollarPerMonth", { dollar: office.priceMonthly })}
        </Row>
        {office.rating && (
          <Row paddingTopHalf>
            <Typography textPrimary>
              <StarIcon style={{ width: 12, height: 12 }} />
            </Typography>
            <Typography fontSizeS textMediumGrey paddingLeftHalf>
              {office.rating}
            </Typography>
          </Row>
        )}

        {/** Show office details */}
        <Row classes={{ box: s.detailsWrapper }} alignChildrenStart>
          <Column classes={{ box: s.mainDetailsWrapper }}>
            {/** Show general info */}
            <TabWrapper
              open={true}
              insideOpen
              className={s.detailsTabWrapper}
              title={t("generalInfo")}
            >
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("businessOtherFees")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {t("dollarPerMonth", {
                    dollar: office.businessOtherFees || 0
                  })}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("area")}</Column>
                <Column classes={{ box: s.infoValue }}>{`${office.area ||
                  0} mxm`}</Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("rooms")}</Column>
                <Column classes={{ box: s.infoValue }}>{office.rooms}</Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("numberOfEmployees")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.numberOfEmployees}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("businessHours")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {`${office.businessHoursFrom ||
                    ""} - ${office.businessHoursTo || ""}`}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("24HourAccessibility")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.fullTimeAccessibility}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("spokenLanguage")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.spokenLanguages && office.spokenLanguages.join(" / ")}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("leaseDurationPerMonths")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.leaseDurationPerMonths}
                </Column>
              </Row>

              <Row classes={{ box: s.infoRow }} />

              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("officeNumber")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.officeNumber}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("officeFloor")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.officeFloor}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("streetAddress")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.location && office.location.streetName}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("city")}</Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.location && office.location.city}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("state")}</Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.location && office.location.state}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("zipCode")}</Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.location && office.location.zipCode}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("country")}</Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.location && office.location.country}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("location")}</Column>
                <Row classes={{ box: s.infoValue }} paddingTopHalf>
                  <Link
                    to=""
                    onClick={this.handleShowLocationOnMap}
                    variant="primary"
                  >
                    <Typography fontSizeS>
                      <MapPointerIcon style={{ width: 15, height: 20 }} />
                      <Box paddingLeft />
                      {t("showOnMap")}
                    </Typography>
                  </Link>
                </Row>
              </Row>

              <Row classes={{ box: s.infoRow }} />

              <Typography
                classes={{ box: s.description }}
                fontSizeS
                textSecondary
              >
                {office.description}
              </Typography>
            </TabWrapper>

            {/** Show more info */}
            <TabWrapper
              open={true}
              insideOpen
              className={s.detailsTabWrapper}
              title={t("moreInfo")}
            >
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("typeOfContract")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.contractType}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("guaranteesOrSecurityDeposit")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.guarantees}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("checkOutNotice")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {office.checkOutNotice}
                </Column>
              </Row>
            </TabWrapper>

            {/** Show reviews */}
            {office.reviews && (
              <TabWrapper
                open={true}
                insideOpen
                className={s.detailsTabWrapper}
                title={
                  t("reviews") + " (" + Object.keys(office.reviews).length + ")"
                }
              >
                <Row
                  fullWidth
                  paddingTopDouble
                  classes={{ box: s.statisticWrapper }}
                >
                  {Object.entries(office.reviews, ([key, value]) => (
                    <Box paddingRightHalf>
                      <StatisticBox title={t(key)} statistics={[{ value }]} />
                    </Box>
                  ))}
                </Row>
              </TabWrapper>
            )}
          </Column>

          <Column classes={{ box: s.servicesWrapper }} alignChildrenStart>
            {/** Show services & amenities */}
            <Typography textSecondary fontSizeS>
              {t("servicesAndAmenities")}
            </Typography>
            {office.servicesAndAmenities &&
              Object.entries(office.servicesAndAmenities).map(
                ([key, options]) => {
                  const category = servicesCategories.find(
                    item => item.value === key
                  );
                  return (
                    <React.Fragment key={key}>
                      <TabWrapper
                        title={
                          <Typography
                            alignChildrenCenter
                            fontSizeS
                            textMediumGrey
                          >
                            <category.icon className={s.serviceCategoryIcon} />
                            <Typography paddingLeft>
                              {t(category.name)}
                            </Typography>
                          </Typography>
                        }
                        open={true}
                        insideOpen
                        className={s.serviceCategoryWrapper}
                        bodyClass={s.serviceCategoryBody}
                      >
                        {options.map((opt, optIndex) => (
                          <React.Fragment key={optIndex}>
                            <Typography
                              classes={{ box: s.serviceOption }}
                              fontSizeM
                              fontWeightBold
                              textSecondary
                              paddingBottomHalf
                            >
                              {t(opt)}
                            </Typography>
                          </React.Fragment>
                        ))}
                      </TabWrapper>
                    </React.Fragment>
                  );
                }
              )}
          </Column>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeDetailForm))
);
