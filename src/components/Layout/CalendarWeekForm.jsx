import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
} from "@material-ui/core";
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import {
  Row,
  Column,
  Typography,
  Button,
  EditIcon,
  DeleteIcon,
  DeleteConfirmDialog,
} from "../../common/base-components";
import { shortWeekdays, weekdays, months } from "../../utils/constants";
import { formatHrMin, formatDate } from "../../utils/formatters";
import { AddTimeDialog } from "./Dialogs";
import { ConditionalWrapper } from "../../utils/helpers";

const styleSheet = (theme) => ({
  root: {
    borderRadius: 8,
    overflow: "hidden",
    minWidth: "100%",
  },

  weekHeader: {
    background: theme.colors.primary.white,
    padding: 20,
  },

  navWeekButton: {
    background: "none",
    color: theme.colors.primary.grey,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      background: theme.colors.primary.lightGrey,
      color: theme.colors.primary.grey,
    },
  },

  event: {
    border: `1px solid transparent`,
    margin: "8px -16px",
    width: "calc(100% + 32px)",
    padding: "20px 0px",
    [theme.breakpoints.down("sm")]: {
      margin: "-16px 8px",
      height: "calc(100% + 32px)",
      width: "unset",
      padding: "0px 20px",
    },
  },

  selectedEvent: {
    border: `1px solid ${theme.colors.primary.mainColor}`,
    borderRadius: 8,
  },

  datetimeWrapper: {
    margin: "0px 24px",
    width: "calc(100% - 48px)",
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down("sm")]: {
      border: "none",
      margin: 0,
      height: "calc(100% - 48px)",
      width: "unset",
      borderRight: `1px solid ${theme.colors.primary.borderGrey}`,
    },
  },

  visitDot: {
    position: "absolute",
    width: 8,
    height: 8,
    top: 6,
    right: 6,
    background: theme.colors.primary.errorRed,
    borderRadius: "50%",
  },

  approvedVisitDot: {
    background: "#41AFFF",
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
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      width: "unset",
      height: "calc(100% - 8px)",
    },
  },

  actionButton: {
    borderRadius: 8,
    minWidth: 36,
    width: 36,
    height: 36,
    padding: 0,
  },

  table: {
    background: theme.colors.primary.white,
    borderRadius: 8,
    boxShadow: "none",
    width: "100%",
    minHeight: 300,
  },

  headerCell: {
    background: theme.colors.primary.borderGrey,
    padding: "22px 0px 26px",
    borderRight: `1px solid ${theme.colors.primary.white}`,
    cursor: "pointer",
    "&:last-of-type": {
      borderRight: "none",
    },
    [theme.breakpoints.down("sm")]: {
      border: "none",
      borderBottom: `1px solid ${theme.colors.primary.white}`,
      width: 100,
    },
  },

  selectedHeaderCell: {
    background: theme.colors.primary.mainColor,
    color: `${theme.colors.primary.white} !important`,
  },

  dataCell: {
    border: "none",
    background: theme.colors.primary.white,
    verticalAlign: "top",
    padding: 0,
    width: "calc(100% / 7)",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      width: "unset",
      height: 70,
      verticalAlign: "middle",
    },
  },

  addButton: {
    background: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    color: theme.colors.primary.grey,
    width: 45,
    height: 45,
    margin: "24px 0px",
    [theme.breakpoints.down("sm")]: {
      margin: "0px 24px",
    },
  },
});

/** Render header cell */
const HeaderCell = React.memo(
  ({ t, width, weekday, startWeekDate, selected }) => {
    let date = null;
    if (startWeekDate) {
      date = formatDate(
        new Date(startWeekDate).setDate(
          new Date(startWeekDate).getDate() + weekday
        )
      );
    }

    return (
      <Column>
        <Typography
          fontSizeM={!isWidthDown("sm", width)}
          fontSizeS={isWidthDown("sm", width)}
          fontWeightBold
          textSecondary={!selected}
          textWhite={selected}
        >
          {t(
            isWidthDown("sm", width)
              ? shortWeekdays[weekday]
              : weekdays[weekday]
          )}
        </Typography>
        {date && (
          <Typography
            fontSizeXS
            textMediumGrey={!selected}
            textWhite={selected}
          >
            {date}
          </Typography>
        )}
      </Column>
    );
  }
);

/** Render available time */
const VisitDateTime = React.memo(
  ({
    classes: s,
    // start, end, type,
    event,
    onEdit,
    onDelete,
    onClick,
    selected,
  }) => {
    return (
      <Row classes={{ box: s.datetimeWrapper }}>
        <Row
          fullWidth
          justifyChildrenCenter
          relative
          onClick={onClick}
          classes={{ box: clsx(s.event, selected && s.selectedEvent) }}
        >
          {onEdit || onDelete ? (
            <Grid
              container
              direction='row'
              className={s.actionButtons}
              alignItems='center'
              justify='center'
              spacing={1}
            >
              {onDelete ? (
                <Grid item>
                  <Button
                    variant='primary'
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
                    variant='primary'
                    className={s.actionButton}
                    onClick={onEdit}
                  >
                    <EditIcon style={{ width: 15, height: 13 }} />
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          ) : null}
          <Column>
            <Typography
              fontSizeS
              textSecondary
              style={{ whiteSpace: "nowrap" }}
            >
              {formatHrMin(event.start)}
            </Typography>
            <Typography
              fontSizeS
              textSecondary
              style={{ whiteSpace: "nowrap" }}
            >
              {formatHrMin(event.end)}
            </Typography>
          </Column>
          {event.type === "visit" && (
            <div
              className={clsx(s.visitDot, event.approved && s.approvedVisitDot)}
            ></div>
          )}
        </Row>
      </Row>
    );
  }
);

const DataCell = ({
  classes: s,
  width,
  weekday,
  visitHours,
  onAdd,
  onEdit,
  onDelete,
  onClick,
  selectedEvent,
}) => {
  return (
    <Column fullHeight>
      <ConditionalWrapper
        condition={isWidthDown("sm", width)}
        wrapper={(children) => (
          <Row fullWidth fullHeight alignChildrenCenter>
            {children}
          </Row>
        )}
      >
        {visitHours?.length
          ? visitHours.map((v, index) => (
            <React.Fragment key={index}>
              <VisitDateTime
                classes={s}
                // start={v.start}
                // end={v.end}
                // type={v.type}
                event={v}
                onEdit={onEdit ? () => onEdit(v, weekday) : null}
                onDelete={onDelete ? () => onDelete(v, weekday) : null}
                onClick={onClick ? () => onClick(v, weekday) : null}
                selected={
                  selectedEvent &&
                    //  selectedEvent === v
                    new Date(selectedEvent.date).getTime() ===
                      new Date(v.date).getTime() &&
                    new Date(selectedEvent.start).getTime() ===
                      new Date(v.start).getTime() &&
                    new Date(selectedEvent.end).getTime() ===
                      new Date(v.end).getTime() &&
                    selectedEvent.type === v.type
                }
              />
            </React.Fragment>
          ))
          : null}
        {onAdd && (
          <Column
            classes={{ box: s.datetimeWrapper }}
            style={{ borderBottom: "none" }}
            alignChildrenCenter
            justifyChildrenCenter
          >
            <Button
              variant='icon'
              className={s.addButton}
              onClick={onAdd}
              background='normalLight'
              link='normalLight'
              inverse
            >
              <Add />
            </Button>
          </Column>
        )}
      </ConditionalWrapper>
    </Column>
  );
};

class CalendarWeekForm extends PureComponent {
  static propTypes = {
    /** visit-hours info */
    visitHours: PropTypes.object,
    /** change function */
    onChange: PropTypes.func,
    /** start date info */
    startWeekDate: PropTypes.object,
    /** selected week day */
    selectedWeekDay: PropTypes.string,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { dialog: null };

  componentDidUpdate() {}

  handleAdd = (day) => {
    this.setState({
      dialog: (
        <AddTimeDialog
          day={day}
          onClose={this.handleCloseDialog}
          onSave={this.handleAddAvailability}
        />
      ),
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
      ),
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
      ),
    });
  };

  handleAddAvailability = (e) => {
    if (this.props.onChange) {
      const visitHours = this.props.visitHours;
      visitHours[e.day] = [...(visitHours[e.day] || [])];
      visitHours[e.day].push({ start: e.start, end: e.end });
      this.props.onChange(visitHours);
    }
    this.handleCloseDialog();
  };

  handleEditAvailability = (v) => (e) => {
    if (this.props.onChange) {
      const visitHours = this.props.visitHours[e.day];
      visitHours[visitHours.indexOf(v)] = {
        start: e.start,
        end: e.end,
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

  handleSelectWeekday = (weekday) => {
    if (this.props.onSelectWeekday) {
      this.props.onSelectWeekday(weekday);
    }
  };

  handleSelectEvent = (event, weekday) => {
    if (this.props.onSelectWeekday) {
      this.props.onSelectWeekday(weekday);
    }
    if (this.props.onSelectEvent) {
      this.props.onSelectEvent(event, weekday);
    }
  };

  /**
   * Renderer function
   */
  render() {
    const {
      visitHours,
      onChange,
      startWeekDate,
      selectedWeekDay,
      selectedEvent,
      onPrevWeek,
      onNextWeek,
      width,
      classes: s,
      t,
    } = this.props;
    const { dialog } = this.state;

    return (
      <Column classes={{ box: s.root }}>
        {startWeekDate && (
          <Row fullWidth alignChildrenCenter classes={{ box: s.weekHeader }}>
            {onPrevWeek && (
              <Button onClick={onPrevWeek} className={s.navWeekButton}>
                <KeyboardArrowLeft />
              </Button>
            )}
            <Typography
              stretch
              fontSizeL={!isWidthDown("sm", width)}
              fontSizeS={isWidthDown("sm", width)}
              textSecondary
              justifyChildrenCenter
            >
              {startWeekDate.getFullYear() +
                " " +
                t(months[startWeekDate.getMonth()])}
            </Typography>
            {onNextWeek && (
              <Button onClick={onNextWeek} className={s.navWeekButton}>
                <KeyboardArrowRight />
              </Button>
            )}
          </Row>
        )}
        <Table className={s.table}>
          {isWidthDown("sm", width) ? (
            weekdays.map((d, index) => (
              <TableRow key={index}>
                <TableCell
                  className={clsx(
                    s.headerCell,
                    selectedWeekDay === d && s.selectedHeaderCell
                  )}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.handleSelectWeekday(d)}
                >
                  <HeaderCell
                    classes={s}
                    t={t}
                    width={width}
                    weekday={index}
                    // onClick={this.handleSelectWeekday}
                    startWeekDate={startWeekDate}
                    selected={selectedWeekDay === d && s.selectedHeaderCell}
                  />
                </TableCell>
                <TableCell key={index} className={s.dataCell}>
                  <DataCell
                    classes={s}
                    width={width}
                    weekday={d}
                    visitHours={visitHours[d]}
                    onAdd={onChange ? () => this.handleAdd(d) : null}
                    onEdit={onChange ? this.handleEdit : null}
                    onDelete={onChange ? this.handleDelete : null}
                    onClick={this.handleSelectEvent}
                    selectedEvent={selectedEvent}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <React.Fragment>
              <TableHead>
                <TableRow>
                  {weekdays.map((d, index) => (
                    <TableCell
                      key={index}
                      className={clsx(
                        s.headerCell,
                        selectedWeekDay === d && s.selectedHeaderCell
                      )}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleSelectWeekday(d)}
                    >
                      <HeaderCell
                        classes={s}
                        t={t}
                        width={width}
                        weekday={index}
                        startWeekDate={startWeekDate}
                        // onClick={this.handleSelectWeekday}
                        selected={selectedWeekDay === d && s.selectedHeaderCell}
                      />
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
                        weekday={d}
                        width={width}
                        visitHours={visitHours[d]}
                        onAdd={onChange ? () => this.handleAdd(d) : null}
                        onEdit={onChange ? this.handleEdit : null}
                        onDelete={onChange ? this.handleDelete : null}
                        onClick={this.handleSelectEvent}
                        selectedEvent={selectedEvent}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </React.Fragment>
          )}
        </Table>

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet, { name: "CalendarWeekForm" })(
    withTranslation("common")(CalendarWeekForm)
  )
);
