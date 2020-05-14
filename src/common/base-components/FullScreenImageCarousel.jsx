import React from "react";
import { Backdrop, withStyles } from "@material-ui/core";

const styleSheet = () => {
  return {
    backdrop: {
      zIndex: 99999,
    },
    image: {
      maxWidth: "100%",
    },
  };
};

const FullScreenImageCarousel = ({ classes, image, open, onClose }) => (
  <Backdrop open={open} onClick={onClose} className={classes.backdrop}>
    <img src={image} className={classes.image} alt='' />
  </Backdrop>
);

export default withStyles(styleSheet, { name: "FullScreenImageCarousel" })(
  FullScreenImageCarousel
);
