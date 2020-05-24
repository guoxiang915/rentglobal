import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
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
  KeyboardTimePicker
} from "@material-ui/pickers";
import { weekdays } from "../../../utils/constants";
import { formatDate } from "../../../utils/formatters";

const styleSheet = theme => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8,

    [theme.breakpoints.down("sm")]: {
      minWidth: 320,
      minHeight: "auto"
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
    justifyContent: "center"
  },

  container: {
    width: 215
  },

  date: {
    width: "100%",
    height: 47,
    background: theme.colors.primary.borderGrey,
    borderRadius: 99999,
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16
  },

  timePicker: {
    width: "100%",
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

class AddTimeDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Selected date */
    date: PropTypes.object,
    /** Selected start time */
    start: PropTypes.any,
    /** Selected end time */
    end: PropTypes.any,
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
    start: this.props.start || new Date(0, 0, 0, 0, 0, 0),
    end: this.props.end || new Date(0, 0, 0, 12, 0, 0)
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
    if (this.props.onSave) {
      this.props.onSave({
        date: new Date(this.props.date),
        start: new Date(this.state.start),
        end: new Date(this.state.end)
      });
    }
  };

  handleStartChange = start => {
    this.setState({ start });
  };

  handleEndChange = end => {
    this.setState({ end });
  };

  /** Render function */
  render() {
    const { title, date, className, classes: s, t } = this.props;
    const { start, end } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Dialog
          open
          onClose={this.handleClose}
          classes={{ paper: clsx(s.root, className) }}
        >
          {/** dialog title */}
          <DialogTitle className={s.header}>
            <Row fullWidth>
              <Typography fontSizeM textSecondary fontWeightBold>
                {title || t("availableHours")}
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
            <Column classes={{ box: s.container }}>
              <Row classes={{ box: s.date }}>
                <Typography fontSizeM textSecondary fontWeightBold>
                  {t(weekdays[date.getDay()])}
                </Typography>
                <Stretch />
                <Typography fontSizeXS textSecondary>
                  {formatDate(date)}
                </Typography>
              </Row>
              <KeyboardTimePicker
                value={start}
                maxDate={end}
                id="start-time-picker"
                onChange={this.handleStartChange}
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
              <KeyboardTimePicker
                value={end}
                minDate={start}
                id="end-time-picker"
                onChange={this.handleEndChange}
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
              <Button
                variant="primary"
                onClick={this.handleSave}
                className={s.applyButton}
              >
                <Typography fontSizeS alignChildrenCenter>
                  <CheckIcon fontSize="small" />
                  <Typography paddingLeft>{t("saveTime")}</Typography>
                </Typography>
              </Button>
            </Grid>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
    );
  }
}

export default withStyles(styleSheet, { name: "AddTimeDialog" })(
  withTranslation("common")(withWidth()(AddTimeDialog))
);
