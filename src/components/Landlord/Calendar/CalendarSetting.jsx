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
  Stretch,
  Checkbox,
  TextField,
  Select,
  ConfirmDialog,
  CalendarIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  CheckIcon,
  HorizontalDivider,
} from "../../../common/base-components";
import { TabWrapper } from "../../../common/base-layouts";
import {
  getLandlordCalendarSettings as getCalendarSettings,
  addLandlordCalendarSetting as addCalendarSetting,
  updateLandlordCalendarSetting as updateCalendarSetting,
  deleteLandlordCalendarSetting as deleteCalendarSetting,
} from "../../../api/endpoints";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import { conditions as conditionsMockData } from "../../../common/mock/officeMockData";

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers";
import { formatDate, formatHrMin } from "../../../utils/formatters";
import { dayTypes, officeTypes } from "../../../utils/constants";

const styleSheet = (theme) => ({
  root: {},

  addConditionButton: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 28,
    },
  },

  newConditionWrapper: {
    paddingTop: 40,
    paddingBottom: 20,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 16,
      paddingBottom: 16,
    },
  },

  conditionDays: {
    width: 150,
    height: 34,
    marginRight: 12,
  },

  datePicker: {
    width: 120,
    height: 34,
    borderRadius: 99999,
    border: theme.colors.primary.borderGrey,
    color: theme.colors.primary.darkGrey,
    "& input": {
      padding: 8,
      ...theme.fonts.size.fontSizeXS,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      height: 47,
    },
  },

  leftPicker: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRight: "none",
    "& > .MuiOutlinedInput-notchedOutline": {
      borderRight: "none !important",
    },
  },

  rightPicker: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeft: "none",
    "& > .MuiOutlinedInput-notchedOutline": {
      borderLeft: "none !important",
    },
  },

  timePicker: {
    width: 120,
    height: 34,
    borderRadius: 99999,
    border: theme.colors.primary.borderGrey,
    color: theme.colors.primary.darkGrey,
    "& input": {
      ...theme.fonts.size.fontSizeXS,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 16,
    },
  },

  officeType: {
    height: 34,
    width: 240,
    [theme.breakpoints.down("xs")]: {
      height: 47,
      width: "100%",
    },
  },

  conditionsPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8,
    marginTop: 35,
    padding: "20px 30px",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },

  conditionsTable: {
    width: "100%",
  },

  tableHead: {
    "&> th": {
      color: theme.colors.primary.darkGrey,
      fontWeight: "normal",
    },
  },

  tableBody: {
    "&> td": {
      color: theme.colors.primary.grey,
    },
  },

  tablePagination: {
    width: "100%",
    color: theme.colors.primary.grey,
  },
});

class CalendarSetting extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    conditions: [],
    newCondition: null,
    page: 0,
    rowsPerPage: 5,
    dialog: null,
  };

  getConditions = () => {
    const params = {
      page: this.state.page,
      limit: this.state.rowsPerPage,
    };
    if (getCalendarSettings) {
      getCalendarSettings(params).then((response) => {
        if (response.status === 200) {
          this.setState({
            conditions: response.data.map((c) => ({
              id: c.id,
              officeType: c.officeType,
              dayTypes: c.dayTypes?.[0],
              startTime: c.duration ? new Date(c.duration.start) : "",
              endTime: c.duration ? new Date(c.duration.end) : "",
              startDate: c.appliedDates ? new Date(c.appliedDates.start) : "",
              endDate: c.appliedDates ? new Date(c.appliedDates.end) : "",
            })),
          });
        }
      });
    }
  };

  componentDidMount() {
    this.getConditions();
  }

  handleAddCondition = () => this.setState({ newCondition: {} });

  handleChangeConditionField = (field) => (value) =>
    this.setState((state) => ({
      newCondition: { ...state.newCondition, [field]: value },
    }));

  handleChangeOfficeType = (e) => {
    this.setState((state) => ({
      newCondition: { ...state.newCondition, officeType: e.target.value },
    }));
  };

  handleSaveNewCondition = () => {
    this.setState((state) => {
      const condition = {
        id: state.newCondition.id,
        officeType: state.newCondition.officeType,
        dayTypes: [state.newCondition.dayTypes],
        duration: {
          start: new Date(state.newCondition.startTime).getTime(),
          end: new Date(state.newCondition.endTime).getTime(),
        },
        appliedDates: {
          start: new Date(state.newCondition.startDate).getTime(),
          end: new Date(state.newCondition.endDate).getTime(),
        },
      };
      let saver = null;

      if (condition.id) {
        saver = updateCalendarSetting(condition.id, condition);
      } else {
        saver = addCalendarSetting(condition);
      }
      if (saver) {
        saver.then((res) => {
          if (res.status === 200) {
            this.setState({ newCondition: null, page: 0 }, () => {
              this.getConditions();
            });
          }
        });
      }
    });
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

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleEditCondition = (condition) => () => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant='primary'
          text={this.props.t("confirmEdit")}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <CheckIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("ok")}</Typography>
            </React.Fragment>
          }
          onConfirm={this.editCondition(condition)}
          onClose={this.handleCloseCondition}
        />
      ),
    });
  };

  handleDeleteCondition = (condition) => () => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant='error'
          text={this.props.t("confirmDelete")}
          closeLabel={
            <React.Fragment>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{this.props.t("cancel")}</Typography>
            </React.Fragment>
          }
          confirmLabel={
            <React.Fragment>
              <DeleteIcon style={{ width: 15, height: 12 }} />
              <Typography paddingLeft>{this.props.t("delete")}</Typography>
            </React.Fragment>
          }
          onConfirm={this.deleteCondition(condition)}
          onClose={this.handleCloseCondition}
        />
      ),
    });
  };

  editCondition = (condition) => () => {
    this.setState({ dialog: null });
    this.setState({ newCondition: condition });
  };

  deleteCondition = (condition) => () => {
    if (condition.id) {
      this.setState({ dialog: null });
      deleteCalendarSetting(condition.id).then((res) => {
        if (res.status === 200) {
          this.setState({ page: 0 }, () => {
            this.getConditions();
          });
        }
      });
    }
    // const { conditions } = this.state;
    // conditions.splice(conditions.indexOf(condition), 1);
    // this.setState({ conditions: [...conditions] });
  };

  handleCloseCondition = () => this.setState({ dialog: null });

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { conditions, newCondition, page, rowsPerPage, dialog } = this.state;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
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

            {newCondition && (
              <Column
                classes={{ box: s.newConditionWrapper }}
                fullWidth
                alignChildrenStart
              >
                <Row fullWidth>
                  <Select
                    options={["", ...officeTypes]}
                    renderOption={(item) => (
                      <Typography fontSizeXS textSecondary>
                        {!item
                          ? t("allOffices")
                          : typeof item === "object"
                          ? t(...item)
                          : t(item)}
                      </Typography>
                    )}
                    displayEmpty
                    value={newCondition.officeType}
                    onChange={this.handleChangeOfficeType}
                    className={s.officeType}
                  />
                </Row>
                <Row fullWidth alignChildrenCenter paddingTopDouble wrap>
                  {dayTypes.map((day, index) => (
                    <React.Fragment key={index}>
                      <Box paddingBottom>
                        <Checkbox
                          variant='outlined'
                          label={t(day)}
                          classes={{ root: s.conditionDays }}
                          isChecked={newCondition.dayTypes === day}
                          onChange={() =>
                            this.handleChangeConditionField("dayTypes")(day)
                          }
                        />
                      </Box>
                    </React.Fragment>
                  ))}
                </Row>
                {isWidthDown("xs", width) && (
                  <Column fullWidth paddingTop paddingBottom>
                    <HorizontalDivider text={t("OR")} light />
                    <Row fullWidth paddingTop>
                      <DatePicker
                        value={newCondition.startDate || null}
                        onChange={this.handleChangeConditionField("startDate")}
                        TextFieldComponent={({ InputProps, ...props }) => (
                          <TextField
                            {...props}
                            variant='outlined'
                            classes={{ root: clsx(s.datePicker, s.leftPicker) }}
                            startAdornment={
                              <Typography fontSizeXS textSecondary>
                                {t("from")}
                              </Typography>
                            }
                            placeholder='MM/DD'
                          />
                        )}
                        format={"MM/DD"}
                      />
                      <DatePicker
                        value={newCondition.endDate || null}
                        onChange={this.handleChangeConditionField("endDate")}
                        TextFieldComponent={({ InputProps, ...props }) => (
                          <TextField
                            {...props}
                            variant='outlined'
                            classes={{
                              root: clsx(s.datePicker, s.rightPicker),
                            }}
                            startAdornment={
                              <Typography fontSizeXS textSecondary>
                                {t("to")}
                              </Typography>
                            }
                            placeholder='MM/DD'
                          />
                        )}
                        format={"MM/DD"}
                      />
                    </Row>
                  </Column>
                )}
                <Typography fontSizeXS textSecondary paddingTop>
                  {t("chooseTimeDuration")}
                </Typography>
                <Row paddingTop fullWidth wrap>
                  <TimePicker
                    value={newCondition.startTime || null}
                    onChange={this.handleChangeConditionField("startTime")}
                    TextFieldComponent={({ InputProps, ...props }) => (
                      <TextField
                        {...props}
                        variant='outlined'
                        classes={{ root: clsx(s.timePicker) }}
                      />
                    )}
                  />
                  <Box paddingLeftDouble />
                  <TimePicker
                    value={newCondition.endTime || null}
                    onChange={this.handleChangeConditionField("endTime")}
                    TextFieldComponent={({ InputProps, ...props }) => (
                      <TextField
                        {...props}
                        variant='outlined'
                        classes={{ root: clsx(s.timePicker) }}
                      />
                    )}
                  />
                </Row>
                {!isWidthDown("xs", width) && (
                  <Row fullWidth paddingTopDouble>
                    <TabWrapper
                      title={t("visitAvailabilityApplyToDateDuration")}
                      open
                      insideOpen
                    >
                      <Row fullWidth paddingTopHalf>
                        <DatePicker
                          value={newCondition.startDate || null}
                          onChange={this.handleChangeConditionField(
                            "startDate"
                          )}
                          TextFieldComponent={({ InputProps, ...props }) => (
                            <TextField
                              {...props}
                              variant='outlined'
                              classes={{
                                root: clsx(s.datePicker, s.leftPicker),
                              }}
                              startAdornment={
                                <Typography fontSizeXS textSecondary>
                                  {t("from")}
                                </Typography>
                              }
                              placeholder='MM/DD'
                            />
                          )}
                          format={"MM/DD"}
                        />
                        <DatePicker
                          value={newCondition.endDate || null}
                          onChange={this.handleChangeConditionField("endDate")}
                          TextFieldComponent={({ InputProps, ...props }) => (
                            <TextField
                              {...props}
                              variant='outlined'
                              classes={{
                                root: clsx(s.datePicker, s.rightPicker),
                              }}
                              startAdornment={
                                <Typography fontSizeXS textSecondary>
                                  {t("to")}
                                </Typography>
                              }
                              placeholder='MM/DD'
                            />
                          )}
                          format={"MM/DD"}
                        />
                      </Row>
                    </TabWrapper>
                  </Row>
                )}
                <Row fullWidth paddingTopDouble justifyChildrenEnd>
                  <Button onClick={this.handleSaveNewCondition}>
                    {t("save")}
                  </Button>
                </Row>
              </Column>
            )}

            {conditionsMockData?.length ? (
              <Column fullWidth classes={{ box: s.conditionsPanel }}>
                <TableContainer component='div'>
                  <Table
                    className={s.conditionsTable}
                    aria-label='simple table'
                  >
                    <TableHead>
                      <TableRow className={s.tableHead}>
                        {isWidthDown("xs", width) ? (
                          <TableCell>
                            {[t("day"), t("time"), t("office")].join("/")}
                          </TableCell>
                        ) : (
                          <>
                            <TableCell>{t("day")}</TableCell>
                            <TableCell>{t("time")}</TableCell>
                            <TableCell>{t("office")}</TableCell>
                          </>
                        )}
                        <TableCell>{t("actions")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conditionsMockData.map((c, index) => (
                        <TableRow key={index} className={s.tableBody}>
                          {isWidthDown("xs", width) ? (
                            <TableCell>
                              <Column alignChildrenStart>
                                <Typography fontSizeXS textSecondary>
                                  {c.startDate || c.endDate
                                    ? [
                                        c.startDate
                                          ? formatDate(c.startDate)
                                          : "",
                                        c.endDate ? formatDate(c.endDate) : "",
                                      ].join(" - ")
                                    : t(c.day)}
                                </Typography>
                                <Typography textPrimary fontSizeXXS>
                                  {[
                                    c.startTime ? formatHrMin(c.startTime) : "",
                                    c.endTime ? formatHrMin(c.endTime) : "",
                                  ].join(" - ")}
                                </Typography>
                                <Typography fontSizeXXS textMediumGrey>
                                  {t(c.officeType)}
                                </Typography>
                              </Column>
                            </TableCell>
                          ) : (
                            <>
                              <TableCell>
                                {c.startDate || c.endDate
                                  ? [
                                      c.startDate
                                        ? formatDate(c.startDate)
                                        : "",
                                      c.endDate ? formatDate(c.endDate) : "",
                                    ].join(" - ")
                                  : t(c.day)}
                              </TableCell>
                              <TableCell>
                                {[
                                  c.startTime ? formatHrMin(c.startTime) : "",
                                  c.endTime ? formatHrMin(c.endTime) : "",
                                ].join(" - ")}
                              </TableCell>
                              <TableCell>{t(c.officeType)}</TableCell>
                            </>
                          )}
                          <TableCell>
                            <Button
                              link='primary'
                              background='normalLight'
                              inverse
                              onClick={this.handleEditCondition(c)}
                              variant='icon'
                            >
                              <EditIcon style={{ width: 20, height: 18 }} />
                            </Button>
                            <Button
                              link='errorRedNormal'
                              background='errorRedLight'
                              inverse
                              onClick={this.handleDeleteCondition(c)}
                              variant='icon'
                              style={{ marginLeft: 24 }}
                            >
                              <DeleteIcon style={{ width: 20, height: 18 }} />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  count={conditions?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  className={s.tablePagination}
                />
              </Column>
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
        {dialog}
      </React.Fragment>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(CalendarSetting)))
);
