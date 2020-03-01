import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Box,
  Row,
  Column,
  Stretch,
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
  ArrowUpIcon,
  ArrowDownIcon,
  EditIcon,
  CloseIcon,
  CheckIcon,
  LockIcon,
  UploadIcon
} from "../../common/base-components";
import { UploadDocument } from "../../common/base-layouts";
import { Collapse, Grid, Card } from "@material-ui/core";
import Dropzone from "react-dropzone";

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

  landlordInfoForm: {
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
    position: 'relative',
    "&:hover": {
      background: "#0000000a"
    }
  },

  dropzone: {
    width: "90%",
    height: "90%",
    border: `3px dashed ${theme.colors.primary.borderGrey}`,
    position: "absolute",
    top: "5%",
    left: "5%"
  },

  uploadIcon: {
    color: theme.colors.primary.borderGrey
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
    photo: "",
    legalStatusDocument: [],
    checkSpecimen: [],
    lease: [],
    password: "",
    passwordError: "",
    confirmPassword: "",

    isEditLandlordInfo: false,
    isEditSecurityInfo: false,
    isEditPaymentsInfo: false,
    isEditPrivacyInfo: false,
    openedTab: "landlordInfo"
  };

  UNSAFE_componentWillReceiveProps(newProps) {
    const { user } = newProps;
    if (!user.profile) {
      user.profile = {};
    }
    if (!user.profile.address) {
      user.profile.address = {};
    }

    this.setState({
      ...this.state,
      username: user.username || "",
      email: user.email || "",
      phoneNumber: user.profile.phoneNumber || "",
      address: user.profile.address.fullAddress || "",
      postalCode: user.profile.address.postalCode || "",
      photo: user.profile.photo || "",
      userImage: user.profileImage || null
    });
  }

  renderProfileTab = ({
    children,
    classes,
    isEdit,
    open,
    onToggleEdit,
    onToggleOpen,
    t,
    title
  }) => {
    return (
      <Column fullWidth alignChildrenStart>
        <Row fullWidth>
          <Box onClick={onToggleOpen} alignChildrenCenter>
            <Typography fontSizeS textMediumGrey paddingRight>
              {title}
            </Typography>
            {open ? (
              <ArrowUpIcon color="secondary" style={{ width: 12, height: 7 }} />
            ) : (
              <ArrowDownIcon
                color="secondary"
                style={{ width: 12, height: 7 }}
              />
            )}
          </Box>
          <Stretch />
          {isEdit ? (
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={onToggleEdit}
            >
              <CloseIcon style={{ width: 9, height: 9 }} />
              <Typography paddingLeft fontSizeS>
                {t("cancel")}
              </Typography>
            </Button>
          ) : (
            <Button
              link="primary"
              background="normalLight"
              inverse
              onClick={onToggleEdit}
            >
              <EditIcon style={{ width: 16, height: 16 }} />
              <Typography paddingLeft fontSizeS>
                {t("edit")}
              </Typography>
            </Button>
          )}
        </Row>
        <Collapse in={open} className={classes.fullWidth}>
          <Column paddingTopHalf alignChildrenStart>
            {children}
          </Column>
        </Collapse>
      </Column>
    );
  };

  handleStateChange = field => value => {
    this.setState({ [field]: value });
  };

  handleStateChangeByInput = field => event => {
    this.handleStateChange(field)(event.target.value);
  };

  handleStateChangeByEvent = (field, value) => () => {
    this.handleStateChange(field)(value);
  };

  handleSaveLandlordInfo = e => {
    this.props.mappedupdateUser({
      username: this.state.username,
      email: this.state.email,
      profile: {
        phoneNumber: this.state.phoneNumber,
        address: {
          fullAddress: this.state.address,
          postalCode: this.state.postalCode
        },
        photo: this.state.photo
      }
    });
  };

  handleSaveSecurityInfo = e => {
    if (this.state.password === this.state.confirmPassword) {
      this.props.mappedupdateUser({
        password: this.state.password,
        passwordLastUpdated: new Date().getTime()
      });
    }
  };

  handleToggleOpen = tab => () => {
    if (this.state.openedTab === tab) {
      this.setState({ openedTab: null });
    } else {
      this.setState({ openedTab: tab });
    }
  };

  handleToggleEdit = tab => editName => () => {
    this.setState({ openedTab: tab });
    this.setState({ [editName]: !this.state[editName] });
  };

  handleSendPhoneVerification = () => {};

  handleUploadUserImage = userImage => {
    this.props.uploadFile(userImage, "public-read").then(response => {
      this.setState({ userImage: response.data });
    });
  };

  handleUploadDocument = docType => docFile => {
    this.props.uploadFile(docFile).then(response => {
      this.setState({ [docType]: response });
    });
  };

  render() {
    const { user, width, classes, t } = this.props;
    const { openedTab } = this.state;
    const ProfileTab = this.renderProfileTab;

    let passwordLastUpdated = "-";
    if (user.passwordLastUpdated) {
      passwordLastUpdated = new Date(user.passwordLastUpdated);
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

        {/* landlord info tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            classes={classes}
            t={t}
            title={t("landlordInfo")}
            open={openedTab === "landlordInfo"}
            onToggleOpen={this.handleToggleOpen("landlordInfo")}
            isEdit={this.state.isEditLandlordInfo}
            onToggleEdit={this.handleToggleEdit("landlordInfo")(
              "isEditLandlordInfo"
            )}
          >
            <Row fullWidth>
              <form
                // onSubmit={this.handleSaveLandlordInfo}
                noValidate
                autoComplete="off"
                className={classes.landlordInfoForm}
              >
                <Grid container direction="row-reverse">
                  <Grid item xs={12} sm={6}>
                    <Column fullWidth paddingTop>
                      <Row classes={{ box: classes.imageWrapper }}>
                        <Card variant="outlined" className={classes.avatarCard}>
                          {this.state.userImage ? (
                            <img
                              src={this.state.userImage.bucketPath}
                              alt="User"
                              className={classes.avatarImage}
                            />
                          ) : (
                            !this.state.isEditLandlordInfo && (
                              <UserIcon
                                fontSize="large"
                                className={classes.outlineIcon}
                              />
                            )
                          )}
                          {this.state.isEditLandlordInfo && (
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
                                  <UploadIcon
                                    fontSize="large"
                                    className={clsx(classes.uploadIcon, !this.state.userImage && classes.outlineIcon)}
                                  />
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
                        placeholder={t("landlordName")}
                        onChange={this.handleStateChangeByInput("username")}
                        value={this.state.username}
                        className={classes.profileInput}
                        startAdornment={
                          <UserIcon className={classes.outlineIcon} />
                        }
                        readOnly={!this.state.isEditLandlordInfo}
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
                            <div className={classes.approveIcon}>
                              <CheckIcon style={{ width: 11, height: 8 }} />
                            </div>
                          </Tooltip>
                        }
                        readOnly={!this.state.isEditLandlordInfo}
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
                            <div className={classes.errorIcon}>!</div>
                          </Tooltip>
                        }
                        readOnly={!this.state.isEditLandlordInfo}
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
                        readOnly={!this.state.isEditLandlordInfo}
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
                        readOnly={!this.state.isEditLandlordInfo}
                      />
                    </Row>
                    {this.state.isEditLandlordInfo && (
                      // buttons for save
                      <Row paddingTopHalf>
                        <Box paddingRightDouble>
                          <Button
                            link="errorRed"
                            background="secondaryLight"
                            onClick={this.handleStateChangeByEvent(
                              "isEditLandlordInfo",
                              false
                            )}
                          >
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
                            onClick={this.handleSaveLandlordInfo}
                          >
                            <CheckIcon style={{ width: 16, height: 12 }} />
                            <Typography paddingLeft fontSizeS>
                              {t("save")}
                            </Typography>
                          </Button>
                        </Box>
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
                {t("landlordDocuments")}
              </Typography>
            </Row>
            <Typography fontSizeS textSecondary paddingTop>
              {t("provideDocumentsNeeded")}
            </Typography>
            <Row fullWidth paddingTop paddingBottom verticalScroll>
              <Box paddingRightHalf>
                <UploadDocument
                  title={t("legalStatusDocument")}
                  documents={this.state.legalStatusDocument}
                />
              </Box>
              <Box paddingRightHalf>
                <UploadDocument
                  title={t("checkSpecimen")}
                  documents={this.state.checkSpecimen}
                />
              </Box>
              <Box paddingRightHalf>
                <UploadDocument
                  title={t("lease")}
                  documents={this.state.lease}
                />
              </Box>
            </Row>
          </ProfileTab>
        </Row>

        {/* login and security tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            classes={classes}
            t={t}
            title={t("loginAndSecurity")}
            open={openedTab === "loginAndSecurity"}
            onToggleOpen={this.handleToggleOpen("loginAndSecurity")}
            isEdit={this.state.isEditSecurityInfo}
            onToggleEdit={this.handleToggleEdit("loginAndSecurity")(
              "isEditSecurityInfo"
            )}
          >
            <Row fullWidth>
              <form
                // onSubmit={this.handleSaveLandlordInfo}
                noValidate
                autoComplete="off"
                className={classes.landlordInfoForm}
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
                        readOnly={!this.state.isEditSecurityInfo}
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
                        readOnly={!this.state.isEditSecurityInfo}
                      />
                    </Row>
                    <Row paddingTop>
                      {this.state.isEditSecurityInfo ? (
                        // buttons for save
                        <>
                          <Box paddingRightDouble>
                            <Button
                              link="errorRed"
                              background="secondaryLight"
                              onClick={() =>
                                this.handleStateChange("isEditSecurityInfo")(
                                  false
                                )
                              }
                            >
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
                              onClick={this.handleSaveSecurityInfo}
                              disabled={
                                !!this.state.passwordError ||
                                this.state.password !==
                                  this.state.confirmPassword
                              }
                            >
                              <CheckIcon style={{ width: 16, height: 12 }} />
                              <Typography paddingLeft fontSizeS>
                                {t("save")}
                              </Typography>
                            </Button>
                          </Box>
                        </>
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
                {t("landlordDocuments")}
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
            classes={classes}
            t={t}
            title={t("paymentsAndPayouts")}
            open={openedTab === "paymentsAndPayouts"}
            onToggleOpen={this.handleToggleOpen("paymentsAndPayouts")}
            isEdit={this.state.isEditPaymentsInfo}
            onToggleEdit={this.handleToggleEdit("paymentsAndPayouts")(
              "isEditPaymentsInfo"
            )}
          ></ProfileTab>
        </Row>

        {/* privacy & sharing tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            classes={classes}
            t={t}
            title={t("privacyAndSharing")}
            open={openedTab === "privacyAndSharing"}
            onToggleOpen={this.handleToggleOpen("privacyAndSharing")}
            isEdit={this.state.isEditPrivacyInfo}
            onToggleEdit={this.handleToggleEdit("isEditPrivacyInfo")(
              "privacyAndSharing"
            )}
          ></ProfileTab>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(Profile))
);
