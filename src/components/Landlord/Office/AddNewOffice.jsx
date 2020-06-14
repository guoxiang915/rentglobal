import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace, Launch } from "@material-ui/icons";
import {
  Step,
  Stepper,
  StepConnector,
  StepLabel,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  CheckIcon,
  CloseIcon,
  EyeIcon,
  DeleteIcon,
  EditIcon,
  ConfirmDialog,
} from "../../../common/base-components";
import {
  GeneralInfoForm,
  PictureGalleryForm,
  ServicesAmenitiesForm,
  VisitAvailabilityForm,
} from "./Forms";
import OfficeDetailForm from "../../Layout/OfficeDetailForm";

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

  stepper: {
    width: "133%",
    background: "transparent",
    padding: 0,
    marginLeft: "calc(-16.67% + 35px)",
    marginRight: "calc(-16.67% + 35px)",
  },

  stepIcon: {
    width: 45,
    height: 45,
    color: theme.colors.primary.grey,
    background: theme.colors.primary.whiteGrey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    fontSize: "20px",
    borderRadius: "50%",
  },

  stepActiveIcon: {
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainShadow}`,
  },

  formButtons: {
    paddingTop: 160,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 64,
    },
  },
});

/** Stepper connector component */
const StepperConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
    marginLeft: 2,
    marginRight: 2,
  },

  active: {
    "& $line": {
      height: 1.5,
      background: theme.colors.primary.mainColor,
    },
  },

  completed: {
    "& $line": {
      height: 1.5,
      background: theme.colors.primary.mainColor,
    },
  },

  line: {
    height: 1,
    border: 0,
    borderRadius: 0.5,
    backgroundColor: theme.colors.primary.borderGrey,
  },
}))(StepConnector);

/** Stepper icon component */
const StepperIcon = ({ classes, icon, active, completed }) => (
  <Box
    classes={{
      box: clsx(
        classes.stepIcon,
        (active || completed) && classes.stepActiveIcon
      ),
    }}
    alignChildrenCenter
    justifyChildrenCenter
  >
    <Typography fontSizeM fontWeightBold>
      {icon}
    </Typography>
  </Box>
);

class AddNewOffice extends PureComponent {
  static propTypes = {
    officeId: PropTypes.string,
    getOfficeById: PropTypes.func,
    navigate: PropTypes.func,
    uploadFile: PropTypes.func,
    createOffice: PropTypes.func,
    updateOffice: PropTypes.func,
    createOfficeServicesAmenities: PropTypes.func,
    editMode: PropTypes.bool,
    onEditOffice: PropTypes.func,
    onDeleteOffice: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    snackMsg: null,
    office: {},
    error: null,
    isLoading: false,
    currentStep: 0,
    dialog: null,
  };

  steps = [
    { title: this.props.t("generalInfo"), form: GeneralInfoForm },
    { title: this.props.t("pictureGallery"), form: PictureGalleryForm },
    {
      title: this.props.t("servicesAndAmenities"),
      form: ServicesAmenitiesForm,
    },
    { title: this.props.t("visitAvailability"), form: VisitAvailabilityForm },
  ];

  /**
   * Get office info from api and navigate the appropriate step
   * @member
   */
  componentDidMount() {
    const { officeId, editMode = false, getOfficeById } = this.props;
    if (officeId) {
      getOfficeById(officeId).then((response) => {
        if (response.status === 200) {
          const office = response.data;
          let currentStep = 0;
          if (!editMode) currentStep = this.steps.length;
          this.setState({ office, currentStep });
        }
      });
    }
  }

  /**
   * Navigate page
   * @member
   * @param {string} path Path to navigate
   */
  navigate = (path) => () => {
    this.props.navigate(path);
  };

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

  /**
   * Update office info
   * @member
   */
  handleChangeOfficeField = (field, value) => {
    const office = { ...this.state.office, [field]: value };
    this.setState({ office });
  };

  /** Cancel adding new office */
  cancelAddOffice = () => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant='error'
          text={this.props.t("confirmLeavePage")}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("leave")}</Typography>
            </React.Fragment>
          }
          onConfirm={this.navigate("offices")}
          onClose={this.closeDialog}
        />
      ),
    });
  };

  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Goto previous step */
  backCurrentStep = () => {
    if (this.state.currentStep === 0) {
      this.cancelAddOffice();
    } else {
      this.setState({ currentStep: this.state.currentStep - 1 });
    }
  };

  /** Save office info */
  saveCurrentStep = (office) => {
    this.setState({ isLoading: false });
    let result = Promise.reject("");

    switch (this.state.currentStep) {
      case 0:
        if (office._id) {
          result = this.props.updateOffice(office);
        } else {
          result = this.props.createOffice(office);
        }
        break;
      case 1:
        if (office) {
          result = Promise.resolve({ data: office });
        }
        break;
      case 2:
        if (office) {
          result = this.props.createOfficeServicesAmenities(
            this.state.office._id,
            office.servicesAndAmenities
          );
        }
        break;
      case 3:
        if (office) {
          const visitHours = office;
          result = this.props.saveVisibility(this.state.office._id, visitHours);
        }
        break;
      case 4:
        if (office) {
          result = this.props.publishOffice(this.state.office._id);
        }
        break;
      default:
        break;
    }

    return result.then(
      (response) => {
        this.setState({
          isLoading: false,
          office: response.data,
          error: null,
          snackMsg: {
            severity: "success",
            msg: this.props.t("savedSuccessfully"),
          },
        });
        return Promise.resolve(response);
      },
      (error) => {
        this.setState({
          isLoading: false,
          error: error.response.data.msg,
          snackMsg: {
            severity: "error",
            msg: this.props.t("errorInValidation"),
          },
        });
        return Promise.reject(error);
      }
    );
  };

  /** Save and next current step */
  saveAndNextCurrentStep = (office, t) => {
    const { currentStep } = this.state;
    if (office) {
      /** Check photos count when current step is 1 */
      if (
        currentStep === this.steps.length &&
        (!office.coverPhotos ||
          office.coverPhotos.length < 3 ||
          office.coverPhotos.length > 15)
      ) {
        this.setState({
          snackMsg: {
            severity: "error",
            msg: this.props.t("photoCountLimitError"),
          },
        });
        return;
      }
      this.saveCurrentStep(office).then(() => {
        if (currentStep === this.steps.length) {
          // navigate to office detail page
          this.props.navigate(
            "offices",
            `${office._id}/${office.location.country}/${t(office.officeType)}/${
              office.numberOfEmployees
            } ${t("employees")}/${office.refId}-${office.title}`.replace(
              /\s+/g,
              "-"
            )
          );
        } else {
          this.setState({ currentStep: currentStep + 1 });
        }
      });
    }
  };

  /** Event for edit office */
  handleEditOffice = () => {
    this.props.onEditOffice(this.state.office);
  };

  /** Event for delete office */
  handleDeleteOffice = () => {
    this.props.onDeleteOffice(this.state.office._id);
  };

  /** Event for preview office */
  handlePreviewOffice = () => {
    const { office } = this.state;
    window.open(
      [
        "/offices",
        office.refId,
        office.location.country,
        this.props.t(office.officeType),
        office.numberOfEmployees + "-" + this.props.t("employees"),
        office.refId + "-" + office.title,
      ]
        .join("/")
        .replace(/\s+/g, "-"),
      "_blank"
    );
  };

  /** Show snack msg */
  handleShowSnackMsg = (snackMsg) => {
    this.setState({ snackMsg });
  };

  /** Close snack msg */
  handleCloseSnackMsg = () => {
    this.setState({ snackMsg: null });
  };

  /** Upload office cover photoes */
  uploadOfficePhoto = (officeId, file) => {
    return this.props.uploadOfficePhoto(officeId, file).then((response) => {
      if (response.status === 200) {
        this.setState({ office: response.data });
      }
      return response;
    });
  };

  /** Delete office cover photoes */
  deleteOfficePhoto = (officeId, fileId) => {
    return this.props.deleteOfficePhoto(officeId, fileId).then((response) => {
      if (response.status === 200) {
        this.setState({ office: response.data });
      }
      return response;
    });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width, editMode = false } = this.props;
    const {
      office,
      error,
      isLoading,
      currentStep,
      dialog,
      snackMsg,
    } = this.state;
    const CurrentForm =
      currentStep < this.steps.length
        ? this.steps[currentStep].form
        : OfficeDetailForm;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          {/** title */}
          <Typography fontSizeM textSecondary>
            {currentStep === this.steps.length
              ? t("preview")
              : editMode
              ? t("editOffice")
              : t("addNewOffice")}
          </Typography>
          <Stretch />
          <Button
            link='secondary'
            background='secondaryLight'
            onClick={this.backCurrentStep}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        {currentStep === this.steps.length ? (
          <Row fullWidth paddingTop paddingBottom>
            {/** Show publish button */}
            <Button
              variant='primary'
              onClick={() => this.saveAndNextCurrentStep(this.state.office, t)}
              style={{ width: 190 }}
              shadow
            >
              <EyeIcon style={{ width: 16, height: 16 }} />
              <Typography fontSizeS paddingLeft>
                {t("publishOffice")}
              </Typography>
            </Button>
            <Stretch />

            {/** Show delete button */}
            <Button
              link='errorRedNormal'
              background='errorRedLight'
              inverse
              onClick={this.handleDeleteOffice}
              variant={isWidthDown("xs", width) ? "icon" : ""}
              style={{ maxWidth: 120 }}
            >
              <DeleteIcon style={{ width: 18, height: 18 }} />
              {!isWidthDown("xs", width) ? (
                <Typography paddingLeft fontSizeS>
                  {t("delete")}
                </Typography>
              ) : null}
            </Button>
            <Box paddingLeft />

            {/** Show edit button */}
            {!editMode && (
              <Button
                link='primary'
                background='normalLight'
                inverse
                onClick={this.handleEditOffice}
                variant={isWidthDown("xs", width) ? "icon" : ""}
                style={{ maxWidth: 100 }}
              >
                <EditIcon style={{ width: 18, height: 18 }} />
                {!isWidthDown("xs", width) ? (
                  <Typography paddingLeft fontSizeS>
                    {t("edit")}
                  </Typography>
                ) : null}
              </Button>
            )}
            <Box paddingLeft />

            {/** Show preview button */}
            <Button
              link='primary'
              background='normalLight'
              inverse
              onClick={this.handlePreviewOffice}
              variant={isWidthDown("xs", width) ? "icon" : ""}
              style={{ maxWidth: 120 }}
            >
              {/* <PreviewIcon style={{ width: 20, height: 18 }} /> */}
              <Launch style={{ width: 18, height: 18 }} />
              {!isWidthDown("xs", width) ? (
                <Typography paddingLeft fontSizeS>
                  {t("preview")}
                </Typography>
              ) : null}
            </Button>
          </Row>
        ) : (
          /** stepper */
          <Row fullWidth classes={{ box: s.addOfficeTabWrapper }}>
            <Column fullWidth>
              <Row fullWidth>
                <Stepper
                  alternativeLabel
                  activeStep={currentStep}
                  connector={<StepperConnector />}
                  className={s.stepper}
                >
                  {this.steps.map((label, index) => (
                    <Step key={index}>
                      <StepLabel
                        StepIconComponent={(props) => (
                          <StepperIcon {...props} classes={s} />
                        )}
                      />
                    </Step>
                  ))}
                </Stepper>
              </Row>
              <Row fullWidth justifyChildrenSpaceBetween paddingTopHalf>
                {isWidthDown("sm", width) ? (
                  <Typography fontSizeS textSecondary>
                    {this.steps[currentStep].title}
                  </Typography>
                ) : (
                  this.steps.map((step, index) => (
                    <React.Fragment key={index}>
                      <Box
                        relative
                        style={{ width: 0 }}
                        justifyChildrenStart={index === 0}
                        justifyChildrenEnd={index === this.steps.length - 1}
                        justifyChildrenCenter={
                          index !== 0 && index !== this.steps.length - 1
                        }
                      >
                        <Typography
                          fontSizeS
                          textSecondary
                          absolute
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {step.title}
                        </Typography>
                      </Box>
                    </React.Fragment>
                  ))
                )}
              </Row>
            </Column>
          </Row>
        )}

        {/** forms by step */}
        {/* <form style={{ width: "100%" }}> */}
        <React.Fragment>
          <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
            <CurrentForm
              office={office}
              error={error}
              editMode={editMode}
              onCancel={this.cancelAddOffice}
              onSave={this.saveCurrentStep}
              onNext={(office) => this.saveAndNextCurrentStep(office, t)}
              isLoading={isLoading}
            />
          </Row>

          {/** form buttons */}
          {currentStep === this.steps.length && (
            <Row
              fullWidth
              classes={{ box: clsx(s.addOfficeTabWrapper, s.formButtons) }}
            >
              {/** Show publish button */}
              <Button
                variant='primary'
                onClick={() =>
                  this.saveAndNextCurrentStep(this.state.office, t)
                }
                style={{ width: 190 }}
                shadow
              >
                <EyeIcon style={{ width: 16, height: 16 }} />
                <Typography fontSizeS paddingLeft>
                  {t("publishOffice")}
                </Typography>
              </Button>
            </Row>
          )}
        </React.Fragment>

        {/** Show dialogs */}
        {dialog}

        {/** Show snack msgs */}
        {snackMsg && (
          <Snackbar
            open
            autoHideDuration={4000}
            onClose={this.handleCloseSnackMsg}
          >
            <Alert
              onClose={this.handleCloseSnackMsg}
              severity={snackMsg.severity || "info"}
            >
              {snackMsg.msg || snackMsg}
            </Alert>
          </Snackbar>
        )}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(AddNewOffice))
);
