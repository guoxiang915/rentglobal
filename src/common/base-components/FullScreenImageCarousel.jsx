import React, { useState } from "react";
import { Dialog, withStyles } from "@material-ui/core";
import { ArrowRightAltIcon } from "../base-components/Icons"
import clsx from "clsx";

const styleSheet = () => {
  return {
    dialog: {
      maxWidth: "calc(100% - 64px)",
    },
    paper: {
      backgroundColor: 'black',
    },
    image: {
      maxWidth: "100%",
    },
    imageWrapper: {},
    navButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      cursor: "pointer",
      color: "white",
      transition: "0.1s",
      outline: "none",
      borderRadius: '50%',
      backgroundColor: 'black',
      width: 32,
      height: 32,
      padding: 4,

      "&:hover": {
        backgroundColor: '#d7df23',
      },
    },
    navBackButton: {
      left: 10,
    },
    navForwardButton: {
      right: 10,
    },
    pageNumber: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      fontSize: 20,
      backgroundColor: 'black',
      padding: '3px 6px',
      color: 'white',
    },
  };
};

const FullScreenImageCarousel = ({ classes, images, index, open, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(index);
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }} BackdropProps={{ className: classes.paper }}>
      <button
        onClick={() => setCurrentPhotoIndex((currentPhotoIndex - 1 + images.length) % images.length)}
        className={clsx(classes.navButton, classes.navBackButton)}
      >
        <ArrowRightAltIcon style={{ transform: 'scaleX(-1)' }} />
      </button>
      <img
        src={images[currentPhotoIndex]}
        alt=''
        className={classes.image}
        onClick={(e) => e.preventDefault()}
      />
      <button
        onClick={() =>
          setCurrentPhotoIndex(
            (currentPhotoIndex + 1) % images.length
          )
        }
        className={clsx(classes.navButton, classes.navForwardButton)}
      >
        <ArrowRightAltIcon />
      </button>
      <span className={classes.pageNumber}>{currentPhotoIndex + 1} / {images.length}</span>
    </Dialog>
  );
};

export default withStyles(styleSheet, { name: "FullScreenImageCarousel" })(
  FullScreenImageCarousel
);
