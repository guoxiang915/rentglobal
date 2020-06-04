import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Row,
  Column,
  Box,
  Typography,
  Button,
  CalendarIcon,
  CarouselWrapper,
  Stretch,
  Link,
  Divider,
  Checkbox,
  TextField,
  Select,
  UsersIcon,
  EditIcon,
  CheckIcon,
  CancelIcon
} from "../../../common/base-components";
import {
  TabWrapper,
  StatisticIconBox,
  SearchbarWithSorter,
  EventCalendar,
  EventDetailItem
} from "../../../common/base-layouts";
import { ConditionalWrapper } from "../../../utils/helpers";
import { getGeneralConditionsOfCalendar } from "../../../api/endpoints";

import { formatDate, getWeekday, formatHrMin } from "../../../utils/formatters";
import { checkEqualDate } from "../../../utils/validators";

import { weekdays } from "../../../utils/constants";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker,
  KeyboardTimePicker,
  TimePicker
} from "@material-ui/pickers";

const styleSheet = theme => ({
  root: {},

  conditionDays: {
    width: 150,
    height: 34,
    marginRight: 12
  },

  datePicker: {
    width: 120,
    height: 34,
    borderRadius: 99999,
    border: theme.colors.primary.borderGrey,
    color: theme.colors.primary.darkGrey,
    "& input": {
      padding: 8,
      ...theme.fonts.size.fontSizeXS
    }
  },

  leftPicker: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRight: "none"
  },

  rightPicker: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeft: "none"
  },

  timePicker: {
    width: 120,
    height: 34,
    borderRadius: 99999,
    border: theme.colors.primary.borderGrey,
    color: theme.colors.primary.darkGrey,
    "& input": {
      ...theme.fonts.size.fontSizeXS
    }
  },

  officeFilter: {
    height: 34,
    width: 240,
    [theme.breakpoints.down("xs")]: {
      width: "auto"
    }
  }
});

class CalendarSetting extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  officeFilterOptions = [{ title: "allOffices" }];

  constructor(props) {
    super(props);
    this.state = {
      conditions: [],
      newCondition: null
    };
    if (getGeneralConditionsOfCalendar) {
      getGeneralConditionsOfCalendar().then(response => {
        if (response.status === 200) {
          this.setState({ conditions: response.data });
        }
      });
    }
  }

  handleAddCondition = () => this.setState({ newCondition: {} });

  handleChangeConditionDay = day => () =>
    this.setState(state => ({ newCondition: { ...state.newCondition, day } }));

  handleChangeStartDate = startDate =>
    this.setState(state => ({
      newCondition: { ...state.newCondition, startDate }
    }));

  handleChangeEndDate = endDate =>
    this.setState(state => ({
      newCondition: { ...state.newCondition, endDate }
    }));

  handleChangeStartTime = startTime =>
    this.setState(state => ({
      newCondition: { ...state.newCondition, startTime }
    }));

  handleChangeEndTime = endTime =>
    this.setState(state => ({
      newCondition: { ...state.newCondition, endTime }
    }));

  handleChangeOfficeFilter = e => {
    this.setState(state => ({
      newCondition: { ...state.newCondition, officeFilter: e.target.value }
    }));
  };

  handleSaveNewCondition = () => {
    this.setState(state => ({
      conditions: [...state.conditions, state.newCondition]
    }));
  };

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const { conditions, newCondition } = this.state;

    console.log(conditions);

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
            <Typography fontSizeS textMediumGrey>
              {t("calendarSettingHelp")}
            </Typography>

            <Row paddingTopDouble alignChildrenCenter fullWidth>
              <Typography fontSizeM textSecondary>
                {t("generalConditions")}
              </Typography>
              <Stretch />
              {!newCondition && (
                <Button onClick={this.handleAddCondition}>
                  {t("addACondition")}
                </Button>
              )}
            </Row>

            {newCondition && (
              <Column style={{ paddingTop: 45 }} fullWidth>
                <Row fullWidth alignChildrenCenter>
                  {["allDays", "businessDays", "weekends"].map((day, index) => (
                    <React.Fragment key={index}>
                      <Checkbox
                        variant="outlined"
                        label={t(day)}
                        classes={{ root: s.conditionDays }}
                        isChecked={newCondition.day === day}
                        onChange={this.handleChangeConditionDay(day)}
                      />
                    </React.Fragment>
                  ))}
                  <Stretch />
                  <DatePicker
                    value={newCondition.startDate || null}
                    onChange={this.handleChangeStartDate}
                    TextFieldComponent={({ InputProps, ...props }) => (
                      <TextField
                        {...props}
                        variant="outlined"
                        classes={{ root: clsx(s.datePicker, s.leftPicker) }}
                        startAdornment={
                          <Typography fontSizeXS textSecondary>
                            {t("from")}
                          </Typography>
                        }
                        placeholder="MM/DD"
                      />
                    )}
                    format={"MM/DD"}
                  />
                  <DatePicker
                    value={newCondition.endDate || null}
                    onChange={this.handleChangeEndDate}
                    TextFieldComponent={({ InputProps, ...props }) => (
                      <TextField
                        {...props}
                        variant="outlined"
                        classes={{ root: clsx(s.datePicker, s.rightPicker) }}
                        startAdornment={
                          <Typography fontSizeXS textSecondary>
                            {t("to")}
                          </Typography>
                        }
                        placeholder="MM/DD"
                      />
                    )}
                    format={"MM/DD"}
                  />
                </Row>
                <Row paddingTopDouble fullWidth>
                  <Column alignChildrenStart>
                    <Typography fontSizeXS textSecondary>
                      {t("chooseTimeDuration")}
                    </Typography>
                    <Row paddingTop>
                      <TimePicker
                        value={newCondition.startTime || null}
                        onChange={this.handleChangeStartTime}
                        TextFieldComponent={({ InputProps, ...props }) => (
                          <TextField
                            {...props}
                            variant="outlined"
                            classes={{ root: clsx(s.timePicker) }}
                          />
                        )}
                      />
                      <Box paddingLeftDouble />
                      <TimePicker
                        value={newCondition.endTime || null}
                        onChange={this.handleChangeEndTime}
                        TextFieldComponent={({ InputProps, ...props }) => (
                          <TextField
                            {...props}
                            variant="outlined"
                            classes={{ root: clsx(s.timePicker) }}
                          />
                        )}
                      />
                    </Row>
                  </Column>
                  <Stretch />
                  <Column alignChildrenStart>
                    <Typography fontSizeXS textSecondary>
                      {t("offices")}
                    </Typography>
                    <Box paddingTop>
                      <Select
                        options={this.officeFilterOptions}
                        renderOption={item => (
                          <Typography fontSizeXS textSecondary>
                            {t(item?.title)}
                          </Typography>
                        )}
                        displayEmpty
                        value={newCondition.officeFilter}
                        onChange={this.handleChangeOfficeFilter}
                        className={s.officeFilter}
                      />
                    </Box>
                  </Column>
                </Row>
                <Row fullWidth paddingTopDouble justifyChildrenEnd>
                  <Button onClick={this.handleSaveNewCondition}>
                    {t("save")}
                  </Button>
                </Row>
              </Column>
            )}

            {conditions?.length ? (
              <></>
            ) : (
              <Column
                style={{ paddingTop: 110, paddingBottom: 50 }}
                fullWidth
                textMediumGrey
              >
                <CalendarIcon style={{ width: 61, height: 56 }} />
                <Typography fontSizeS textMediumGrey paddingTopDouble>
                  {t("addConditionsDefault")}
                </Typography>
              </Column>
            )}
          </Column>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(CalendarSetting)))
);
