import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Row,
  Column,
  Box,
  Typography,
  Button,
  CalendarIcon,
  CarouselWrapper,
  Stretch,
  Link,
  Divider,
  UsersIcon,
  EditIcon,
  CheckIcon,
  CancelIcon
} from "../../common/base-components";
import {
  TabWrapper,
  StatisticIconBox,
  SearchbarWithSorter,
  EventCalendar
} from "../../common/base-layouts";
import { ConditionalWrapper } from "../../utils/helpers";
import { getEventsByLandlord } from "../../api/endpoints";

import { formatDate, getWeekday, formatHrMin } from "../../utils/formatters";
import { checkEqualDate } from "../../utils/validators";

import { weekdays } from "../../utils/constants";

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

  eventItemWrapper: {},

  contentWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
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

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: 120,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
      marginBottom: 80
    }
  },

  fullWidth: {
    width: "100%"
  },

  lightIcon: {
    color: theme.colors.primary.darkGrey,
    opacity: 0.15
  },

  tabWrapper: {
    paddingTop: 28
  },

  statisticBoxWrapper: {},

  statisticBox: {
    marginBottom: 10,
    padding: 0,
    paddingRight: 8,
    "&:last-of-type": {
      paddingRight: 0
    }
  },

  calendarPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8
  },

  visit: {
    color: "#41AFFF"
  }
});

class Calendar extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  statistics = [
    {
      title: "visitRequests",
      value: 4,
      icon: CalendarIcon
    },
    {
      title: "personalEvents",
      value: 7,
      icon: CalendarIcon
    },
    {
      title: "acceptedVisitRequests",
      value: 18,
      icon: CalendarIcon
    }
  ];

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

  handleFilterChange = ({ query }) => {
    this.setState({ query: query });
  };

  handleChangeViewMode = viewMode => () => {
    this.setState({ viewMode });
  };

  /** Navigation */
  navigate = path => () => {
    this.props.navigate(path);
  };

  /** Get landlord offices */
  componentDidMount() {}

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

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const { selectedDay, selectedEvent, query, viewMode, events } = this.state;

    const selectedDayEvents = events.filter(e =>
      checkEqualDate(e.date, selectedDay)
    );

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/** title */}
        <Row fullWidth style={{ marginBottom: 45 }} alignChildrenStart>
          <Typography fontSizeM textSecondary>
            {t("calendar")}
          </Typography>
        </Row>

        {/** show statistics */}
        <Row
          classes={{ box: s.statisticBoxWrapper }}
          wrap
          fullWidth
          style={{ marginBottom: 42 }}
        >
          <ConditionalWrapper
            condition={isWidthDown("sm", width)}
            wrapper={children => (
              <TabWrapper
                open
                insideOpen
                title={t("stat")}
                bodyClass={s.tabWrapper}
              >
                <CarouselWrapper itemWidth={200} itemOffset={0}>
                  {children}
                </CarouselWrapper>
              </TabWrapper>
            )}
          >
            {this.statistics.map((stat, index) => (
              <React.Fragment key={index}>
                <Box classes={{ box: s.statisticBox }}>
                  <StatisticIconBox
                    icon={
                      <stat.icon
                        className={s.lightIcon}
                        style={{ width: 14, height: 13 }}
                      />
                    }
                    title={t(stat.title)}
                    statistics={[{ value: stat.value, variant: "primary" }]}
                  />
                </Box>
              </React.Fragment>
            ))}
          </ConditionalWrapper>
        </Row>

        <Row fullWidth style={{ marginBottom: 42 }}>
          <SearchbarWithSorter
            query={query}
            title={t("searchOnCalendar")}
            onChange={this.handleFilterChange}
          />
          <Box paddingLeftDouble />
          <Button variant="primary">{t("addEvent")}</Button>
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
              <Typography
                textSecondary
                fontSizeS
                fontWeightBold
                paddingTop
                paddingBottomHalf
              >
                {[formatDate(selectedDay), getWeekday(selectedDay)].join(" ")}
              </Typography>
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
      </Column>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation("common")(Calendar)))
);
