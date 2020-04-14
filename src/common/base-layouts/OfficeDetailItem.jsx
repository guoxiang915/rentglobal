import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Row,
  Column,
  Box,
  StarIcon,
  UsersIcon,
} from "../base-components";
import Carousel from "@brainhubeu/react-carousel";

const styleSheet = (theme) => ({
  officeWrapper: {
    width: "100%",
  },

  officeCarousel: {
    width: 210,
    height: 110,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  officeImage: {
    width: 210,
    height: 110,
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  officeGeneralInfo: {
    paddingLeft: 0,
    paddingTop: 16,
    width: "100%",
  },

  tipOverWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 44,
    zIndex: 1,
  },

  primaryTipOver: {
    width: 36,
    height: 36,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    marginLeft: 10,
    position: "relative",
    "&::after": {
      content: "' '",
      position: "absolute",
      bottom: -8,
      width: "100%",
      borderTop: `8px solid ${theme.colors.primary.mainColor}`,
      borderLeft: `18px solid transparent`,
      borderRight: `18px solid transparent`,
      borderBottom: "none",
    },
  },

  errorRedTipOver: {
    width: 36,
    height: 36,
    color: theme.colors.primary.white,
    background: theme.colors.primary.errorRed,
    marginLeft: 6,
    position: "relative",
    "&::after": {
      content: "' '",
      position: "absolute",
      bottom: -8,
      width: "100%",
      borderTop: `8px solid ${theme.colors.primary.errorRed}`,
      borderLeft: `18px solid transparent`,
      borderRight: `18px solid transparent`,
      borderBottom: "none",
    },
  },
});

/**
 * Function component for showing office detail on map
 * @typeof Props
 * @property  {object} office Office information
 * @property  {number} autoPlay Duration of autoplay for carousel (default: 4000)
 */
const OfficeDetailItem = ({ classes: s, t, autoPlay, office }) => {
  return (
    <Column classes={{ box: s.officeWrapper }} alignChildrenStretch>
      <Box classes={{ box: s.officeCarousel }}>
        {/** office images */}
        <div style={{ width: "100%", height: "100%" }}>
          {office.coverPhotos && (
            <Carousel
              slidesPerPage={1}
              infinite
              autoPlay={autoPlay || 7000}
              stopAutoPlayOnHover
              keepDirectionWhenDragging
            >
              {office.coverPhotos.map((photo, index) => (
                <React.Fragment key={index}>
                  <img
                    src={photo.mobile ? photo.mobile.bucketPath : photo.bucketPath}
                    alt=""
                    className={s.officeImage}
                  />
                </React.Fragment>
              ))}
            </Carousel>
          )}
        </div>

        {/** show mark for leased, overdue payment office */}
        {office.leasedBy && (
          <Row classes={{ box: s.tipOverWrapper }} alignChildrenStart>
            <Box
              classes={{ box: s.primaryTipOver }}
              alignChildrenCenter
              justifyChildrenCenter
            >
              <UsersIcon style={{ width: 19, height: 17 }} />
            </Box>
            {office.leasedBy.overduePayment && (
              <Box
                classes={{ box: s.errorRedTipOver }}
                alignChildrenCenter
                justifyChildrenCenter
              >
                !
              </Box>
            )}
          </Row>
        )}
      </Box>

      {/** show office general info */}
      <Column alignChildrenStart paddingTop fullWidth>
        {/** office title */}
        <Box>
          <Typography fontSizeM textBlackGrey fontWeightBold>
            {office.title}
          </Typography>
        </Box>

        {/** show office property */}
        <Row paddingTopHalf>
          <Typography fontSizeM textSecondary>
            {t(office.officeType)}
          </Typography>
        </Row>

        {/** show office price */}
        <Row paddingTopHalf>
          <Typography fontSizeS textPrimary>
            {t("dollarPerMonth", { dollar: office.priceMonthly || 0 })}
          </Typography>
        </Row>

        {/** show office ratings */}
        {office.approved && (
          // office.rating &&
          <Row paddingTopHalf>
            <Typography textPrimary>
              <StarIcon style={{ width: 12, height: 12 }} />
            </Typography>
            <Typography fontSizeS textMediumGrey paddingLeftHalf>
              3.5 {/* office.rating */}
            </Typography>
          </Row>
        )}
      </Column>
    </Column>
  );
};

export default withStyles(styleSheet, { name: "OfficeDetailItem" })(
  withTranslation("common")(OfficeDetailItem)
);
