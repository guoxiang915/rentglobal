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
  CloseIcon,
  SearchIcon,
  GoogleMap,
  GoogleMapMarker,
} from '../../common/base-components';

import { styleSheet } from './Search';
import { OfficeItem } from '../../common/base-layouts';
import { getPublishedOffices } from '../../api/endpoints';

const Searchbox = ({ classes: s, t, onSearch }) => {
  const [query, setQuery] = React.useState('');
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

const FilterPanel = () => <div></div>;

const FilterWrapper = ({ classes: s, t, filter, value, onChangeFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = React.useCallback((e) => setAnchorEl(e.currentTarget), []);
  const closeAnchor = React.useCallback(() => setAnchorEl(null), []);

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
            onChangeFilter={onChangeFilter}
          />
        </Paper>
      </Popover>
    </div>
  );
};

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
      type: 'type',
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
      type: 'duration',
      title: 'howLong',
    },
    {
      type: 'moreFilter',
      title: 'moreFilter',
    },
  ];

  componentDidMount() {
    this.searchOffices();
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
  handleChangeFilter = (filter) => (value) => {
    const { filters } = this.state;
    filters[filter.type] = value;
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

  /** Search office by text, filters, map... */
  searchOffices = () => {
    const params = { q: this.state.q };
    Object.entries(this.state.filters).forEach(([key, filter]) => {
      params[key] = filter.value;
    });

    this.setState({ loading: true });
    getPublishedOffices(params).then((response) => {
      if (response.status === 200) {
        this.setState({ offices: response.data, loading: false });
      }
    });
  };

  /** Navigate to office detail */
  handleNavigateOfficeDetail = (office) => () => {
    this.props.navigate('offices', office._id);
  };

  /** Render component */
  render() {
    const { width, classes: s, t } = this.props;
    const { searchByMap, filters, offices } = this.state;

    return (
      <Column classes={{ box: s.root }}>
        <div className={clsx(s.container, s.searchboxWrapper)}>
          <Row>
            <Searchbox classes={s} t={t} onSearch={this.handleSearchByText} />
            {!isWidthDown('xs', width) && (
              <>
                <Stretch />
                <Checkbox
                  variant="outlined"
                  label={t('searchByMap')}
                  className={s.searchByMap}
                  isChecked={searchByMap}
                  onChange={this.handleSearchByMap}
                />
              </>
            )}
          </Row>
        </div>

        <div className={clsx(s.container, s.filtersWrapper)}>
          <Row>
            {this.filters.map((filter, index) => (
              <React.Fragment key={index}>
                <FilterWrapper
                  classes={s}
                  t={t}
                  filter={filter}
                  value={filters[filter.type]}
                  onChangeFilter={this.handleChangeFilter(filter)}
                />
              </React.Fragment>
            ))}
          </Row>

          {filters && Object.keys(filters).length ? (
            <Row classes={{ box: s.filterValuesWrapper }}>
              <Column>
                <Row>
                  {Object.entries(filters).map(([key, filter]) => (
                    <Chip
                      key={key}
                      label={filter.label}
                      onDelete={this.handleRemoveFilter(key)}
                      className={s.filterValue}
                      color="primary"
                    />
                  ))}
                </Row>
              </Column>
              <Stretch />
              <Button
                link="errorRed"
                background="errorRedLight"
                inverse
                onClick={this.handleRemoveAllFilters}
              >
                <CloseIcon style={{ width: 9, height: 9 }} />
                <Typography paddingLeft fontSizeS>
                  {t('clearAllFilters')}
                </Typography>
              </Button>
            </Row>
          ) : null}
        </div>

        <div className={s.valuesWrapper}>
          {searchByMap && (
            <div className={s.searchByMapWrapper}>
              <GoogleMap
                coordinates={offices
                  .filter((office) => office.location?.coordinates)
                  .map((office) => office.location.coordinates)}
                markers={offices
                  .filter((office) => office.location?.coordinates)
                  .map((office, index) => (
                    <GoogleMapMarker
                      key={index}
                      lat={office.location.coordinates.lat}
                      lng={office.location.coordinates.lng}
                      badge={office.leasedBy?.overduePayment}
                      onClick={this.handleNavigateOfficeDetail(office)}
                    />
                  ))}
              />
            </div>
          )}

          <Column>
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
                      sm={6}
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
