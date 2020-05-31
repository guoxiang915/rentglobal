import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import {
  Row,
  Stretch,
  Column,
  Button,
  Typography,
  CloseIcon,
  CheckIcon
} from "../../../../common/base-components";
import CalendarForm from "../../../Layout/CalendarForm";

const styleSheet = theme => ({
  root: {},

  calendarWrapper: {
    marginTop: 58,
    width: "100%"
  },

  formButtons: {
    paddingTop: 72,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 36,
      paddingBottom: 24
    }
  }
});

class VisitAvailabilityForm extends PureComponent {
  static propTypes = {
    office: PropTypes.object.isRequired,
    error: PropTypes.object,
    isLoading: PropTypes.bool,
    onNext: PropTypes.func,
    onCancel: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: false, visitHours: {} };
    const visitHours = props.office?.visitHours;
    if (visitHours) {
      Object.values(visitHours).forEach(day => {
        day.forEach(v => {
          v.start = new Date(0, 0, 0, Number(v.start), 60 * (v.start % 1));
          v.end = new Date(0, 0, 0, Number(v.end), 60 * (v.end % 1));
        });
      });
      this.state.visitHours = visitHours;
    }
  }

  state = { isLoading: false, visitHours: this.props.office?.visitHours || [] };

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

  /** Close dialog */
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /** Change visit-hours info */
  handleChangeVisitHours = data => {
    this.setState({ visitHours: data });
  };

  /** Save visit-hours */
  handleNext = () => {
    if (this.props.onNext) {
      const visitHours = { ...this.state.visitHours };
      Object.values(visitHours).forEach(day => {
        day.forEach(v => {
          v.start = v.start.getHours() + (1 / 60.0) * v.start.getMinutes();
          v.end = v.end.getHours() + (1 / 60.0) * v.end.getMinutes();
        });
      });
      console.log(visitHours);
      this.props.onNext(visitHours);
    }
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, onCancel, onNext, isLoading } = this.props;
    const { visitHours, dialog } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Typography fontSizeS textMediumGrey>
          {t("setTimeForDay")}
        </Typography>

        <div className={s.calendarWrapper}>
          <CalendarForm
            visitHours={visitHours}
            onChange={this.handleChangeVisitHours}
          />
        </div>

        {/** Show form buttons */}
        {(onCancel || onNext) && (
          <Row fullWidth classes={{ box: s.formButtons }}>
            {/** Show cancel button */}
            {onCancel && (
              <Button
                link="errorRed"
                background="secondaryLight"
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
                variant="primary"
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
