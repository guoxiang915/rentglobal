import React, { useState } from "react";
import { LinearProgress, withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import { withLogin } from "../base-services";
import {
  Typography,
  Row,
  Column,
  Box,
  StarIcon,
  ImageIcon,
  FavoriteFilledIcon,
  FavoriteIcon
} from "../base-components";
import { getOfficeStatus } from "../../utils/validators";
import { favoriteOffice } from "../../api/endpoints";

import "./OfficeItem.scss";

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
 * @property  {object} office Office information
 * @property  {function} setFavorite Event handler for set favorite office
 * @property  {number} autoPlay Duration of autoplay for carousel (default: 4000)
 * @property  {bool} horizontal Show item horizontally or not (default: false)
 * @property  {object}  auth Authentication state
 */
const OfficeItem = React.memo(
  ({
    classes: s,
    t,
    office,
    setFavorite,
    // errorMsg,
    autoPlay,
    horizontal,
    passLoginDialog,
    onClick,
    fullWidth,
    className
  }) => {
    /** Changing position of carousel */
    const [, setState] = useState();
    const [pos, setPos] = useState(0);

    const prevImage = e => {
      e.stopPropagation();
      setPos(pos === 0 ? office.coverPhotos.length - 1 : pos - 1);
    };

    const nextImage = e => {
      e.stopPropagation();
      setPos(pos === office.coverPhotos.length - 1 ? 0 : pos + 1);
    };

    const handleSetFavorite = e => {
      e.stopPropagation();
      if (passLoginDialog()) {
        favoriteOffice(office._id).then(response => {
          if (response.status === 200) {
            office.favorite = response.data.favorite;
            setState({});
          }
        });
      }
    };

    /** Carousel dots */
    const dots = React.useMemo(() => {
      return office.coverPhotos
        ? office.coverPhotos.map((content, key) => (
            <React.Fragment key={key}>
              <Dot classes={s} />
            </React.Fragment>
          ))
        : [];
    }, [office, s]);

    /** Get status of office */
    const officeStatus = getOfficeStatus(office);
    let status = officeStatus ? officeStatus.status : null;
    status =
      status === "approved"
        ? null
        : status === "rejected"
        ? "rejectedByConsultant"
        : status === "unpublished"
        ? "unpublished"
        : status === "incomplete"
        ? "mustCompleteData"
        : null;
    const progress =
      officeStatus && officeStatus.progress < 100
        ? officeStatus.progress
        : null;

    return (
      <Box
        classes={{
          box: clsx(s.officeWrapper, className, fullWidth && s.fullWidth)
        }}
        alignChildrenStart
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
            {/** favorite icon */}
            {setFavorite ? (
              <Box classes={{ box: s.favorite }} onClick={handleSetFavorite}>
                {office.favorite ? (
                  <FavoriteFilledIcon className={s.favoriteIcon} />
                ) : (
                  <FavoriteIcon className={s.favoriteIcon} />
                )}
              </Box>
            ) : null}

            {/** dots */}
            {office.coverPhotos && office.coverPhotos.length !== 0 && (
              <Box classes={{ box: s.dots }} justifyChildrenCenter>
                <Dots
                  value={pos}
                  onChange={setPos}
                  number={office.coverPhotos.length}
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
              {office.location.fullAddress} {office.location.fullAddress}
            </Typography>

            {/** arrows */}
            {office.coverPhotos && office.coverPhotos.length !== 0 && (
              <Box
                classes={{ box: s.carouselArrow }}
                style={{ left: 14 }}
                onClick={prevImage}
              >
                <KeyboardArrowLeft />
              </Box>
            )}
            {office.coverPhotos && office.coverPhotos.length !== 0 && (
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
            {office.coverPhotos && (
              <Carousel
                slidesPerPage={1}
                value={pos}
                infinite
                onChange={setPos}
                autoPlay={autoPlay || 7000}
                stopAutoPlayOnHover
                keepDirectionWhenDragging
              >
                {office.coverPhotos.map((photo, index) => (
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

        <Column
          paddingTopHalf={!horizontal}
          paddingLeft={!!horizontal}
          alignChildrenStart
        >
          {/** show office title */}
          <Row>
            <Typography fontSizeM textBlackGrey fontWeightBold>
              {office.title}
            </Typography>
          </Row>

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
          {office.published && (
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

          {/** show error msg */}
          {/* {errorMsg && (
          <Row paddingTopHalf>
            <Typography fontSizeS textErrorRed>
              {t(errorMsg)}
            </Typography>
          </Row>
        )} */}

          {/** show status of office if its not published */}
          {status && (
            <Row paddingTopHalf>
              <Typography fontSizeS textErrorRed>
                {t(status)}
              </Typography>
            </Row>
          )}

          {progress && (
            <Row paddingTopHalf fullWidth>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={progress}
                classes={{
                  root: s.progressbar,
                  bar1Determinate: s.bar1Determinate,
                  dashed: s.dashedBuffer
                }}
              />
            </Row>
          )}
        </Column>
      </Box>
    );
  }
);

export default withStyles(styleSheet, { name: "OfficeItem" })(
  withTranslation("common")(withLogin(OfficeItem))
);
