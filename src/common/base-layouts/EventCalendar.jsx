import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import mobiscroll from "@mobiscroll/react";

import { getFirstDayOfWeek } from "../../utils/formatters";

import { Row } from "../base-components";

import "@mobiscroll/react/dist/css/mobiscroll.react.scss";
import "./EventCalendar.scss";
import CalendarWeekForm from "../../components/Layout/CalendarWeekForm";
import { weekdays } from "../../utils/constants";

const styleSheet = (theme) => ({
  root: {},

  calendarPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8,
  },

  calendarWrapper: {
    zoom: 2,
    marginBottom: 20,
    [theme.breakpoints.down("sm")]: {
      zoom: "unset",
    },
  },

  weekCalendarWrapper: {
    marginBottom: 40,
  },

  visit: {
    color: "#41AFFF",
  },
});

class EventCalendar extends React.Component {
  static propTypes = {
    events: PropTypes.array,
    viewMode: PropTypes.string,
    selectedDay: PropTypes.any,
    selectedEvent: PropTypes.any,
    onSelectDay: PropTypes.func,
    onSelectEvent: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
    width: PropTypes.string,
  };

  handleSelectDay = (e) => {
    if (this.props.onSelectDay) {
      this.props.onSelectDay(e.date);
    }
  };

  handlePrevWeek = () => {
    if (this.props.onSelectDay) {
      const date = new Date(this.props.selectedDay);
      date.setDate(date.getDate() - 7);
      this.props.onSelectDay(date);
    }
  };

  handleNextWeek = () => {
    if (this.props.onSelectDay) {
      const date = new Date(this.props.selectedDay);
      date.setDate(date.getDate() + 7);
      this.props.onSelectDay(date);
    }
  };

  handleSelectWeekday = (weekday) => {
    if (this.props.onSelectDay) {
      const date = getFirstDayOfWeek(this.props.selectedDay);
      date.setDate(date.getDate() + weekdays.indexOf(weekday));
      this.props.onSelectDay(date);
    }
  };

  handleSelectEvent = (event) => {
    if (this.props.onSelectEvent) {
      this.props.onSelectEvent(event);
    }
  };

  render() {
    const {
      classes: s,
      selectedDay,
      selectedEvent,
      viewMode,
      events,
    } = this.props;

    const formattedEvents = events.map((e) => {
      return {
        d: new Date(e.date),
        color: e.type === "visit" ? "#41AFFF" : "#525252",
      };
    });
    const startWeekday = getFirstDayOfWeek(selectedDay);
    const endWeekday = new Date(startWeekday);
    endWeekday.setDate(endWeekday.getDate() + 7);
    const formattedVisithours = {};
    events
      .filter(
        (e) =>
          new Date(e.date).getTime() >= startWeekday.getTime() &&
          new Date(e.date).getTime() < endWeekday.getTime()
      )
      .forEach((e) => {
        const v =
          formattedVisithours[weekdays[new Date(e.date).getDay()]] || [];
        v.push({ date: e.date, start: e.start, end: e.end, type: e.type });
        formattedVisithours[weekdays[new Date(e.date).getDay()]] = v;
      });

    if (viewMode === "month") {
      return (
        <Row fullWidth classes={{ box: s.calendarWrapper }}>
          <mobiscroll.Eventcalendar
            display='inline'
            marked={formattedEvents}
            onSetDate={this.handleSelectDay}
            view={{ calendar: { type: viewMode } }}
            theme='windows'
            themeVariant='light'
          />
        </Row>
      );
    }
    if (viewMode === "week") {
      return (
        <Row fullWidth classes={{ box: s.weekCalendarWrapper }}>
          <CalendarWeekForm
            visitHours={formattedVisithours}
            startWeekDate={startWeekday}
            selectedWeekDay={weekdays[new Date(selectedDay).getDay()]}
            selectedEvent={selectedEvent}
            onSelectWeekday={this.handleSelectWeekday}
            onSelectEvent={this.handleSelectEvent}
            onPrevWeek={this.handlePrevWeek}
            onNextWeek={this.handleNextWeek}
          />
        </Row>
      );
    }
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation()(EventCalendar))
);
