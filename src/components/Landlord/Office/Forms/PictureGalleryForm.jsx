import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import withWidth from "@material-ui/core/withWidth";
import { Hidden } from "@material-ui/core";
import {
  Box,
  Row,
  Column,
  Typography,
  Button,
  UploadIcon,
  ProgressIcon,
  DeleteIcon,
  CloseIcon
} from "../../../../common/base-components";
import Dropzone from "react-dropzone";

const styleSheet = theme => ({
  root: {},

  dropzone: {
    borderRadius: 8,
    border: `1px dashed ${theme.colors.primary.grey}`,
    height: 300,
    [theme.breakpoints.down("xs")]: {
      height: 140
    }
  },

  coverPhotos: {
    width: 145,
    height: 108,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: "relative"
  },

  coverPhotosSelected: {
    borderColor: theme.colors.primary.errorRed,
    borderWidth: 1.5
  },

  coverPhotosImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8
  },

  coverPhotosText: {
    position: "absolute",
    bottom: -8,
    left: "calc(50% - 44px)",
    borderRadius: 12,
    fontSize: 11,
    height: 16,
    padding: "1px 10px",
    color: theme.colors.primary.white,
    background: theme.colors.primary.grey
  },

  coverPhotosRemoveSelection: {
    position: "absolute",
    padding: 0,
    height: 24,
    width: 24,
    bottom: -12,
    left: "calc(50% - 12px)",
    color: `${theme.colors.primary.white} !important`,
    background: `${theme.colors.primary.errorRed} !important`,
    border: "none !important"
  }
});

class PictureGalleryForm extends Component {
  static propTypes = {
    office: PropTypes.object,
    error: PropTypes.object,
    onChangeField: PropTypes.func,
    deletePhoto: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { isLoading: false, selectedPicture: null };

  dropzoneRef = React.createRef();

  /**
   * Update state
   * @member
   * @param {string} field Name of field to be updated
   */
  updateState = field => value => {
    this.setState({ [field]: value });
  };

  /**
   * Update state by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeByEvent = field => value => () => {
    this.setState({ [field]: value });
  };

  /**
   * Upload photos
   */
  handleUploadPhotos = file => {
    this.setState({ isLoading: true });
    this.props.uploadFile(file, "public-read").then(response => {
      this.setState({ isLoading: false });
      this.props.onChangeField("coverPhotos", [
        ...(this.props.office.coverPhotos || []),
        response.data
      ]);
    });
  };

  /** Select/Deselect picture */
  handleSelectPicture = picture => () => {
    this.setState({ selectedPicture: picture });
  };

  handleDeselectPicture = () => {
    this.setState({ selectedPicture: null });
  };

  /** Remove selected picture */
  handleRemoveSelectedPicture = () => {
    this.setState({ isLoading: true });
    this.props
      .deletePhoto(this.props.office._id, this.state.selectedPicture)
      .then(
        response => {
          this.setState({ isLoading: false, selectedPicture: null });
          this.props.onChangeField("coverPhotos", response.data.coverPhotos);
        },
        error => {
          this.setState({ isLoading: false });
        }
      );
  };

  /**
   * Renderer function
   */
  render() {
    const { office, classes: s, t } = this.props;
    const { isLoading, selectedPicture } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** dropzone for uploading files */}
        <Dropzone
          multiple={false}
          ref={this.dropzoneRef}
          onDrop={files => this.handleUploadPhotos(files[0])}
          noClick
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              classes={{
                box: clsx(s.dropzone, selectedPicture && s.coverPhotosSelected)
              }}
              justifyChildrenCenter
              alignChildrenCenter
              fullWidth
              column
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isLoading ? (
                <ProgressIcon />
              ) : selectedPicture ? (
                <DeleteIcon fontSize="large" color="secondary" />
              ) : (
                <UploadIcon fontSize="large" color="secondary" />
              )}
              <Hidden xsDown>
                <>
                  <Typography paddingTop fontSizeS textSecondary>
                    {t(
                      selectedPicture
                        ? "dragAndDropOfficePictureToRemove"
                        : "dragAndDropOfficePicture"
                    )}
                  </Typography>
                  <Typography paddingTop fontSizeS textSecondary>
                    {t("or")}
                  </Typography>
                </>
              </Hidden>
              <Box paddingTop />
              {selectedPicture ? (
                <Button
                  link="normal"
                  background="errorRedLight"
                  outline="errorRedNormal"
                  inverse
                  onClick={this.handleRemoveSelectedPicture}
                  shadow
                >
                  {t("removeSelectedPicture")}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => this.dropzoneRef.current.open()}
                  shadow
                >
                  {t("selectFromDevice")}
                </Button>
              )}
              {selectedPicture && (
                <>
                  <Box paddingTop />
                  <Button
                    link="errorRed"
                    background="secondaryLight"
                    onClick={this.handleDeselectPicture}
                  >
                    <CloseIcon style={{ width: 9, height: 9 }} />
                    <Typography paddingLeft fontSizeS>
                      {t("deselect")}
                    </Typography>
                  </Button>
                </>
              )}
            </Box>
          )}
        </Dropzone>

        {/** uploaded coverPhotos */}
        <Row fullWidth paddingTop>
          {office &&
            office.coverPhotos &&
            office.coverPhotos.map((picture, index) => (
              <React.Fragment key={index}>
                <Box
                  classes={{
                    box: clsx(
                      s.coverPhotos,
                      picture === selectedPicture && s.coverPhotosSelected
                    )
                  }}
                  onClick={this.handleSelectPicture(picture)}
                >
                  <img
                    src={picture.bucketPath}
                    className={s.coverPhotosImage}
                    alt=""
                  />
                  {picture === selectedPicture ? (
                    <Button
                      variant="icon"
                      onClick={this.handleRemoveSelectedPicture}
                      className={s.coverPhotosRemoveSelection}
                    >
                      <DeleteIcon style={{ width: 12, height: 13 }} />
                    </Button>
                  ) : (
                    <Typography classes={{ box: s.coverPhotosText }}>
                      {t("coverPicture")}
                    </Typography>
                  )}
                </Box>
                <Box paddingRight />
              </React.Fragment>
            ))}
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(PictureGalleryForm))
);
