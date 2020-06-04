import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import {
  Row,
  Column,
  Box,
  Typography,
  Button,
  Stretch,
  Link,
  Divider,
  Dot,
  UsersIcon
} from "../../../common/base-components";
import {
  TabWrapper,
  SearchbarWithSorter,
  EventCalendar,
  EventDetailItem,
  EventListItem
} from "../../../common/base-layouts";
import { getEventsByLandlord } from "../../../api/endpoints";

import { formatDate, getWeekday, formatHrMin } from "../../../utils/formatters";
import { checkEqualDate } from "../../../utils/validators";

import { weekdays } from "../../../utils/constants";

const styleSheet = theme => ({
  root: {},

  calendarPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8
  },

  visit: {
    color: "#41AFFF"
  }
});

class CalendarOverview extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
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
    if (getEventsByLandlord) {
      getEventsByLandlord().then(response => {
        if (response.status === 200) {
          this.setState({ events: response.data });
        }
      });
    }
  }

  /** Get landlord offices */
  componentDidMount() {}

  handleFilterChange = ({ query }) => {
    this.setState({ query: query });
  };

  handleChangeViewMode = viewMode => () => {
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

  handleEditEvent = () => {};

  handleAcceptVisit = () => {};

  handleDeclineVisit = () => {};

  handleEditSelectedEvent = () => {};

  handleCancelSelectedEvent = () => {};

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const { selectedDay, selectedEvent, query, viewMode, events } = this.state;

    const selectedDayEvents = events.filter(e =>
      checkEqualDate(e.date, selectedDay)
    );

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** Show search bar */}
        <Row fullWidth style={{ marginBottom: 42 }}>
          <SearchbarWithSorter
            query={query}
            title={t("searchOnCalendar")}
            onChange={this.handleFilterChange}
          />
          <Box paddingLeftDouble />
          <Button variant="primary">{t("addEvent")}</Button>
        </Row>

        {/** Show week/month view mode selector */}
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
          <Typography textMediumGrey fontSizeS>
            {formatDate(new Date()) + " " + t(weekdays[new Date().getDay()])}
          </Typography>
          &nbsp;
          <Typography textSecondary fontSizeS>
            {formatHrMin(new Date())}
          </Typography>
        </Row>

        {/** Calendar panel */}
        <Row fullWidth style={{ marginBottom: 50 }}>
          <Column fullWidth classes={{ box: s.calendarPanel }}>
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

        {/** Selected event details */}
        <Row fullWidth style={{ marginBottom: 45 }}>
          <TabWrapper title={t("selectedEventDetails")} open insideOpen>
            {selectedEvent && (
              <EventDetailItem
                event={selectedEvent}
                onEdit={this.handleEditSelectedEvent}
                onCancel={this.handleCancelSelectedEvent}
                horizontal
                fullWidth
              />
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

export default withRouter(
  withStyles(styleSheet)(withTranslation("common")(CalendarOverview))
);
