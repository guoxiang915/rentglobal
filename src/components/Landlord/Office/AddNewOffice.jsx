import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
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
  ConfirmDialog
} from "../../../common/base-components";
import { KeyboardBackspace } from "@material-ui/icons";
import {
  Step,
  Stepper,
  StepConnector,
  StepLabel,
  Snackbar
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  GeneralInfoForm,
  PictureGalleryForm,
  ServicesAmenitiesForm
} from "./Forms";
import OfficeDetailForm from "../../../containers/Layout/OfficeDetailForm";

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

  stepper: {
    width: "150%",
    background: "transparent",
    padding: 0,
    marginLeft: "calc(-25% + 35px)",
    marginRight: "calc(-25% + 35px)"
  },

  stepIcon: {
    width: 45,
    height: 45,
    color: theme.colors.primary.grey,
    background: theme.colors.primary.whiteGrey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    fontSize: "20px",
    borderRadius: "50%"
  },

  stepActiveIcon: {
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainShadow}`
  },

  formButtons: {
    paddingTop: 160,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 64
    }
  }
});

/** Stepper connector component */
const StepperConnector = withStyles(theme => ({
  alternativeLabel: {
    top: 22,
    marginLeft: 2,
    marginRight: 2
  },

  active: {
    "& $line": {
      height: 1.5,
      background: theme.colors.primary.mainColor
    }
  },

  completed: {
    "& $line": {
      height: 1.5,
      background: theme.colors.primary.mainColor
    }
  },

  line: {
    height: 1,
    border: 0,
    borderRadius: 0.5,
    backgroundColor: theme.colors.primary.borderGrey
  }
}))(StepConnector);

/** Stepper icon component */
const StepperIcon = ({ classes, icon, active, completed }) => (
  <Box
    classes={{
      box: clsx(
        classes.stepIcon,
        (active || completed) && classes.stepActiveIcon
      )
    }}
    alignChildrenCenter
    justifyChildrenCenter
  >
    <Typography fontSizeM fontWeightBold>
      {icon}
    </Typography>
  </Box>
);

class AddNewOffice extends Component {
  static propTypes = {
    officeId: PropTypes.string,
    getOfficeById: PropTypes.func,
    navigate: PropTypes.func,
    uploadFile: PropTypes.func,
    createOffice: PropTypes.func,
    updateOffice: PropTypes.func,
    createOfficeCoverPhotos: PropTypes.func,
    createOfficeServicesAmenities: PropTypes.func,
    editMode: PropTypes.bool,
    onEditOffice: PropTypes.func,
    onDeleteOffice: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    snackMsg: null,
    office: {
      // _id: "5e694f16f18e30286c952119",
      // title: "New Office",
      // officeType: "privateOffice",
      // priceMonthly: 4500,
      // businessOtherFees: 123,
      // area: 74,
      // rooms: 2,
      // numberOfEmployees: 6,
      // businessHoursFrom: 8,
      // businessHoursTo: 5,
      // location: { fullAddress: "Location Full Address" },
      // coverPhotos: [
      //   {
      //     id: "5e6f4b60af2f21061071ce1a",
      //     bucketPath:
      //       "https://rentglobal.s3.us-east-2.amazonaws.com/2020/2/167fe56cc08fb476d5/RENTGLOBAL_Logo_Preview_06.png",
      //     fileName: "RENTGLOBAL_Logo_Preview_06.png"
      //   },
      //   {
      //     id: "5e59d4661d43b820dc261c92",
      //     bucketPath:
      //       "https://rentglobal.s3.us-east-2.amazonaws.com/2020/1/297afdba1c39dc5c26/RENTGLOBAL_Logo_Preview_01.jpg",
      //     fileName: "RENTGLOBAL_Logo_Preview_01.jpg"
      //   },
      //   {
      //     id: "5e5bda2b6250430a502d8e89",
      //     bucketPath:
      //       "https://rentglobal.s3.us-east-2.amazonaws.com/2020/2/1d724cc9179a2799d/RENTGLOBAL_Logo_Preview_03.jpg",
      //     fileName: "RENTGLOBAL_Logo_Preview_03.jpg"
      //   }
      // ],
      // servicesAndAmenities: {
      //   category1: ["cleaningService", "privateWifi", "rj45Cable", "furniture"],
      //   category2: ["shower", "reception"],
      //   category3: ["alarm", "disabledAccess"],
      //   category4: [],
      //   category5: [],
      //   category6: [],
      //   category7: [],
      //   customFeatures: ["Custom Feature 1", "Custom Feature 2"]
      // },
      // spokenLanguages: []
    },
    error: null,
    isLoading: false,
    currentStep: 0,
    dialog: null
  };

  steps = [
    { title: this.props.t("generalInfo"), form: GeneralInfoForm },
    { title: this.props.t("pictureGallery"), form: PictureGalleryForm },
    {
      title: this.props.t("servicesAndAmenities"),
      form: ServicesAmenitiesForm
    }
  ];

  componentDidMount() {
    const { officeId, editMode = false, getOfficeById } = this.props;
    if (officeId) {
      getOfficeById(officeId).then(response => {
        if (response.status === 200) {
          const office = response.data;
          let currentStep = 0;
          if (editMode) {
            currentStep = 0;
          } else if (
            office.title &&
            office.officeType &&
            office.pricemonthly &&
            office.location &&
            office.numberOfEmployees
          ) {
            currentStep = 1;
          } else if (
            office.coverPhotos &&
            office.coverPhotos.length >= 3 &&
            office.coverPhotos.length <= 15
          ) {
            currentStep = 2;
          } else if (
            office.servicesAndAmenities &&
            (office.servicesAndAmenities.category1.length ||
              office.servicesAndAmenities.category2.length ||
              office.servicesAndAmenities.category3.length ||
              office.servicesAndAmenities.category4.length ||
              office.servicesAndAmenities.category5.length ||
              office.servicesAndAmenities.category6.length ||
              office.servicesAndAmenities.category7.length ||
              office.servicesAndAmenities.customFeatures.length)
          ) {
            currentStep = 3;
          }
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
  navigate = path => () => {
    this.props.navigate(path);
  };

  /**
   * Update state
   * @member
   * @param {string} field Name of field to be updated
   */
  updateState = field => value => {
    this.setState({ [field]: value });
  };

  /**
   * Update state by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeByEvent = field => value => () => {
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
          variant="error"
          text={this.props.t("confirmLeavePage")}
          closeLabel={
            <>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </>
          }
          confirmLabel={
            <>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("leave")}</Typography>
            </>
          }
          onConfirm={this.navigate("offices")}
          onClose={this.closeDialog}
        />
      )
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
  saveCurrentStep = () => {
    this.setState({ isLoading: false });
    let result = Promise.reject(null);
    switch (this.state.currentStep) {
      case 0:
        if (this.state.office._id) {
          result = this.props.updateOffice(this.state.office);
        } else {
          result = this.props.createOffice(this.state.office);
        }
        break;
      case 1:
        if (this.state.office) {
          result = this.props.createOfficeCoverPhotos(
            this.state.office._id,
            this.state.office.coverPhotos.map(photo => photo._id)
          );
        }
        break;
      case 2:
        if (this.state.office)
          result = this.props.createOfficeServicesAmenities(
            this.state.office._id,
            this.state.office.servicesAndAmenities
          );
        break;
      case 3:
        if (this.state.office)
          result = this.props.publishOffice(this.state.office._id);
        break;
      default:
        break;
    }
    return result.then(
      response => {
        this.setState({
          isLoading: false,
          office: response.data,
          error: null,
          snackMsg: {
            severity: "success",
            msg: this.props.t("savedSuccessfully")
          }
        });
        return Promise.resolve(response);
      },
      error => {
        this.setState({
          isLoading: false,
          error: error.response.data.msg,
          snackMsg: {
            severity: "error",
            msg: this.props.t("errorInValidation")
          }
        });
        return Promise.reject(error);
      }
    );
  };

  /** Save and next current step */
  saveAndNextCurrentStep = () => {
    const { currentStep } = this.state;
    if (this.state.office) {
      /** Check photos count when current step is 1 */
      if (
        currentStep === 1 &&
        (!this.state.office.coverPhotos ||
          this.state.office.coverPhotos.length < 3 ||
          this.state.office.coverPhotos.length > 15)
      ) {
        this.setState({
          snackMsg: {
            severity: "error",
            msg: this.props.t("photoCountLimitError")
          }
        });
        return;
      }
      this.saveCurrentStep().then(() => {
        if (currentStep === 3) {
          // navigate to office detail page
          this.props.navigate(`offices`, this.state.office._id);
        } else {
          this.setState({ currentStep: currentStep + 1 });
        }
      });
    }
  };

  /** Event for edit office */
  handleEditOffice = () => {
    this.props.onEditOffice(this.state.office._id);
  };

  /** Event for delete office */
  handleDeleteOffice = () => {
    this.props.onDeleteOffice(this.state.office._id);
  };

  /** Show snack msg */
  handleShowSnackMsg = snackMsg => {
    this.setState({ snackMsg });
  };

  /** Close snack msg */
  handleCloseSnackMsg = () => {
    this.setState({ snackMsg: null });
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
      snackMsg
    } = this.state;
    const CurrentForm =
      currentStep < 3 ? this.steps[currentStep].form : OfficeDetailForm;

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
            {currentStep === 3
              ? t("preview")
              : editMode
              ? t("editOffice")
              : t("addNewOffice")}
          </Typography>
          <Stretch />
          <Button
            link="secondary"
            background="secondaryLight"
            onClick={this.backCurrentStep}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        {currentStep === 3 ? (
          <Row fullWidth paddingBottom>
            {/** Show publish button */}
            <Button
              variant="primary"
              onClick={this.saveAndNextCurrentStep}
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
              link="errorRedNormal"
              background="errorRedLight"
              inverse
              onClick={this.handleDeleteOffice}
              variant={isWidthDown("xs", width) && "icon"}
            >
              <DeleteIcon style={{ width: 20, height: 18 }} />
              {!isWidthDown("xs", width) && (
                <Typography paddingLeft fontSizeS>
                  {t("delete")}
                </Typography>
              )}
            </Button>
            <Box paddingLeft />

            {/** Show edit button */}
            {!editMode && (
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.handleEditOffice}
                variant={isWidthDown("xs", width) && "icon"}
              >
                <EditIcon style={{ width: 20, height: 18 }} />
                {!isWidthDown("xs", width) && (
                  <Typography paddingLeft fontSizeS>
                    {t("edit")}
                  </Typography>
                )}
              </Button>
            )}
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
                        StepIconComponent={props => (
                          <StepperIcon {...props} classes={s} />
                        )}
                      ></StepLabel>
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
        <>
          <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
            <CurrentForm
              office={office}
              error={error}
              onChangeField={this.handleChangeOfficeField}
              uploadFile={this.props.uploadFile}
              deletePhoto={this.props.deleteOfficePhoto}
              editMode={editMode}
            />
          </Row>

          {/** form buttons */}
          {currentStep === 3 ? (
            <Row
              fullWidth
              classes={{ box: clsx(s.addOfficeTabWrapper, s.formButtons) }}
            >
              {/** Show publish button */}
              <Button
                variant="primary"
                onClick={this.saveAndNextCurrentStep}
                style={{ width: 190 }}
                shadow
              >
                <EyeIcon style={{ width: 16, height: 16 }} />
                <Typography fontSizeS paddingLeft>
                  {t("publishOffice")}
                </Typography>
              </Button>
            </Row>
          ) : (
            <Row
              fullWidth
              classes={{ box: clsx(s.addOfficeTabWrapper, s.formButtons) }}
            >
              {/** Show cancel button */}
              <Button
                link="errorRed"
                background="secondaryLight"
                onClick={this.cancelAddOffice}
              >
                <CloseIcon style={{ width: 9, height: 9 }} />
                <Typography paddingLeft fontSizeS>
                  {t("cancel")}
                </Typography>
              </Button>

              <Stretch />

              {/** Show save button */}
              {currentStep < 2 && (
                <Button
                  link="primary"
                  background="normalLight"
                  inverse
                  onClick={this.saveCurrentStep}
                  loading={isLoading}
                >
                  <CheckIcon style={{ width: 16, height: 16 }} />
                  <Typography paddingLeft fontSizeS>
                    {t("save")}
                  </Typography>
                </Button>
              )}

              <Box paddingLeft />

              {/** Show next button */}
              <Button
                variant="primary"
                onClick={this.saveAndNextCurrentStep}
                style={{ width: 215 }}
                shadow
              >
                <Typography fontSizeS>
                  {t(currentStep < 2 ? "nextStep" : "saveAndPreview")}
                </Typography>
              </Button>
            </Row>
          )}
        </>

        {/** Show dialogs */}
        {dialog}

        {/** Show snack msgs */}
        {snackMsg && (
          <Snackbar
            open={true}
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
