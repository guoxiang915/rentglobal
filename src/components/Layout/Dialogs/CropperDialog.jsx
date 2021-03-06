import React, { PureComponent } from "react";
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
import ReactCrop from "react-image-crop";
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  Column,
  CheckIcon,
  CloseIcon
} from "../../../common/base-components";
import "react-image-crop/dist/ReactCrop.css";

const styleSheet = theme => ({
  root: {
    // maxWidth: 1056,
    // maxHeight: '80%',
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
    minWidth: 300,
    minHeight: 300,
    maxWidth: 400,
    maxHeight: 400,
    overflow: "auto",
    "-webkit-overflow-scrolling": "touch"
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

class CropperDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Image name */
    fileName: PropTypes.string,
    /** Aspect ratio of cropping range */
    aspectRatio: PropTypes.number,
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

  state = { crop: { aspect: this.props.aspectRatio } };

  imageRef = React.createRef(null);
  cropperRef = React.createRef();

  /** Base64 to blob */
  base64ToBlob = image => {
    const byteString = atob(image.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: "image/jpeg" });
  };

  getCroppedImage = async (image, crop, fileName) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );

    return new Promise(resolve => {
      canvas.toBlob(
        blob => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(blob);
        },
        "image/jpeg",
        scaleX
      );
    });
  };

  /**
   * Event handler for saving cropped image
   * @description Call props.onSave()
   */
  handleSave = () => {
    if (this.props.onSave) {
      this.getCroppedImage(
        this.imageRef,
        this.state.crop,
        this.props.fileName || "image.jpg"
      ).then(imageUrl => this.props.onSave(imageUrl));
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

  /** Event handler for image loaded */
  handleImageLoaded = image => {
    this.imageRef = image;
    this.setState({
      crop: {
        width: image.width,
        aspect: this.props.aspectRatio
      }
    });
    return false;
  };

  handleCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  /** Event handler for crop change */
  handleCropChange = crop => {
    this.setState({ crop });
  };

  makeClientCrop = async crop => {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImage(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  };

  /**
   * Render
   */
  render() {
    const { title, src, className, classes: s, t } = this.props;

    const { crop } = this.state;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="help-dialog-title" className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title || t("resizeCropImage")}
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
          <Column classes={{ box: s.cropperWrapper }}>
            <ReactCrop
              src={src}
              onImageLoaded={this.handleImageLoaded}
              crop={crop}
              onChange={this.handleCropChange}
              onComplete={this.handleCropComplete}
              style={{ width: "100%" }}
            />
            {/* <Cropper
              src={src}
              ref={ref => { this.cropperRef = ref; }}
            /> */}
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth>
            <Stretch />
            {/** save button */}
            <Button variant="primary" onClick={this.handleSave}>
              <Typography fontSizeS alignChildrenCenter>
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
