import React from "react";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Row,
  Column,
  Stretch,
  Box,
  StarIcon,
  HeadsetIcon,
  CalendarIcon,
  UsersIcon,
  Button,
  LinearProgress
} from "../base-components";
import { ContactInfoDialog } from "../../components/Layout/Dialogs";
import Carousel from "@brainhubeu/react-carousel";
import { formatDate } from "../../utils/formatters";
import { getOfficeStatus } from "../../utils/validators";

const styleSheet = theme => ({
  officeWrapper: {
    width: "100%",
    marginTop: 30,
    marginBottom: 27
  },

  officeCarousel: {
    width: 235,
    height: 175,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: "relative",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  officeImage: {
    width: 235,
    height: 175,
    objectFit: "cover",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  officeGeneralInfo: {
    paddingLeft: 27,
    paddingTop: 0,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingTop: 16
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },

  officeLeaseInfo: {
    [theme.breakpoints.down("sm")]: {
      paddingTop: 16
    }
  },

  tipOverWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 44,
    zIndex: 1
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
      borderBottom: "none"
    }
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
      borderBottom: "none"
    }
  },

  progressbar: {
    width: 200,
    marginTop: 20,
    marginBottom: 10
  }
});

/**
 * Function component for uploading document
 * @typeof Props
 * @property  {object} office Office information
 * @property  {number} autoPlay Duration of autoplay for carousel (default: 4000)
 */
const OfficeListItem = ({ classes: s, t, autoPlay, office }) => {
  const [dialog, setDialog] = React.useState(null);
  const handleCloseDialog = () => {
    setDialog(null);
  };
  const handleContactInfo = e => {
    e.stopPropagation();
    setDialog(
      <ContactInfoDialog
        title={t("contactInfo")}
        contact={{
          username: "Name Family",
          type: "Consultant",
          phoneNumber: "(123) 123-4567",
          email: "consultantname@domainanme.com"
        }}
        onClose={handleCloseDialog}
      />
    );
  };
  const handleListen = e => {
    e.stopPropagation();
  };
  const handleCalendar = e => {
    e.stopPropagation();
  };

  const officeStatus = getOfficeStatus(office);
  let status = officeStatus ? officeStatus.status : null;
  status =
    status === "rejected"
      ? "rejectedByConsultant"
      : status === "pendingForApprove"
      ? "pendingForApprove"
      : status === "unpublished"
      ? "unpublish"
      : status === "incomplete"
      ? "mustCompleteData"
      : null;
  const progress =
    officeStatus && officeStatus.progress < 100 ? officeStatus.progress : null;

  return (
    <Row classes={{ box: s.officeWrapper }} wrap alignChildrenStretch>
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
                  {/* <Box fullWidth> */}
                  <img
                    src={photo.bucketPath}
                    alt=""
                    className={s.officeImage}
                  />
                  {/* </Box> */}
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
      <Column classes={{ box: s.officeGeneralInfo }} alignChildrenStart>
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

        {/** show office action buttons */}
        <Stretch />
        <Row paddingTopHalf alignChildrenStart>
          {/** Show microphone button */}
          <Button
            link="normalLight"
            background="normalLight"
            inverse
            onClick={handleListen}
            variant="icon"
          >
            <HeadsetIcon style={{ width: 19, height: 19 }} />
          </Button>
          <Box paddingLeftHalf />

          {/** Show calendar button */}
          {office.approved && (
            <Button
              link="normalLight"
              background="normalLight"
              inverse
              onClick={handleCalendar}
              variant="icon"
            >
              <CalendarIcon style={{ width: 19, height: 19 }} />
            </Button>
          )}
        </Row>
      </Column>

      {/** office more information */}
      <Stretch style={{ minWidth: 1 }} />
      <Column classes={{ box: s.officeLeaseInfo }} alignChildrenEnd>
        {/** last updated date */}
        <Typography textMediumGrey fontSizeXS style={{ lineHeight: "26px" }}>
          {t("lastUpdate")}: {formatDate(office.updatedAt)}
        </Typography>

        {/** leased by */}
        {office.approved ? (
          !office.leasedBy ? (
            <Typography
              textPrimary
              fontSizeS
              paddingTopHalf
              style={{ lineHeight: "26px" }}
            >
              {t("available")}
            </Typography>
          ) : (
            <>
              <Row paddingTopHalf style={{ lineHeight: "26px" }}>
                <Typography textMediumGrey fontSizeS>
                  {t("leasedBy")}:&nbsp;
                </Typography>
                <Typography textSecondary fontSizeS>
                  {office.leasedBy.name}
                </Typography>
                <Typography textMediumGrey fontSizeS>
                  &nbsp;({formatDate(office.leasedBy.date)})
                </Typography>
              </Row>

              {/** overdue payment */}
              {office.leasedBy.overduePayment && (
                <Typography
                  paddingTopHalf
                  fontSizeS
                  textErrorRed
                  style={{ lineHeight: "26px" }}
                >
                  {t("overduePayment")}
                </Typography>
              )}
            </>
          )
        ) : (
          <>
            {status && (
              <Typography
                textErrorRed
                fontSizeS
                paddingTopHalf
                style={{ lineHeight: "26px" }}
              >
                {t(status)}
              </Typography>
            )}
            {progress && (
              <LinearProgress
                styles={{ root: s.progressbar }}
                value={progress}
              />
            )}
          </>
        )}

        {/** contact info */}
        <Stretch />
        <Box paddingTopHalf />
        <Button variant="secondary" onClick={handleContactInfo} shadow>
          {t("contactInfo")}
        </Button>
      </Column>

      {/** show dialog */}
      {dialog}
    </Row>
  );
};

export default withStyles(styleSheet, { name: "OfficeListItem" })(
  withTranslation("common")(OfficeListItem)
);
