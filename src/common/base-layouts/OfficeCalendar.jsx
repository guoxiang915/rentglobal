import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Row,
  Column,
  Stretch,
  Button,
  Link,
  Typography,
  Divider,
  Dot,
  UsersIcon
} from "../base-components";
import {
  TabWrapper,
  SearchbarWithSorter,
  EventCalendar,
  EventListItem
} from ".";
import { getEventsByOffice } from "../../api/endpoints";
import { formatDate, getWeekday } from "../../utils/formatters";
import { checkEqualDate } from "../../utils/validators";

const styleSheet = theme => ({
  root: {},

  calendarPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8
  },

  calendarWrapper: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 500
  },

  visit: {
    color: "#41AFFF"
  }
});

class OfficeCalendar extends React.Component {
  static propTypes = {
    officeId: PropTypes.string.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func,
    width: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      viewMode: "month",
      query: "",
      selectedDay: new Date(),
      selectedEvent: null
    };
    if (getEventsByOffice) {
      getEventsByOffice(props.officeId).then(response => {
        if (response.status === 200) {
          this.setState({ events: response.data });
        }
      });
    }
  }

  handleFilterChange = ({ query }) => {
    this.setState({ query: query });
  };

  handleChangeViewMode = viewMode => () => {
    this.setState({ viewMode });
  };

  handleAddEvent = () => {};

  handleEditEvent = () => {};

  handleAcceptVisit = () => {};

  handleDeclineVisit = () => {};

  handleSelectDay = date => {
    if (date) {
      if (!checkEqualDate(this.state.selectedDay, date)) {
        this.setState({ selectedDay: date, selectedEvent: null });
      }
    } else {
      this.setState({ selectedDay: new Date(), selectedEvent: null });
    }
  };

  handleSelectEvent = selectedEvent => {
    this.setState({ selectedEvent });
  };

  render() {
    const { classes: s, t } = this.props;
    const { selectedDay, selectedEvent, query, viewMode, events } = this.state;

    const selectedDayEvents = events.filter(e =>
      checkEqualDate(e.date, selectedDay)
    );

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Row fullWidth style={{ marginBottom: 42 }}>
          <SearchbarWithSorter
            query={query}
            title={t("searchOnCalendar")}
            onChange={this.handleFilterChange}
          />
        </Row>
        <Row fullWidth paddingBottomDouble>
          <Typography
            textSecondary={viewMode === "week"}
            textMediumGrey={viewMode !== "week"}
            fontWeightBold={viewMode === "week"}
            fontSizeS
            style={{ cursor: "pointer" }}
            onClick={this.handleChangeViewMode("week")}
          >
            {t("week")}
          </Typography>
          <Typography
            textSecondary={viewMode === "month"}
            textMediumGrey={viewMode !== "month"}
            fontWeightBold={viewMode === "month"}
            fontSizeS
            style={{ marginLeft: 60, cursor: "pointer" }}
            onClick={this.handleChangeViewMode("month")}
          >
            {t("month")}
          </Typography>
          <Stretch />
          <Button variant="primary" onClick={this.handleAddEvent}>
            {t("addEvent")}
          </Button>
        </Row>

        {/** Calendar panel */}
        <Row fullWidth style={{ marginBottom: 50 }}>
          <Column fullWidth classes={{ box: s.calendarPanel }}>
            {/* <mobiscroll.Eventcalendar
                display="inline"
                marked={formattedEvents}
                onSetDate={this.handleSelectDay}
                view={{ calendar: { type: viewMode } }}
                theme="windows"
                themeVariant="light"
              /> */}
            <EventCalendar
              events={events}
              viewMode={viewMode}
              selectedDay={selectedDay}
              selectedEvent={selectedEvent}
              onSelectDay={this.handleSelectDay}
              onSelectEvent={this.handleSelectEvent}
            />
            <Row
              fullWidth
              paddingLeftDouble
              alignChildrenCenter
              paddingBottomDouble
            >
              <Typography classes={{ box: s.visit }}>
                <Dot />
                <UsersIcon style={{ marginLeft: 16, width: 18, height: 16 }} />
                <Typography fontSizeXS paddingLeftHalf>
                  {t("visit")}
                </Typography>
              </Typography>
              <Typography textSecondary paddingLeftDouble>
                <Dot />
                <Typography fontSizeXS paddingLeft>
                  {t("generalEvent")}
                </Typography>
              </Typography>
            </Row>
            <Divider />
            <Row
              fullWidth
              paddingLeftDouble
              style={{ marginTop: 20, marginBottom: 20 }}
            >
              <Link
                onClick={() => this.handleSelectDay()}
                variant="primary"
                to="#"
              >
                {t("gotoToday")}
              </Link>
            </Row>
          </Column>
        </Row>

        {/** Selected day events */}
        <Row fullWidth style={{ marginBottom: 45 }}>
          <TabWrapper title={t("selectedDay")} open insideOpen>
            <Typography
              textSecondary
              fontSizeS
              fontWeightBold
              paddingTop
              paddingBottomHalf
            >
              {[formatDate(selectedDay), getWeekday(selectedDay)].join(" ")}
            </Typography>
            {selectedDayEvents.map((event, index) => (
              <React.Fragment key={index}>
                <EventListItem
                  event={event}
                  onEdit={() => this.handleEditEvent(event)}
                  t={t}
                />
              </React.Fragment>
            ))}
          </TabWrapper>
        </Row>

        {/** Request for visiting */}
        <Row fullWidth>
          <TabWrapper title={t("requestForVisiting")} open insideOpen>
            {events.map((event, index) => (
              <React.Fragment key={index}>
                <EventListItem
                  event={event}
                  showDate
                  onAccept={() => this.handleAcceptVisit(event)}
                  onDecline={() => this.handleDeclineVisit(event)}
                  t={t}
                />
              </React.Fragment>
            ))}
          </TabWrapper>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation()(OfficeCalendar));
