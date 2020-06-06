import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
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
  CheckIcon
} from "../../../common/base-components";
import {
  getGeneralConditionsOfCalendar
  // addConditionOfCalendar,
  // updateConditionOfCalendar,
  // deleteConditionOfCalendar
} from "../../../api/endpoints";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@material-ui/core";

import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
import { formatDate, formatHrMin } from "../../../utils/formatters";

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
  },

  conditionsPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8,
    marginTop: 35,
    padding: "20px 30px"
  },

  conditionsTable: {
    width: "100%"
  },

  tableHead: {
    "&> th": {
      color: theme.colors.primary.darkGrey,
      fontWeight: "normal"
    }
  },

  tableBody: {
    "&> td": {
      color: theme.colors.primary.grey
    }
  },

  tablePagination: {
    width: "100%",
    color: theme.colors.primary.grey
  }
});

class CalendarSetting extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    conditions: [],
    newCondition: null,
    page: 0,
    rowsPerPage: 5,
    dialog: null
  };

  officeFilterOptions = ["allOffices"];

  getConditions = () => {
    const params = {
      page: this.state.page,
      limit: this.state.rowsPerPage
    };
    if (getGeneralConditionsOfCalendar) {
      getGeneralConditionsOfCalendar(params).then(response => {
        if (response.status === 200) {
          this.setState({ conditions: response.data });
        }
      });
    }
  };

  componentDidMount() {
    this.getConditions();
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
    // const saver = null;
    // if (state.newCondition.id) {
    //   saver = updateConditionOfCalendar(
    //     state.newCondition.id,
    //     state.newCondition
    //   );
    // } else {
    //   saver = addConditionOfCalendar(state.newCondition);
    // }
    // if (saver) {
    //   saver.then(res => {
    //     if (res.status === 200) {
    //       this.setState({ newCondition: null, page: 0 }, () => {
    //         this.getConditions();
    //       });
    //     }
    //   });
    // }
    let { conditions, newCondition } = this.state;
    if (conditions.indexOf(newCondition) !== -1) {
      conditions[conditions.indexOf(newCondition)] = { ...newCondition };
      this.setState({
        conditions: [...conditions],
        newCondition: null
      });
    } else {
      this.setState({
        conditions: [...conditions, newCondition],
        newCondition: null
      });
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
  };

  handleEditCondition = condition => () => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="primary"
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
      )
    });
  };

  handleDeleteCondition = condition => () => {
    this.setState({
      dialog: (
        <ConfirmDialog
          variant="error"
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
      )
    });
  };

  editCondition = condition => () => {
    this.setState({ dialog: null });
    this.setState({ newCondition: condition });
  };

  deleteCondition = condition => () => {
    this.setState({ dialog: null });
    // deleteConditionOfCalendar(condition).then(res => {
    //   if (res.status === 200) {
    //     this.setState({ page: 0 }, () => {
    //       this.getConditions();
    //     });
    //   }
    // });
    const { conditions } = this.state;
    conditions.splice(conditions.indexOf(condition), 1);
    this.setState({ conditions: [...conditions] });
  };

  handleCloseCondition = () => this.setState({ dialog: null });

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const { conditions, newCondition, page, rowsPerPage, dialog } = this.state;

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
              <Column style={{ paddingTop: 40, paddingBottom: 20 }} fullWidth>
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
                            {t(item)}
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
              <Column fullWidth classes={{ box: s.conditionsPanel }}>
                <TableContainer component="div">
                  <Table
                    className={s.conditionsTable}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableRow className={s.tableHead}>
                        <TableCell>Day</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Office</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {conditions.map((c, index) => (
                        <TableRow key={index} className={s.tableBody}>
                          <TableCell>
                            {c.startDate || c.endDate
                              ? [
                                c.startDate ? formatDate(c.startDate) : "",
                                c.endDate ? formatDate(c.endDate) : ""
                              ].join(" - ")
                              : t(c.day)}
                          </TableCell>
                          <TableCell>
                            {[
                              c.startTime ? formatHrMin(c.startTime) : "",
                              c.endTime ? formatHrMin(c.endTime) : ""
                            ].join(" - ")}
                          </TableCell>
                          <TableCell>{t(c.officeFilter)}</TableCell>
                          <TableCell>
                            <Button
                              link="primary"
                              background="normalLight"
                              inverse
                              onClick={this.handleEditCondition(c)}
                              variant="icon"
                            >
                              <EditIcon style={{ width: 20, height: 18 }} />
                            </Button>
                            <Button
                              link="errorRedNormal"
                              background="errorRedLight"
                              inverse
                              onClick={this.handleDeleteCondition(c)}
                              variant="icon"
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
                  component="div"
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
