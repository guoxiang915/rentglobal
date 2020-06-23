import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
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
} from "../../../common/base-components";
import {
  CloseIcon,
  EditIcon,
  CheckIcon,
} from "../../../common/base-components/Icons";
import CalendarWeekForm from "../../Layout/CalendarWeekForm";

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    width: "80%",
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8,

    [theme.breakpoints.down("sm")]: {
      minWidth: 320,
      minHeight: "auto",
    },
  },

  header: {
    width: "100%",
    padding: "12px 40px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  content: {
    padding: "42px 40px 16px",
    [theme.breakpoints.down("xs")]: {
      padding: 12,
    },
  },

  icon: {
    color: theme.colors.primary.borderGrey,
  },

  footer: {
    width: "100%",
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

class OfficeAvailabilityDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Office availability info */
    visitHours: PropTypes.any,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
    /** Event handler for saving data */
    onSave: PropTypes.func,
  };

  state = { visitHours: this.props.visitHours, isEdit: false };

  /**
   * Event handler for closing dialog
   * @description Call props.onClose() to close dialog
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleSave = () => {
    if (this.props.onSave) {
      this.props.onSave(this.state.visitHours);
    }
  };

  handleToggleEdit = () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleChangeVisitHours = (data) => {
    this.setState({ visitHours: data });
  };

  /** Render function */
  render() {
    const { title, className, classes: s, t } = this.props;
    const { isEdit, visitHours } = this.state;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby='help-dialog-title'
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id='help-dialog-title' className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title || t("officeAvailabilities")}
            </Typography>
            <Stretch />
            {/** close button */}
            <Button
              link='errorRed'
              background='secondaryLight'
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
          <Column alignChildrenStart>
            <CalendarWeekForm
              visitHours={visitHours}
              onChange={isEdit ? this.handleChangeVisitHours : null}
            />
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth>
            {/** close button */}
            <Button
              link='errorRed'
              background='secondaryLight'
              onClick={isEdit ? this.handleToggleEdit : this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>
                  {t(isEdit ? "cancelEdit" : "cancel")}
                </Typography>
              </Typography>
            </Button>
            <Stretch />
            {/** save/edit button */}
            <Button
              variant='primary'
              onClick={isEdit ? this.handleSave : this.handleToggleEdit}
            >
              <Typography fontSizeS alignChildrenCenter>
                {isEdit ? (
                  <CheckIcon style={{ width: 10, height: 10 }} />
                ) : (
                  <EditIcon style={{ width: 10, height: 10 }} />
                )}
                <Typography paddingLeft>
                  {t(isEdit ? "save" : "edit")}
                </Typography>
              </Typography>
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "OfficeAvailabilityDialog" })(
  withTranslation("common")(withWidth()(OfficeAvailabilityDialog))
);
