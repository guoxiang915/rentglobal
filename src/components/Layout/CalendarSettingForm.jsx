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
  Checkbox,
  TextField,
  // Select,
  ConfirmDialog,
  CalendarIcon,
  EditIcon,
  DeleteIcon,
  CloseIcon,
  CheckIcon,
  HorizontalDivider,
  DropDown,
} from "../../common/base-components";
import { TabWrapper } from "../../common/base-layouts";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@material-ui/core";

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker,
} from "@material-ui/pickers";
import { formatDate, formatHrMin } from "../../utils/formatters";
import { dayTypes, officeTypes, weekdays } from "../../utils/constants";

const styleSheet = (theme) => ({
  root: {},

  emptyConditionWrapper: {
    paddingTop: 110,
    paddingBottom: 50,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 24,
      paddingBottom: 24,
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

  timePickerWrapper: {
    [theme.breakpoints.down("xs")]: {
      flex: 1,
    },
  },

  timePicker: {
    width: 94,
    height: 34,
    borderRadius: 99999,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    color: theme.colors.primary.darkGrey,
    paddingRight: 0,
    "& input": {
      ...theme.fonts.size.fontSizeXS,
      textAlign: "center",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginBottom: 16,
    },
  },

  noonBtn: {
    height: 34,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    background: theme.colors.primary.white,
    color: theme.colors.primary.darkGrey,
    width: 47,
    fontWeight: "normal",
  },

  leftNoon: {
    borderRight: "none",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },

  rightNoon: {
    borderLeft: "none",
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },

  selectedNoon: {
    background: theme.colors.primary.mainColor,
    color: theme.colors.primary.white,
  },

  timePickerDivider: {
    width: 58,
    [theme.breakpoints.down("xs")]: {
      width: 0,
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

const SplitTimePicker = ({ classes: s, t, value, onChange, width }) => {
  const isAm = React.useMemo(() => value && new Date(value).getHours() < 12, [
    value,
  ]);
  const isPm = React.useMemo(() => value && new Date(value).getHours() >= 12, [
    value,
  ]);
  const changeNoon = React.useCallback(
    (noon) => {
      if (value) {
        if (isAm && noon === "pm") {
          const updateValue = new Date(value);
          updateValue.setHours(new Date(value).getHours() + 12);
          onChange(updateValue);
        } else if (isPm && noon === "am") {
          const updateValue = new Date(value);
          updateValue.setHours(new Date(value).getHours() - 12);
          onChange(updateValue);
        }
      }
    },
    [value, isAm, isPm, onChange]
  );

  return (
    <Row alignChildrenStart fullWidth={isWidthDown("xs", width)}>
      <TimePicker
        value={value}
        onChange={onChange}
        TextFieldComponent={({ InputProps, ...props }) => (
          <TextField
            {...props}
            value={props.value ? props.value.substring(0, 5) : ""}
            variant='outlined'
            classes={{ root: clsx(s.timePicker) }}
          />
        )}
        className={s.timePickerWrapper}
      />
      <Box paddingLeft />
      <Button
        className={clsx(s.noonBtn, s.leftNoon, isAm && s.selectedNoon)}
        onClick={() => changeNoon("am")}
      >
        <Typography fontSizeXS>{t("am")}</Typography>
      </Button>
      <Button
        className={clsx(s.noonBtn, s.rightNoon, isPm && s.selectedNoon)}
        onClick={() => changeNoon("pm")}
      >
        <Typography fontSizeXS>{t("pm")}</Typography>
      </Button>
    </Row>
  );
};

class CalendarSettingForm extends PureComponent {
  static propTypes = {
    office: PropTypes.object,
    newCondition: PropTypes.bool,

    getConditions: PropTypes.func,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,

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
    if (this.props.getConditions) {
      this.props.getConditions(params).then((response) => {
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

  componentDidUpdate(prevProps) {
    if (prevProps.newCondition !== this.props.newCondition) {
      this.setState({ newCondition: this.props.newCondition });
    }
  }

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

      if (this.props.onSave) {
        this.props.onSave(condition).then((res) => {
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

  handleCancelNewCondition = () => {
    this.setState({ newCondition: null }, () => {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    });
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
    this.setState({ dialog: null }, () => {
      if (this.props.onEdit) {
        this.props.onEdit(condition);
      }
    });
  };

  deleteCondition = (condition) => () => {
    this.setState({ dialog: null }, () => {
      if (this.props.onDelete) {
        this.props.onDelete(condition).then((res) => {
          if (res.status === 200) {
            this.setState({ newCondition: null, page: 0 }, () => {
              this.getConditions();
            });
          }
        });
      }
    });
  };

  handleCloseCondition = () => this.setState({ dialog: null });

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width, office } = this.props;
    const { conditions, newCondition, page, rowsPerPage, dialog } = this.state;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
            {newCondition && (
              <Column
                classes={{ box: s.newConditionWrapper }}
                fullWidth
                alignChildrenStart
              >
                {!office && (
                  <Row fullWidth paddingBottomDouble>
                    <DropDown
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
                )}
                <Row fullWidth alignChildrenCenter wrap>
                  <Box paddingBottom>
                    <DropDown
                      options={["", ...weekdays]}
                      renderOption={(item) => (
                        <Typography fontSizeXS textSecondary>
                          {!item
                            ? t("allDays")
                            : typeof item === "object"
                            ? t(...item)
                            : t(item)}
                        </Typography>
                      )}
                      displayEmpty
                      value={newCondition.dayTypes}
                      onChange={(e) =>
                        this.handleChangeConditionField()(e.target.value)
                      }
                      className={s.conditionDays}
                    />
                  </Box>
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
                  <SplitTimePicker
                    value={newCondition.startTime || null}
                    onChange={this.handleChangeConditionField("startTime")}
                    classes={s}
                    t={t}
                    width={width}
                  />
                  <Box classes={{ box: s.timePickerDivider }} />
                  <SplitTimePicker
                    value={newCondition.endTime || null}
                    onChange={this.handleChangeConditionField("endTime")}
                    classes={s}
                    t={t}
                    width={width}
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
                <Row fullWidth paddingTopHalf justifyChildrenEnd>
                  <Button
                    link='errorRed'
                    background='errorRedLight'
                    inverse
                    onClick={this.handleCancelNewCondition}
                  >
                    {t("cancel")}
                  </Button>
                  <Box paddingLeft />
                  <Button onClick={this.handleSaveNewCondition}>
                    {t("save")}
                  </Button>
                </Row>
              </Column>
            )}

            {conditions?.length ? (
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
                            <TableCell>{t("duration")}</TableCell>
                            <TableCell>{t("office")}</TableCell>
                          </>
                        )}
                        <TableCell>{t("actions")}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conditions.map((c, index) => (
                        <TableRow key={index} className={s.tableBody}>
                          {isWidthDown("xs", width) ? (
                            <TableCell>
                              <Column alignChildrenStart>
                                <Typography fontSizeXS textSecondary>
                                  {t(c.dayTypes)}
                                </Typography>
                                <Typography textMediumGrey fontSizeXXS>
                                  {[
                                    c.startTime ? formatHrMin(c.startTime) : "",
                                    c.endTime ? formatHrMin(c.endTime) : "",
                                  ].join(" - ")}
                                </Typography>
                                <Typography textPrimary fontSizeXXS>
                                  {t(c.officeType)}
                                </Typography>
                              </Column>
                            </TableCell>
                          ) : (
                            <>
                              <TableCell>{t(c.dayTypes)}</TableCell>
                              <TableCell>
                                {[
                                  c.startTime ? formatHrMin(c.startTime) : "",
                                  c.endTime ? formatHrMin(c.endTime) : "",
                                ].join(" - ")}
                              </TableCell>
                              <TableCell>
                                {[
                                  c.startDate ? formatDate(c.startDate) : "",
                                  c.endDate ? formatDate(c.endDate) : "",
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
                classes={{ box: s.emptyConditionWrapper }}
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
  withRouter(
    withStyles(styleSheet)(withTranslation("common")(CalendarSettingForm))
  )
);
