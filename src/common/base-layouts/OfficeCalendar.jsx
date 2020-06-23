import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
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
  UsersIcon,
} from "../base-components";
import {
  TabWrapper,
  SearchbarWithSorter,
  EventCalendar,
  EventListItem,
} from ".";
import {
  getEventsByOffice,
  addEventByOffice,
  getVisitRequestsByOffice,
} from "../../api/endpoints";
import { formatDate, getWeekday } from "../../utils/formatters";
import { checkEqualDate } from "../../utils/validators";
import { AddEventDialog } from "../../components/Layout";

const styleSheet = (theme) => ({
  root: {},

  calendarPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8,
  },

  calendarWrapper: {
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 500,
  },

  visit: {
    color: "#41AFFF",
  },
});

class OfficeCalendar extends React.Component {
  static propTypes = {
    officeId: PropTypes.string.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func,
    width: PropTypes.string,
  };

  getEvents = () => {
    if (getEventsByOffice) {
      getEventsByOffice(this.props.officeId).then((response) => {
        if (response.status === 200) {
          this.setState({ events: response.data });
        }
      });
    }
  };

  getVisitRequests = () => {
    if (getVisitRequestsByOffice) {
      getVisitRequestsByOffice(this.props.officeId).then((response) => {
        if (response.status === 200) {
          this.setState({ visitRequests: response.data });
        }
      });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      visitRequests: [],
      viewMode: "month",
      query: "",
      selectedDay: new Date(),
      selectedEvent: null,
      dialog: null,
    };
    this.getEvents();
    this.getVisitRequests();
  }

  handleFilterChange = ({ query }) => {
    this.setState({ query: query });
  };

  handleChangeViewMode = (viewMode) => () => {
    this.setState({ viewMode });
  };

  handleAddEvent = () => {
    this.setState({
      dialog: (
        <AddEventDialog
          onSave={this.addEvent}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };

  handleEditEvent = (event) => {
    this.setState({
      dialog: (
        <AddEventDialog
          title={this.props.t("editEvent")}
          event={event}
          onSave={this.editEvent(event)}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };

  addEvent = (event) => {
    addEventByOffice(this.props.officeId, event).then(() => {
      this.handleCloseDialog();
      this.getEvents();
    });
  };

  editEvent = (event) => (newData) => {
    // TODO: add api of editing event
    this.handleCloseDialog();
    console.log(event, newData);
  };

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  handleAcceptVisitRequest = (visitRequest) => {
    if (this.props.onAcceptVisitRequest) {
      this.props.onAcceptVisitRequest(visitRequest);
    }
  };

  handleDeclineVisitRequest = (visitRequest) => {
    if (this.props.onDeclineVisitRequest) {
      this.props.onDeclineVisitRequest(visitRequest);
    }
  };

  handleSelectDay = (date) => {
    if (date) {
      if (!checkEqualDate(this.state.selectedDay, date)) {
        this.setState({ selectedDay: date, selectedEvent: null });
      }
    } else {
      this.setState({ selectedDay: new Date(), selectedEvent: null });
    }
  };

  handleSelectEvent = (selectedEvent) => {
    this.setState({ selectedEvent });
  };

  render() {
    const { classes: s, t, width } = this.props;
    const {
      selectedDay,
      selectedEvent,
      query,
      viewMode,
      events,
      visitRequests,
      dialog,
    } = this.state;

    const formattedVisitRequests = visitRequests.map((v) => ({
      ...v,
      type: "visit",
    }));
    const formattedEvents = events.map((e) => {
      const start = new Date(e.range.start);
      const end = new Date(e.range.end);
      return {
        type: "event",
        date: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
        start: new Date(
          start.getHours(),
          start.getMinutes(),
          start.getSeconds()
        ),
        end: new Date(end.getHours(), end.getMinutes(), end.getSeconds()),
        name: e.title,
        content: e.description,
      };
    });
    const totalEvents = formattedVisitRequests.concat(formattedEvents);
    const selectedDayEvents = totalEvents.filter((v) =>
      checkEqualDate(v.date, selectedDay)
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

        {isWidthDown("xs", width) && (
          <Row fullWidth paddingBottomDouble>
            <Button variant='primary' onClick={this.handleAddEvent} fullWidth>
              {t("addEvent")}
            </Button>
          </Row>
        )}
        <Row fullWidth paddingBottomDouble justifyChildrenCenter>
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
          {!isWidthDown("xs", width) && (
            <>
              <Stretch />
              <Button variant='primary' onClick={this.handleAddEvent}>
                {t("addEvent")}
              </Button>
            </>
          )}
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
              events={totalEvents}
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
              <Typography classes={{ box: s.visit }} alignChildrenCenter>
                <Dot />
                <UsersIcon style={{ marginLeft: 16, width: 18, height: 16 }} />
                <Typography fontSizeXS paddingLeftHalf>
                  {t("visit")}
                </Typography>
              </Typography>
              <Typography textSecondary paddingLeftDouble alignChildrenCenter>
                <Dot />
                <Typography fontSizeXS paddingLeft>
                  {t("generalEvent")}
                </Typography>
              </Typography>
              <Typography textSecondary paddingLeftDouble alignChildrenCenter>
                <Typography textErrorRed>
                  <Dot />
                </Typography>
                <Typography fontSizeXS paddingLeft>
                  {t("request")}
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
                variant='primary'
                to='#'
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
            {formattedVisitRequests.map((event, index) => (
              <React.Fragment key={index}>
                <EventListItem
                  event={event}
                  showDate
                  onAccept={() => this.handleAcceptVisitRequest(event)}
                  onDecline={() => this.handleDeclineVisitRequest(event)}
                  t={t}
                />
              </React.Fragment>
            ))}
          </TabWrapper>
        </Row>

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation()(OfficeCalendar))
);
