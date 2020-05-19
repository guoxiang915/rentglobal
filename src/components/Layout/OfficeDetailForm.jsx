import clsx from "clsx";
import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Box,
  Row,
  Column,
  Typography,
  StarIcon,
  MapPointerIcon,
  Link,
  FavoriteIcon,
  FavoriteFilledIcon,
  ShareIcon,
  Button,
  CallIcon,
  EmailIcon,
  BuildingsIcon,
} from "../../common/base-components";
import {
  TabWrapper,
  StatisticBox,
  OfficeGallery,
} from "../../common/base-layouts";
import { servicesCategories } from "../../utils/constants";
import {
  ContactInfoDialog,
  ShareOfficeDialog,
  CallConsultantDialog,
  LocationDialog,
} from "./Dialogs";
import { favoriteOffice } from "../../api/endpoints";
import { numberWithSpaces } from "../../utils/formatters";
import { withLogin } from "../../common/base-services";
import Sticky from "react-sticky";

const styleSheet = (theme) => ({
  root: {},

  detailsWrapper: {
    width: "100%",
    paddingTop: 50,
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },

  mainDetailsWrapper: {
    flexGrow: 2,
  },

  detailsTabWrapper: {
    width: "100%",
    paddingBottom: 60,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 45,
    },
  },

  infoRow: {
    width: "100%",
    alignItems: "center",
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 8,
    },
  },

  infoLabel: {
    // minWidth: 210,
    // width: "45%",
    width: 210,
    fontSize: "15px",
    lineHeight: "20px",
    minHeight: 20,
    marginBottom: 4,
    alignItems: "flex-start",
    color: theme.colors.primary.darkGrey,
  },

  infoValue: {
    // width: "54%",
    minWidth: 210,
    width: "calc(100% - 210px)",
    fontSize: "19px",
    lineHeight: "26px",
    minHeight: 26,
    marginBottom: 4,
    fontWeight: "bold",
    alignItems: "flex-start",
    color: theme.colors.primary.darkGrey,
  },

  description: {
    marginTop: 45,
  },

  statisticWrapper: {
    width: 192,
    height: 116,
  },

  servicesWrapper: {
    flexGrow: 1,
    padding: "0px 22px",
    borderLeft: `1px solid ${theme.colors.primary.borderGrey}`,
    marginLeft: 37,
    [theme.breakpoints.down("sm")]: {
      border: "none",
      borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
      padding: "42px 0px 0px",
      margin: 0,
    },
  },

  serviceCategoryWrapper: {},

  serviceCategoryBody: {
    //   paddingLeft: 60
  },

  serviceCategoryIcon: {
    width: 24,
    height: 24,
    color: theme.colors.primary.darkGrey,
    opacity: 0.15,
  },

  serviceOption: {
    paddingLeft: 40,
    paddingBottom: 14,
  },

  favoriteIcon: {
    width: 17,
    height: 16,
  },

  titleBarWrapper: {
    maxWidth: 1024,
  },

  stickyBox: {
    background: theme.colors.primary.mainColor,
    paddingTop: 8,
    paddingBottom: 24,
    zIndex: 3,
  },

  titleBar: {
    flexDirection: "row-reverse",
    position: "relative",
  },

  stickyTitleBar: {
    width: "calc(100% - 44px)",
    maxWidth: 1024,
  },
});

class OfficeDetailForm extends PureComponent {
  static propTypes = {
    /** Office info */
    office: PropTypes.object.isRequired,
    /** Auth info */
    auth: PropTypes.object,
    /** Login function */
    mappedLogin: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { dialog: null, office: this.props.office };

  /** Favorite office */
  handleSetFavorite = () => {
    if (this.props.passLoginDialog()) {
      favoriteOffice(this.props.office._id).then((response) => {
        if (response.status === 200) {
          const { office } = this.state;
          this.setState({
            office: {
              ...office,
              favorite: response.data.favorite,
            },
          });
        }
      });
    }
  };

  /** Share office */
  handleShare = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <ShareOfficeDialog
            office={this.props.office}
            onClose={this.handleCloseDialog}
          />
        ),
      });
    }
  };

  /** Call to Consultant */
  handleCall = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <CallConsultantDialog
            office={this.props.office}
            onClose={this.handleCloseDialog}
          />
        ),
      });
    }
  };

  /** Follow up office
   * @deprecated
   */
  handleFollowUp = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <ContactInfoDialog
            title={this.props.t("followUp")}
            contact={{
              username: "Name Family",
              type: "Consultant",
              phoneNumber: "(123) 123-4567",
              email: "consultantname@domainanme.com",
            }}
            onClose={this.handleCloseDialog}
          />
        ),
      });
    }
  };

  /** Send message
   * @ignore
   */
  handleSendMessage = () => {
    if (this.props.passLoginDialog()) {
    }
  };

  /** Visit office
   * @ignore
   */
  handleVisitOffice = () => {
    if (this.props.passLoginDialog()) {
    }
  };

  /** Show location dialog */
  handleShowLocationOnMap = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <LocationDialog
            location={this.props.office.location}
            description={this.props.office.description}
            onClose={this.handleCloseDialog}
          />
        ),
      });
    }
  };

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(prevProps.office) !== JSON.stringify(this.props.office)
    ) {
      this.setState({ office: this.props.office });
    }
  }

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { dialog, office } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** Show office coverPhotos */}
        <OfficeGallery coverPhotos={office.coverPhotos} />

        <Row paddingTop />
        <Sticky topOffset={20} style={{ width: "100%" }} relative>
          {({ style, isSticky }) => (
            <div
              style={{
                ...style,
                top: 95,
                left: 0,
                width: isSticky ? "100vw" : "calc(100vw - 44px)",
                maxWidth: isSticky ? "none" : 1024,
              }}
              className={clsx(isSticky && s.stickyBox)}
            >
              <Row
                paddingTopHalf
                // fullWidth
                wrap
                alignChildrenCenter
                style={{
                  left: style.left,
                }}
                classes={{
                  box: clsx(s.titleBar, isSticky && s.stickyTitleBar),
                }}
              >
                {/** Show favorite, share, follow up buttons */}
                <Column alignChildrenEnd fullWidth={isWidthDown("xs", width)}>
                  {office.published && (
                    <Row style={{ float: "right" }} paddingTopHalf>
                      <Button
                        variant={isSticky ? "primary" : null}
                        link={!isSticky ? "secondary" : null}
                        background={!isSticky ? "secondaryLight" : null}
                        onClick={this.handleSetFavorite}
                      >
                        {office.favorite ? (
                          <FavoriteFilledIcon
                            className={s.favoriteIcon}
                            style={{ opacity: 1 }}
                          />
                        ) : (
                          <FavoriteIcon className={s.favoriteIcon} />
                        )}
                        {/* <FavoriteIcon style={{ width: 16, height: 15 }} /> */}
                        {!isWidthDown("xs", width) ? (
                          <Typography paddingLeft fontSizeS fontWeightBold>
                            {t("favorite")}
                          </Typography>
                        ) : null}
                      </Button>

                      <Box paddingLeftHalf />

                      <Button
                        variant={isSticky ? "primary" : null}
                        link={!isSticky ? "secondary" : null}
                        background={!isSticky ? "secondaryLight" : null}
                        onClick={this.handleShare}
                      >
                        <ShareIcon style={{ width: 13, height: 15 }} />
                        {!isWidthDown("xs", width) ? (
                          <Typography paddingLeft fontSizeS fontWeightBold>
                            {t("share")}
                          </Typography>
                        ) : null}
                      </Button>

                      <Box paddingLeftHalf />

                      <Button
                        variant={isSticky ? "primary" : null}
                        link={!isSticky ? "secondary" : null}
                        background={!isSticky ? "secondaryLight" : null}
                        onClick={this.handleCall}
                      >
                        <CallIcon style={{ width: 15, height: 17 }} />
                        {!isWidthDown("xs", width) ? (
                          <Typography paddingLeft fontSizeS fontWeightBold>
                            {t("call")}
                          </Typography>
                        ) : null}
                      </Button>

                      <Box paddingLeftHalf />

                      <Button
                        variant={"secondary"}
                        background={isSticky ? "primary" : null}
                        style={{ borderColor: isSticky ? "white" : null }}
                        onClick={this.handleSendMessage}
                        shadow
                      >
                        {!isWidthDown("xs", width) ? (
                          t("sendMessage")
                        ) : (
                          <EmailIcon style={{ width: 13, height: 15 }} />
                        )}
                      </Button>

                      <Box paddingLeftHalf />

                      <Button
                        variant={isSticky ? "secondary" : "primary"}
                        onClick={this.handleVisitOffice}
                        shadow
                      >
                        {!isWidthDown("xs", width) ? (
                          t("visitAnOffice")
                        ) : (
                          <BuildingsIcon style={{ width: 17, height: 19 }} />
                        )}
                      </Button>
                    </Row>
                  )}
                </Column>

                {/** Show office main info (title, type, priceMonthly, rating) */}
                <Column alignChildrenStart stretch>
                  <Row paddingTopHalf fontSizeM textBlackGrey fontWeightBold>
                    {office.title}
                  </Row>
                </Column>
              </Row>
            </div>
          )}
        </Sticky>

        <Row paddingTopHalf fontSizeM textSecondary>
          {t(office.officeType)}
        </Row>
        <Row paddingTopHalf fontSizeS textPrimary>
          {t("dollarPerMonth", { dollar: office.priceMonthly || 0 })}
        </Row>
        {office.published && (
          <React.Fragment>
            {
              // office.rating &&
              <Row paddingTopHalf>
                <Typography textPrimary>
                  <StarIcon style={{ width: 12, height: 12 }} />
                </Typography>
                <Typography fontSizeS textSecondary paddingLeftHalf>
                  3.5 {/* office.rating */}
                </Typography>
              </Row>
            }
            {
              // office.refID &&
              <Row paddingTopHalf>
                <Typography fontSizeS textSecondary>
                  {t("refID")}
                  :&nbsp;
                </Typography>
                <Typography fontSizeM fontWeightBold textSecondary>
                  #{numberWithSpaces(office.refId + 1, 9)} {/* office.refID */}
                </Typography>
              </Row>
            }
          </React.Fragment>
        )}

        {/** Show office details */}
        <Row classes={{ box: s.detailsWrapper }} alignChildrenStart>
          <Column classes={{ box: s.mainDetailsWrapper }}>
            {/** Show general info */}
            <TabWrapper
              open
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
                    dollar: office.businessOtherFees || 0,
                  })}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>{t("area")}</Column>
                <Column classes={{ box: s.infoValue }}>
                  {`${office.area || 0} mxm`}
                </Column>
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
                  {office.businessHours &&
                    `${`${office.businessHours?.from} AM` || ""} - ${
                      `${office.businessHours?.to} PM` || ""
                    }`}
                  {!office.businessHours && "-"}
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
                    to='#'
                    onClick={this.handleShowLocationOnMap}
                    variant='primary'
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
              open
              insideOpen
              className={s.detailsTabWrapper}
              title={t("moreInfo")}
            >
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("typeOfContract")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {t(office.typeOfContract)}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("guaranteesAndSecurityDeposit")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {t(office.guaranteesAndSecurityDeposit)}
                </Column>
              </Row>
              <Row classes={{ box: s.infoRow }}>
                <Column classes={{ box: s.infoLabel }}>
                  {t("checkOutNotice")}
                </Column>
                <Column classes={{ box: s.infoValue }}>
                  {t(office.checkOutNotice)}
                </Column>
              </Row>
            </TabWrapper>

            {/** Show reviews */}
            {office.reviews && (
              <TabWrapper
                open
                insideOpen
                className={s.detailsTabWrapper}
                title={`${t("reviews")} (${
                  Object.keys(office.reviews).length
                })`}
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
            <Typography textSecondary fontSizeS paddingBottom>
              {t("servicesAndAmenities")}
            </Typography>
            {office.servicesAndAmenities &&
              Object.entries(office.servicesAndAmenities).map(
                ([key, options]) => {
                  const category = servicesCategories.find(
                    (item) => item.value === key
                  );
                  return category && options.length ? (
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
                        open
                        insideOpen
                        className={s.serviceCategoryWrapper}
                        bodyClass={s.serviceCategoryBody}
                      >
                        {options.map((opt, optIndex) => (
                          <React.Fragment key={optIndex}>
                            <Typography
                              classes={{ box: s.serviceOption }}
                              fontSizeS
                              textSecondary
                            >
                              {t(opt)}
                            </Typography>
                          </React.Fragment>
                        ))}
                      </TabWrapper>
                    </React.Fragment>
                  ) : null;
                }
              )}
          </Column>
        </Row>

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withLogin(withStyles(styleSheet)(withTranslation("common")(OfficeDetailForm)))
);
