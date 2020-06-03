import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import {
  Typography,
  Row,
  Column,
  Box,
  Stretch,
  Button,
  ImageIcon,
  CloseIcon,
  EditIcon
} from "../base-components";

import "./OfficeItem.scss";
import { formatHrMin, formatDate } from "../../utils/formatters";
import { getOfficeByEvent } from "../../api/endpoints";

const styleSheet = theme => ({
  officeWrapper: {
    width: 235
    // marginRight: 20,
  },

  fullWidth: {
    width: "100%"
  },

  officeCarousel: {
    width: "100%",
    height: 175,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: "relative",
    overflow: "hidden"
  },

  hoverWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
    // visibility: "hidden",
    opacity: 0,
    "&::before": {
      content: '" "',
      background: `transparent linear-gradient(0deg, ${theme.colors.primary.whiteGrey}00 0%, ${theme.colors.primary.darkGrey} 100%) 0% 0% no-repeat padding-box`,
      width: "100%",
      height: 34,
      position: "absolute",
      top: 0,
      left: 0,
      opacity: 0.3,
      zIndex: 1
    },
    "&::after": {
      content: '" "',
      background: `transparent linear-gradient(180deg, ${theme.colors.primary.whiteGrey}00 0%, ${theme.colors.primary.darkGrey} 100%) 0% 0% no-repeat padding-box`,
      width: "100%",
      height: 34,
      position: "absolute",
      bottom: 0,
      right: 0,
      opacity: 0.3,
      zIndex: 1
    },
    "&:hover": {
      opacity: 1
    }
  },

  favorite: {
    position: "absolute",
    top: 8,
    right: 16,
    zIndex: 1,
    width: 16,
    height: 16,
    cursor: "pointer"
  },

  favoriteIcon: {
    width: 17,
    height: 16,
    color: theme.colors.primary.white,
    opacity: 1
  },

  favoriteSelectedIcon: {
    fill: theme.colors.primary.errorRed
  },

  officeLocation: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 8,
    whiteSpace: "nowrap",
    overflow: "hidden",
    zIndex: 1
  },

  officeImage: {
    width: "100%",
    height: 175
  },

  officeEmptyImage: {
    background: theme.colors.primary.whiteGrey,
    color: theme.colors.primary.borderGrey,
    width: "100%",
    height: 175
  },

  carouselArrow: {
    width: 24,
    height: 24,
    position: "absolute",
    top: "calc(50% - 12px)",
    background: theme.colors.primary.white,
    boxShadow: `0px 2px 4px ${theme.colors.primary.darkGrey}1A`,
    borderRadius: "50%",
    zIndex: 1,
    opacity: 0.15,
    cursor: "pointer",
    "&:hover": {
      opacity: 1
    }
  },

  dots: {
    position: "absolute",
    left: 0,
    bottom: 25,
    width: "100%",
    zIndex: 1
  },

  dot: {
    borderRadius: "50%",
    background: theme.colors.primary.white,
    width: 7,
    height: 7,
    margin: -4
  },

  progressbar: {
    width: "100%",
    background: theme.colors.primary.borderGrey,
    marginBottom: 10
  },

  bar1Determinate: {
    color: theme.colors.primary.errorRed,
    background: theme.colors.primary.errorRed
  },

  dashedBuffer: {
    background: "none"
  }
});

/** Dot component */
const Dot = ({ classes }) => <div className={classes.dot} />;

/**
 * Function component for uploading document
 * @typeof Props
 * @property  {object} event Event information
 * @property  {function} onEdit Edit event detail
 * @property  {function} onCancel Cancel event
 */
const EventDetailItem = React.memo(
  ({
    classes: s,
    t,
    event,
    onEdit,
    onCancel,
    onClick,
    autoPlay,
    horizontal,
    fullWidth,
    className
  }) => {
    /** Changing position of carousel */
    const [pos, setPos] = useState(0);
    const [office, setOffice] = useState(null);

    React.useEffect(() => {
      getOfficeByEvent(event).then(res => {
        console.log(res);
        if (res.status === 200) {
          setOffice(res.data);
        }
      });
    }, [event]);

    const prevImage = e => {
      e.stopPropagation();
      setPos(pos === 0 ? office?.coverPhotos?.length - 1 : pos - 1);
    };

    const nextImage = e => {
      e.stopPropagation();
      setPos(pos === office?.coverPhotos?.length - 1 ? 0 : pos + 1);
    };

    /** Carousel dots */
    const dots = React.useMemo(() => {
      return (
        office?.coverPhotos?.map((content, key) => (
          <React.Fragment key={key}>
            <Dot classes={s} />
          </React.Fragment>
        )) || []
      );
    }, [office, s]);

    return (
      <Row
        classes={{
          box: clsx(s.officeWrapper, className, fullWidth && s.fullWidth)
        }}
        alignChildrenStretch
        row={!!horizontal}
        column={!horizontal}
        onClick={onClick}
      >
        <Box
          classes={{
            box: clsx(s.officeCarousel)
          }}
          style={{ width: horizontal ? 235 : "100%" }}
        >
          <div className={s.hoverWrapper}>
            {/** dots */}
            {office?.coverPhotos?.length && (
              <Box classes={{ box: s.dots }} justifyChildrenCenter>
                <Dots
                  value={pos}
                  onChange={setPos}
                  number={office?.coverPhotos?.length}
                  thumbnails={dots}
                />
              </Box>
            )}

            {/** office location */}
            <Typography
              fontSizeXS
              textWhite
              classes={{ box: s.officeLocation }}
            >
              {office?.location?.fullAddress}
            </Typography>

            {/** arrows */}
            {office?.coverPhotos?.length && (
              <Box
                classes={{ box: s.carouselArrow }}
                style={{ left: 14 }}
                onClick={prevImage}
              >
                <KeyboardArrowLeft />
              </Box>
            )}
            {office?.coverPhotos?.length && (
              <Box
                classes={{ box: s.carouselArrow }}
                style={{ right: 14 }}
                onClick={nextImage}
              >
                <KeyboardArrowRight />
              </Box>
            )}
          </div>

          {/** office images */}
          <div style={{ width: "100%", height: "100%" }}>
            {office?.coverPhotos && (
              <Carousel
                slidesPerPage={1}
                value={pos}
                infinite
                onChange={setPos}
                autoPlay={autoPlay || 7000}
                stopAutoPlayOnHover
                keepDirectionWhenDragging
              >
                {office?.coverPhotos.map((photo, index) => (
                  <React.Fragment key={index}>
                    {/* <Box fullWidth> */}
                    {photo.mobile || photo.bucketPath ? (
                      <img
                        src={
                          photo.mobile
                            ? photo.mobile.bucketPath
                            : photo.bucketPath
                        }
                        alt=""
                        className={s.officeImage}
                      />
                    ) : (
                      <Box
                        classes={{ box: s.officeEmptyImage }}
                        justifyChildrenCenter
                        alignChildrenCenter
                      >
                        <ImageIcon style={{ width: 31, height: 26 }} />
                      </Box>
                    )}
                    {/* </Box> */}
                  </React.Fragment>
                ))}
              </Carousel>
            )}
          </div>
        </Box>

        <Row
          paddingTopHalf={!horizontal}
          paddingLeft={!!horizontal}
          wrap="wrap"
          stretch
        >
          <Column stretch alignChildrenStart fullHeight justifyChildrenStart>
            {/** show event type */}
            <Row>
              <Typography fontSizeM textBlackGrey fontWeightBold>
                {event.type === "visit" ? t("visiting") : t("generalEvent")}
              </Typography>
            </Row>

            {/** show office title */}
            {office && (
              <Row paddingTopHalf>
                <Typography fontSizeM textSecondary>
                  {t(office?.title)}
                </Typography>
              </Row>
            )}

            {/** show visit time */}
            <Row paddingTopHalf>
              <Typography fontSizeXS textSecondary>
                {[formatHrMin(event.start), formatHrMin(event.end)].join(" - ")}
              </Typography>
            </Row>
          </Column>

          <Column alignChildrenEnd fullHeight>
            <Typography fontSizeXS textMediumGrey>
              {t("dateOfRequest") + ": "}
              {formatDate(event.date)}
            </Typography>
            <Stretch />
            {(onCancel || onEdit) && (
              <Row>
                {onCancel && (
                  <Button
                    link="errorRed"
                    background="errorRedLight"
                    inverse
                    onClick={onCancel}
                  >
                    <CloseIcon style={{ width: 9, height: 9 }} />
                    <Typography paddingLeft fontSizeS>
                      {t("cancel")}
                    </Typography>
                  </Button>
                )}
                {onEdit && (
                  <Button onClick={onEdit} style={{ marginLeft: 16 }}>
                    <EditIcon style={{ width: 20, height: 18 }} />
                    <Typography paddingLeft fontSizeS>
                      {t("edit")}
                    </Typography>
                  </Button>
                )}
              </Row>
            )}
          </Column>
        </Row>
      </Row>
    );
  }
);

export default withStyles(styleSheet, { name: "EventDetailItem" })(
  withTranslation("common")(EventDetailItem)
);
