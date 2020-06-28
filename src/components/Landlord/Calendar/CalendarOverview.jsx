import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Row,
  Column,
  Box,
  Typography,
  Button,
  Link,
  Divider,
  Dot,
  UsersIcon,
} from "../../../common/base-components";
import {
  TabWrapper,
  SearchbarWithSorter,
  EventCalendar,
  EventDetailItem,
  EventListItem,
} from "../../../common/base-layouts";
import {
  getEventsByLandlord,
  getVisitRequestsByLandlord,
} from "../../../api/endpoints";
import { AddEventDialog } from "../../../components/Layout";

import { formatDate, getWeekday, formatHrMin } from "../../../utils/formatters";
import { checkEqualDate } from "../../../utils/validators";

import { weekdays } from "../../../utils/constants";

const styleSheet = (theme) => ({
  root: {},

  calendarPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8,
  },

  visit: {
    color: "#41AFFF",
  },
});

class CalendarOverview extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    onAcceptVisitRequest: PropTypes.func,
    onDeclineVisitRequest: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  getEvents = () => {
    if (getEventsByLandlord) {
      getEventsByLandlord().then((response) => {
        if (response.status === 200) {
          this.setState({ events: response.data });
        }
      });
    }
  };

  getVisitRequests = () => {
    if (getVisitRequestsByLandlord) {
      getVisitRequestsByLandlord().then((response) => {
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

  /** Get landlord offices */
  componentDidMount() {}

  handleFilterChange = ({ query }) => {
    this.setState({ query: query });
  };

  handleChangeViewMode = (viewMode) => () => {
    this.setState({ viewMode });
  };

  /** navigate to office detail page */
  handleNavigateOfficeDetail = (office, t) => () => {
    if (office.published === true) {
      this.props.navigate(
        "offices",
        `${office._id}/${office.location.country}/${t(office.officeType)}/${
          office.numberOfEmployees
        } ${t("employees")}/${office.refId}-${office.title}`.replace(
          /\s+/g,
          "-"
        )
      );
    } else {
      this.props.navigate("offices", `${office._id}/edit`);
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
    // TODO: add api of adding event
    this.handleCloseDialog();
  };

  editEvent = (event) => (newData) => {
    // TODO: add api of editing event
    this.handleCloseDialog();
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

  handleEditSelectedEvent = () => {};

  handleCancelSelectedEvent = () => {};

  /**
   * Renderer function
   */
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
        {/** Show search bar */}
        <Row fullWidth style={{ marginBottom: 42 }}>
          {isWidthDown("sm", width) && (
            <Column fullWidth>
              <Row fullWidth>
                <SearchbarWithSorter
                  query={query}
                  title={t("searchOnCalendar")}
                  onChange={this.handleFilterChange}
                />
              </Row>
              <Row fullWidth paddingTop>
                <Button
                  variant='primary'
                  onClick={this.handleAddEvent}
                  fullWidth
                >
                  {t("addEvent")}
                </Button>
              </Row>
            </Column>
          )}
          {!isWidthDown("sm", width) && (
            <React.Fragment>
              <SearchbarWithSorter
                query={query}
                title={t("searchOnCalendar")}
                onChange={this.handleFilterChange}
              />
              <Box paddingLeftDouble />
              <Button variant='primary' onClick={this.handleAddEvent}>
                {t("addEvent")}
              </Button>
            </React.Fragment>
          )}
        </Row>

        {/** Show week/month view mode selector */}
        <Row fullWidth paddingBottomDouble>
          <Grid
            container
            direction='row'
            spacing={2}
            justify={isWidthDown("xs", width) ? "center" : "space-between"}
          >
            <Grid item>
              <Row>
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
              </Row>
            </Grid>
            {!isWidthDown("xs", width) && (
              <Grid item>
                <Row>
                  <Typography textMediumGrey fontSizeS>
                    {formatDate(new Date()) +
                      " " +
                      t(weekdays[new Date().getDay()])}
                  </Typography>
                  &nbsp;
                  <Typography textSecondary fontSizeS>
                    {formatHrMin(new Date())}
                  </Typography>
                </Row>
              </Grid>
            )}
          </Grid>
        </Row>

        {/** Calendar panel */}
        <Row fullWidth style={{ marginBottom: 50 }}>
          <Column fullWidth classes={{ box: s.calendarPanel }}>
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

        {/** Selected event details */}
        <Row fullWidth style={{ marginBottom: 45 }}>
          <TabWrapper title={t("selectedEventDetails")} open insideOpen>
            {selectedEvent && (
              <React.Fragment>
                <Box paddingTop />
                <EventDetailItem
                  event={selectedEvent}
                  // onEdit={this.handleEditSelectedEvent}
                  onEdit={() => this.handleEditEvent(selectedEvent)}
                  onCancel={this.handleCancelSelectedEvent}
                  horizontal
                  fullWidth
                />
              </React.Fragment>
            )}
          </TabWrapper>
        </Row>

        {/** Selected day events */}
        <Row fullWidth style={{ marginBottom: 45 }}>
          <TabWrapper title={t("selectedDayEvents")} open insideOpen>
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
        {/* <Row fullWidth>
          <TabWrapper title={t("requestForVisiting")} open insideOpen>
            {visitRequests.map((event, index) => (
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
        </Row> */}

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withRouter(
    withStyles(styleSheet)(withTranslation("common")(CalendarOverview))
  )
);
