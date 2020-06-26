import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Typography,
  Button,
  Stretch,
} from "../../../common/base-components";
import CalendarSettingForm from "../../Layout/CalendarSettingForm";
import {
  getLandlordCalendarSettings as getCalendarSettings,
  addLandlordCalendarSetting as addCalendarSetting,
  updateLandlordCalendarSetting as updateCalendarSetting,
  deleteLandlordCalendarSetting as deleteCalendarSetting,
} from "../../../api/endpoints";
import { conditions as conditionsMockData } from "../../../common/mock/officeMockData";

const styleSheet = (theme) => ({
  root: {},

  addConditionButton: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 28,
    },
  },
});

class CalendarSetting extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    newCondition: null,
  };

  handleAddCondition = () => this.setState({ newCondition: {} });

  handleSaveNewCondition = (condition) => {
    let saver = null;

    if (condition.id) {
      saver = updateCalendarSetting(condition.id, condition);
    } else {
      saver = addCalendarSetting(condition);
    }
    if (saver) {
      return saver.then((res) => {
        if (res.status === 200) {
          this.setState({ newCondition: null });
        }
        return res;
      });
    }
    return Promise.reject();
    // let { conditions, newCondition } = this.state;
    // if (conditions.indexOf(newCondition) !== -1) {
    //   conditions[conditions.indexOf(newCondition)] = { ...newCondition };
    //   this.setState({
    //     conditions: [...conditions],
    //     newCondition: null,
    //   });
    // } else {
    //   this.setState({
    //     conditions: [...conditions, newCondition],
    //     newCondition: null,
    //   });
    // }
  };

  handleCancelNewCondition = () => {
    this.setState({ newCondition: null });
  };

  handleEditCondition = (condition) => {
    this.setState({ newCondition: condition });
  };

  handleDeleteCondition = (condition) => {
    if (condition.id && deleteCalendarSetting) {
      return deleteCalendarSetting(condition.id);
    }
    return Promise.reject();
    // const { conditions } = this.state;
    // conditions.splice(conditions.indexOf(condition), 1);
    // this.setState({ conditions: [...conditions] });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { newCondition } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Typography fontSizeS textMediumGrey>
          {t("calendarSettingHelp")}
        </Typography>

        <Row
          paddingTopDouble={!isWidthDown("xs", width)}
          paddingTop={isWidthDown("xs", width)}
          alignChildrenCenter
          fullWidth
          rowReverse
          wrap
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
          <Stretch />
          <Typography fontSizeM textSecondary>
            {t("generalConditions")}
          </Typography>
        </Row>

        <CalendarSettingForm
          newCondition={newCondition}
          // getConditions={getCalendarSettings}
          getConditions={() =>
            Promise.resolve({ status: 200, data: conditionsMockData })
          }
          onSave={this.handleSaveNewCondition}
          onCancel={this.handleCancelNewCondition}
          onEdit={this.handleEditCondition}
          onDelete={this.handleDeleteCondition}
        />
      </Column>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(CalendarSetting)))
);
