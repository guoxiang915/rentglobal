import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Row,
  Column,
  Box,
  StarIcon,
  ImageIcon,
  FavoriteFilledIcon,
  FavoriteOutlinedIcon
} from "../base-components";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Carousel, { Dots } from "@brainhubeu/react-carousel";

const styleSheet = theme => ({
  officeWrapper: {
    width: 235,
    marginRight: 20
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
    height: 16
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
    width: 235,
    height: 175
  },

  officeEmptyImage: {
    background: theme.colors.primary.whiteGrey,
    color: theme.colors.primary.borderGrey,
    width: 235,
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
  }
});

/** Dot component */
const Dot = ({ classes }) => <div className={classes.dot}></div>;

/**
 * Function component for uploading document
 * @typeof Props
 * @property  {object} office Office information
 * @property  {function} setFavorite Event handler for set favorite office
 * @property  {number} autoPlay Duration of autoplay for carousel (default: 4000)
 */
const OfficeItem = ({
  classes: s,
  t,
  office,
  setFavorite,
  errorMsg,
  autoPlay
}) => {
  /** Changing position of carousel */
  const [pos, setPos] = useState(0);
  /** Previous image */
  const prev = e => {
    e.stopPropagation();
    setPos(pos === 0 ? office.coverPhotos.length - 1 : pos - 1);
  };
  /** Next image */
  const next = e => {
    e.stopPropagation();
    setPos(pos === office.coverPhotos.length - 1 ? 0 : pos + 1);
  };
  /** Set favorite */
  const handleSetFavorite = e => {
    e.stopPropagation();
    setFavorite();
  };
  /** Carousel dots */
  const dots = React.useMemo(() => {
    return office.coverPhotos
      ? office.coverPhotos.map(() => <Dot classes={s} />)
      : [];
  }, [office, s]);

  return (
    <Column classes={{ box: s.officeWrapper }} alignChildrenStart>
      <Box classes={{ box: s.officeCarousel }}>
        <div className={s.hoverWrapper}>
          {/**
           * favorite icon
           * NOTE: should use self-defined icons
           */}
          {setFavorite && (
            <Box
              classes={{ box: s.favorite }}
              onClick={handleSetFavorite}
              // textErrorRed={office.favorite}
              // textWhite={!office.favorite}
            >
              {office.favorite ? (
                <FavoriteFilledIcon className={s.favoriteIcon} />
              ) : (
                <FavoriteOutlinedIcon className={s.favoriteIcon} />
              )}
            </Box>
          )}

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
          <Typography fontSizeXS textWhite classes={{ box: s.officeLocation }}>
            {office.location.fullAddress} {office.location.fullAddress}
          </Typography>

          {/** arrows */}
          {office.coverPhotos && office.coverPhotos.length !== 0 && (
            <Box
              classes={{ box: s.carouselArrow }}
              style={{ left: 14 }}
              onClick={prev}
            >
              <KeyboardArrowLeft />
            </Box>
          )}
          {office.coverPhotos && office.coverPhotos.length !== 0 && (
            <Box
              classes={{ box: s.carouselArrow }}
              style={{ right: 14 }}
              onClick={next}
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
                  {photo.bucketPath ? (
                    <img
                      src={photo.bucketPath}
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

      {/** show office title */}
      <Box paddingTopHalf>
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
          {t("dollarPerMonth", { dollar: office.priceMonthly })}
        </Typography>
      </Row>

      {/** show office ratings */}
      <Row paddingTopHalf>
        <Typography textPrimary>
          <StarIcon style={{ width: 12, height: 12 }} />
        </Typography>
        <Typography fontSizeS textMediumGrey paddingLeftHalf>
          3.5 {/* office.rating */}
        </Typography>
      </Row>

      {/** show error msg */}
      {errorMsg && (
        <Row paddingTopHalf>
          <Typography fontSizeS textErrorRed>
            {t(errorMsg)}
          </Typography>
        </Row>
      )}
    </Column>
  );
};

export default withStyles(styleSheet, { name: "OfficeItem" })(
  withTranslation("common")(OfficeItem)
);
