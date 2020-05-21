import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace } from "@material-ui/icons";
import { Tabs, Tab } from "@material-ui/core";
import { Helmet } from "react-helmet";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  EyeDisIcon,
  DeleteIcon,
  EditIcon,
  ShareIcon,
  ReviewIcon,
  CalendarIcon,
  GeneralInfoIcon,
  ReportIcon
} from "../../../common/base-components";
import {
  OfficeTitlebar,
  OfficeGeneralInfo,
  OfficeGallery,
  OfficeReviews
} from "../../../common/base-layouts";
import { ShareOfficeDialog } from "../../Layout/Dialogs";

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

  addOfficeTabWrapper: {
    paddingTop: 20,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 8,
      paddingBottom: 24
    }
  },

  tabs: {
    marginTop: 12,
    width: "100%",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  indicator: {
    borderRadius: 2,
    height: 4
  },

  tab: {
    textTransform: "none",
    minWidth: 0,
    padding: "16px 0px",
    marginRight: 28,
    [theme.breakpoints.down("xs")]: {
      marginRight: 16
    }
  }
});

class OfficeDetail extends PureComponent {
  static propTypes = {
    officeId: PropTypes.string.isRequired,
    getOfficeById: PropTypes.func.isRequired,
    onEditOffice: PropTypes.func,
    onDeleteOffice: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    office: {},
    dialog: null,
    currentTab: "generalInfo"
  };

  titlebarActions = [];

  /** Get office from id */
  componentDidMount() {
    const { officeId } = this.props;
    this.props.getOfficeById(officeId).then(response => {
      if (response.status === 200) {
        this.setState({ office: response.data });

        this.titlebarActions = [
          {
            title: this.props.t("share"),
            icon: () => <ShareIcon style={{ width: 13, height: 15 }} />,
            styles: {
              variant: null,
              link: "secondary",
              background: "secondaryLight"
            },
            revertStyles: { variant: "primary", link: null, background: null },
            onClick: this.handleShare
          },
          {
            title: this.props.t("checkVisitAvailabilites"),
            // icon: () => <CalendarIcon style={{ width: 13, height: 15 }} />,
            icon: () => (
              <Typography fontSizeS textSecondary>
                {this.props.t("visit")}
              </Typography>
            ),
            styles: {
              variant: "primary",
              shadow: true
            },
            revertStyles: { variant: "secondary" },
            onClick: this.handleCheckVisit,
            hideIcon: true
          }
        ];
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { officeId } = this.props;

    if (officeId !== prevProps.officeId) {
      this.props.getOfficeById(officeId).then(response => {
        if (response.status === 200) {
          this.setState({ office: response.data });
        }
      });
    }
  }

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate("offices");
  };

  /** Unpublish office */
  handleUnpublish = () => {
    this.props.unpublishOffice(this.state.office._id).then(response => {
      if (response.status === 200) {
        this.props.navigate(
          "offices/add",
          `${this.state.office._id}/${this.state.office.location.country}-${this.state.office.officeType}-${this.state.office.numberOfEmployees}`
        );
      }
    });
  };

  /** Event for edit office */
  handleEditOffice = () => {
    this.props.onEditOffice(this.state.office);
  };

  /** Event for delete office */
  handleDeleteOffice = () => {
    this.props.onDeleteOffice(this.state.office._id);
  };

  /** Share office */
  handleShare = () => {
    console.log("Share dialog");
    this.setState({
      dialog: (
        <ShareOfficeDialog
          office={this.state.office}
          onClose={this.handleCloseDialog}
        />
      )
    });
  };

  /** Check visit availabilites */
  handleCheckVisit = () => {};

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  handleChangeTab = (e, currentTab) => {
    this.setState({ currentTab });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { office, dialog, currentTab } = this.state;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Helmet>
          <meta property="og:title" content={office.title} />
          {office.coverPhotos && office.coverPhotos.length > 0 && (
            <meta
              property="og:image"
              content={office.coverPhotos[0].desktop?.bucketPath}
            />
          )}
        </Helmet>
        <Row fullWidth style={{ marginBottom: 36 }}>
          {/** title */}
          <Typography fontSizeM textSecondary>
            {t("office")}
          </Typography>
          <Stretch />
          <Button
            link="secondary"
            background="secondaryLight"
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        <Row fullWidth paddingBottomDouble>
          {/** Show unpublish button */}
          <Button
            link="errorRedNormal"
            background="errorRedLight"
            inverse
            onClick={this.handleUnpublish}
            variant={isWidthDown("xs", width) ? "icon" : ""}
          >
            <EyeDisIcon style={{ width: 16, height: 16 }} />
            <Typography fontSizeS paddingLeft>
              {t("unpublish")}
            </Typography>
          </Button>
          {office.published && !isWidthDown("xs", width) && (
            <Typography paddingLeft fontSizeS textMediumGrey>
              {t("availableForLease")}
            </Typography>
          )}
          <Stretch />

          {/** Show delete button */}
          <Button
            link="errorRedNormal"
            background="errorRedLight"
            inverse
            onClick={this.handleDeleteOffice}
            variant={isWidthDown("xs", width) ? "icon" : ""}
          >
            <DeleteIcon style={{ width: 20, height: 18 }} />
            {!isWidthDown("xs", width) ? (
              <Typography paddingLeft fontSizeS>
                {t("delete")}
              </Typography>
            ) : null}
          </Button>
          <Box paddingLeft />

          {/** Show edit button */}
          <Button
            link="primary"
            background="normalLight"
            inverse
            onClick={this.handleEditOffice}
            variant={isWidthDown("xs", width) ? "icon" : ""}
          >
            <EditIcon style={{ width: 20, height: 18 }} />
            {!isWidthDown("xs", width) ? (
              <Typography paddingLeft fontSizeS>
                {t("edit")}
              </Typography>
            ) : null}
          </Button>
        </Row>

        <Row fullWidth style={{ marginBottom: 72 }}>
          {office && (
            <OfficeTitlebar
              office={office}
              actions={this.titlebarActions}
              maxWidth={
                Math.min(
                  1024,
                  window.innerWidth - (isWidthDown("xs", width) ? 0 : 44)
                ) - (isWidthDown("sm", width) ? 0 : 167)
              }
            />
          )}
        </Row>

        <Row fullWidth paddingBottom>
          {/** Tabs */}
          <Tabs
            value={currentTab}
            onChange={this.handleChangeTab}
            aria-label="wrapped label tabs"
            indicatorColor="primary"
            textColor="primary"
            classes={{ root: s.tabs, indicator: s.indicator }}
          >
            <Tab
              value={"generalInfo"}
              label={
                <Row>
                  <GeneralInfoIcon style={{ width: 16, height: 18 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("generalInformation")}
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
            <Tab
              value={"reviews"}
              label={
                <Row>
                  <ReviewIcon style={{ width: 18, height: 16 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("reviews")}
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
            <Tab
              value={"calendar"}
              label={
                <Row>
                  <CalendarIcon style={{ width: 17, height: 16 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("calendarEvents")}
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
            <Tab
              value={"report"}
              label={
                <Row>
                  <ReportIcon style={{ width: 18, height: 20 }} />
                  <Typography paddingLeftHalf fontSizeS>
                    {t("report")}
                  </Typography>
                </Row>
              }
              classes={{ root: s.tab }}
            />
          </Tabs>
        </Row>

        <Row fullWidth paddingBottom>
          {office && currentTab === "generalInfo" && (
            <OfficeGeneralInfo office={office} />
          )}
          {office && currentTab === "reviews" && (
            <OfficeReviews officeId={this.props.officeId} />
          )}
        </Row>

        <Row fullWidth paddingBottomDouble>
          {office && <OfficeGallery coverPhotos={office.coverPhotos} />}
        </Row>

        <Row fullWidth classes={{ box: s.addOfficeTabWrapper }}>
          {/** Show unpublish button */}
          <Button
            link="errorRedNormal"
            background="errorRedLight"
            inverse
            onClick={this.handleUnpublish}
            variant={isWidthDown("xs", width) ? "icon" : ""}
          >
            <EyeDisIcon style={{ width: 16, height: 16 }} />
            <Typography fontSizeS paddingLeft>
              {t("unpublish")}
            </Typography>
          </Button>
        </Row>

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeDetail))
);
