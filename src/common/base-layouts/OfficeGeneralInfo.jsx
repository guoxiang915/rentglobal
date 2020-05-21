import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Box,
  Row,
  Column,
  Typography,
  MapPointerIcon,
  Link,
} from "../../common/base-components";
import { TabWrapper, StatisticBox } from "../../common/base-layouts";
import { servicesCategories } from "../../utils/constants";
import { LocationDialog } from "../../components/Layout/Dialogs";
import { withLogin } from "../../common/base-services";

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
});

class OfficeGeneralInfo extends PureComponent {
  static propTypes = {
    /** Office info */
    office: PropTypes.object.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { dialog: null };

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

  /**
   * Renderer function
   */
  render() {
    const { office, classes: s, t } = this.props;
    const { dialog } = this.state;

    return (
      <Row classes={{ box: s.detailsWrapper }} alignChildrenStart>
        <Column classes={{ box: s.mainDetailsWrapper }}>
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
            <Column classes={{ box: s.infoLabel }}>{t("businessHours")}</Column>
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
            <Column classes={{ box: s.infoLabel }}>{t("officeNumber")}</Column>
            <Column classes={{ box: s.infoValue }}>
              {office.officeNumber}
            </Column>
          </Row>
          <Row classes={{ box: s.infoRow }}>
            <Column classes={{ box: s.infoLabel }}>{t("officeFloor")}</Column>
            <Column classes={{ box: s.infoValue }}>{office.officeFloor}</Column>
          </Row>
          <Row classes={{ box: s.infoRow }}>
            <Column classes={{ box: s.infoLabel }}>{t("streetAddress")}</Column>
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

          <Typography classes={{ box: s.description }} fontSizeS textSecondary>
            {office.description}
          </Typography>

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
              title={`${t("reviews")} (${Object.keys(office.reviews).length})`}
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

        {/** Show dialog */}
        {dialog}
      </Row>
    );
  }
}

export default withLogin(
  withStyles(styleSheet)(withTranslation("common")(OfficeGeneralInfo))
);
