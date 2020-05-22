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
    onSave: PropTypes.func,
    onNext: PropTypes.func,
    onCancel: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { isLoading: false, visits: [] };

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

  /** Change visits info */
  handleChangeVisits = data => {
    this.setState({ visits: data });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, onCancel, onNext, isLoading } = this.props;
    const { visits, dialog } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Typography fontSizeS textMediumGrey>
          {t("setTimeForDay")}
        </Typography>

        <div className={s.calendarWrapper}>
          <CalendarForm
            startDate={new Date()}
            visits={visits}
            onChange={this.handleChangeVisits}
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
                onClick={() => onNext({ ...this.props.office, visits })}
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
