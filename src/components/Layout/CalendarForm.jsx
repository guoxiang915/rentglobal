import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { withLogin } from "../../common/base-services";
import {
  Row,
  Column,
  Typography,
  Button,
  EditIcon,
  DeleteIcon,
  DeleteConfirmDialog
} from "../../common/base-components";
import { weekdays } from "../../utils/constants";
import { formatHrMin } from "../../utils/formatters";
import { AddTimeDialog } from "./Dialogs";

const styleSheet = theme => ({
  root: {},

  datetimeWrapper: {
    padding: "24px 0px",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
  },

  actionButtons: {
    position: "absolute",
    top: 8,
    left: 8,
    bottom: 8,
    right: 8,
    width: "calc(100% - 8px)",
    borderRadius: 16,
    zIndex: 1,
    background: `${theme.colors.primary.darkGrey}a0`,
    opacity: 0,
    "&:hover": {
      opacity: 1
    }
  },

  actionButton: {
    borderRadius: 8,
    minWidth: 36,
    width: 36,
    height: 36,
    padding: 0
  },

  table: {
    background: theme.colors.primary.white,
    borderRadius: 8,
    boxShadow: "none",
    width: "100%",
    height: 500
  },

  headerCell: {
    background: theme.colors.primary.borderGrey,
    padding: "22px 0px 26px",
    borderRight: `1px solid ${theme.colors.primary.white}`,
    "&:last-of-type": {
      borderRight: "none"
    }
  },

  dataCell: {
    border: "none",
    background: theme.colors.primary.white,
    verticalAlign: "top",
    padding: 0,
    width: "calc(100% / 7)"
  },

  addButton: {
    background: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    color: theme.colors.primary.grey,
    width: 45,
    height: 45
  }
});

/** Render header cell */
const HeaderCell = React.memo(({ t, weekday }) => {
  return (
    <Column>
      <Typography fontSizeM fontWeightBold textSecondary>
        {t(weekdays[weekday])}
      </Typography>
    </Column>
  );
});

/** Render available time */
const VisitDateTime = React.memo(
  ({ classes: s, start, end, onEdit, onDelete }) => {
    return (
      <Row fullWidth justifyChildrenCenter relative>
        {onEdit || onDelete ? (
          <Grid
            container
            direction="row"
            className={s.actionButtons}
            alignItems="center"
            justify="center"
            spacing={1}
          >
            {onDelete ? (
              <Grid item>
                <Button
                  variant="primary"
                  className={s.actionButton}
                  onClick={onDelete}
                >
                  <DeleteIcon style={{ width: 15, height: 13 }} />
                </Button>
              </Grid>
            ) : null}
            {onEdit ? (
              <Grid item>
                <Button
                  variant="primary"
                  className={s.actionButton}
                  onClick={onEdit}
                >
                  <EditIcon style={{ width: 15, height: 13 }} />
                </Button>
              </Grid>
            ) : null}
          </Grid>
        ) : null}
        <Column classes={{ box: s.datetimeWrapper }}>
          <Typography fontSizeS textSecondary>
            {formatHrMin(start)}
          </Typography>
          <Typography fontSizeS textSecondary>
            {formatHrMin(end)}
          </Typography>
        </Column>
      </Row>
    );
  }
);

const DataCell = ({ classes: s, day, visitHours, onAdd, onEdit, onDelete }) => {
  return (
    <Column>
      {visitHours.map((v, index) => (
        <React.Fragment key={index}>
          <VisitDateTime
            classes={s}
            start={v.start}
            end={v.end}
            onEdit={() => onEdit(v, day)}
            onDelete={() => onDelete(v, day)}
          />
        </React.Fragment>
      ))}
      {onAdd && (
        <div className={s.datetimeWrapper} style={{ borderBottom: "none" }}>
          <Button
            variant="icon"
            className={s.addButton}
            onClick={onAdd}
            background="normalLight"
            link="normalLight"
            inverse
          >
            <Add />
          </Button>
        </div>
      )}
    </Column>
  );
};

class CalendarForm extends PureComponent {
  static propTypes = {
    /** visit-hours info */
    visitHours: PropTypes.object,
    /** change function */
    onChange: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { dialog: null };

  componentDidUpdate() {}

  handleAdd = day => {
    this.setState({
      dialog: (
        <AddTimeDialog
          day={day}
          onClose={this.handleCloseDialog}
          onSave={this.handleAddAvailability}
        />
      )
    });
  };

  handleEdit = (v, day) => {
    this.setState({
      dialog: (
        <AddTimeDialog
          day={day}
          start={v.start}
          end={v.end}
          onClose={this.handleCloseDialog}
          onSave={this.handleEditAvailability(v, day)}
        />
      )
    });
  };

  handleDelete = (v, day) => {
    this.setState({
      dialog: (
        <DeleteConfirmDialog
          text={this.props.t("confirmDelete")}
          onClose={this.handleCloseDialog}
          onConfirm={() => this.handleDeleteAvailability(v, day)}
        />
      )
    });
  };

  handleAddAvailability = e => {
    if (this.props.onChange) {
      const visitHours = this.props.visitHours;
      visitHours[e.day] = [...(visitHours[e.day] || [])];
      visitHours[e.day].push({ start: e.start, end: e.end });
      this.props.onChange(visitHours);
    }
    this.handleCloseDialog();
  };

  handleEditAvailability = v => e => {
    if (this.props.onChange) {
      const visitHours = this.props.visitHours[e.day];
      visitHours[visitHours.indexOf(v)] = {
        start: e.start,
        end: e.end
      };
      this.props.onChange({ ...this.props.visitHours, [e.day]: visitHours });
    }
    this.handleCloseDialog();
  };

  handleDeleteAvailability = (v, day) => {
    if (this.props.onChange) {
      const visitHours = this.props.visitHours;
      visitHours[day].splice(visitHours[day].indexOf(v), 1);
      this.props.onChange(visitHours);
    }
    this.handleCloseDialog();
  };

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /**
   * Renderer function
   */
  render() {
    const { visitHours, onChange, classes: s, t } = this.props;
    const { dialog } = this.state;

    return (
      <Table className={s.table}>
        <TableHead>
          <TableRow>
            {weekdays.map((d, index) => (
              <TableCell key={index} className={s.headerCell}>
                <HeaderCell classes={s} t={t} weekday={index} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {weekdays.map((d, index) => (
              <TableCell key={index} className={s.dataCell}>
                <DataCell
                  classes={s}
                  day={d}
                  visitHours={visitHours[d]}
                  onAdd={onChange ? () => this.handleAdd(d) : null}
                  onEdit={onChange ? this.handleEdit : null}
                  onDelete={onChange ? this.handleDelete : null}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>

        {/** Show dialog */}
        {dialog}
      </Table>
    );
  }
}

export default withWidth()(
  withLogin(withStyles(styleSheet)(withTranslation("common")(CalendarForm)))
);
