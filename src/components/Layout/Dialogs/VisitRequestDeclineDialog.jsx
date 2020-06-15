import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
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
  TextField,
} from "../../../common/base-components";
import { CloseIcon } from "../../../common/base-components/Icons";

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    width: "50%",
    padding: 0,
    minWidth: 565,
    borderRadius: 8,

    [theme.breakpoints.down("sm")]: {
      minWidth: 320,
      minHeight: "auto",
      width: "80%",
    },
  },

  header: {
    width: "100%",
    padding: "12px 40px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  content: {
    display: "flex",
    padding: "32px 30px 42px",
  },

  container: {},

  footer: {
    width: "100%",
    padding: "12px 40px",
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  applyButton: {
    width: 175,
    [theme.breakpoints.down("xs")]: {
      width: "auto",
    },
  },
});

class VisitRequestDeclineDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for saving time */
    onSave: PropTypes.func,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
  };

  state = {
    msg: "",
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
      this.props.onSave({ reason: this.state.msg });
    }
  };

  handleChangeState = (field) => (value) => {
    this.setState({ [field]: value });
  };

  handleChangeStateByEvent = (field) => (e) => {
    this.handleChangeState(field)(e.target.value);
  };

  /** Render function */
  render() {
    const { title, className, classes: s, t } = this.props;
    const { msg } = this.state;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle className={s.header}>
          <Row fullWidth wrap>
            <Typography fontSizeM textSecondary fontWeightBold>
              {title || t("reasonOfDecline")}
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
          <Column
            classes={{ box: s.container }}
            fullWidth
            fullHeight
            alignChildrenStart
          >
            <Typography fontSizeS textSecondary>
              {t("writeReasonToDecline")}
            </Typography>
            <Row fullWidth paddingTopHalf>
              <TextField
                variant='outlined'
                value={msg}
                onChange={this.handleChangeStateByEvent("msg")}
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
            direction='row'
            justify='space-between'
            alignItems='center'
            className={s.filterPanel}
          >
            <Stretch />
            <Button
              variant='primary'
              onClick={this.handleSave}
              className={s.applyButton}
            >
              <Typography fontSizeS alignChildrenCenter>
                <Typography paddingLeft>{t("send")}</Typography>
              </Typography>
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "VisitRequestDeclineDialog" })(
  withTranslation("common")(withWidth()(VisitRequestDeclineDialog))
);
