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
  ConfirmDialog
} from "../../common/base-components";
import { KeyboardBackspace } from "@material-ui/icons";
import { Step, Stepper, StepConnector, StepLabel } from "@material-ui/core";
import {
  GeneralInfoForm,
  PictureGalleryForm,
  ServicesAmenitiesForm
} from "./AddNewOfficeForms";

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
    navigate: PropTypes.func,
    uploadFile: PropTypes.func,
    createOffice: PropTypes.func,
    createOfficeCoverPhotos: PropTypes.func,
    createOfficeServicesAmenities: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    office: {},
    error: null,
    isLoading: false,
    currentStep: 0,
    dialog: null
  };

  steps = [
    { title: this.props.t("generalInfo"), form: GeneralInfoForm },
    { title: this.props.t("pictureGallery"), form: PictureGalleryForm },
    { title: this.props.t("servicesAndAmenities"), form: ServicesAmenitiesForm }
  ];

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
        result = this.props.createOffice(this.state.office);
        break;
      case 1:
        if (this.state.office)
          result = this.props.createOfficeCoverPhotos({
            office_id: this.state.office.id,
            cover_photos: this.state.office.coverPhotos
          });
        break;
      case 2:
        if (this.state.office)
          result = this.props.createOfficeServicesAmenities({
            office_id: this.state.office.id,
            services_amenities: this.state.office.servicesAndAmenities
          });
        break;
      default:
        break;
    }
    console.log(result);
    return result.then(
      response =>
        this.setState({ isLoading: false, office: response.data, error: null }),
      error =>
        this.setState({ isLoading: false, error: error.response.data.msg })
    );
  };

  /** Save and next current step */
  saveAndNextCurrentStep = () => {
    this.saveCurrentStep().then(() => {
      this.setState({ currentStep: this.state.currentStep + 1 });
    });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { office, error, isLoading, currentStep, dialog } = this.state;
    const CurrentForm = this.steps[currentStep].form;

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
            {t("addNewOffice")}
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

        {/** stepper */}
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

        {/** forms by step */}
        <form style={{ width: "100%" }}>
          <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
            <CurrentForm
              office={office}
              error={error}
              onChangeField={this.handleChangeOfficeField}
              uploadFile={this.props.uploadFile}
            />
          </Row>

          {/** form buttons */}
          <Row
            fullWidth
            classes={{ box: clsx(s.addOfficeTabWrapper, s.formButtons) }}
          >
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
            <Box paddingLeft />
            <Button
              variant="primary"
              onClick={this.saveAndNextCurrentStep}
              style={{ width: 215 }}
            >
              <Typography fontSizeS>{t("nextStep")}</Typography>
            </Button>
          </Row>
        </form>
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(AddNewOffice))
);
