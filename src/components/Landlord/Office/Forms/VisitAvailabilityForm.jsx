import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import { Column, Typography } from "../../../../common/base-components";
import CalendarForm from "../../../Layout/CalendarForm";

const styleSheet = () => ({
  root: {},

  calendarWrapper: {
    marginTop: 58,
    width: "100%",
  },
});

class VisitAvailabilityForm extends PureComponent {
  static propTypes = {
    office: PropTypes.object.isRequired,
    error: PropTypes.object,
    onChangeField: PropTypes.func,
    uploadPhoto: PropTypes.func.isRequired,
    deletePhoto: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { isLoading: false, visits: [] };

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

  /** Change visits info */
  handleChangeVisits = (data) => {
    this.setState({ visits: data });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
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

        {/* show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(VisitAvailabilityForm))
);
