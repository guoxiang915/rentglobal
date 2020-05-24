import clsx from "clsx";
import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import Carousel from "@brainhubeu/react-carousel";
import {
  Box,
  Row,
  Button,
  ArrowDownIcon,
  ArrowUpIcon,
  FullScreenImageCarousel,
} from "../base-components";

const styleSheet = (theme) => ({
  imageWrapper: {
    width: "calc(100% - 188px)",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      position: "relative",
      left: -10,
      height: '100%'
    },
  },

  coverPhotoWrapper: {
    width: "100%",
    position: "relative",
    paddingTop: "50%",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    borderRadius: 8,
  },

  coverPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "hidden",
    borderRadius: 8,
  },

  coverPhotoContent: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 8,
  },

  imageNavWrapper: {
    width: 178,
    marginLeft: 10,
    top: 0,
    bottom: 0,
    right: 0,
  },

  imageNavButton: {
    width: 24,
    height: 14,
  },

  imageNav: {
    width: "100%",
    height: "calc(100% - 50px)",
    margin: "10px 5px",
    overflow: "hidden",
    position: "relative",
  },

  imageNavList: {
    position: "absolute",
  },

  coverPhotoNav: {
    width: 168,
    height: 126,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    borderRadius: 8,
    marginBottom: 15,
    "&:last-of-type": {
      marginBottom: 0,
    },
  },

  galleryCoverPhoto: {
    width: "75%",
    marginRight: 15,
    cursor: "pointer",
  },

  galleryThumbnailWrapper: {
    width: "calc(25% - 21px)",
    paddingTop: "calc(37% + 6px)",
    position: "relative",
    overflow: "hidden",
    height: 0,
  },

  galleryThumbnailImageContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    transition: "1s",
  },

  galleryThumbnailImage: {
    width: "100%",
    marginBottom: 15,
    display: "block",
    cursor: "pointer",

    "&:last-of-type": {
      marginBottom: 0,
    },
  },

  selectedGalleryThumbnailImage: {
    border: "3px solid #d7df23",
  },

  navigationContainer: {
    position: "absolute",
    right: 6,
    width: "calc(25% - 21px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "space-between",
    pointerEvents: "none",
  },

  navigationButton: {
    display: "block",
    height: 24,
    width: "100%",
    textAlign: "center",
    color: "#E5E5E5",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    padding: 0,
    borderRadius: 0,
    pointerEvents: "all",
  },

  navigationButtonUp: {},

  navigationButtonDown: {},
});

/** Render cover photos */
const OfficeGallery = React.memo(({ classes: s, coverPhotos, width }) => {
  const [currentCoverPhoto, setCurrentCoverPhoto] = useState(0);
  const [showFullScreen, setShowFullScreen] = useState(false);
  const handlePrevCoverPhoto = () => {
    setCurrentCoverPhoto(Math.max(currentCoverPhoto - 1, 0));
  };
  const handleNextCoverPhoto = () => {
    setCurrentCoverPhoto(
      Math.min(currentCoverPhoto + 1, coverPhotos.length - 1)
    );
  };
  const handleClickThumb = (index) => {
    setCurrentCoverPhoto(index);
  };

  return (
    <React.Fragment>
      {isWidthDown("xs", width) ? (
        <div className={s.imageWrapper}>
          <Carousel keepDirectionWhenDragging itemWidth={285} offset={0}>
            {coverPhotos &&
              coverPhotos.map((photo, index) => (
                <div className={s.coverPhotoWrapper} key={index}>
                  <div className={s.coverPhoto}>
                    <img
                      src={
                        photo.mobile
                          ? photo.mobile.bucketPath
                          : photo.bucketPath
                      }
                      className={s.coverPhotoContent}
                      alt=''
                    />
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      ) : (
        <Row fullWidth relative>
          {coverPhotos && (
            <React.Fragment>
              <img
                src={coverPhotos[currentCoverPhoto]?.desktop?.bucketPath}
                alt=''
                className={s.galleryCoverPhoto}
                onClick={() => setShowFullScreen(true)}
              />
              <div className={s.galleryThumbnailWrapper}>
                <div
                  className={s.galleryThumbnailImageContainer}
                  style={{
                    top: `calc(-${
                      (Math.max(0, currentCoverPhoto - 2) * 100) / 3
                    }% - ${Math.max(0, currentCoverPhoto - 2) * 5}px`,
                  }}
                >
                  {coverPhotos.map((coverPhoto, index) => (
                    <img
                      key={index}
                      alt=''
                      src={coverPhoto?.desktop?.bucketPath}
                      className={clsx(
                        s.galleryThumbnailImage,
                        index === currentCoverPhoto
                          ? s.selectedGalleryThumbnailImage
                          : ""
                      )}
                      onClick={() => handleClickThumb(index)}
                    />
                  ))}
                </div>
              </div>
            </React.Fragment>
          )}
          {coverPhotos && coverPhotos.length > 3 && (
            <Box classes={{ box: s.navigationContainer }}>
              <Button
                background={"rgba(255,255,255,0.5)"}
                className={clsx(s.navigationButton, s.navigationButtonUp)}
                onClick={handlePrevCoverPhoto}
              >
                <ArrowUpIcon />
              </Button>
              <Button
                background={"rgba(255,255,255,0.5)"}
                className={clsx(s.navigationButton, s.navigationButtonButton)}
                onClick={handleNextCoverPhoto}
              >
                <ArrowDownIcon />
              </Button>
            </Box>
          )}
          {coverPhotos && showFullScreen && (
            <FullScreenImageCarousel
              images={coverPhotos.map(
                (coverPhoto) => coverPhoto?.desktop?.bucketPath
              )}
              index={currentCoverPhoto}
              open={showFullScreen}
              onClose={() => setShowFullScreen(false)}
            />
          )}
        </Row>
      )}
    </React.Fragment>
  );
});

OfficeGallery.propTypes = {
  classes: PropTypes.object.isRequired,
  coverPhotos: PropTypes.array,
  width: PropTypes.string,
};

export default withWidth()(withStyles(styleSheet)(OfficeGallery));
