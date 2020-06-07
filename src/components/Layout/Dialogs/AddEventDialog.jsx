import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar,
  withStyles
} from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import {
  Button,
  Typography,
  Row,
  Stretch,
  Column,
  TextField
} from "../../../common/base-components";
import { CloseIcon, CheckIcon } from "../../../common/base-components/Icons";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  DatePicker
} from "@material-ui/pickers";
import { Alert } from "@material-ui/lab";

const styleSheet = theme => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    width: "65%",
    padding: 0,
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8,

    [theme.breakpoints.down("sm")]: {
      minWidth: 320,
      minHeight: "auto",
      width: "95%"
    }
  },

  header: {
    width: "100%",
    padding: "12px 40px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  content: {
    // padding: "82px 120px",
    // [theme.breakpoints.down("sm")]: {
    //   padding: "40px 16px",
    // },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 30px 42px"
  },

  container: {},

  date: {
    // width: "100%",
    // height: 47,
    // background: theme.colors.primary.borderGrey,
    // borderRadius: 99999,
    // alignItems: "center",
    // paddingLeft: 16,
    // paddingRight: 16
  },

  timePicker: {
    // width: "100%",
    maxWidth: 215,
    marginTop: 12,
    borderRadius: 99999,
    border: theme.colors.primary.borderGrey,
    color: theme.colors.primary.darkGrey,
    ...theme.fonts.size.fontSizeS
  },

  icon: {
    color: theme.colors.primary.borderGrey
  },

  footer: {
    width: "100%",
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`
  },

  applyButton: {
    width: 175,
    [theme.breakpoints.down("xs")]: {
      width: "auto"
    }
  }
});

class AddEventDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Selected end time */
    event: PropTypes.any,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for saving time */
    onSave: PropTypes.func,
    /** Event handler for closing dialog */
    onClose: PropTypes.func
  };

  state = {
    date:
      this.props.event?.date ||
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ),
    start: new Date(this.props.event?.start || 0),
    end: new Date(this.props.event?.end || 12 * 3600 * 1000),
    name: this.props.event?.name || "",
    content: this.props.event?.content || "",
    snackMsg: null
  };

  /**
   * Event handler for closing dialog
   * @description Call props.onClose() to close dialog
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  /**
   * Event handler for add start, end time
   */
  handleSave = () => {
    const start = new Date(this.state.start);
    const end = new Date(this.state.end);
    const date = new Date(this.state.date);
    if (start.getTime() >= end.getTime()) {
      this.setState({
        snackMsg: {
          severity: "error",
          msg: this.props.t("startTimeLessThanEndTime")
        }
      });
      return;
    }
    if (this.props.onSave) {
      this.props.onSave({
        title: this.state.name,
        description: this.state.content,
        range: {
          start: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            start.getHours(),
            start.getMinutes(),
            start.getSeconds()
          ).getTime(),
          end: new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            end.getHours(),
            end.getMinutes(),
            end.getSeconds()
          ).getTime()
        }
      });
    }
  };

  handleChangeState = field => value => {
    this.setState({ [field]: value });
  };

  handleChangeStateByEvent = field => e => {
    this.handleChangeState(field)(e.target.value);
  };

  handleCloseSnackMsg = () => {
    this.setState({ snackMsg: null });
  };

  /** Render function */
  render() {
    const { title, className, classes: s, t } = this.props;
    const { date, start, end, name, content, snackMsg } = this.state;

    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Dialog
            open
            onClose={this.handleClose}
            classes={{ paper: clsx(s.root, className) }}
          >
            {/** dialog title */}
            <DialogTitle className={s.header}>
              <Row fullWidth wrap>
                <Typography fontSizeM textSecondary fontWeightBold>
                  {title || t("addEvent")}
                </Typography>
                <Stretch />
                {/** close button */}
                <Button
                  link="errorRed"
                  background="secondaryLight"
                  onClick={this.handleClose}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    <CloseIcon style={{ width: 10, height: 10 }} />
                    <Typography paddingLeft>{t("cancel")}</Typography>
                  </Typography>
                </Button>
              </Row>
            </DialogTitle>

            {/** dialog content */}
            <DialogContent className={s.content}>
              <Column classes={{ box: s.container }} fullWidth>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  justify="space-between"
                >
                  <Grid item>
                    <DatePicker
                      value={date}
                      onChange={this.handleChangeState("date")}
                      TextFieldComponent={({ InputProps, ...props }) => (
                        <TextField
                          {...props}
                          variant="outlined"
                          fullWidth
                          className={s.timePicker}
                          endAdornment={InputProps.endAdornment}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <KeyboardTimePicker
                          value={start}
                          maxDate={end}
                          onChange={this.handleChangeState("start")}
                          KeyboardButtonProps={{
                            "aria-label": "change time"
                          }}
                          TextFieldComponent={({ InputProps, ...props }) => (
                            <TextField
                              {...props}
                              variant="outlined"
                              fullWidth
                              className={s.timePicker}
                              endAdornment={InputProps.endAdornment}
                            />
                          )}
                          minutesStep={10}
                        />
                      </Grid>
                      <Grid item>
                        <KeyboardTimePicker
                          value={end}
                          minDate={start}
                          onChange={this.handleChangeState("end")}
                          KeyboardButtonProps={{
                            "aria-label": "change time"
                          }}
                          TextFieldComponent={({ InputProps, ...props }) => (
                            <TextField
                              {...props}
                              variant="outlined"
                              fullWidth
                              className={s.timePicker}
                              endAdornment={InputProps.endAdornment}
                            />
                          )}
                          minutesStep={10}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Row fullWidth style={{ paddingTop: 38 }}>
                  <TextField
                    variant="outlined"
                    value={name}
                    onChange={this.handleChangeStateByEvent("name")}
                    placeholder={t("eventTitle")}
                    fullWidth
                  />
                </Row>
                <Row fullWidth style={{ paddingTop: 25 }}>
                  <TextField
                    variant="outlined"
                    value={content}
                    onChange={this.handleChangeStateByEvent("content")}
                    placeholder={t("description")}
                    fullWidth
                    multiline
                    rows={6}
                  />
                </Row>
              </Column>
            </DialogContent>

            {/** dialog footer */}
            <DialogActions className={s.footer}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={s.filterPanel}
              >
                <Stretch />
                <Button
                  variant="primary"
                  onClick={this.handleSave}
                  className={s.applyButton}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    <CheckIcon fontSize="small" />
                    <Typography paddingLeft>{t("save")}</Typography>
                  </Typography>
                </Button>
              </Grid>
            </DialogActions>
          </Dialog>
        </MuiPickersUtilsProvider>

        {snackMsg && (
          <Snackbar
            open
            autoHideDuration={4000}
            onClose={this.handleCloseSnackMsg}
          >
            <Alert
              onClose={this.handleCloseSnackMsg}
              severity={snackMsg.severity || "info"}
            >
              {snackMsg.msg || snackMsg}
            </Alert>
          </Snackbar>
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styleSheet, { name: "AddEventDialog" })(
  withTranslation("common")(withWidth()(AddEventDialog))
);
