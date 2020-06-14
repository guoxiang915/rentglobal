import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import clsx from "clsx";
import {
  Row,
  Typography,
  Button,
  Dot,
  UsersIcon,
  CheckIcon,
  CancelIcon,
  HeadsetIcon,
} from "../base-components";
import { formatHrMin } from "../../utils/formatters";

const EventListItem = withStyles((theme) => ({
  root: {},

  datetime: {
    width: 200,
    paddingTop: 20,
    paddingBottom: 20,
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  longDatetime: {
    width: 250,
  },

  eventItemWrapper: {},

  contentWrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
    minWidth: 300,
  },

  content: {
    minWidth: 200,
  },

  visit: {
    color: "#41AFFF",
  },

  actionButton: {
    marginLeft: 24,
  },
}))(
  ({ classes: s, t, width, event, showDate, onEdit, onAccept, onDecline }) => {
    return (
      <Row
        fullWidth
        alignChildrenStart
        classes={{ box: s.eventItemWrapper }}
        wrap='wrap'
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
                month: "short",
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
          wrap='wrap'
        >
          <Typography
            alignChildrenCenter
            stretch
            wrap='wrap'
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
                link='secondary'
                background='secondaryLight'
                onClick={onEdit}
                className={s.actionButton}
                style={{ maxWidth: 170 }}
              >
                <HeadsetIcon style={{ width: 18, height: 18 }} />
                <Typography paddingLeft fontSizeS>
                  {t("requestForEdit")}
                </Typography>
              </Button>
            )}
            {onDecline && (
              <Button
                link='errorRedNormal'
                background='errorRedLight'
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
                variant='primary'
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

export default withWidth()(withTranslation("common")(EventListItem));
