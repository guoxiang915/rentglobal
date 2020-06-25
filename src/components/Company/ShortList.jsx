import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { KeyboardBackspace, Person, Repeat, ArrowForwardIos, ArrowBackIos } from "@material-ui/icons";
import { Container, Grid } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  DatePicker,
  TimePicker
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import {
  Column,
  Row,
  Box,
  Stretch,
  Button,
  ImageIcon,
  UserIcon,
  Typography,
  Checkbox,
  TextField,
  Divider,
  StarIcon,
  ArrowRightIcon,
  ArrowRightAltIcon,
} from "../../common/base-components";
import { SearchbarWithSorter } from "../../common/base-layouts";
import { getGeneralConditionsOfCalendar } from "../../api/endpoints";
import { formatDate } from "../../utils/formatters";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },

  visitRequestsPanel: {
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    background: theme.colors.primary.white,
    padding: "33px 23px",
  },

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

  borderBottom: {
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  paddingTopDouble: {
    paddingTop: 32,
  },

  paddingTop: {
    paddingTop: 12,
  },

  officeSlotWrapper: {
  },

  officeSlot: {
    maxWidth: 105,
    marginLeft: "auto",
    marginRight: "auto",
  },

  officeImage: {
    maxWidth: 70,
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
    dialog: null
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

  componentDidMount() {
    this.getConditions();
  }

  render() {
    const { classes: s, t, width, shortList = [] } = this.props;
    const { condition, dialog } = this.state;
    const emptyOfficeSlots = [];
    for (let index = 0; index < 4 - shortList.length; index++) {
      emptyOfficeSlots.push(index);
    }

    return (
      <>
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
              <Box fullWidth>
                <SearchbarWithSorter
                  title={t("searchByNameLocation")}
                />
              </Box>

              <Column style={{ paddingTop: 40, paddingBottom: 20 }} fullWidth>
                <Row fullWidth alignChildrenCenter>
                  {["allDays", "businessDays", "weekends"].map((day, index) => (
                    <React.Fragment key={index}>
                      <Checkbox
                        variant="outlined"
                        label={t(day)}
                        classes={{ root: s.conditionDays }}
                        isChecked={condition?.day === day}
                        onChange={this.handleChangeConditionDay(day)}
                      />
                    </React.Fragment>
                  ))}
                  <Stretch />
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
              </Column>

              <Divider />

              <Column fullWidth paddingTopDouble>
                <Grid container>
                  <Grid item xs={1} />
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Grid container>
                      {shortList.map(office => (
                        <Grid item xs={3} className={s.officeSlotWrapper}>
                          <Column classes={{ box: s.officeSlot }}>
                            <Row>
                              <img className={s.officeImage} src={office.coverPhotos[0]?.mobile?.bucketPath} />
                            </Row>
                            <Row paddingTop>
                              <Typography fontWeightBold fontSizeXXS>{office.title}</Typography>
                            </Row>
                            <Row paddingTopHalf>
                              <Typography fontSizeXXS>{t(office.officeType)}</Typography>
                            </Row>
                            <Row paddingTopHalf>
                              <Typography textPrimary fontSizeXXS>{t('dollarPerMonth', { dollar: office.priceMonthly || 0 })}</Typography>
                            </Row>
                            <Row paddingTopHalf>
                              <Box alignChildrenCenter>
                                <StarIcon className={s.ratingIcon} />
                                <Typography fontSizeXXS>3.5</Typography>
                              </Box>
                            </Row>
                          </Column>
                        </Grid>
                      ))}
                      {emptyOfficeSlots.map(() => (
                        <Grid item xs={3} />
                      ))}
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.paddingTopDouble, s.gridCenter)}>
                    <ArrowForwardIos className={s.forwardIcon} />
                  </Grid>
                  <Grid item xs={11} />
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("monday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10} className={s.borderBottom}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>10:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>12:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("tuesday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10} className={s.borderBottom}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("wednesday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10} className={s.borderBottom}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>10:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>12:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("thursday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10} className={s.borderBottom}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>10:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>12:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("friday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10} className={s.borderBottom}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>10:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>12:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("saturday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10} className={s.borderBottom}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>10:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>12:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter, s.greyBackground)}>
                    <Box paddingTop justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXS>{t("sunday")}</Typography>
                    </Box>
                    <Box paddingBottom justifyChildrenCenter fullWidth>
                      <Typography fontSizeXXXS textMediumGrey>{formatDate(new Date())}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs={10}>
                    <Grid container>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>08:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>11:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>10:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>12:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop>
                          <Row><Typography fontSizeXXS textMediumGrey>03:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>05:00 PM</Typography></Row>
                        </Column>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                      </Grid>
                      <Grid item xs={3} className={s.officeSlotWrapper}>
                        <Column classes={{ box: s.officeSlot }} paddingTop paddingBottom>
                          <Row><Typography fontSizeXXS textMediumGrey>09:30 AM</Typography></Row>
                          <Row><Typography fontSizeXXS textMediumGrey>10:00 AM</Typography></Row>
                        </Column>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={1} className={clsx(s.gridCenter)}>
                    <ArrowBackIos className={s.forwardIcon} />
                  </Grid>
                </Grid>
              </Column>
            </Row>

            <Row fullWidth style={{ marginBottom: 24 }} paddingTopDouble>
              <Stretch />
              <Button
                link="white"
                background="primary"
                inverse
                classes={{ root: s.nextStepButton }}
                onClick={this.handleNextStep}
              >
                <Typography fontSizeS>
                  {t("nextStep")}
                </Typography>
              </Button>
            </Row>
          </Column>
        </MuiPickersUtilsProvider>
        {dialog}
      </>
    )
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(ShortList))
);
