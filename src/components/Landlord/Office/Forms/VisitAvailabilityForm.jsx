import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Row,
  Stretch,
  Column,
  Button,
  Typography,
  CloseIcon,
  CheckIcon,
  ArrowRightIcon,
} from "../../../../common/base-components";
import { ImportCalendarSettingDialog } from "../../../Layout/Dialogs";
import CalendarSettingForm from "../../../Layout/CalendarSettingForm";

const styleSheet = (theme) => ({
  root: {},

  fullWidthButton: {
    width: "100%",
    marginTop: 25,
  },

  importButtonIcon: {
    width: 10,
    height: 13,
  },

  addConditionButton: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 28,
    },
  },

  formButtons: {
    paddingTop: 72,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 36,
      paddingBottom: 24,
    },
  },
});

class VisitAvailabilityForm extends PureComponent {
  static propTypes = {
    office: PropTypes.object.isRequired,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    onNext: PropTypes.func,
    onCancel: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  // state = { isLoading: false, visitHours: this.props.office?.visitHours || [] };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      // visitHours: props.office?.visitHours || [],
      visitHours: [],
      newCondition: null,
    };
    // const visitHours = props.office?.visitHours;
    // if (visitHours) {
    //   Object.values(visitHours).forEach((day) => {
    //     day.forEach((v) => {
    //       v.start = new Date(0, 0, 0, Number(v.start), 60 * (v.start % 1));
    //       v.end = new Date(0, 0, 0, Number(v.end), 60 * (v.end % 1));
    //     });
    //   });
    //   this.state.visitHours = visitHours;
    // }
  }

  /** Return visit hrs with promise */
  handleReturnVisitHours = () => {
    return Promise.resolve({ status: 200, data: this.state.visitHours });
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

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /** Change visit-hours info */
  handleChangeVisitHours = (data) => {
    this.setState({ visitHours: data });
  };

  /** Import from calendar seting */
  handleImportCalendarSetting = () => {
    this.setState({
      dialog: <ImportCalendarSettingDialog onClose={this.handleCloseDialog} />,
    });
  };

  handleAddCondition = () => this.setState({ newCondition: {} });

  handleSaveNewCondition = (condition) => {
    let { visitHours } = this.state;
    if (visitHours.indexOf(condition) !== -1) {
      visitHours[visitHours.indexOf(condition)] = { ...condition };
      this.setState({
        visitHours: [...visitHours],
        newCondition: null,
      });
    } else {
      this.setState({
        visitHours: [...visitHours, condition],
        newCondition: null,
      });
    }

    return Promise.resolve({ status: 200, data: visitHours });
  };

  handleCancelNewCondition = () => {
    this.setState({ newCondition: null });
  };

  handleEditCondition = (condition) => {
    this.setState({ newCondition: condition });
  };

  handleDeleteCondition = (condition) => {
    const { visitHours } = this.state;
    visitHours.splice(visitHours.indexOf(condition), 1);
    this.setState({ visitHours: [...visitHours] });
    return Promise.resolve({ status: 200, data: visitHours });
  };

  /** Save visit-hours */
  handleNext = () => {
    if (this.props.onNext) {
      const visitHours = { ...this.state.visitHours };
      // Object.values(visitHours).forEach((day) => {
      //   day.forEach((v) => {
      //     v.start = v.start.getHours() + (1 / 60.0) * v.start.getMinutes();
      //     v.end = v.end.getHours() + (1 / 60.0) * v.end.getMinutes();
      //   });
      // });
      this.props.onNext(visitHours);
    }
  };

  /**
   * Renderer function
   */
  render() {
    const {
      classes: s,
      t,
      width,
      onCancel,
      onNext,
      isLoading,
      office,
    } = this.props;
    const { newCondition, dialog } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Row fullWidth paddingBottom wrap>
          <Typography fontSizeS textMediumGrey>
            {t("setTimeForDay")}
          </Typography>

          <Stretch />

          <Button
            onClick={this.handleImportCalendarSetting}
            className={clsx(isWidthDown("xs", width) && s.fullWidthButton)}
          >
            <ArrowRightIcon className={s.importButtonIcon} />
            <Typography paddingLeft>{t("importCalendarSetting")}</Typography>
          </Button>
        </Row>

        <Row
          paddingTopDouble={!isWidthDown("xs", width)}
          paddingTop={isWidthDown("xs", width)}
          alignChildrenCenter
          fullWidth
          justifyChildrenEnd
        >
          {!newCondition && (
            <Button
              onClick={this.handleAddCondition}
              className={s.addConditionButton}
            >
              {t("addAvailability")}
            </Button>
          )}
        </Row>

        <CalendarSettingForm
          office={office}
          newCondition={newCondition}
          getConditions={this.handleReturnVisitHours}
          onSave={this.handleSaveNewCondition}
          onCancel={this.handleCancelNewCondition}
          onEdit={this.handleEditCondition}
          onDelete={this.handleDeleteCondition}
        />

        {/** Show form buttons */}
        {(onCancel || onNext) && (
          <Row fullWidth classes={{ box: s.formButtons }}>
            {/** Show cancel button */}
            {onCancel && (
              <Button
                link='errorRed'
                background='secondaryLight'
                onClick={onCancel}
              >
                <CloseIcon style={{ width: 9, height: 9 }} />
                <Typography paddingLeft fontSizeS>
                  {t("cancel")}
                </Typography>
              </Button>
            )}

            <Stretch />

            {/** Show next button */}
            {onNext && (
              <Button
                variant='primary'
                onClick={this.handleNext}
                style={{ width: 215 }}
                shadow
                loading={isLoading}
              >
                <CheckIcon style={{ width: 16, height: 16 }} />
                <Typography paddingLeft fontSizeS>
                  {t("saveAndPreview")}
                </Typography>
              </Button>
            )}
          </Row>
        )}

        {/* show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(VisitAvailabilityForm))
);
