import React, { useState } from "react";
import { withStyles, withWidth, isWidthDown } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Carousel, { Dots } from "@brainhubeu/react-carousel";
import {
  Typography,
  Row,
  Column,
  Box,
  StarIcon,
  ImageIcon,
  Stretch,
  IconButton,
  CheckIcon,
  CloseIcon,
  MusicIcon,
  FavoriteFilledIcon,
  FavoriteIcon,
} from "../base-components";
import { numberWithSpaces } from "../../utils/formatters";
import { favoriteOffice } from "../../api/endpoints";

const styleSheet = (theme) => ({
  visitRequestWrapper: {
    width: 235,
    // marginRight: 20,
  },

  fullWidth: {
    width: "100%",
  },

  visitRequestCarousel: {
    width: "100%",
    height: 175,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: "relative",
    overflow: "hidden",
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
      zIndex: 1,
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
      zIndex: 1,
    },
    "&:hover": {
      opacity: 1,
    },
  },
  favorite: {
    position: "absolute",
    top: 8,
    right: 16,
    zIndex: 1,
    width: 16,
    height: 16,
    cursor: "pointer",
  },

  favoriteIcon: {
    width: 17,
    height: 16,
    color: theme.colors.primary.white,
    opacity: 1,
  },

  favoriteSelectedIcon: {
    fill: theme.colors.primary.errorRed,
  },

  officeLocation: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 8,
    whiteSpace: "nowrap",
    overflow: "hidden",
    zIndex: 1,
  },

  officeImage: {
    width: "100%",
    height: 175,
  },

  officeEmptyImage: {
    background: theme.colors.primary.whiteGrey,
    color: theme.colors.primary.borderGrey,
    width: "100%",
    height: 175,
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
      opacity: 1,
    },
  },

  dots: {
    position: "absolute",
    left: 0,
    bottom: 25,
    width: "100%",
    zIndex: 1,
  },

  dot: {
    borderRadius: "50%",
    background: theme.colors.primary.white,
    width: 7,
    height: 7,
    margin: -4,
  },

  actionsWrapper: {
    height: 175,
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      marginTop: 20,
      borderRadius: 4,
    },
  },

  dateWrapper: {
    backgroundColor: theme.colors.primary.borderGrey,
    width: "100%",
    height: 158,
    [theme.breakpoints.down("xs")]: {
      padding: "8px 12px",
      alignItems: "center",
      height: "unset",
    },
  },

  actionButtonsWrapper: {
    position: "absolute",
    bottom: 0,
  },

  actionButton: {
    width: 34,
    height: 34,
    marginRight: 14,

    "&:last-of-type": {
      marginRight: 0,
    },
  },

  actionButtonIcon: {
    width: 12,
    height: 12,
  },
});

/** Dot component */
const Dot = ({ classes }) => <div className={classes.dot} />;

/**
 * Function component for visit request item
 * @typeof Props
 * @property  {object} visitRequest Visit request information
 * @property  {function} onApprove Event handler for approve visit request
 * @property  {function} onReject Event handler for reject visit request
 * @property  {number} autoPlay Duration of autoplay for carousel (default: 4000)
 * @property  {bool} horizontal Show item horizontally or not (default: false)
 */
const VisitRequestItem = React.memo(
  ({
    classes: s,
    t,
    width,
    visitRequest,
    setFavorite,
    autoPlay,
    horizontal,
    onApprove,
    onReject,
    fullWidth,
    className,
  }) => {
    const isMobile = React.useMemo(() => isWidthDown("xs", width), [width]);
    const { office, visitReq } = visitRequest;

    /** Changing position of carousel */
    const [, setState] = useState();
    const [pos, setPos] = useState(0);

    const prevImage = (e) => {
      e.stopPropagation();
      setPos(pos === 0 ? office.coverPhotos.length - 1 : pos - 1);
    };

    const nextImage = (e) => {
      e.stopPropagation();
      setPos(pos === office.coverPhotos.length - 1 ? 0 : pos + 1);
    };

    const handleSetFavorite = (e) => {
      e.stopPropagation();
      if (office?._id) {
        favoriteOffice(office._id).then((response) => {
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

    return (
      <Box
        classes={{
          box: clsx(s.visitRequestWrapper, className, fullWidth && s.fullWidth),
        }}
        alignChildrenStart
        row={!!horizontal}
        column={!horizontal}
      >
        <Box
          classes={{
            box: clsx(s.visitRequestCarousel),
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
              {office.location?.fullAddress}
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
                        alt=''
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
            <Typography
              fontSizeM={!isMobile}
              fontSizeS={isMobile}
              textBlackGrey
              fontWeightBold
            >
              {office.title}
            </Typography>
          </Row>

          {/** show office property */}
          <Row paddingTopHalf>
            <Typography
              fontSizeM={!isMobile}
              fontSizeXS={isMobile}
              textSecondary
            >
              {t(office.officeType)}
            </Typography>
          </Row>

          {/** show office price */}
          <Row paddingTopHalf>
            <Typography
              // fontSizeS={!isMobile}
              fontSizeS
              textPrimary
            >
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
              <Typography
                // fontSizeS={!isMobile}
                fontSizeS
                textMediumGrey
                paddingLeftHalf
              >
                3.5 {/* office.rating */}
              </Typography>
            </Row>
          )}

          {/** show office ref id */}
          <Row paddingTopHalf>
            <Typography
              fontSizeS={!isMobile}
              fontSizeXS={isMobile}
              textSecondary
            >
              {t("refID")}
              :&nbsp;
            </Typography>
            <Typography
              fontSizeM={!isMobile}
              fontSizeS={isMobile}
              fontWeightBold
              textSecondary
            >
              #{numberWithSpaces(office.refId + 1, 3)}
            </Typography>
          </Row>
        </Column>

        <Stretch />

        <Box
          classes={{
            box: s.actionsWrapper,
          }}
          style={{ width: horizontal ? 235 : "100%" }}
        >
          <Column fullWidth>
            <Row
              classes={{
                box: s.dateWrapper,
              }}
            >
              <Column
                padding
                justifyChildrenCenter
                alignChildrenCenter={!isWidthDown("xs", width)}
                alignChildrenStart={isWidthDown("xs", width)}
                fullWidth
              >
                <Row>
                  <Typography
                    fontSizeM={!isWidthDown("xs", width)}
                    fontSizeS={isWidthDown("xs", width)}
                    textBlackGrey
                    fontWeightBold
                  >
                    Wednesday
                  </Typography>
                </Row>
                <Row>
                  <Typography fontSizeXS textGrey>
                    2020-01-24
                  </Typography>
                </Row>
                <Row>
                  <Typography
                    fontSizeS={!isWidthDown("xs", width)}
                    fontSizeXS={isWidthDown("xs", width)}
                    textBlackGrey
                  >
                    09:30 AM - 10:00 AM
                  </Typography>
                </Row>
              </Column>
              {isWidthDown("xs", width) && (
                <Row>
                  <IconButton
                    classes={{ root: clsx(s.actionButton) }}
                    variant='red'
                    onClick={onReject}
                  >
                    <CloseIcon className={s.actionButtonIcon} />
                  </IconButton>
                  <IconButton
                    classes={{ root: clsx(s.actionButton) }}
                    variant='grey'
                    onClick={onReject}
                  >
                    <MusicIcon className={s.actionButtonIcon} />
                  </IconButton>
                  <IconButton
                    classes={{ root: clsx(s.actionButton) }}
                    variant='green'
                    onClick={onApprove}
                  >
                    <CheckIcon className={s.actionButtonIcon} />
                  </IconButton>
                </Row>
              )}
            </Row>
            {!isWidthDown("xs", width) && (
              <Row
                classes={{
                  box: s.actionButtonsWrapper,
                }}
              >
                <IconButton
                  classes={{ root: clsx(s.actionButton) }}
                  variant='red'
                  onClick={onReject}
                >
                  <CloseIcon className={s.actionButtonIcon} />
                </IconButton>
                <IconButton
                  classes={{ root: clsx(s.actionButton) }}
                  variant='grey'
                  onClick={onReject}
                >
                  <MusicIcon className={s.actionButtonIcon} />
                </IconButton>
                <IconButton
                  classes={{ root: clsx(s.actionButton) }}
                  variant='green'
                  onClick={onApprove}
                >
                  <CheckIcon className={s.actionButtonIcon} />
                </IconButton>
              </Row>
            )}
          </Column>
        </Box>
      </Box>
    );
  }
);

export default withWidth()(
  withStyles(styleSheet, { name: "VisitRequestItem" })(
    withTranslation("common")(VisitRequestItem)
  )
);
