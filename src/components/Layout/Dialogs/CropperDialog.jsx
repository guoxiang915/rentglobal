import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  //   Column,
  CheckIcon,
  CloseIcon
} from "../../../common/base-components";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

// const cropper = React.createRef(null);

const styleSheet = theme => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8
  },

  header: {
    width: "100%",
    padding: "12px 40px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  content: {
    padding: "16px 20px"
  },

  cropperWrapper: {
    width: "100%",
    height: "100%"
  },

  cropper: {
    width: "100%",
    // height: "100%",
    height: 300,
    minHeight: 300
  },

  icon: {
    color: theme.colors.primary.borderGrey
  },

  footer: {
    width: "100%",
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`
  }
});

class CropperDialog extends Component {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Image source */
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for saving cropped image */
    onSave: PropTypes.func,
    /** Event handler for closing dialog */
    onClose: PropTypes.func
  };

  cropper = React.createRef(null);

  /**
   * Event handler for saving cropped image
   * @description Call props.onSave()
   */
  handleSave = () => {
    if (this.props.onSave) {
      this.props.onSave(
        this.cropper.current && this.cropper.current.getCroppedCanvas()
      );
    }
    this.handleClose();
  };

  /**
   * Event handler for closing dialog
   * @description Call props.onClose() to close dialog
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  /**
   * Render
   */
  render() {
    const { title, src, className, classes: s, t } = this.props;

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="help-dialog-title" className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title ? title : t("resizeCropImage")}
            </Typography>
            <Stretch />
            {/** close button */}
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t("cancel")}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogTitle>

        {/** dialog content */}
        <DialogContent className={s.content}>
          <Box classes={{ box: s.cropperWrapper }}>
            <Cropper
              ref={this.cropper}
              src={src}
              className={s.cropper}
              // Cropper.js options
            //   aspectRatio={16 / 9}
            //   guides={false}
              crop={this.handleCrop}
            />
          </Box>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth>
            <Stretch />
            {/** save button */}
            <Button variant="primary" onClick={this.handleSave}>
              <Typography fontSizeS>
                <CheckIcon style={{ width: 15, height: 12 }} />
                <Typography paddingLeft>{t("save")}</Typography>
              </Typography>
            </Button>

            <Box paddingLeft />

            {/** close button */}
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t("cancel")}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "CropperDialog" })(
  withTranslation()(CropperDialog)
);
