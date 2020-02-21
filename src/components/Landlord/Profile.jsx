import React, { Component, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import { Switch, Route, Redirect } from "react-router-dom";
import AppSidebar from "../../containers/Layout/AppSidebar";
import {
  Box,
  Row,
  Column,
  Stretch,
  Typography,
  Button,
  Link,
  TextField,
  HorizontalDivider
} from "../../common/base-components";
import { UploadDocument } from "../../common/base-layouts";
import { Icon, Collapse, Grid, Card, CardMedia } from "@material-ui/core";
import {
  MailOutline,
  PersonOutline,
  PhoneOutlined,
  LocationOnOutlined,
  BookOutlined,
  EditOutlined,
  ImageOutlined,
  CloseOutlined
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
    paddingTop: theme.spacing(5)
  },

  tabExpandIcon: {},

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
    landlordName: "",
    emailAddress: "",
    phoneNumber: "",
    currentAddress: "",
    postalCode: "",
    photo: "",
    legalStatusDocument: [],
    checkSpecimen: [],
    lease: [],
    password: "",
    confirmPassword: "",

    isEditLandlordInfo: false,
    isEditSecurityInfo: false,
    isEditPaymentsInfo: false,
    isEditPrivacyInfo: false
  };

  renderProfileTab = ({
    children,
    classes,
    isEdit,
    onToggleEdit,
    open,
    t,
    title
  }) => {
    const [expanded, setExpanded] = useState(!!open);

    return (
      <Column fullWidth alignChildrenStart>
        <Row fullWidth>
          <Box onClick={() => setExpanded(!expanded)}>
            <Typography fontSizeS textMediumGrey paddingRight>
              {title}
            </Typography>
            <Icon color="secondary" className={classes.tabExpandIcon}>
              {expanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </Icon>
          </Box>
          <Stretch />
          {isEdit ? (
            <Button
              link="errorRedLight"
              background="secondaryLight"
              onClick={onToggleEdit}
            >
              <CloseOutlined />
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
              <EditOutlined />
              <Typography paddingLeft fontSizeS>
                {t("edit")}
              </Typography>
            </Button>
          )}
        </Row>
        <Collapse in={expanded} className={classes.fullWidth}>
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
    this.handleStateChangeByInput(field, event.target.value);
  };

  handleStateChangeByEvent = field => value => () => {
    this.handleStateChange(field, value);
  };

  render() {
    const { user, classes, t } = this.props;
    const ProfileTab = this.renderProfileTab;

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
            open={true}
            isEdit={this.state.isEditLandlordInfo}
            onToggleEdit={() =>
              this.handleStateChange("isEditLandlordInfo")(
                !this.state.isEditLandlordInfo
              )
            }
          >
            <Row fullWidth>
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
                      onChange={this.handleStateChangeByInput("landlordName")}
                      value={this.state.landlordName}
                      className={classes.profileInput}
                      startAdornment={<PersonOutline color="secondary" />}
                    />
                  </Row>
                  <Row paddingTopHalf>
                    <TextField
                      variant="outlined"
                      placeholder={t("emailAddress")}
                      onChange={this.handleStateChangeByInput("emailAddress")}
                      value={this.state.emailAddress}
                      className={classes.profileInput}
                      startAdornment={<MailOutline color="secondary" />}
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
                    />
                  </Row>
                  <Row paddingTopHalf>
                    <TextField
                      variant="outlined"
                      placeholder={t("currentAddress")}
                      onChange={this.handleStateChangeByInput("currentAddress")}
                      value={this.state.currentAddress}
                      className={classes.profileInput}
                      startAdornment={<BookOutlined color="secondary" />}
                    />
                  </Row>
                  <Row paddingTopHalf>
                    <TextField
                      variant="outlined"
                      placeholder={t("postalCode")}
                      onChange={this.handleStateChangeByInput("postalCode")}
                      value={this.state.postalCode}
                      className={classes.profileInput}
                      startAdornment={<LocationOnOutlined color="secondary" />}
                    />
                  </Row>
                </Grid>
              </Grid>
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
            <Row fullWidth paddingTop>
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
            isEdit={this.state.isEditSecurityInfo}
            onToggleEdit={() =>
              this.handleStateChange("isEditSecurityInfo")(
                !this.state.isEditSecurityInfo
              )
            }
          ></ProfileTab>
        </Row>

        {/* payments and payouts tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            classes={classes}
            t={t}
            title={t("paymentsAndPayouts")}
            isEdit={this.state.isEditPaymentsInfo}
            onToggleEdit={() =>
              this.handleStateChange("isEditPaymentsInfo")(
                !this.state.isEditPaymentsInfo
              )
            }
          ></ProfileTab>
        </Row>

        {/* privacy & sharing tab */}
        <Row fullWidth classes={{ box: classes.profileTabWrapper }}>
          <ProfileTab
            classes={classes}
            t={t}
            title={t("privacyAndSharing")}
            isEdit={this.state.isEditPrivacyInfo}
            onToggleEdit={() =>
              this.handleStateChange("isEditSecurityInfo")(
                !this.state.isEditSecurityInfo
              )
            }
          ></ProfileTab>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(Profile));
