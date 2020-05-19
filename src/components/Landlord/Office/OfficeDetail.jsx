import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace } from "@material-ui/icons";
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
  Divider,
} from "../../../common/base-components";
import {
  OfficeTitlebar,
  OfficeGeneralInfo,
  OfficeGallery,
  OfficeItem,
} from "../../../common/base-layouts";
import { ShareOfficeDialog } from "../../Layout/Dialogs";
import Carousel from "@brainhubeu/react-carousel";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  fullWidth: {
    width: "100%",
  },

  addOfficeTabWrapper: {
    paddingTop: 20,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 8,
      paddingBottom: 24,
    },
  },

  similarOfficesWrapper: {
    paddingTop: 46,
    paddingBottom: 74,
  },

  similarOffices: {
    paddingTop: 54,
    overflow: "hidden",
  },
});

class OfficeDetail extends PureComponent {
  static propTypes = {
    officeId: PropTypes.string.isRequired,
    getOfficeById: PropTypes.func.isRequired,
    getSimilarOffices: PropTypes.func.isRequired,
    onEditOffice: PropTypes.func,
    onDeleteOffice: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    office: {},
    dialog: null,
    similarOffices: [],
  };

  titlebarActions = [
    {
      title: this.props.t("share"),
      icon: () => <ShareIcon style={{ width: 13, height: 15 }} />,
      styles: {
        variant: null,
        link: "secondary",
        background: "secondaryLight",
      },
      revertStyles: { variant: "primary", link: null, background: null },
      onClick: this.handleShare,
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
        shadow: true,
      },
      revertStyles: { variant: "secondary" },
      onClick: this.handleCheckVisit,
      hideIcon: true,
    },
  ];

  /** Get office from id */
  componentDidMount() {
    const { officeId } = this.props;
    this.props.getOfficeById(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ office: response.data });
      }
    });

    /** Get similar offices */
    this.props.getSimilarOffices(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ similarOffices: response.data });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { officeId } = this.props;

    if (officeId !== prevProps.officeId) {
      this.props.getOfficeById(officeId).then((response) => {
        if (response.status === 200) {
          this.setState({ office: response.data });
        }
      });

      /** Get similar offices */
      this.props.getSimilarOffices(officeId).then((response) => {
        if (response.status === 200) {
          this.setState({ similarOffices: response.data });
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
    this.props.unpublishOffice(this.state.office._id).then((response) => {
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
    this.setState({
      dialog: (
        <ShareOfficeDialog
          office={this.props.office}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };

  /** Check visit availabilites */
  handleCheckVisit = () => {};

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { office, dialog, similarOffices } = this.state;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Helmet>
          <meta property='og:title' content={office.title} />
          {office.coverPhotos && office.coverPhotos.length > 0 && (
            <meta
              property='og:image'
              content={office.coverPhotos[0].desktop?.bucketPath}
            />
          )}
        </Helmet>
        <Row fullWidth paddingBottom>
          {/** title */}
          <Typography fontSizeM textSecondary>
            {t("office")}
          </Typography>
          <Stretch />
          <Button
            link='secondary'
            background='secondaryLight'
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        <Row fullWidth paddingBottom>
          {/** Show unpublish button */}
          <Button
            link='errorRedNormal'
            background='errorRedLight'
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
            link='errorRedNormal'
            background='errorRedLight'
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
            link='primary'
            background='normalLight'
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

        <Row fullWidth paddingBottom>
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
          {office && <OfficeGeneralInfo office={office} />}
        </Row>

        <Row fullWidth paddingBottomDouble>
          {office && <OfficeGallery coverPhotos={office.coverPhotos} />}
        </Row>

        {/** Show similar offices */}
        <Divider />
        <Row fullWidth classes={{ box: s.similarOfficesWrapper }}>
          <Column fullWidth alignChildrenStart>
            <Typography fontSizeM textBlackGrey fontWeightBold>
              {t("similarOffice")}
            </Typography>
            <Row fullWidth classes={{ box: s.similarOffices }}>
              <div style={{ width: "100%", height: "100%" }}>
                <Carousel itemWidth={255} offset={0} keepDirectionWhenDragging>
                  {similarOffices.map((office, index) => (
                    <div
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        height: "100%",
                      }}
                      key={index}
                    >
                      <OfficeItem office={office} setFavorite />
                    </div>
                  ))}
                </Carousel>
              </div>
            </Row>
          </Column>
        </Row>

        <Row fullWidth classes={{ box: s.addOfficeTabWrapper }}>
          {/** Show unpublish button */}
          <Button
            link='errorRedNormal'
            background='errorRedLight'
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
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeDetail))
);
