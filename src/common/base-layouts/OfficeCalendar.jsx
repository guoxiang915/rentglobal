import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import clsx from "clsx";
import {
  Row,
  Column,
  Stretch,
  Button,
  Link,
  Typography,
  Divider,
  UsersIcon,
  CancelIcon,
  EditIcon,
  CheckIcon
} from "../base-components";
import { TabWrapper } from ".";
import SearchbarWithSorter from "./SearchbarWithSorter";
import { getEventsByOffice } from "../../api/endpoints";
import mobiscroll from "@mobiscroll/react";

import { formatDate, getWeekday, formatHrMin } from "../../utils/formatters";
import { checkEqualDate } from "../../utils/validators";

import "./OfficeCalendar.scss";
import "@mobiscroll/react/dist/css/mobiscroll.react.scss";

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

const Dot = () => <div>•</div>;

const EventItem = withStyles(theme => ({
  root: {},

  datetime: {
    width: 200,
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },

  longDatetime: {
    width: 250
  },

  eventItemWrapper: {
    // flexDirection: "row",
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column"
    // }
  },

  contentWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
    // flexDirection: "row",
    // [theme.breakpoints.down("sm")]: {
    //   flexDirection: "column"
    // }
    minWidth: 300
  },

  content: {
    minWidth: 200
  },

  visit: {
    color: "#41AFFF"
  },

  actionButton: {
    marginLeft: 24
  }
}))(
  ({ classes: s, t, width, event, showDate, onEdit, onAccept, onDecline }) => {
    return (
      <Row
        fullWidth
        alignChildrenStart
        classes={{ box: s.eventItemWrapper }}
        wrap="wrap"
      >
        <Row
          justifyChildrenStart
          classes={{ box: clsx(s.datetime, showDate && s.longDatetime) }}
        >
          {showDate && (
            <Typography fontSizeS textSecondary>
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short"
              })}
              &nbsp;
            </Typography>
          )}
          <Typography fontSizeS textMediumGrey>
            {[formatHrMin(event.start), formatHrMin(event.end)].join(" - ")}
          </Typography>
        </Row>
        <Row
          classes={{ box: s.contentWrapper }}
          stretch
          alignChildrenStart
          wrap="wrap"
        >
          <Typography
            alignChildrenCenter
            stretch
            wrap="wrap"
            classes={{ box: s.content }}
          >
            <Typography
              classes={{ box: clsx(event.type === "visit" && s.visit) }}
              textMediumGrey
            >
              <Dot />
              <UsersIcon style={{ marginLeft: 16, width: 18, height: 16 }} />
              <Typography fontSizeXS paddingLeftHalf>
                {event.name}
              </Typography>
              {", "}
            </Typography>
            <Typography fontSizeS textSecondary>
              {event.content}
            </Typography>
          </Typography>
          <Row
            paddingTop
            fullWidth={isWidthDown("xs", width)}
            justifyChildrenEnd={isWidthDown("xs", width)}
          >
            {onEdit && (
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={onEdit}
                className={s.actionButton}
              >
                <EditIcon style={{ width: 20, height: 18 }} />
                <Typography paddingLeft fontSizeS>
                  {t("edit")}
                </Typography>
              </Button>
            )}
            {onDecline && (
              <Button
                link="errorRedNormal"
                background="errorRedLight"
                inverse
                onClick={onDecline}
                className={s.actionButton}
              >
                <CancelIcon style={{ width: 16, height: 16 }} />

                <Typography fontSizeS paddingLeft>
                  {t("decline")}
                </Typography>
              </Button>
            )}
            {onAccept && (
              <Button
                onClick={onAccept}
                variant="primary"
                className={s.actionButton}
              >
                <CheckIcon style={{ width: 16, height: 16 }} />
                <Typography fontSizeS paddingLeft>
                  {t("accept")}
                </Typography>
              </Button>
            )}
          </Row>
        </Row>
      </Row>
    );
  }
);

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
      selectedDay: new Date()
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

  handleSelectDay = e => {
    if (e) {
      if (!checkEqualDate(this.state.selectedDay, e.date)) {
        this.setState({ selectedDay: e.date });
      }
    } else {
      this.setState({ selectedDay: new Date() });
    }
  };

  render() {
    const { classes: s, t, width } = this.props;
    const { selectedDay, query, viewMode, events } = this.state;

    const selectedDayEvents = events.filter(e =>
      checkEqualDate(e.date, selectedDay)
    );

    const formattedEvents = events.map(e => {
      return {
        d: new Date(e.date),
        color: e.type === "visit" ? "#41AFFF" : "#525252"
      };
    });

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
            <Row
              fullWidth
              classes={{ box: s.calendarWrapper }}
              justifyChildrenCenter
            >
              <mobiscroll.Eventcalendar
                display="inline"
                marked={formattedEvents}
                onSetDate={this.handleSelectDay}
                view={{ calendar: { type: viewMode } }}
                theme="windows"
                themeVariant="light"
              />
            </Row>
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
                <EventItem
                  event={event}
                  onEdit={() => this.handleEditEvent(event)}
                  t={t}
                  width={width}
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
                <EventItem
                  event={event}
                  showDate
                  onAccept={() => this.handleAcceptVisit(event)}
                  onDecline={() => this.handleDeclineVisit(event)}
                  t={t}
                  width={width}
                />
              </React.Fragment>
            ))}
          </TabWrapper>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation()(OfficeCalendar))
);
