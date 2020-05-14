import React, { useState } from "react";
import { Dialog, withStyles } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import clsx from "clsx";

const styleSheet = () => {
  return {
    dialog: {
      maxWidth: "calc(100% - 64px)",
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
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "#b9b9b9",
      transition: "0.5s",
      outline: "none",

      "&:hover": {
        color: "black",
      },
    },
    navBackButton: {},
    navForwardButton: {
      right: 0,
    },
  };
};

const FullScreenImageCarousel = ({ classes, images, index, open, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(index);
  return (
    <Dialog open={open} onClose={onClose} classes={{ paper: classes.dialog }}>
      <button
        onClick={() => setCurrentPhotoIndex(Math.max(0, currentPhotoIndex - 1))}
        className={clsx(classes.navButton, classes.navBackButton)}
      >
        <ArrowBackIos fontSize='large' />
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
            Math.min(images.length - 1, currentPhotoIndex + 1)
          )
        }
        className={clsx(classes.navButton, classes.navForwardButton)}
      >
        <ArrowForwardIos fontSize='large' />
      </button>
    </Dialog>
  );
};

export default withStyles(styleSheet, { name: "FullScreenImageCarousel" })(
  FullScreenImageCarousel
);
