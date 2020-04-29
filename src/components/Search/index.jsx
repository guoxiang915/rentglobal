import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { Grid, Popover, Paper, Chip } from '@material-ui/core';
import {
  Row,
  Column,
  Stretch,
  Button,
  Typography,
  TextField,
  Checkbox,
  NumberField,
  Divider,
  CloseIcon,
  SearchIcon,
  GoogleMap,
  GoogleMapMarker,
  UncheckIcon,
  CheckIcon,
} from '../../common/base-components';
import { officeTypes, contractTypes } from '../../utils/constants';

import { styleSheet } from './Search';
import { OfficeItem } from '../../common/base-layouts';
import { getPublishedOffices } from '../../api/endpoints';

const Searchbox = ({ classes: s, t, q, onSearch }) => {
  const [query, setQuery] = React.useState(q);
  React.useEffect(() => setQuery(q), [q]);
  const handleKeyPress = React.useCallback(
    (e) => {
      if (e.key === 'Enter') onSearch(query);
    },
    [onSearch, query]
  );
  const handleChange = React.useCallback((e) => setQuery(e.target.value), []);

  return (
    <TextField
      variant="outlined"
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      placeholder={t('advancedSearchboxText')}
      className={s.searchInput}
      styles={{ input: s.searchInputProps }}
      endAdornment={
        <Button
          variant="icon"
          background="primary"
          style={{ margin: 0 }}
          className={s.searchInputIcon}
          shadow
          onClick={() => onSearch(query)}
        >
          <SearchIcon style={{ width: 16, height: 16 }} />
        </Button>
      }
    />
  );
};

const OfficeTypeFilterPanel = ({ classes: s, t, types, onApply }) => {
  const handleClickType = (type) => {
    if (!types) types = [];
    if (types.indexOf(type) !== -1) {
      types.splice(types.indexOf(type), 1);
    } else {
      types.push(type);
    }
    onApply(types);
  };

  return (
    <Column classes={{ box: s.filterPanel }} alignChildrenStart>
      {officeTypes.map((type, index) => (
        <React.Fragment key={index}>
          <Row classes={{ box: s.filterLine }}>
            <Checkbox
              classes={{ label: s.checkbox }}
              color="primary"
              isChecked={(types && types.indexOf(type) !== -1) || false}
              onChange={() => handleClickType(type)}
              icon={UncheckIcon}
              checkedIcon={(props) => (
                <div className={s.checkIcon}>
                  <CheckIcon style={{ width: 14, height: 10 }} />
                </div>
              )}
              label={
                <Typography
                  fontSizeS
                  textPrimary={types && types.indexOf(type) !== -1}
                  textSecondary
                  paddingLeft
                >
                  {t(type)}
                </Typography>
              }
            />
          </Row>
        </React.Fragment>
      ))}
    </Column>
  );
};

const ContractTypeFilterPanel = ({ classes: s, t, types, onApply }) => {
  const handleClickType = (type) => {
    if (!types) types = [];
    if (types.indexOf(type) !== -1) {
      types.splice(types.indexOf(type), 1);
    } else {
      types.push(type);
    }
    onApply(types);
  };

  return (
    <Column classes={{ box: s.filterPanel }} alignChildrenStart>
      {contractTypes.map((type, index) => (
        <React.Fragment key={index}>
          <Row classes={{ box: s.filterLine }}>
            <Checkbox
              classes={{ label: s.checkbox }}
              color="primary"
              isChecked={(types && types.indexOf(type) !== -1) || false}
              onChange={() => handleClickType(type)}
              icon={UncheckIcon}
              checkedIcon={(props) => (
                <div className={s.checkIcon}>
                  <CheckIcon style={{ width: 14, height: 10 }} />
                </div>
              )}
              label={
                <Typography
                  fontSizeS
                  textPrimary={types && types.indexOf(type) !== -1}
                  textSecondary
                  paddingLeft
                >
                  {t(type)}
                </Typography>
              }
            />
          </Row>
        </React.Fragment>
      ))}
    </Column>
  );
};

const RoomsFilterPanel = ({ classes: s, t, rooms: r, onApply }) => {
  const [rooms, setRooms] = React.useState(r);
  React.useEffect(() => setRooms(r), [r]);

  return (
    <Column alignChildrenStart style={{ width: 400 }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={s.filterPanel}
      >
        <Typography fontSizeS textSecondary>
          {t('rooms')}
        </Typography>
        <NumberField
          inputProps={{ min: 0 }}
          value={rooms}
          onChange={(e) => setRooms(e.target.value)}
          className={s.numberField}
        />
      </Grid>
      <Divider />

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={s.filterPanel}
      >
        <Button
          link="errorRed"
          background="secondaryLight"
          onClick={() => onApply()}
        >
          <Typography fontSizeS alignChildrenCenter>
            <CloseIcon style={{ width: 10, height: 10 }} />
            <Typography paddingLeft>{t('clear')}</Typography>
          </Typography>
        </Button>
        <Button
          variant="primary"
          onClick={() => onApply(rooms)}
          className={s.applyButton}
        >
          <Typography fontSizeS alignChildrenCenter>
            <CheckIcon style={{ width: 16, height: 12 }} />
            <Typography paddingLeft>{t('apply')}</Typography>
          </Typography>
        </Button>
      </Grid>
    </Column>
  );
};

const EmployeesFilterPanel = ({ classes: s, t, employees: e, onApply }) => {
  const [employees, setEmployees] = React.useState(e);
  React.useEffect(() => setEmployees(e), [e]);

  return (
    <Column alignChildrenStart style={{ width: 400 }}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={s.filterPanel}
      >
        <Typography fontSizeS textSecondary>
          {t('numberOfEmployees')}
        </Typography>
        <NumberField
          value={employees}
          onChange={(e) => setEmployees(e.target.value)}
          className={s.numberField}
        />
      </Grid>
      <Divider />

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={s.filterPanel}
      >
        <Button
          link="errorRed"
          background="secondaryLight"
          onClick={() => onApply()}
        >
          <Typography fontSizeS alignChildrenCenter>
            <CloseIcon style={{ width: 10, height: 10 }} />
            <Typography paddingLeft>{t('clear')}</Typography>
          </Typography>
        </Button>
        <Button
          variant="primary"
          onClick={() => onApply(employees)}
          className={s.applyButton}
        >
          <Typography fontSizeS alignChildrenCenter>
            <CheckIcon style={{ width: 16, height: 12 }} />
            <Typography paddingLeft>{t('apply')}</Typography>
          </Typography>
        </Button>
      </Grid>
    </Column>
  );
};

const FilterPanel = React.memo(
  ({ classes, t, filter, value, onChangeFilter }) => {
    switch (filter.type) {
      case 'officeTypes':
        return (
          <OfficeTypeFilterPanel
            classes={classes}
            t={t}
            types={value}
            onApply={onChangeFilter('officeTypes')}
          />
        );

      case 'typeOfContracts':
        return (
          <ContractTypeFilterPanel
            classes={classes}
            t={t}
            types={value}
            onApply={onChangeFilter('typeOfContracts')}
          />
        );

      case 'rooms':
        return (
          <RoomsFilterPanel
            classes={classes}
            t={t}
            rooms={value}
            onApply={onChangeFilter('rooms')}
          />
        );

      case 'employees':
        return (
          <EmployeesFilterPanel
            classes={classes}
            t={t}
            employees={value}
            onApply={onChangeFilter('employees')}
          />
        );

      default:
        return null;
    }
  }
);

const FilterWrapper = React.memo(
  ({ classes: s, t, filter, value, onChangeFilter }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = React.useCallback(
      (e) => setAnchorEl(e.currentTarget),
      []
    );
    const closeAnchor = React.useCallback(() => setAnchorEl(null), []);
    const handleChangeFilter = React.useCallback(
      (filter) => (value) => {
        onChangeFilter(filter, value);
        closeAnchor();
      },
      [onChangeFilter, closeAnchor]
    );

    return (
      <div className={s.filterWrapper}>
        <Button
          onClick={openAnchor}
          classes={{
            root: clsx(s.filterButton, !!value && s.filterSelectedButton),
          }}
          rounded
        >
          {t(filter.title)}
        </Button>

        {/* account info panel */}
        <Popover
          id="accountinfo-popover"
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={closeAnchor}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          classes={{ paper: s.filterPaneWrapper }}
        >
          <Paper className={s.filterContentWrapper}>
            <FilterPanel
              classes={s}
              t={t}
              filter={filter}
              value={value}
              onChangeFilter={handleChangeFilter}
            />
          </Paper>
        </Popover>
      </div>
    );
  }
);

/** Get filter chips */
const FilterChip = React.memo(({ classes: s, t, filter, value, onChange }) => {
  const handleRemoveFilter = React.useCallback(
    ({ filter, ...params }) => {
      if (
        (filter === 'officeTypes' || filter === 'typeOfContracts') &&
        typeof params.index === 'number'
      ) {
        value.splice(params.index, 1);
        onChange(value);
      } else {
        onChange();
      }
    },
    [value, onChange]
  );

  switch (filter) {
    case 'officeTypes':
      return (
        <>
          {value.map((v, index) => (
            <Chip
              key={filter + index}
              label={t(v)}
              onDelete={() => handleRemoveFilter({ filter, index })}
              className={s.filterValue}
              color="primary"
            />
          ))}
        </>
      );

    case 'typeOfContracts':
      return (
        <>
          {value.map((v, index) => (
            <Chip
              key={filter + index}
              label={t(v)}
              onDelete={() => handleRemoveFilter({ filter, index })}
              className={s.filterValue}
              color="primary"
            />
          ))}
        </>
      );

    case 'rooms':
      return (
        <Chip
          key={filter}
          label={t('roomsWithNumber', { count: value })}
          onDelete={() => handleRemoveFilter({ filter })}
          className={s.filterValue}
          color="primary"
        />
      );

    case 'employees':
      return (
        <Chip
          key={filter}
          label={t('employeesWithNumber', { count: value })}
          onDelete={() => handleRemoveFilter({ filter })}
          className={s.filterValue}
          color="primary"
        />
      );

    default:
      return null;
  }
});

class Search extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    searchByMap: false,
    q: '',
    filters: {},
    offices: [],
    loading: false,
  };

  filters = [
    {
      type: 'location',
      title: 'location',
    },
    {
      type: 'officeTypes',
      title: 'type',
    },
    {
      type: 'price',
      title: 'price',
    },
    {
      type: 'employees',
      title: 'employees',
    },
    {
      type: 'rooms',
      title: 'rooms',
    },
    {
      type: 'typeOfContracts',
      title: 'howLong',
    },
    {
      type: 'moreFilter',
      title: 'moreFilter',
    },
  ];

  /** Search office by text, filters, map... */
  searchOffices = () => {
    const params = { q: this.state.q };
    Object.entries(this.state.filters).forEach(([key, filter]) => {
      params[key] = filter;
    });
    this.setState({ loading: true });
    getPublishedOffices(params).then(
      (response) => {
        if (response.status === 200) {
          this.setState({ offices: response.data, loading: false });
        } else if (response.status === 404) {
          this.setState({ offices: [], loading: false });
        }
      },
      (error) => {
        if (error.response.status === 404) {
          this.setState({ offices: [], loading: false });
        }
      }
    );
  };

  componentDidMount() {
    const { state } = this.props.location;
    if (state?.query) {
      this.setState({ q: state.query }, () => {
        this.props.history.replace({
          pathname: '/search',
          state: null,
        });
        this.searchOffices();
      });
    } else {
      this.searchOffices();
    }
  }

  /** Search offices by text */
  handleSearchByText = (q) => {
    this.setState({ q }, this.searchOffices);
  };

  /** Search offices by map */
  handleSearchByMap = (e) => {
    const searchByMap = !this.state.searchByMap;
    this.setState({ searchByMap }, this.searchOffices);
  };

  /** Change filter event handler */
  handleChangeFilter = (filter, value) => {
    const { filters } = this.state;
    filters[filter] = value;
    if (!value || (Array.isArray(value) && !value.length)) {
      delete filters[filter];
    }
    this.setState({ filters }, this.searchOffices);
  };

  /** Remove filter */
  handleRemoveFilter = (filter) => () => {
    const { filters } = this.state;
    filters[filter] = undefined;
    this.setState({ filters }, this.searchOffices);
  };

  /** Remove all filters */
  handleRemoveAllFilters = () => {
    this.setState({ filters: {} }, this.searchOffices);
  };

  /** Navigate to office detail */
  handleNavigateOfficeDetail = (office) => () => {
    this.props.navigate('offices', office._id);
  };

  /** Render component */
  render() {
    const { width, classes: s, t } = this.props;
    const { searchByMap, filters, q, offices } = this.state;

    const filteredOffices = offices?.filter(
      (office) => office.location?.coordinates
    );

    return (
      <Column classes={{ box: s.root }}>
        <div className={clsx(s.container, s.searchboxWrapper)}>
          <Row>
            <Searchbox
              classes={s}
              t={t}
              q={q}
              onSearch={this.handleSearchByText}
            />
            {!isWidthDown('xs', width) && (
              <React.Fragment>
                <Stretch />
                <Checkbox
                  variant="outlined"
                  label={t('searchByMap')}
                  className={s.searchByMap}
                  isChecked={searchByMap}
                  onChange={this.handleSearchByMap}
                />
              </React.Fragment>
            )}
          </Row>
        </div>

        <div className={clsx(s.container, s.filtersWrapper)}>
          <Row wrap>
            {this.filters.map((filter, index) => (
              <React.Fragment key={index}>
                <FilterWrapper
                  classes={s}
                  t={t}
                  filter={filter}
                  value={filters[filter.type]}
                  onChangeFilter={this.handleChangeFilter}
                />
              </React.Fragment>
            ))}
          </Row>

          {filters && Object.values(filters).map((f) => !!f).length ? (
            <Row classes={{ box: s.filterValuesWrapper }}>
              <Column>
                <Row wrap>
                  {Object.entries(filters).map(([filter, value]) =>
                    value ? (
                      <FilterChip
                        key={filter}
                        classes={s}
                        t={t}
                        filter={filter}
                        value={value}
                        onChange={(value) =>
                          this.handleChangeFilter(filter, value)
                        }
                      />
                    ) : null
                  )}
                </Row>
              </Column>
              {/* {!isWidthDown('xs', width) && <Stretch />} */}
              <Stretch />
              <Button
                link="errorRed"
                background="errorRedLight"
                inverse
                variant={isWidthDown('xs', width) ? 'icon' : ''}
                onClick={this.handleRemoveAllFilters}
              >
                <CloseIcon style={{ width: 9, height: 9 }} />
                {!isWidthDown('xs', width) && (
                  <Typography
                    paddingLeft
                    fontSizeS
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {t('clearAllFilters')}
                  </Typography>
                )}
              </Button>
            </Row>
          ) : null}
        </div>

        <div
          style={{ height: searchByMap ? 'calc(100vh - 300px)' : 'auto' }}
          className={s.valuesWrapper}
        >
          {searchByMap && (
            <div className={s.searchByMapWrapper}>
              <GoogleMap
                coordinates={
                  filteredOffices?.length
                    ? filteredOffices.map(
                        (office) => office.location.coordinates
                      )
                    : []
                }
                center={
                  filteredOffices?.length &&
                  filteredOffices[0]?.location?.coordinates
                }
                markers={
                  filteredOffices?.length
                    ? filteredOffices.map((office, index) => (
                        <GoogleMapMarker
                          key={index}
                          lat={office.location.coordinates.lat}
                          lng={office.location.coordinates.lng}
                          badge={office.leasedBy?.overduePayment}
                          onClick={this.handleNavigateOfficeDetail(office)}
                        />
                      ))
                    : []
                }
              />
            </div>
          )}

          <Column fullHeight style={{ overflowY: 'auto' }}>
            <Column
              classes={{
                box: clsx(
                  s.officesWrapper,
                  searchByMap && s.smallOfficesWrapper
                ),
              }}
            >
              <Typography textSecondary fontSizeS style={{ marginBottom: 24 }}>
                {t('resultsWithNumber', { count: offices.length })}
              </Typography>
              <div className={clsx(s.offices)}>
                <Grid
                  container
                  direction="row"
                  spacing={2}
                  wrap="wrap"
                  className={clsx(s.offices, searchByMap && s.officesWithMap)}
                >
                  {offices.map((office, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={searchByMap ? 12 : 6}
                      md={searchByMap ? 12 : 4}
                      lg={searchByMap ? 6 : 3}
                      key={index}
                    >
                      <div className={s.officeWrapper}>
                        <OfficeItem
                          office={office}
                          setFavorite
                          onClick={this.handleNavigateOfficeDetail(office)}
                          fullWidth
                        />
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Column>
          </Column>
        </div>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation(['home', 'common'])(Search))
);
