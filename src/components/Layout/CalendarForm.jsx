import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import { withLogin } from '../../common/base-services';
import { Column, Typography, Button } from '../../common/base-components';
import { weekdays } from '../../utils/constants';
import {
  formatDate,
  formatHrMin,
  getFirstDayOfWeek,
} from '../../utils/formatters';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

const styleSheet = (theme) => ({
  root: {},

  datetimeWrapper: {
    padding: '24px 0px',
  },

  table: {
    background: theme.colors.primary.white,
    borderRadius: 8,
    boxShadow: 'none',
    width: '100%',
    height: 500,
  },

  headerCell: {
    background: theme.colors.primary.borderGrey,
    padding: '22px 0px 26px',
    borderRight: `1px solid ${theme.colors.primary.white}`,
    '&:last-of-type': {
      borderRight: 'none',
    },
  },

  dataCell: {
    border: 'none',
    background: theme.colors.primary.white,
    verticalAlign: 'top',
  },

  addButton: {
    background: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    color: theme.colors.primary.grey,
    width: 45,
    height: 45,
  },
});

/** Render header cell */
const HeaderCell = React.memo(({ t, firstWeekday, weekday }) => {
  const d = new Date(firstWeekday);
  d.setDate(d.getDate() + weekday);

  return (
    <Column>
      <Typography fontSizeM fontWeightBold textSecondary>
        {t(weekdays[weekday])}
      </Typography>
      <Typography fontSizeXS textMediumGrey style={{ marginTop: 4 }}>
        {formatDate(d)}
      </Typography>
    </Column>
  );
});

/** Render available time */
const VisitDateTime = React.memo(({ classes: s, start, end, onEdit }) => {
  return (
    <Column classes={{ box: s.datetimeWrapper }} onClick={onEdit || (() => {})}>
      <Typography fontSizeS textSecondary>
        {formatHrMin(start)}
      </Typography>
      <Typography fontSizeS textSecondary>
        {formatHrMin(end)}
      </Typography>
    </Column>
  );
});

const DataCell = React.memo(({ classes: s, visits, onAdd, onEdit }) => {
  return (
    <Column>
      {visits.forEach((v, index) => (
        <React.Fragment key={index}>
          <VisitDateTime
            classes={s}
            start={v.start}
            end={v.end}
            onEdit={onEdit}
          />
        </React.Fragment>
      ))}
      {onAdd && (
        <div className={s.datetimeWrapper}>
          <Button variant="icon" className={s.addButton} onClick={onAdd}>
            <Add />
          </Button>
        </div>
      )}
    </Column>
  );
});

class CalendarForm extends PureComponent {
  static propTypes = {
    /** Date info */
    startDate: PropTypes.object.isRequired,
    /** visits info */
    visits: PropTypes.object,
    /** save function */
    onSave: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { availabilities: [] };

  componentDidUpdate() {
    // this.setState({ availabilities: this.props.visits || [] });
  }

  handleAdd = () => {};

  /**
   * Renderer function
   */
  render() {
    const { startDate, onSave, classes: s, t } = this.props;
    const { availabilities, dialog } = this.state;
    const firstWeekday = getFirstDayOfWeek(startDate);

    return (
      <Table className={s.table}>
        <TableHead>
          <TableRow>
            {weekdays.map((d, index) => (
              <TableCell key={index} className={s.headerCell}>
                <HeaderCell
                  classes={s}
                  t={t}
                  firstWeekday={firstWeekday}
                  weekday={index}
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
                  visits={availabilities.filter(
                    (v) =>
                      new Date(v.date).getTime() ===
                      new Date(
                        firstWeekday.getFullYear(),
                        firstWeekday.getMonth(),
                        firstWeekday.getDate() + index
                      ).getTime()
                  )}
                  onAdd={onSave ? () => this.handleAdd(index) : null}
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
  withLogin(withStyles(styleSheet)(withTranslation('common')(CalendarForm)))
);
