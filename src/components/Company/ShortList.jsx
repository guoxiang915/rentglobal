import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace, ArrowForwardIos } from "@material-ui/icons";
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import {
  Column,
  Row,
  Box,
  Stretch,
  Button,
  Typography,
  Checkbox,
  TextField,
  Divider,
  StarIcon, CloseIcon,
} from "../../common/base-components";
import { SearchbarWithSorter } from "../../common/base-layouts";
import { getGeneralConditionsOfCalendar } from "../../api/endpoints";
import { formatDate, formatHrMin } from "../../utils/formatters";
import VisitRequestDialog from "../Layout/Dialogs/VisitRequestDialog";
import VisitRequestSentDialog from "../Layout/Dialogs/VisitRequestSentDialog";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  sortInput: {
    '&.open': {
      borderBottom: "none",
      borderRadius: "27px 27px 0 0",
    },
  },

  sortedList: {
    borderRadius: "0 0 24px 24px",
    borderWidth: "0 1px 1px 1px",
    background: theme.colors.primary.white,
    borderColor: theme.colors.primary.borderGrey,
    borderStyle: "solid",
    padding: "0 24px",
  },

  sortedListItem: {
    paddingTop: 20,
    paddingBottom: 15,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,

    '&:last-of-type': {
      borderBottom: "none",
    },

    [theme.breakpoints.down("sm")]: {
      paddingTop: 16,
      paddingBottom: 16,
    },
  },

  visitRequestsPanel: {
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    background: theme.colors.primary.white,
    padding: "33px 23px",

    [theme.breakpoints.down("sm")]: {
      padding: 0,
      background: theme.colors.primary.transparent,
      border: "none",
    },
  },

  dayTypeFilterWrapper: {
    paddingTop: 40,
    paddingBottom: 20,

    [theme.breakpoints.down("sm")]: {
      paddingTop: 6,
      paddingBottom: 9,
    },
  },

  conditionDays: {
    width: 150,
    height: 34,
    marginRight: 12,
    background: theme.colors.primary.white,

    [theme.breakpoints.down("sm")]: {
      marginTop: 12,
      width: 144,
    }
  },

  conditionDaysInput: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "left",
      paddingLeft: 43,
      paddingRight: 0,
    },
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

    [theme.breakpoints.down("sm")]: {
      width: "50%",
    }
  },

  leftPicker: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    borderRight: "none",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  rightPicker: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeft: "none",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  visitRequestDetailPanelWrapper: {
    width: "100%",
    paddingTop: 34,
    overflowX: "auto",

    [theme.breakpoints.down("sm")]: {
      background: theme.colors.primary.white,
      paddingTop: 15,
      borderRadius: 8,
      border: `1px solid ${theme.colors.primary.borderGrey}`,
    }
  },

  visitRequestDetailPanel: {
    borderSpacing: 0,
  },

  table: {
    display: "table",
  },

  tableRow: {
    display: "table-row",
  },

  tableCell: {
    display: "table-cell",
  },

  weekdayColumn: {
    width: 122,
    minWidth: 122,
    alignSelf: "stretch",
    position: "relative",

    [theme.breakpoints.down("sm")]: {
      width: 82,
      minWidth: 82,
    }
  },

  weekdayColumnCell: {
    width: 69,
    position: "absolute",
    top: 0,
    bottom: 0,

    [theme.breakpoints.down("sm")]: {
      width: 70,
    }
  },

  officesWrapper: {
    minHeight: 57,

    [theme.breakpoints.down("sm")]: {
      minHeight: 59,
    },
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "69px 105px 105px 105px 105px",
    justifyContent: "space-between",
  },

  ratingIcon: {
    width: 11,
    height: 11,
    color: theme.colors.primary.mainColor,
    marginRight: 6,
  },

  forwardIcon: {
    color: theme.colors.primary.grey,
    height: 12,
  },

  gridCenter: {
    textAlign: "center",
  },

  greyBackground: {
    background: theme.colors.primary.borderGrey,
  },

  paddingTopDouble: {
    paddingTop: 32,
  },

  paddingTop: {
    paddingTop: 12,
  },

  officeSlot: {
    width: 105,
    minWidth: 105,
    marginRight: 65,
    position: "relative",

    '&:last-of-type': {
      marginRight: 0,
    },

    [theme.breakpoints.down("sm")]: {
      width: 88,
      minWidth: 88,
      marginRight: 19,
    },
  },

  visitHour: {
    cursor: "pointer",
    marginTop: 8,
    paddingLeft: 14,
    paddingRight: 14,

    '&:last-of-type': {
      marginBottom: 8,
    },
  },

  visitHourSelected: {
    border: `1px solid ${theme.colors.primary.mainColor}`,
    borderRadius: 4,
  },

  closeButton: {
    position: "absolute",
    width: 17,
    height: 17,
    padding: 0,
    minWidth: 17,
    top: -8,
    borderRadius: "50%",
    left: 8,
    background: theme.colors.primary.errorRed,

    [theme.breakpoints.down("sm")]: {
      left: -8,
    }
  },

  officeImage: {
    width: 70,
    height: 53,
    borderRadius: 8,

    [theme.breakpoints.down("sm")]: {
      width: 88,
      height: 50,
    },
  },

  borderBottom: {
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  nextStepButton: {
    paddingLeft: 74,
    paddingRight: 74,
  },
});

class ShortList extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    shortList: PropTypes.array,
  };

  state = {
    condition: { day: "allDays" },
    dialog: null,
    visitHours: [],
    query: '',
    isOpenSearchList: false,
  };

  officeFilterOptions = ["allOffices"];

  getConditions = () => {
    const params = {};
    if (getGeneralConditionsOfCalendar) {
      getGeneralConditionsOfCalendar(params).then(response => {
        if (response.status === 200) {
          this.setState({ conditions: response.data });
        }
      });
    }
  };

  handleBack = () => {
    this.props.navigate("back");
  };

  handleNextStep = () => { };

  handleChangeConditionDay = day => () =>
    this.setState(state => ({ condition: { ...state.condition, day } }));

  handleChangeStartDate = startDate =>
    this.setState(state => ({
      condition: { ...state.condition, startDate }
    }));

  handleChangeEndDate = endDate =>
    this.setState(state => ({
      condition: { ...state.condition, endDate }
    }));

  handleRemoveFromShortList = (office) => {
    this.props.setOfficeShortList(this.props.shortList.filter(item => item.id !== office.id));
  };

  handleAddToVisitRequest = (day, officeIndex, visitHourIndex) => {
    const { visitHours } = this.state;
    const index = visitHours.findIndex(h => (h.day === day && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex));
    if (index >= 0) {
      this.setState({ visitHours: [...visitHours.splice(index, 1)] });
    } else {
      this.setState({
        visitHours: [
          ...visitHours,
          {
            day,
            officeIndex,
            visitHourIndex,
            visitHour: {
              start: this.props.shortList[officeIndex]["visitHours"][day][visitHourIndex]["start"],
              end: this.props.shortList[officeIndex]["visitHours"][day][visitHourIndex]["end"]
            },
          },
        ],
      });
    }
  };

  handleSendVisitRequests = () => {
    this.setState({
      dialog: (
        <VisitRequestSentDialog onClose={this.handleCloseDialog} />
      )
    });
  };

  handleOpenVisitRequestsDialog = () => {
    this.setState({
      dialog: (
        <VisitRequestDialog
          offices={this.props.shortList}
          visitRequests={this.state.visitHours}
          onSave={this.handleSendVisitRequests}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  handleChangeQuery = ({ query }) => {
    this.setState({ query, isOpenSearchList: false }, () => {
      console.log('search', query);
    });
  };

  componentDidMount() {
    this.getConditions();
  }

  render() {
    const { classes: s, t, width, shortList = [] } = this.props;
    const { condition, dialog, visitHours, query, isOpenSearchList } = this.state;
    const emptyOfficeSlots = [];
    for (let index = 0; index < 4 - shortList.length; index++) {
      emptyOfficeSlots.push(index);
    }

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Column
            classes={{ box: s.root }}
            fullWidth
            alignChildrenStart
            paddingTopDouble
            paddingBottomDouble
          >
            <Row fullWidth paddingBottom>
              <Stretch />
              <Button
                link='secondary'
                background='secondaryLight'
                onClick={this.handleBack}
              >
                <KeyboardBackspace />
                <Typography paddingLeft fontSizeS>
                  {t("back")}
                </Typography>
              </Button>
            </Row>

            {/** show visit requests panel */}
            <Box paddingTopDouble />
            <Row
              classes={{ box: s.visitRequestsPanel }}
              fullWidth
              wrap
              column={isWidthDown("xs", width)}
            >
              <Box fullWidth column>
                <SearchbarWithSorter
                  title={t("searchByNameLocation")}
                  value={query}
                  onClick={() => this.setState({ isOpenSearchList: true })}
                  onChange={this.handleChangeQuery}
                  onSearch={this.handleSearch}
                  className={clsx(s.sortInput, isOpenSearchList && 'open')}
                />
                {isOpenSearchList && (
                  <Column fullWidth classes={{ box: s.sortedList }}>
                    <Row fullWidth classes={{ box: s.sortedListItem }}>Row 1</Row>
                    <Row fullWidth classes={{ box: s.sortedListItem }}>Row 2</Row>
                    <Row fullWidth classes={{ box: s.sortedListItem }}>Row 3</Row>
                  </Column>
                )}
              </Box>

              <Column fullWidth classes={{ box: s.dayTypeFilterWrapper }}>
                <Row fullWidth alignChildrenCenter wrap>
                  {["allDays", "businessDays", "weekends"].map((day, index) => (
                    <React.Fragment key={index}>
                      <Checkbox
                        variant="outlined"
                        label={t(day)}
                        classes={{ root: s.conditionDays, label: s.conditionDaysInput }}
                        isChecked={condition?.day === day}
                        onChange={this.handleChangeConditionDay(day)}
                      />
                    </React.Fragment>
                  ))}
                  <Stretch />
                  {!isWidthDown("xs", width) && (
                    <React.Fragment>
                      <DatePicker
                        value={condition?.startDate || null}
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
                        value={condition?.endDate || null}
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
                    </React.Fragment>
                  )}
                </Row>
                {isWidthDown("xs", width) && (
                  <Row fullWidth paddingTop>
                    <DatePicker
                      value={condition?.startDate || null}
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
                      value={condition?.endDate || null}
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
                )}
              </Column>

              {!isWidthDown("xs", width) && (
                <Divider />
              )}

              <div className={s.visitRequestDetailPanelWrapper}>
                <table className={clsx(s.visitRequestDetailPanel)}>
                  <thead>
                    <tr>
                      <th className={s.weekdayColumn} scope="col"></th>
                      <th className={s.officesWrapper} scope="col">
                        <Box>
                          {shortList.map((office, index) => (
                            <Column key={index} classes={{ box: s.officeSlot }} alignChildrenStart={isWidthDown("xs", width)}>
                              <Button
                                variant="icon"
                                link="secondary"
                                background="errorRed"
                                classes={{ root: s.closeButton }}
                                onClick={() => this.handleRemoveFromShortList(office)}
                              >
                                <CloseIcon style={{ width: 8, height: 8, color: "white" }} />
                              </Button>
                              <Row>
                                <img className={s.officeImage} src={office.coverPhotos[0]?.mobile?.bucketPath} />
                              </Row>
                              <Row paddingTop fullWidth noOverflowX>
                                <Typography fontWeightBold fontSizeXXS textNowrap>{office.title}</Typography>
                              </Row>
                              {!isWidthDown("xs", width) && (
                                <Row paddingTopHalf fullWidth>
                                  <Typography fontSizeXXS>{t(office.officeType)}</Typography>
                                </Row>
                              )}
                              <Row paddingTopHalf fullWidth noOverflowX>
                                <Typography textPrimary fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)}>{t('dollarPerMonth', { dollar: office.priceMonthly || 0 })}</Typography>
                              </Row>
                              <Row paddingTopHalf fullWidth>
                                <Box alignChildrenCenter>
                                  <StarIcon className={s.ratingIcon} />
                                  <Typography fontSizeXXS>3.5</Typography>
                                </Box>
                              </Row>
                            </Column>
                          ))}
                        </Box>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ height: isWidthDown("xs", width) ? 10 : 32 }}>
                      <th className={s.weekdayColumn}>
                        {!isWidthDown("xs", width) && (
                          <Box classes={{ box: s.weekdayColumnCell }} alignChildrenCenter justifyChildrenCenter>
                            <ArrowForwardIos className={s.forwardIcon} />
                          </Box>
                        )}
                      </th>
                      <td className={s.officesWrapper} />
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("monday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['monday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'monday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('monday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("tuesday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['tuesday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'tuesday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('tuesday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("wednesday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['wednesday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'wednesday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('wednesday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("thursday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['thursday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'thursday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('thursday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("friday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['friday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'friday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('friday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("saturday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['saturday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'saturday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('saturday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <th className={s.weekdayColumn}>
                        <Box classes={{ box: clsx(s.weekdayColumnCell, s.tableCell, s.greyBackground) }} column>
                          <Box paddingTop justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXS>{t("sunday")}</Typography>
                          </Box>
                          <Box paddingBottom justifyChildrenCenter fullWidth>
                            <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                          </Box>
                        </Box>
                      </th>
                      <td className={s.officesWrapper}>
                        <Box fullWidth classes={{ box: clsx(s.officesWrapper, s.borderBottom) }}>
                          {shortList.map((office, officeIndex) => (
                            <Column key={officeIndex} classes={{ box: s.officeSlot }}>
                              {office.visitHours['sunday']?.map((visitHour, visitHourIndex) => (
                                <Box
                                  classes={{ box: clsx(s.visitHour, visitHours.findIndex(h => (h.day === 'sunday' && h.officeIndex === officeIndex && h.visitHourIndex === visitHourIndex)) >= 0 && s.visitHourSelected) }}
                                  key={visitHourIndex}
                                  column
                                  paddingTopHalf
                                  paddingBottomHalf
                                  padding={isWidthDown("xs", width)}
                                  onClick={() => this.handleAddToVisitRequest('monday', officeIndex, visitHourIndex)}
                                >
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.start, (visitHour.start % 1) * 60))}</Typography></Row>
                                  <Row><Typography fontSizeXXS={!isWidthDown("xs", width)} fontSizeXXXS={isWidthDown("xs", width)} textMediumGrey>{formatHrMin(new Date(0, 0, 0, visitHour.end, (visitHour.end % 1) * 60))}</Typography></Row>
                                </Box>
                              ))}
                            </Column>
                          ))}
                        </Box>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Row>

            <Row fullWidth style={{ marginBottom: 24 }} paddingTopDouble>
              <Stretch />
              <Button
                link="white"
                background="primary"
                inverse
                classes={{ root: s.nextStepButton }}
                onClick={this.handleOpenVisitRequestsDialog}
              >
                <Typography fontSizeS>
                  {t("nextStep")}
                </Typography>
              </Button>
            </Row>
          </Column>
        </MuiPickersUtilsProvider>
        {dialog}
      </React.Fragment>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(ShortList))
);
