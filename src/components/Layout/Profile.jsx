import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Box,
  Row,
  Column,
  Typography,
  Button,
  TextField,
  Tooltip,
  TooltipContent,
  Link,
  EmailIcon,
  UserIcon,
  PhoneIcon,
  AddressIcon,
  MapPointerIcon,
  CloseIcon,
  CheckIcon,
  LockIcon,
  UploadIcon,
  ProgressIcon
} from "../../common/base-components";
import {
  UploadDocument,
  TabWrapper,
  StatisticBox
} from "../../common/base-layouts";
import { Grid, Card } from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import Dropzone from "react-dropzone";

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

  generalInfoForm: {
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
    overflow: "hidden",
    position: "relative",
    backgroundSize: "contain",
    backgroundPosition: "center",
    "&:hover": {
      backgroundColor: theme.colors.primary.grey,
      backgroundBlendMode: "screen"
    }
  },

  companyAvatarCard: {
    borderRadius: "50%"
  },

  dropzone: {
    width: "90%",
    height: "90%",
    border: `3px dashed ${theme.colors.primary.borderGrey}`,
    position: "absolute",
    top: "5%",
    left: "5%",
    filter: "grayscale(1)"
  },

  companyDropzone: {
    borderRadius: "50%"
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
    width: 30,
    height: 24
  }
});

class Profile extends Component {
  static propTypes = {
    uploadFile: PropTypes.func,
    downloadFile: PropTypes.func,
    updateUser: PropTypes.func,
    deleteDocument: PropTypes.func
  };

  state = {
    avatar: null,
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    postalCode: "",
    legalStatusDocuments: [],
    checkSpecimen: [],
    leases: [],
    copyOfPhotoIds: [],
    lastThreeBalances: [],
    commercialBrochures: [],
    password: "",
    passwordError: "",
    confirmPassword: "",

    editTab: "generalInfo",
    openedTab: "generalInfo",
    uploadingDocument: null
  };

  documents = {
    landlord: [
      {
        value: "legalStatusDocuments",
        title: this.props.t("legalStatusDocument")
      },
      { value: "checkSpecimen", title: this.props.t("checkSpecimen") },
      { value: "leases", title: this.props.t("lease") }
    ],
    company: [
      {
        value: "legalStatusDocuments",
        title: this.props.t("legalStatusDocument")
      },
      { value: "checkSpecimen", title: this.props.t("checkSpecimen") },
      { value: "copyOfPhotoIds", title: this.props.t("copyOfID") },
      { value: "lastThreeBalances", title: this.props.t("lastThreeBalance") },
      {
        value: "commercialBrochures",
        title: this.props.t("commercialBrochure")
      }
    ]
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
   * Save general info
   */
  handleSaveGeneralInfo = () => {
    const {
      avatar,
      email,
      username,
      phoneNumber,
      address,
      postalCode
    } = this.state;

    if (avatar && avatar._id) {
      this.props.updateUser("avatar", {
        avatarFileId: avatar._id
      });
    }
    this.props.updateUser("profile", {
      role: this.props.user.role,
      profile: {
        email: email,
        profile: {
          username,
          phoneNumber,
          address: {
            fullAddress: address,
            postalCode
          }
        }
      }
    });
    this.setState({ editTab: null });
  };

  handleSaveSecurityInfo = e => {
    const { password, confirmPassword } = this.state;
    if (password === confirmPassword) {
      this.props.updateUser("password", {
        password,
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
    const { user, role } = props;
    let profile =
      role === "landlord" ? user.landlordProfile : user.companyProfile;
    if (!profile) {
      profile = {};
    }
    if (!profile.address) {
      profile.address = {};
    }

    this.setState({
      username: profile.username || "",
      email: user.email || "",
      phoneNumber: profile.phoneNumber || "",
      address: profile.address.fullAddress || "",
      postalCode: profile.address.postalCode || "",
      avatar: user.avatar || null
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

  /** Upload avatar image */
  handleUploadAvatar = avatar => {
    this.setState({ uploadingDocument: "avatar" });
    this.props.uploadFile(avatar, "public-read").then(response => {
      this.setState({ avatar: response.data, uploadingDocument: null });
    });
  };

  /** Upload user document */
  handleUploadDocument = docType => docFile => {
    this.setState({ uploadingDocument: docType });
    this.props.uploadFile(docFile).then(response => {
      this.props.updateUser("documents", {
        role: this.props.user.role,
        documentInfo: {
          document: docType,
          documentFileId: response.data._id
        }
      });
      this.setState({
        uploadingDocument: null
      });
    });
  };

  /** Delete user document */
  handleDeleteDocument = docType => docFile => {
    this.setState({ uploadingDocument: docType });
    return this.props.deleteDocument(docType, docFile).then(response => {
      this.setState({
        uploadingDocument: null
      });
    });
  };

  /**
   * Render function
   */
  render() {
    const {
      user,
      isUpdating: updatingTab,
      role,
      width,
      classes: s,
      t
    } = this.props;
    const { openedTab, editTab, uploadingDocument } = this.state;
    const profile =
      role === "landlord" ? user.landlordProfile : user.companyProfile;

    const {
      avatar,
      username,
      email,
      phoneNumber,
      address,
      postalCode,
      password,
      passwordError,
      confirmPassword
    } = this.state;

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
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/* title */}
        <Typography fontSizeM textSecondary paddingBottom>
          {t("profileAndAccount")}
        </Typography>

        {/* general info tab */}
        <Row fullWidth classes={{ box: s.profileTabWrapper }}>
          <TabWrapper
            title={t(role === "landlord" ? "landlordInfo" : "companyInfo")}
            open={openedTab === "generalInfo"}
            onToggleOpen={this.handleToggleOpen("generalInfo")}
            isEdit={editTab === "generalInfo" || updatingTab === "profile"}
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("generalInfo")}
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
                              : "none"
                          }}
                          className={clsx(
                            s.avatarCard,
                            role === "company" && s.companyAvatarCard
                          )}
                        >
                          {!avatar && editTab !== "generalInfo" && (
                            <UserIcon
                              fontSize="large"
                              className={s.outlineIcon}
                            />
                          )}
                          {editTab === "generalInfo" && (
                            <Dropzone
                              multiple={false}
                              onDrop={files =>
                                this.handleUploadAvatar(files[0])
                              }
                            >
                              {({ getRootProps, getInputProps }) => (
                                <Box
                                  classes={{
                                    box: clsx(
                                      s.dropzone,
                                      role === "company" && s.companyDropzone
                                    )
                                  }}
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
                                        [s.uploadIcon]: avatar,
                                        [s.outlineIcon]: !avatar
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
                        placeholder={t(
                          role === "landlord" ? "landlordName" : "companyName"
                        )}
                        onChange={this.handleStateChangeByInput("username")}
                        value={username}
                        className={s.profileInput}
                        startAdornment={<UserIcon className={s.outlineIcon} />}
                        readOnly={editTab !== "generalInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        type="email"
                        variant="outlined"
                        placeholder={t("emailAddress")}
                        onChange={this.handleStateChangeByInput("email")}
                        value={email}
                        className={s.profileInput}
                        startAdornment={<EmailIcon className={s.outlineIcon} />}
                        endAdornment={
                          <Tooltip
                            placement={
                              isWidthDown("xs", width) ? "left" : "bottom"
                            }
                            borderType="primary"
                            title={
                              <TooltipContent
                                title={
                                  <Column>
                                    <Typography textSecondary>
                                      {t("yourEmailConfirmed")}
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
                        readOnly={editTab !== "generalInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t("phoneNumber")}
                        onChange={this.handleStateChangeByInput("phoneNumber")}
                        value={phoneNumber}
                        className={s.profileInput}
                        startAdornment={<PhoneIcon className={s.outlineIcon} />}
                        endAdornment={
                          <Tooltip
                            placement={
                              isWidthDown("xs", width) ? "left" : "bottom"
                            }
                            borderType="errorRed"
                            title={
                              <TooltipContent
                                title={
                                  <Column>
                                    <Typography textErrorRed>
                                      {t("phoneMustApproved")}
                                    </Typography>
                                    <Box paddingTop>
                                      <Link
                                        to="#"
                                        onClick={
                                          this.handleSendPhoneVerification
                                        }
                                      >
                                        {t("sendVerificationCode")}
                                      </Link>
                                    </Box>
                                  </Column>
                                }
                              />
                            }
                            interactive
                          >
                            <div className={s.errorIcon}>!</div>
                          </Tooltip>
                        }
                        readOnly={editTab !== "generalInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t("currentAddress")}
                        onChange={this.handleStateChangeByInput("address")}
                        value={address}
                        className={s.profileInput}
                        startAdornment={
                          <AddressIcon className={s.outlineIcon} />
                        }
                        readOnly={editTab !== "generalInfo"}
                      />
                    </Row>
                    <Row paddingTopHalf>
                      <TextField
                        variant="outlined"
                        placeholder={t("postalCode")}
                        onChange={this.handleStateChangeByInput("postalCode")}
                        value={postalCode}
                        className={s.profileInput}
                        startAdornment={
                          <MapPointerIcon className={s.outlineIcon} />
                        }
                        readOnly={editTab !== "generalInfo"}
                      />
                    </Row>
                    {(editTab === "generalInfo" ||
                      updatingTab === "profile") && (
                      // buttons for save
                      <Row paddingTopHalf>
                        <SaveButtons
                          isUpdating={updatingTab === "profile"}
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
                  role === "landlord" ? "landlordDocuments" : "companyDocuments"
                )}
              </Typography>
            </Row>
            <Typography fontSizeS textSecondary paddingTop>
              {t("provideDocumentsNeeded")}
            </Typography>
            <Row
              fullWidth
              paddingTop
              paddingBottom
              classes={{ box: s.documentsWrapper }}
            >
              {this.documents[role].map(item => (
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
            </Row>
          </TabWrapper>
        </Row>

        {/* login and security tab */}
        <Row fullWidth classes={{ box: s.profileTabWrapper }}>
          <TabWrapper
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
                        placeholder={t("password")}
                        onChange={this.handleStateChangeByInput("password")}
                        value={password}
                        className={s.profileInput}
                        startAdornment={<LockIcon className={s.outlineIcon} />}
                        readOnly={editTab !== "loginAndSecurity"}
                        error={!!passwordError}
                        helperText={passwordError}
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
                        value={confirmPassword}
                        className={s.profileInput}
                        startAdornment={<LockIcon className={s.outlineIcon} />}
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
                            !!passwordError || password !== confirmPassword
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
            <Row classes={{ box: s.panelWrapper }} fullWidth>
              <Typography
                fontSizeS
                textMediumGrey
                classes={{ box: s.panelDivider }}
              >
                {t("securityOptions")}
              </Typography>
            </Row>
            <Row fullWidth paddingTopDouble paddingBottom>
              <Box>
                <StatisticBox
                  title={t("securityQuestion")}
                  statistics={[{ value: <CheckCircle />, variant: "primary" }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t("twoFactorLogin")}
                  statistics={[{ value: "-" }]}
                />
              </Box>
              <Box paddingLeftHalf>
                <StatisticBox
                  title={t("activeSessions")}
                  statistics={[{ value: 2 }]}
                />
              </Box>
            </Row>
          </TabWrapper>
        </Row>

        {/* payments and payouts tab */}
        <Row fullWidth classes={{ box: s.profileTabWrapper }}>
          <TabWrapper
            title={t("paymentsAndPayouts")}
            open={openedTab === "paymentsAndPayouts"}
            onToggleOpen={this.handleToggleOpen("paymentsAndPayouts")}
            isEdit={
              editTab === "paymentsAndPayouts" ||
              updatingTab === "paymentsAndPayouts"
            }
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("paymentsAndPayouts")}
          ></TabWrapper>
        </Row>

        {/* privacy & sharing tab */}
        <Row fullWidth classes={{ box: s.profileTabWrapper }}>
          <TabWrapper
            title={t("privacyAndSharing")}
            open={openedTab === "privacyAndSharing"}
            onToggleOpen={this.handleToggleOpen("privacyAndSharing")}
            isEdit={
              editTab === "privacyAndSharing" ||
              updatingTab === "privacyAndSharing"
            }
            isEditable={editTab === null}
            onToggleEdit={this.handleToggleEdit("privacyAndSharing")}
          ></TabWrapper>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(Profile))
);
