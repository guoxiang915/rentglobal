import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import {
  Box,
  Row,
  Column,
  Stretch,
  Typography,
  Button,
  TextField
} from "../../common/base-components";
import { UploadDocument } from "../../common/base-layouts";
import { Collapse, Grid, Card, CardMedia } from "@material-ui/core";
import {
  MailOutline,
  PersonOutline,
  PhoneOutlined,
  LocationOnOutlined,
  BookOutlined,
  EditOutlined,
  ImageOutlined,
  CloseOutlined,
  CheckOutlined,
  LockOutlined,
  KeyboardArrowUpSharp,
  KeyboardArrowDownSharp
} from "@material-ui/icons";

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

  imageCard: {
    width: 216,
    height: 216,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class Profile extends Component {
  state = {
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
      photo: user.profile.photo || ""
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
          <Box onClick={onToggleOpen}>
            <Typography fontSizeS textMediumGrey paddingRight>
              {title}
            </Typography>
            {open ? (
              <KeyboardArrowUpSharp
                color="secondary"
                className={classes.buttonIcon}
              />
            ) : (
              <KeyboardArrowDownSharp
                color="secondary"
                className={classes.buttonIcon}
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
              <CloseOutlined className={classes.buttonIcon} />
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
              <EditOutlined className={classes.buttonIcon} />
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

  handleStateChangeByEvent = field => value => () => {
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

  render() {
    const { user, classes, t } = this.props;
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
                        <Card variant="outlined" className={classes.imageCard}>
                          {user.profile_image ? (
                            <CardMedia image={user.profile_image} title="" />
                          ) : (
                            <ImageOutlined color="secondary" fontSize="large" />
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
                        startAdornment={<PersonOutline color="secondary" />}
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
                        startAdornment={<MailOutline color="secondary" />}
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
                        startAdornment={<PhoneOutlined color="secondary" />}
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
                        startAdornment={<BookOutlined color="secondary" />}
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
                          <LocationOnOutlined color="secondary" />
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
                            onClick={() =>
                              this.handleStateChange("isEditLandlordInfo")(
                                false
                              )
                            }
                          >
                            <CloseOutlined className={classes.buttonIcon} />
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
                            <CheckOutlined className={classes.buttonIcon} />
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
                  onUpload={() => {}}
                  onDelete={() => {}}
                />
              </Box>
              <Box paddingRightHalf>
                <UploadDocument
                  title={t("checkSpecimen")}
                  documents={this.state.checkSpecimen}
                  onDelete={() => {}}
                />
              </Box>
              <Box paddingRightHalf>
                <UploadDocument
                  title={t("lease")}
                  documents={this.state.lease}
                  onUpload={() => {}}
                  onDelete={() => {}}
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
                        startAdornment={<LockOutlined color="secondary" />}
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
                        startAdornment={<LockOutlined color="secondary" />}
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
                              <CloseOutlined className={classes.buttonIcon} />
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
                              <CheckOutlined />
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

export default withStyles(styleSheet)(withTranslation("common")(Profile));
