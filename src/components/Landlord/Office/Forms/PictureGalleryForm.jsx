import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Hidden } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import {
  Box,
  Row,
  Column,
  Typography,
  Button,
  UploadIcon,
  ProgressIcon,
  DeleteIcon,
  CloseIcon,
} from '../../../../common/base-components';
import { CropperDialog } from '../../../Layout';

const styleSheet = (theme) => ({
  root: {},

  dropzone: {
    borderRadius: 8,
    border: `1px dashed ${theme.colors.primary.grey}`,
    height: 300,
    [theme.breakpoints.down('xs')]: {
      height: 140,
    },
  },

  coverPhotos: {
    width: 145,
    height: 108,
    marginBottom: 28,
    marginRight: 13,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },

  coverPhotosSelected: {
    borderColor: theme.colors.primary.errorRed,
    borderWidth: 1.5,
  },

  coverPhotosImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },

  coverPhotosText: {
    position: 'absolute',
    bottom: -8,
    left: 'calc(50% - 44px)',
    borderRadius: 12,
    fontSize: 11,
    height: 16,
    padding: '1px 10px',
    color: theme.colors.primary.white,
    background: theme.colors.primary.grey,
  },

  coverPhotosRemoveSelection: {
    position: 'absolute',
    padding: 0,
    height: 24,
    width: 24,
    bottom: -12,
    left: 'calc(50% - 12px)',
    color: `${theme.colors.primary.white} !important`,
    background: `${theme.colors.primary.errorRed} !important`,
    border: 'none !important',
  },
});

class PictureGalleryForm extends PureComponent {
  static propTypes = {
    office: PropTypes.object.isRequired,
    error: PropTypes.object,
    onChangeField: PropTypes.func,
    uploadPhoto: PropTypes.func.isRequired,
    deletePhoto: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { isLoading: false, selectedPicture: null, dialog: null };

  dropzoneRef = React.createRef();

  /**
   * Update state
   * @member
   * @param {string} field Name of field to be updated
   */
  updateState = (field) => (value) => {
    this.setState({ [field]: value });
  };

  /**
   * Update state by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeByEvent = (field) => (value) => () => {
    this.setState({ [field]: value });
  };

  /** Set and crop/resize photo */
  handleCropPhoto = (file) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => this.setState({
      dialog: (
        <CropperDialog
          fileName={file.name}
          src={reader.result}
          aspectRatio={2/1}
          onClose={this.handleCloseDialog}
          onSave={this.handleUploadPhoto}
        />
      ),
    }));
    reader.readAsDataURL(file);
  };

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /**
   * Upload photos
   */
  handleUploadPhoto = (file) => {
    this.setState({ isLoading: true });
    this.props.uploadPhoto(this.props.office._id, file).then(() => {
      this.setState({ isLoading: false });
    });
  };

  /** Select/Deselect picture */
  handleSelectPicture = (picture) => () => {
    this.setState({ selectedPicture: picture });
  };

  handleDeselectPicture = () => {
    this.setState({ selectedPicture: null });
  };

  /** Remove selected picture */
  handleRemoveSelectedPicture = () => {
    const { selectedPicture } = this.state;
    this.setState({ isLoading: true });
    this.props
      .deletePhoto(this.props.office._id, selectedPicture.original._id)
      .then(() => {
        this.setState({ isLoading: false, selectedPicture: null });
      });
  };

  /**
   * Renderer function
   */
  render() {
    const {
      office, width, classes: s, t,
    } = this.props;
    const { isLoading, selectedPicture, dialog } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** dropzone for uploading files */}
        <Dropzone
          multiple={false}
          ref={this.dropzoneRef}
          onDrop={(files) => this.handleCropPhoto(files[0])}
          noClick
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              classes={{
                box: clsx(s.dropzone, selectedPicture && s.coverPhotosSelected),
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
                <React.Fragment>
                  <Typography paddingTop fontSizeS textSecondary>
                    {t(
                      selectedPicture
                        ? 'dragAndDropOfficePictureToRemove'
                        : 'dragAndDropOfficePicture',
                    )}
                  </Typography>
                  <Typography paddingTop fontSizeS textSecondary>
                    {t('or')}
                  </Typography>
                </React.Fragment>
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
                  {t('removeSelectedPicture')}
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => this.dropzoneRef.current.open()}
                  shadow
                >
                  {t('selectFromDevice')}
                </Button>
              )}
              {selectedPicture && (
                <React.Fragment>
                  <Box paddingTop />
                  <Button
                    link="errorRed"
                    background="secondaryLight"
                    onClick={this.handleDeselectPicture}
                  >
                    <CloseIcon style={{ width: 9, height: 9 }} />
                    <Typography paddingLeft fontSizeS>
                      {t('deselect')}
                    </Typography>
                  </Button>
                </React.Fragment>
              )}
            </Box>
          )}
        </Dropzone>

        {/** uploaded coverPhotos */}
        <Row
          fullWidth
          paddingTop
          wrap
          justifyChildrenSpaceBetween={isWidthDown('xs', width)}
        >
          {office
            && office.coverPhotos
            && office.coverPhotos.map((picture, index) => (
              <React.Fragment key={index}>
                <Box
                  classes={{
                    box: clsx(
                      s.coverPhotos,
                      picture === selectedPicture && s.coverPhotosSelected,
                    ),
                  }}
                  onClick={this.handleSelectPicture(picture)}
                >
                  <img
                    src={
                      picture.mobile
                        ? picture.mobile.bucketPath
                        : picture.bucketPath
                    }
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
                  ) : index === 0 ? (
                    <Typography classes={{ box: s.coverPhotosText }}>
                      {t('coverPicture')}
                    </Typography>
                  ) : null}
                </Box>
              </React.Fragment>
            ))}
        </Row>

        {/* show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation('common')(PictureGalleryForm)),
);
