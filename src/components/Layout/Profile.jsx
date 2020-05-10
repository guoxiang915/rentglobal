import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import {
  Box,
  Row,
  Column,
  Typography,
  Button,
  TextField,
  Tooltip,
  TooltipContent,
  GooglePlaceField,
  ConfirmDialog,
  CarouselWrapper,
  EmailIcon,
  UserIcon,
  PhoneIcon,
  AddressIcon,
  MapPointerIcon,
  CloseIcon,
  CheckIcon,
  LockIcon,
  UploadIcon,
  DeleteIcon,
  ProgressIcon,
} from '../../common/base-components';
import {
  UploadDocument,
  TabWrapper,
  StatisticBox,
} from '../../common/base-layouts';
import { ConditionalWrapper } from '../../utils/helpers';
import { CropperDialog } from '.';
import Dropzone from 'react-dropzone';
import PhoneNumber from 'awesome-phonenumber';
import { Alert } from '@material-ui/lab';
import { maxFileSize } from '../../utils/constants';
import MobileDetect from 'mobile-detect';
import { DeleteAccountDialog } from './Dialogs';

const md = new MobileDetect(window.navigator.userAgent);

/** Show save and cancel buttons for form */
const SaveButtons = ({ isUpdating, onSave, onCancel, disabled, t }) => (
  <React.Fragment>
    <Box paddingRightDouble>
      <Button
        link="errorRed"
        background="errorRedLight"
        inverse
        onClick={onCancel}
      >
        <CloseIcon style={{ width: 9, height: 9 }} />
        <Typography paddingLeft fontSizeS>
          {t('cancel')}
        </Typography>
      </Button>
    </Box>
    <Box fullWidth>
      <Button
        variant="primary"
        fullWidth
        onClick={onSave}
        disabled={!!disabled}
      >
        {isUpdating ? (
          <ProgressIcon size={16} color="secondary" />
        ) : (
          <CheckIcon style={{ width: 16, height: 12 }} />
        )}
        <Typography paddingLeft fontSizeS>
          {t('save')}
        </Typography>
      </Button>
    </Box>
  </React.Fragment>
);

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  fullWidth: {
    width: '100%',
  },

  profileTabWrapper: {
    paddingTop: theme.spacing(4),
  },

  buttonIcon: {
    width: 20,
    height: 20,
  },

  profileInput: {
    width: 370,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  panelWrapper: {
    marginTop: theme.spacing(8),
  },

  panelDivider: {
    '&::after': {
      content: "''",
      height: 1,
      top: '50%',
      left: 35,
      right: 0,
      background: theme.colors.primary.borderGrey,
    },
  },

  documentsWrapper: {
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      overflow: 'hidden',
    },
  },

  generalInfoForm: {
    width: '100%',
  },

  imageWrapper: {
    float: 'right',
  },

  avatarCard: {
    width: 216,
    height: 216,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:hover': {
      backgroundColor: theme.colors.primary.grey,
      backgroundBlendMode: 'screen',
    },
  },

  companyAvatarCard: {
    borderRadius: '50%',
  },

  dropzone: {
    width: '90%',
    height: '90%',
    border: `3px dashed ${theme.colors.primary.borderGrey}`,
    position: 'absolute',
    top: '5%',
    left: '5%',
    filter: 'grayscale(1)',
  },

  companyDropzone: {
    borderRadius: '50%',
  },

  uploadIcon: {
    color: theme.colors.primary.mainColor,
    mixBlendMode: 'difference',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey,
  },

  errorIcon: {
    borderRadius: '50%',
    border: `1px solid ${theme.colors.primary.errorRed}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.errorRed}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.errorRed,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 24,
  },

  approveIcon: {
    borderRadius: '50%',
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainColor}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 24,
  },
});

class Profile extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    uploadFile: PropTypes.func,
    downloadFile: PropTypes.func,
    updateUser: PropTypes.func,
    deleteAvatar: PropTypes.func,
    deleteDocument: PropTypes.func,
    deleteAccount: PropTypes.func,
    verifyPhoneNumber: PropTypes.func,
    confirmPhoneCode: PropTypes.func,
    verifiedPhoneNumber: PropTypes.object,
  };

  state = {
    avatar: null,
    username: '',
    phoneNumberError: '',
    phoneCode: '',
    phoneNumber: '',
    phoneNumberVerified: false,
    address: {},
    postalCode: '',
    legalStatusDocuments: [],
    checkSpecimen: [],
    leases: [],
    copyOfPhotoIds: [],
    lastThreeBalances: [],
    commercialBrochures: [],
    oldPassword: '',
    password: '',
    passwordError: '',
    confirmPassword: '',

    editTab: null,
    openedTab: 'generalInfo',
    uploadingDocument: null,

    dialog: null,
    phoneTooltip: false,
  };

  /** landlord/company profile documents */
  documents = {
    landlord: [
      {
        value: 'legalStatusDocuments',
        title: this.props.t('legalStatusDocument'),
      },
      { value: 'checkSpecimen', title: this.props.t('checkSpecimen') },
      { value: 'leases', title: this.props.t('lease') },
    ],
    company: [
      {
        value: 'legalStatusDocuments',
        title: this.props.t('legalStatusDocument'),
      },
      { value: 'checkSpecimen', title: this.props.t('checkSpecimen') },
      { value: 'copyOfPhotoIds', title: this.props.t('copyOfID') },
      { value: 'lastThreeBalances', title: this.props.t('lastThreeBalance') },
      {
        value: 'commercialBrochures',
        title: this.props.t('commercialBrochure'),
      },
    ],
  };

  UNSAFE_componentWillMount() {
    this.handleResetProfileInfo(this.props.auth);
  }

  componentDidUpdate(prevProps) {
    const { t, width, auth } = this.props;
    if (
      prevProps.verifiedPhoneNumber !== this.props.verifiedPhoneNumber &&
      !this.props.verifiedPhoneNumber.error
    ) {
      this.setState({
        phoneNumber: this.props.verifiedPhoneNumber?.number,
        phoneNumberVerified: this.props.verifiedPhoneNumber?.verified,
      });
    }

    if (prevProps.auth.userDeleted !== auth.userDeleted && auth.userDeleted) {
      this.setState({
        dialog: (
          <Dialog
            onClose={() => (window.location.href = '/')}
            aria-labelledby="account-deleted"
            open={true}
          >
            <DialogTitle
              id="account-deleted"
              onClose={() => (window.location.href = '/')}
            >
              {t('accountDeleted')}
            </DialogTitle>
            <DialogContent dividers>
              <Typography
                fontSizeM={!isWidthDown('xs', width)}
                fontSizeS={isWidthDown('xs', width)}
                textSecondary
                fontWeightBold
                textCenter
              >
                {t('accountDeletedSuccess')}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => (window.location.href = '/')}
                color="primary"
              >
                {t('backToHome')}
              </Button>
            </DialogActions>
          </Dialog>
        ),
      });
    }

    if (
      auth.error &&
      auth.error.type === 'deleteAccount' &&
      (!prevProps.auth.error || prevProps.auth.error.type !== 'deleteAccount')
    ) {
      this.setState({
        dialog: (
          <Dialog
            onClose={() => this.setState({ dialog: null })}
            aria-labelledby="account-deleted-error"
            open={true}
          >
            <DialogTitle
              id="account-deleted-error"
              onClose={() => this.setState({ dialog: null })}
            >
              {t('error')}
            </DialogTitle>
            <DialogContent dividers>
              <Typography
                fontSizeM={!isWidthDown('xs', width)}
                fontSizeS={isWidthDown('xs', width)}
                textSecondary
                fontWeightBold
                textCenter
              >
                {typeof auth.error.msg === 'string'
                  ? auth.error.msg
                  : auth.error.msg.message || t('errorDeleteAccount')}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => this.setState({ dialog: null })}
              >
                {t('close')}
              </Button>
            </DialogActions>
          </Dialog>
        ),
      });
    }
  }

  handleStateChange = (field) => (value) => {
    this.setState({ [field]: value });
  };

  handleStateChangeByInput = (field) => (event) => {
    this.setState({ [field]: event.target.value });
  };

  handleStateChangeByEvent = (field, value) => () => {
    this.setState({ [field]: value });
  };

  handleDeleteAvatar = () => {
    const { t } = this.props;
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="error"
          text={t('confirmDelete')}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{t('cancel')}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <DeleteIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{t('delete')}</Typography>
            </React.Fragment>
          }
          onConfirm={this.deleteAvatar}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };

  deleteAvatar = () => {
    this.props.deleteAvatar();
    this.setState({ dialog: null });
  };

  /** Save general info */
  handleSaveGeneralInfo = () => {
    const {
      avatar,
      username,
      phoneNumber,
      phoneNumberVerified,
      address,
      postalCode,
    } = this.state;
    const { user } = this.props.auth;

    if (avatar && avatar._id && avatar._id !== user.avatar?._id) {
      this.props.updateUser('avatar', {
        avatarFileId: avatar._id,
      });
    }

    if (
      username !== user.generalInfo?.username ||
      phoneNumber !== user.generalInfo?.phoneNumber.number ||
      address !== user.generalInfo?.address ||
      postalCode !== user.generalInfo?.address?.postalCode
    ) {
      this.props.updateUser('profile', {
        userRole: this.props.auth.userRole,
        profile: {
          username,
          phoneNumber,
          phoneNumberVerified,
          address: { ...address, postalCode },
        },
      });
    }
    this.setState({ editTab: null });
  };

  /** Save security information */
  handleSaveSecurityInfo = () => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="error"
          text={this.props.t('confirmResetPassword')}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t('cancel')}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t('reset')}</Typography>
            </React.Fragment>
          }
          onClose={this.handleCloseDialog}
          onConfirm={this.saveSecurityInfo}
        />
      ),
    });
  };

  saveSecurityInfo = () => {
    const { oldPassword, password, confirmPassword } = this.state;
    const { user } = this.props.auth;
    if (password === confirmPassword) {
      this.props.updateUser('password', {
        email: user?.email,
        oldPassword,
        newPassword: password,
        passwordLastUpdated: new Date().getTime(),
      });
    }
    this.setState({ editTab: null, dialog: null });
  };

  /**
   * Cancel editing profile tab
   * @param {string} profileTab tab name to cancel edit
   */
  handleCancelEditProfile = () => {
    this.setState({ editTab: null });
    this.handleResetProfileInfo(this.props.auth);
  };

  /**
   * Toggle state variables to input new data in edit mode
   * @param {string} user User information
   */
  handleResetProfileInfo = (auth) => {
    const { user } = auth;

    this.setState({
      username: user.generalInfo?.username || '',
      phoneNumber: user.generalInfo?.phoneNumber?.number || '',
      phoneNumberVerified: !!user.generalInfo?.phoneNumber?.verified,
      address: user.generalInfo?.address || {},
      postalCode: user.generalInfo?.address?.postalCode || '',
      avatar: user.avatar || null,
    });
  };

  handleToggleOpen = (tab) => () => {
    if (this.state.openedTab === tab) {
      this.setState({ openedTab: null });
    } else {
      this.setState({ openedTab: tab });
    }
  };

  handleToggleEdit = (tab) => () => {
    if (this.state.editTab === tab) {
      this.handleCancelEditProfile();
    } else {
      this.setState({ openedTab: tab, editTab: tab });
    }
  };

  handleSendPhoneVerification = () => {
    const { phoneNumber, phoneNumberError } = this.state;
    this.validateForm();
    if (phoneNumberError) {
      return;
    }

    // verify number
    this.props.verifyPhoneNumber(phoneNumber);
  };

  verifyCode = () => {
    const { phoneCode, phoneNumber } = this.state;

    if (!phoneCode) {
      return;
    }

    this.props.verifyPhoneCode({ code: phoneCode, phoneNumber });
  };

  onPhoneTooltipOpen = () => {
    // open the tooltip with tap instead of the default hover event
    if (!md.mobile()) {
      this.setState({
        phoneTooltip: true,
      });
    }
  };

  onPhoneTooltipClose = () => {
    // close the tooltip with tap instead of the default hover event
    if (!md.mobile()) {
      this.setState({
        phoneTooltip: false,
      });
    }
  };

  /** Set and resize avatar image */
  handleClickAvatar = (avatar) => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      this.setState({
        dialog: (
          <CropperDialog
            fileName={avatar.name}
            src={reader.result}
            aspectRatio={1}
            onClose={this.handleCloseDialog}
            onSave={this.handleUploadAvatar}
          />
        ),
      })
    );
    reader.readAsDataURL(avatar);
  };

  /** Upload avatar from cropper dialog */
  handleUploadAvatar = (avatar) => {
    this.setState({ uploadingDocument: 'avatar' });
    this.props.uploadFile(avatar, 'public-read').then(
      (response) => {
        this.setState({
          avatar: response.data,
          uploadingDocument: null,
        });
      },
      () => {
        this.setState({ uploadingDocument: null });
      }
    );
  };

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /** Upload user document */
  handleUploadDocument = (docType) => (docFile) => {
    this.setState({ uploadingDocument: docType });
    this.props.uploadFile(docFile).then((response) => {
      this.props.updateUser('documents', {
        userRole: this.props.auth.userRole,
        documentInfo: {
          document: docType,
          documentFileId: response.data._id,
        },
      });
      this.setState({
        uploadingDocument: null,
      });
    });
  };

  /** Delete user document */
  handleDeleteDocument = (docType) => (docFile) => {
    this.props.deleteDocument(this.props.auth.userRole, docType, docFile);
  };

  /** Change/Select address */
  handleChangeAddress = (field) => (e) => {
    const address = { ...this.state.address, [field]: e.target.value };
    this.setState({ address });
  };

  handleSelectAddress = (value) => {
    const address = { ...this.state.address, ...value };
    const postalCode = value.zipCode || '';
    this.setState({ address, postalCode });
  };

  handleDeleteAccount = () => {
    this.setState({
      dialog: (
        <DeleteAccountDialog
          onConfirm={this.deleteAccount}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };

  deleteAccount = () => {
    const { userRole } = this.props.auth;
    this.props.deleteAccount(userRole);
  };

  handleChangePhone = () => (e) => {
    this.setState({
      phoneNumber: e.target.value,
      phoneNumberVerified: false,
    });
  };

  validateForm = () => {
    const { phoneNumber } = this.state;
    const { t } = this.props;
    let num = phoneNumber || '';
    if (!num.startsWith('+') && num.length > 0) {
      num = '+' + num;
      this.setState({
        phoneNumber: num,
      });
    }

    let pn = new PhoneNumber(num);
    if (!pn.isValid()) {
      this.setState({ phoneNumberError: t('invalidNumberError') });
      return false;
    } else {
      this.setState({ phoneNumberError: '' });
    }

    return true;
  };

  /**
   * Render function
   */
  render() {
    const {
      width,
      classes: s,
      t,
      phoneCodeSent,
      verifiedPhoneNumber,
    } = this.props;
    const { user, userRole, isUpdating: updatingTab, error } = this.props.auth;
    const { openedTab, editTab, uploadingDocument, dialog } = this.state;
    const profile =
      userRole === 'landlord' ? user.landlordProfile : user.companyProfile;

    const {
      avatar,
      username,
      phoneNumber,
      phoneNumberVerified,
      address,
      postalCode,
      oldPassword,
      password,
      passwordError,
      confirmPassword,
      phoneNumberError,
      phoneCode,
      phoneTooltip,
    } = this.state;
    const { email } = user;

    let passwordLastUpdated = '-';
    if (user.updatedAt) {
      passwordLastUpdated = new Date(user.updatedAt);
      passwordLastUpdated = `${passwordLastUpdated.getFullYear()}/${
        passwordLastUpdated.getMonth() + 1
      }/${passwordLastUpdated.getDate()}`;
    }

    let closeTooltipButton = md.mobile() ? (
      <Button
        variant="icon"
        link="errorRed"
        background="errorRedLight"
        onClick={() => {
          this.setState({
            phoneTooltip: false,
          });
        }}
      >
        <Typography>
          <CloseIcon style={{ width: 30, height: 12 }} />
        </Typography>
      </Button>
    ) : null;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/* title */}
        <Typography fontSizeM textSecondary paddingBottom>
          {t('profileAndAccount')}
        </Typography>

        {/* general info tab */}
        <Row fullWidth classes={{ box: s.profileTabWrapper }}>
          <TabWrapper
            title={t(userRole === 'landlord' ? 'landlordInfo' : 'companyInfo')}
            open={openedTab === 'generalInfo'}
            onToggleOpen={this.handleToggleOpen('generalInfo')}
            isEdit={editTab === 'generalInfo' || updatingTab === 'profile'}
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit('generalInfo')}
          >
            <Row fullWidth>
              <form noValidate autoComplete="off" className={s.generalInfoForm}>
                <Grid container direction="row-reverse">
                  <Grid item xs={12} sm={6}>
                    <Column fullWidth paddingTop>
                      <Row classes={{ box: s.imageWrapper }}>
                        <Card
                          variant="outlined"
                          style={{
                            backgroundImage: avatar
                              ? `url("${avatar.bucketPath}")`
                              : 'none',
                          }}
                          className={clsx(
                            s.avatarCard,
                            userRole === 'company' && s.companyAvatarCard
                          )}
                        >
                          {!avatar && editTab !== 'generalInfo' && (
                            <UserIcon
                              fontSize="large"
                              className={s.outlineIcon}
                            />
                          )}
                          {editTab === 'generalInfo' && (
                            <Dropzone
                              multiple={false}
                              onDrop={(files) =>
                                files.length > 0 &&
                                this.handleClickAvatar(files[0])
                              }
                              accept={'image/*'}
                              maxSize={maxFileSize}
                            >
                              {({
                                getRootProps,
                                getInputProps,
                                isDragReject,
                                rejectedFiles,
                              }) => {
                                const isFileTooLarge =
                                  rejectedFiles.length > 0 &&
                                  rejectedFiles[0].size > maxFileSize;
                                let uploadMsg = null;
                                if (isFileTooLarge) {
                                  uploadMsg = (
                                    <Alert severity="error">
                                      {t('uploadTooLarge')}
                                    </Alert>
                                  );
                                } else if (
                                  isDragReject ||
                                  rejectedFiles.length > 0
                                ) {
                                  uploadMsg = (
                                    <Alert severity="error">
                                      {t('uploadImageOnly')}
                                    </Alert>
                                  );
                                }
                                return (
                                  <Box
                                    classes={{
                                      box: clsx(
                                        s.dropzone,
                                        userRole === 'company' &&
                                          s.companyDropzone
                                      ),
                                    }}
                                    justifyChildrenCenter
                                    alignChildrenCenter
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    {uploadMsg}
                                    {uploadingDocument === 'avatar' ? (
                                      <ProgressIcon />
                                    ) : (
                                      <UploadIcon
                                        fontSize="large"
                                        className={clsx({
                                          [s.uploadIcon]: avatar,
                                          [s.outlineIcon]: !avatar,
                                        })}
                                      />
                                    )}
                                  </Box>
                                );
                              }}
                            </Dropzone>
                          )}
                        </Card>
                      </Row>
                      {avatar ? (
                        <Row>
                          <Button
                            variant="icon"
                            link="errorRed"
                            background="errorRedLight"
                            inverse
                            onClick={this.handleDeleteAvatar}
                          >
                            <Typography fontSizeXS>
                              <DeleteIcon />
                            </Typography>
                          </Button>
                        </Row>
                      ) : null}
                    </Column>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Row paddingTop>
                      <TextField
                        variant="outlined"
                        placeholder={t(
                          userRole === 'landlord'
                            ? 'landlordName'
                            : 'companyName'
                        )}
                        onChange={this.handleStateChangeByInput('username')}
                        value={username}
                        className={s.profileInput}
                        startAdornment={<UserIcon className={s.outlineIcon} />}
                        readOnly={editTab !== 'generalInfo'}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        type="email"
                        variant="outlined"
                        placeholder={t('emailAddress')}
                        value={email}
                        className={s.profileInput}
                        startAdornment={<EmailIcon className={s.outlineIcon} />}
                        endAdornment={
                          <Tooltip
                            placement={
                              isWidthDown('xs', width) ? 'left' : 'bottom'
                            }
                            borderType="primary"
                            title={
                              <TooltipContent
                                title={
                                  <Column>
                                    <Typography textSecondary>
                                      {t('yourEmailConfirmed')}
                                    </Typography>
                                  </Column>
                                }
                              />
                            }
                            interactive
                          >
                            <div className={s.approveIcon}>
                              <CheckIcon style={{ width: 11, height: 8 }} />
                            </div>
                          </Tooltip>
                        }
                        readOnly
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t('phoneNumber')}
                        onChange={this.handleChangePhone()}
                        value={phoneNumber || ''}
                        className={s.profileInput}
                        startAdornment={<PhoneIcon className={s.outlineIcon} />}
                        endAdornment={
                          phoneNumber &&
                          !phoneNumberVerified &&
                          !phoneNumberError ? (
                              <Tooltip
                                placement={
                                  isWidthDown('xs', width)
                                    ? md.mobile()
                                      ? 'bottom-end'
                                      : 'left'
                                    : 'bottom'
                                }
                                borderType="errorRed"
                                open={phoneTooltip}
                                onClose={this.onPhoneTooltipClose}
                                onOpen={this.onPhoneTooltipOpen}
                                title={
                                  <TooltipContent
                                    title={
                                      phoneCodeSent && phoneCodeSent.success ? (
                                        <Column>
                                          <Typography textErrorRed>
                                            {t('enterCode')}
                                          </Typography>
                                          <Box paddingTop>
                                            <TextField
                                              variant="outlined"
                                              placeholder={'code'}
                                              onChange={this.handleStateChangeByInput(
                                                'phoneCode'
                                              )}
                                              value={phoneCode}
                                            />
                                            <Button
                                              link="normal"
                                              background="secondaryLight"
                                              onClick={this.verifyCode}
                                            >
                                              <Typography fontSizeXS>
                                                {t('verify')}
                                              </Typography>
                                            </Button>
                                            <Button
                                              link="normal"
                                              background="secondaryLight"
                                              onClick={
                                                this.handleSendPhoneVerification
                                              }
                                            >
                                              <Typography fontSizeXS>
                                                {t('resend')}
                                              </Typography>
                                            </Button>
                                            {closeTooltipButton}
                                          </Box>
                                          {verifiedPhoneNumber &&
                                        verifiedPhoneNumber.error ? (
                                              <Typography textErrorRed>
                                                {verifiedPhoneNumber.error}
                                              </Typography>
                                            ) : null}
                                        </Column>
                                      ) : (
                                        <Column>
                                          <Typography textErrorRed>
                                            {t('phoneMustApproved')}
                                          </Typography>
                                          <Box paddingTop>
                                            {editTab === 'generalInfo' ? (
                                              t('saveToVerify')
                                            ) : (
                                              <React.Fragment>
                                                <Button
                                                  link="normal"
                                                  background="secondaryLight"
                                                  onClick={
                                                    this
                                                      .handleSendPhoneVerification
                                                  }
                                                  disabled={
                                                    editTab === 'generalInfo'
                                                  }
                                                >
                                                  <Typography fontSizeXS>
                                                    {t('sendVerificationCode')}
                                                  </Typography>
                                                </Button>
                                                {closeTooltipButton}
                                              </React.Fragment>
                                            )}
                                          </Box>
                                          {phoneCodeSent &&
                                        phoneCodeSent.error ? (
                                              <Typography textErrorRed>
                                                {phoneCodeSent.error}
                                              </Typography>
                                            ) : null}
                                        </Column>
                                      )
                                    }
                                  />
                                }
                                interactive
                              >
                                <div
                                  onClick={() => {
                                    this.setState({
                                      phoneTooltip: true,
                                    });
                                  }}
                                  className={s.errorIcon}
                                >
                                !
                                </div>
                              </Tooltip>
                            ) : phoneNumberVerified ? (
                              <Tooltip
                                placement={
                                  isWidthDown('xs', width) ? 'left' : 'bottom'
                                }
                                borderType="primary"
                                title={
                                  <TooltipContent
                                    title={
                                      <Column>
                                        <Typography textSecondary>
                                          {t('phoneNumberConfirmed')}
                                        </Typography>
                                      </Column>
                                    }
                                  />
                                }
                                interactive
                              >
                                <div className={s.approveIcon}>
                                  <CheckIcon style={{ width: 11, height: 8 }} />
                                </div>
                              </Tooltip>
                            ) : null
                        }
                        readOnly={editTab !== 'generalInfo'}
                        onBlur={() =>
                          editTab === 'generalInfo' && this.validateForm()
                        }
                        helperText={phoneNumberError}
                        error={phoneNumberError ? true : false}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <div className={s.profileInput}>
                        <GooglePlaceField
                          variant="outlined"
                          value={address.fullAddress}
                          onChange={this.handleChangeAddress('fullAddress')}
                          onSelect={this.handleSelectAddress}
                          inputProps={{
                            startAdornment: (
                              <AddressIcon className={s.outlineIcon} />
                            ),
                            readOnly: editTab !== 'generalInfo',
                            fullWidth: true,
                            placeholder: t('currentAddress'),
                            // error: !!validation
                            // helperText: validation && validation.msg
                          }}
                        />
                      </div>
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t('postalCode')}
                        onChange={this.handleStateChangeByInput('postalCode')}
                        value={postalCode}
                        className={s.profileInput}
                        startAdornment={
                          <MapPointerIcon className={s.outlineIcon} />
                        }
                        readOnly={editTab !== 'generalInfo'}
                      />
                    </Row>
                    {(editTab === 'generalInfo' ||
                      updatingTab === 'profile') && (
                      // buttons for save
                      <Row paddingTopHalf style={{ maxWidth: 370 }}>
                        <SaveButtons
                          isUpdating={updatingTab === 'profile'}
                          onSave={this.handleSaveGeneralInfo}
                          onCancel={this.handleCancelEditProfile}
                          t={t}
                        />
                      </Row>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Row>
            <Row classes={{ box: s.panelWrapper }} fullWidth>
              <Typography
                fontSizeS
                textMediumGrey
                classes={{ box: s.panelDivider }}
              >
                {t(
                  userRole === 'landlord'
                    ? 'landlordDocuments'
                    : 'companyDocuments'
                )}
              </Typography>
            </Row>
            <Typography fontSizeS textSecondary paddingTop>
              {t('provideDocumentsNeeded')}
            </Typography>
            <Row
              fullWidth
              paddingTop
              paddingBottom
              classes={{ box: s.documentsWrapper }}
            >
              <ConditionalWrapper
                condition={isWidthDown('sm', width)}
                wrapper={(children) => (
                  <CarouselWrapper itemWidth={200} itemOffset={0}>
                    {children}
                  </CarouselWrapper>
                )}
              >
                {this.documents[userRole].map((item) => (
                  <React.Fragment key={item.value}>
                    <Box paddingRightHalf paddingBottomHalf>
                      <UploadDocument
                        title={item.title}
                        documents={profile && profile[item.value]}
                        uploading={uploadingDocument === item.value}
                        onUpload={this.handleUploadDocument(item.value)}
                        onDownload={this.props.downloadFile}
                        onDelete={this.handleDeleteDocument(item.value)}
                      />
                    </Box>
                  </React.Fragment>
                ))}
              </ConditionalWrapper>
            </Row>
          </TabWrapper>
        </Row>

        {/* login and security tab */}
        <Row fullWidth classes={{ box: s.profileTabWrapper }}>
          <TabWrapper
            title={t('loginAndSecurity')}
            open={openedTab === 'loginAndSecurity'}
            onToggleOpen={this.handleToggleOpen('loginAndSecurity')}
            isEdit={
              editTab === 'loginAndSecurity' || updatingTab === 'password'
            }
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit('loginAndSecurity')}
          >
            <Row fullWidth>
              <form
                // onSubmit={this.handleSaveGeneralInfo}
                noValidate
                autoComplete="off"
                className={s.generalInfoForm}
              >
                <Grid container direction="row">
                  <Grid item xs={12} sm={6}>
                    <Row paddingTop>
                      <TextField
                        type="password"
                        variant="outlined"
                        placeholder={t('oldPassword')}
                        onChange={this.handleStateChangeByInput('oldPassword')}
                        value={oldPassword}
                        className={s.profileInput}
                        startAdornment={<LockIcon className={s.outlineIcon} />}
                        readOnly={editTab !== 'loginAndSecurity'}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        type="password"
                        variant="outlined"
                        placeholder={t('newPassword')}
                        onChange={this.handleStateChangeByInput('password')}
                        value={password}
                        className={s.profileInput}
                        startAdornment={<LockIcon className={s.outlineIcon} />}
                        readOnly={editTab !== 'loginAndSecurity'}
                        error={!!passwordError}
                        helperText={passwordError}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        type="password"
                        variant="outlined"
                        placeholder={t('confirmPassword')}
                        onChange={this.handleStateChangeByInput(
                          'confirmPassword'
                        )}
                        value={confirmPassword}
                        className={s.profileInput}
                        startAdornment={<LockIcon className={s.outlineIcon} />}
                        readOnly={editTab !== 'loginAndSecurity'}
                      />
                    </Row>
                    {error?.type === 'updateUser' &&
                    error?.field === 'password' ? (
                        <Typography textErrorRed paddingTopHalf paddingBottom>
                          {error.msg}
                        </Typography>
                      ) : null}
                    <Row paddingTopHalf style={{ maxWidth: 370 }}>
                      {editTab === 'loginAndSecurity' ||
                      updatingTab === 'password' ? (
                        // buttons for save
                          <SaveButtons
                            isUpdating={updatingTab === 'password'}
                            onSave={this.handleSaveSecurityInfo}
                            onCancel={this.handleCancelEditProfile}
                            t={t}
                            disabled={
                              !!passwordError || password !== confirmPassword
                            }
                          />
                        ) : (
                          <React.Fragment>
                            <Typography fontSizeS textMediumGrey paddingRightHalf>
                              {t('lastUpdate')}:
                            </Typography>
                            <Typography fontSizeS textSecondary>
                              {passwordLastUpdated}
                            </Typography>
                          </React.Fragment>
                        )}
                    </Row>
                  </Grid>
                </Grid>
              </form>
            </Row>
            <Row classes={{ box: s.panelWrapper }} fullWidth>
              <Typography
                fontSizeS
                textMediumGrey
                classes={{ box: s.panelDivider }}
              >
                {t('securityOptions')}
              </Typography>
            </Row>
            <Row fullWidth paddingTopDouble paddingBottom>
              <Box>
                <StatisticBox
                  title={t('securityQuestion')}
                  statistics={[
                    {
                      value: (
                        <div
                          style={{ width: 24, height: 24 }}
                          className={s.approveIcon}
                        >
                          <CheckIcon style={{ width: 11, height: 8 }} />
                        </div>
                      ),
                      variant: 'primary',
                    },
                  ]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t('twoFactorLogin')}
                  statistics={[{ value: '-' }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t('activeSessions')}
                  statistics={[{ value: 2 }]}
                />
              </Box>
            </Row>
          </TabWrapper>
        </Row>
        <Row classes={{ box: s.profileTabWrapper }}>
          <Button
            link="errorRedNormal"
            background="errorRed"
            inverse
            onClick={this.handleDeleteAccount}
          >
            <DeleteIcon style={{ width: 15, height: 12 }} />
            <Typography paddingLeft fontSizeS>
              {t('deleteAccount')}
            </Typography>
          </Button>
        </Row>
        {/* Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation('common')(withWidth()(Profile))
);
