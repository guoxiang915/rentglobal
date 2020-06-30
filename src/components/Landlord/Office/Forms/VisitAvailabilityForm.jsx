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
import {
  addVisibility,
  getVisibilities,
  deleteVisibility, updateVisibility,
} from "../../../../api/endpoints";
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
      visitHours: [],
      newCondition: null,
    };
  }

  /** Return visit hrs with promise */
  handleReturnVisitHours = (params) => {
    const { office } = this.props;
    return getVisibilities(office.id, params);
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
    const { office } = this.props;
    this.setState({ newCondition: null });
    return addVisibility(office.id, condition);
  };

  handleCancelNewCondition = () => {
    this.setState({ newCondition: null });
  };

  handleEditCondition = (condition) => {
    this.setState({ newCondition: condition });
  };

  handleUpdateCondition = (visitHourId, condition) => {
    const { office } = this.props;
    this.setState({ newCondition: null });
    return updateVisibility(office.id, visitHourId, condition);
  };

  handleDeleteCondition = (condition) => {
    const { office } = this.props;
    return deleteVisibility(office.id, condition.id);
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
          onUpdate={this.handleUpdateCondition}
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
