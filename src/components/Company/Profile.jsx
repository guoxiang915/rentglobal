import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Row,
  Column,
  Typography,
  Button,
  TextField,
  EmailIcon,
  UserIcon,
  PhoneIcon,
  AddressIcon,
  MapPointerIcon,
  CloseIcon,
  CheckIcon,
  LockIcon,
  UploadIcon
} from "../../common/base-components";
import { UploadDocument, ProfileTab } from "../../common/base-layouts";
import { Grid, Card, CircularProgress } from "@material-ui/core";
import Dropzone from "react-dropzone";

const ProgressIcon = props => (
  <CircularProgress color="primary" size={36} {...props} />
);

const SaveButtons = ({ isUpdating, onSave, onCancel, disabled, t }) => (
  <>
    <Box paddingRightDouble>
      <Button link="errorRed" background="secondaryLight" onClick={onCancel}>
        <CloseIcon style={{ width: 9, height: 9 }} />
        <Typography paddingLeft fontSizeS>
          {t("cancel")}
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
          {t("save")}
        </Typography>
      </Button>
    </Box>
  </>
);

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27
    }
  },

  fullWidth: {
    width: "100%"
  },

  profileTabWrapper: {
    paddingTop: theme.spacing(4)
  },

  buttonIcon: {
    width: 20,
    height: 20
  },

  profileInput: {
    width: 370,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  panelWrapper: {
    marginTop: theme.spacing(8)
  },

  panelDivider: {
    "&::after": {
      content: "''",
      height: 1,
      top: "50%",
      left: 35,
      right: 0,
      background: theme.colors.primary.borderGrey
    }
  },

  documentsWrapper: {
    flexWrap: "wrap",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "nowrap",
      overflowY: "auto"
    }
  },

  companyInfoForm: {
    width: "100%"
  },

  imageWrapper: {
    float: "right"
  },

  avatarCard: {
    width: 216,
    height: 216,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    backgroundSize: "contain",
    backgroundPosition: "center",
    "&:hover": {
      backgroundColor: theme.colors.primary.grey,
      backgroundBlendMode: "screen"
    }
  },

  dropzone: {
    width: "90%",
    height: "90%",
    border: `3px dashed ${theme.colors.primary.borderGrey}`,
    borderRadius: "50%",
    position: "absolute",
    top: "5%",
    left: "5%",
    filter: "grayscale(1)"
  },

  uploadIcon: {
    color: theme.colors.primary.mainColor,
    mixBlendMode: "difference"
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },

  outlineIcon: {
    color: theme.colors.primary.borderGrey
  },

  errorIcon: {
    borderRadius: "50%",
    border: `1px solid ${theme.colors.primary.errorRed}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.errorRed}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.errorRed,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 24
  },

  approveIcon: {
    borderRadius: "50%",
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainColor}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 24
  }
});

class Profile extends Component {
  state = {
    userImage: null,
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    legalStatusDocuments: [],
    checkSpecimen: [],
    copyOfPhotoIds: [],
    lastThreeBalances: [],
    commercialBrochures: [],
    password: "",
    passwordError: "",
    confirmPassword: "",

    editTab: null,
    openedTab: "companyInfo",
    uploadingDocument: null
  };

  static propTypes = {
    uploadFile: PropTypes.func,
    downloadFile: PropTypes.func,
    updateUser: PropTypes.func
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    this.handleResetProfileInfo(newProps);
  }

  UNSAFE_componentWillMount() {
    this.handleResetProfileInfo(this.props);
  }

  handleStateChange = field => value => {
    this.setState({ [field]: value });
  };

  handleStateChangeByInput = field => event => {
    this.setState({ [field]: event.target.value });
  };

  handleStateChangeByEvent = (field, value) => () => {
    this.setState({ [field]: value });
  };

  /**
   * Save company info
   */
  handleSaveCompanyInfo = () => {
    if (this.state.userImage && this.state.userImage.id) {
      this.props.updateUser("avatar", {
        avatarFileId: this.state.userImage.id
      });
    }
    this.props.updateUser("profile", {
      role: this.props.user.role,
      profile: {
        email: this.state.email,
        profile: {
          username: this.state.username,
          phoneNumber: this.state.phoneNumber,
          address: {
            fullAddress: this.state.address,
            postalCode: this.state.postalCode
          }
        }
      }
    });
    this.setState({ editTab: null });
  };

  handleSaveSecurityInfo = e => {
    if (this.state.password === this.state.confirmPassword) {
      this.props.updateUser("password", {
        password: this.state.password,
        passwordLastUpdated: new Date().getTime()
      });
    }
    this.setState({ editTab: null });
  };

  /**
   * Cancel editing profile tab
   * @param {string} profileTab tab name to cancel edit
   */
  handleCancelEditProfile = () => {
    this.setState({ editTab: null });
    this.handleResetProfileInfo(this.props);
  };

  /**
   * Toggle state variables to input new data in edit mode
   * @param {string} props props from parent
   */
  handleResetProfileInfo = props => {
    const { user } = props;
    if (!user.companyProfile) {
      user.companyProfile = {};
    }
    if (!user.companyProfile.address) {
      user.companyProfile.address = {};
    }

    this.setState({
      username: user.companyProfile.username || "",
      email: user.email || "",
      phoneNumber: user.companyProfile.phoneNumber || "",
      address: user.companyProfile.address.fullAddress || "",
      postalCode: user.companyProfile.address.postalCode || "",
      userImage: user.avatar || null
    });
  };

  handleToggleOpen = tab => () => {
    if (this.state.openedTab === tab) {
      this.setState({ openedTab: null });
    } else {
      this.setState({ openedTab: tab });
    }
  };

  handleToggleEdit = tab => () => {
    if (this.state.editTab === tab) {
      this.handleCancelEditProfile();
    } else {
      this.setState({ openedTab: tab, editTab: tab });
    }
  };

  handleSendPhoneVerification = () => {};

  handleUploadUserImage = userImage => {
    this.setState({ uploadingDocument: "avatar" });
    this.props.uploadFile(userImage, "public-read").then(response => {
      this.setState({ userImage: response.data, uploadingDocument: null });
    });
  };

  handleUploadDocument = docType => docFile => {
    this.setState({ uploadingDocument: docType });
    this.props.uploadFile(docFile).then(response => {
      this.props.updateUser("documents", {
        role: this.props.user.role,
        documentInfo: {
          document: docType,
          documentFileId: response.data.id
        }
      });
      this.setState({
        uploadingDocument: null
      });
    });
  };

  /**
   * Renderer function
   */
  render() {
    const { user, isUpdating: updatingTab, classes, t } = this.props;
    const { openedTab, editTab, uploadingDocument } = this.state;

    let passwordLastUpdated = "-";
    if (user.updatedAt) {
      passwordLastUpdated = new Date(user.updatedAt);
      passwordLastUpdated =
        passwordLastUpdated.getFullYear() +
        "/" +
        (passwordLastUpdated.getMonth() + 1) +
        "/" +
        passwordLastUpdated.getDate();
    }

    return (
      <Column
        classes={{ box: classes.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/* title */}
        <Typography fontSizeM textSecondary paddingBottom>
          {t("profileAndAccount")}
        </Typography>

        {/* company info tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            title={t("companyInfo")}
            open={openedTab === "companyInfo"}
            onToggleOpen={this.handleToggleOpen("companyInfo")}
            isEdit={editTab === "companyInfo" || updatingTab === "profile"}
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("companyInfo")}
          >
            <Row fullWidth>
              <form
                // onSubmit={this.handleSaveCompanyInfo}
                noValidate
                autoComplete="off"
                className={classes.companyInfoForm}
              >
                <Grid container direction="row-reverse">
                  <Grid item xs={12} sm={6}>
                    <Column fullWidth paddingTop>
                      <Row classes={{ box: classes.imageWrapper }}>
                        <Card
                          variant="outlined"
                          style={{
                            backgroundImage: this.state.userImage
                              ? `url("${this.state.userImage.bucketPath}")`
                              : "none"
                          }}
                          className={classes.avatarCard}
                        >
                          {!this.state.userImage &&
                            editTab !== "companyInfo" && (
                              <UserIcon
                                fontSize="large"
                                className={classes.outlineIcon}
                              />
                            )}
                          {editTab === "companyInfo" && (
                            <Dropzone
                              multiple={false}
                              onDrop={files =>
                                this.handleUploadUserImage(files[0])
                              }
                            >
                              {({ getRootProps, getInputProps }) => (
                                <Box
                                  classes={{ box: classes.dropzone }}
                                  justifyChildrenCenter
                                  alignChildrenCenter
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  {uploadingDocument === "avatar" ? (
                                    <ProgressIcon />
                                  ) : (
                                    <UploadIcon
                                      fontSize="large"
                                      className={clsx({
                                        [classes.uploadIcon]: this.state
                                          .userImage,
                                        [classes.outlineIcon]: !this.state
                                          .userImage
                                      })}
                                    />
                                  )}
                                </Box>
                              )}
                            </Dropzone>
                          )}
                        </Card>
                      </Row>
                    </Column>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Row paddingTop>
                      <TextField
                        variant="outlined"
                        placeholder={t("companyName")}
                        onChange={this.handleStateChangeByInput("username")}
                        value={this.state.username}
                        className={classes.profileInput}
                        startAdornment={
                          <UserIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "companyInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        type="email"
                        variant="outlined"
                        placeholder={t("emailAddress")}
                        onChange={this.handleStateChangeByInput("email")}
                        value={this.state.email}
                        className={classes.profileInput}
                        startAdornment={
                          <EmailIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "companyInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t("phoneNumber")}
                        onChange={this.handleStateChangeByInput("phoneNumber")}
                        value={this.state.phoneNumber}
                        className={classes.profileInput}
                        startAdornment={
                          <PhoneIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "companyInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t("currentAddress")}
                        onChange={this.handleStateChangeByInput("address")}
                        value={this.state.address}
                        className={classes.profileInput}
                        startAdornment={
                          <AddressIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "companyInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t("postalCode")}
                        onChange={this.handleStateChangeByInput("postalCode")}
                        value={this.state.postalCode}
                        className={classes.profileInput}
                        startAdornment={
                          <MapPointerIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "companyInfo"}
                      />
                    </Row>
                    {(editTab === "companyInfo" ||
                      updatingTab === "profile") && (
                      // buttons for save
                      <Row paddingTopHalf>
                        <SaveButtons
                          isUpdating={updatingTab === "profile"}
                          onSave={this.handleSaveCompanyInfo}
                          onCancel={this.handleCancelEditProfile}
                          t={t}
                        />
                      </Row>
                    )}
                  </Grid>
                </Grid>
              </form>
            </Row>
            <Row classes={{ box: classes.panelWrapper }} fullWidth>
              <Typography
                fontSizeS
                textMediumGrey
                classes={{ box: classes.panelDivider }}
              >
                {t("companyDocuments")}
              </Typography>
            </Row>
            <Typography fontSizeS textSecondary paddingTop>
              {t("provideDocumentsNeeded")}
            </Typography>
            <Row
              fullWidth
              paddingTop
              paddingBottom
              classes={{ box: classes.documentsWrapper }}
            >
              {[
                {
                  value: "legalStatusDocuments",
                  title: t("legalStatusDocument")
                },
                { value: "checkSpecimen", title: t("checkSpecimen") },
                { value: "copyOfPhotoIds", title: t("copyOfID") },
                { value: "lastThreeBalances", title: t("lastThreeBalance") },
                { value: "commercialBrochures", title: t("commercialBrochure") }
              ].map(item => (
                <React.Fragment key={item.value}>
                  <Box paddingRightHalf paddingBottomHalf>
                    <UploadDocument
                      title={item.title}
                      documents={
                        user.companyProfile && user.companyProfile[item.value]
                      }
                      uploading={uploadingDocument === item.value}
                      onUpload={this.handleUploadDocument(item.value)}
                      onDownload={this.props.downloadFile}
                      onDelete={() => {}}
                    />
                  </Box>
                </React.Fragment>
              ))}
            </Row>
          </ProfileTab>
        </Row>

        {/* login and security tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            title={t("loginAndSecurity")}
            open={openedTab === "loginAndSecurity"}
            onToggleOpen={this.handleToggleOpen("loginAndSecurity")}
            isEdit={
              editTab === "loginAndSecurity" || updatingTab === "password"
            }
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("loginAndSecurity")}
          >
            <Row fullWidth>
              <form
                // onSubmit={this.handleSaveCompanyInfo}
                noValidate
                autoComplete="off"
                className={classes.companyInfoForm}
              >
                <Grid container direction="row">
                  <Grid item xs={12} sm={6}>
                    <Row paddingTop>
                      <TextField
                        type="password"
                        variant="outlined"
                        placeholder={t("password")}
                        onChange={this.handleStateChangeByInput("password")}
                        value={this.state.password}
                        className={classes.profileInput}
                        startAdornment={
                          <LockIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "loginAndSecurity"}
                        error={!!this.state.passwordError}
                        helperText={this.state.passwordError}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        type="password"
                        variant="outlined"
                        placeholder={t("confirmPassword")}
                        onChange={this.handleStateChangeByInput(
                          "confirmPassword"
                        )}
                        value={this.state.confirmPassword}
                        className={classes.profileInput}
                        startAdornment={
                          <LockIcon className={classes.outlineIcon} />
                        }
                        readOnly={editTab !== "loginAndSecurity"}
                      />
                    </Row>
                    <Row paddingTop>
                      {editTab === "loginAndSecurity" ||
                      updatingTab === "password" ? (
                        // buttons for save
                        <SaveButtons
                          isUpdating={updatingTab === "password"}
                          onSave={this.handleSaveSecurityInfo}
                          onCancel={this.handleCancelEditProfile}
                          t={t}
                          disabled={
                            !!this.state.passwordError ||
                            this.state.password !== this.state.confirmPassword
                          }
                        />
                      ) : (
                        <>
                          <Typography fontSizeS textMediumGrey paddingRightHalf>
                            {t("lastUpdate")}:
                          </Typography>
                          <Typography fontSizeS textSecondary>
                            {passwordLastUpdated}
                          </Typography>
                        </>
                      )}
                    </Row>
                  </Grid>
                </Grid>
              </form>
            </Row>
            <Row classes={{ box: classes.panelWrapper }} fullWidth>
              <Typography
                fontSizeS
                textMediumGrey
                classes={{ box: classes.panelDivider }}
              >
                {t("companyDocuments")}
              </Typography>
            </Row>
            <Row fullWidth paddingTopDouble paddingBottom>
              <Box paddingRightHalf>
                <Button variant="primary">{t("securityQuestion")}</Button>
              </Box>
              <Box paddingRightHalf>
                <Button variant="primary">{t("twoFactorLogin")}</Button>
              </Box>
              <Box paddingRightHalf>
                <Button variant="primary">{t("activeSessions")}</Button>
              </Box>
            </Row>
          </ProfileTab>
        </Row>

        {/* payments and payouts tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            title={t("paymentsAndPayouts")}
            open={openedTab === "paymentsAndPayouts"}
            onToggleOpen={this.handleToggleOpen("paymentsAndPayouts")}
            isEdit={
              editTab === "paymentsAndPayouts" ||
              updatingTab === "paymentsAndPayouts"
            }
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("paymentsAndPayouts")}
          ></ProfileTab>
        </Row>

        {/* privacy & sharing tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            title={t("privacyAndSharing")}
            open={openedTab === "privacyAndSharing"}
            onToggleOpen={this.handleToggleOpen("privacyAndSharing")}
            isEdit={
              editTab === "privacyAndSharing" ||
              updatingTab === "privacyAndSharing"
            }
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("privacyAndSharing")}
          ></ProfileTab>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(Profile));
