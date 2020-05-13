import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Grid,
  Popover,
  Paper,
  Chip,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
} from "@material-ui/core";
import {
  LocationOnOutlined,
  GpsFixedOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@material-ui/icons";
import {
  Row,
  Column,
  Stretch,
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  Divider,
  Link,
  GoogleMap,
  GoogleMapMarker,
  GooglePlaceField,
  CloseIcon,
  SearchIcon,
  UncheckIcon,
  CheckIcon,
} from "../../common/base-components";
import { officeTypes, contractTypes } from "../../utils/constants";

import { styleSheet } from "./Search";
import { OfficeItem } from "../../common/base-layouts";
import { advancedSearchOffices, locationSummary } from "../../api/endpoints";
import ServicesAmenitiesForm from "../Landlord/Office/Forms/ServicesAmenitiesForm";

const Searchbar = ({
  classes: s,
  t,
  value,
  inputRef,
  selectedLocations,
  onKeyUp,
  onSelectLocation,
  onChangeQuery,
  onSearch,
  onToggleSelectedLocations,
  onRemoveSelectedLocations,
}) => {
  return (
    <GooglePlaceField
      value={value}
      onSelect={onSelectLocation}
      onChange={onChangeQuery}
      inputProps={{
        variant: "standard",
        onKeyUp: onKeyUp,
        placeholder: t("advancedSearchboxText"),
        className: s.searchInput,
        styles: { root: s.searchRootProps, input: s.searchInputProps },
        inputRef,
        endAdornment: (
          <Row classes={{ box: s.searchInputWrapper }} alignChildrenCenter>
            {selectedLocations ? (
              <Button
                variant='icon'
                link='secondary'
                style={{ margin: 0, marginRight: 16 }}
                onClick={onToggleSelectedLocations}
                className={s.locationsSelected}
                color='secondary'
              >
                <Typography textPrimary paddingRight>
                  <CloseIcon
                    style={{ width: 10, height: 10 }}
                    onClick={onRemoveSelectedLocations}
                  />
                </Typography>
                {t("locationsSelected", { count: selectedLocations })}
              </Button>
            ) : null}
            <GpsFixedOutlined color='secondary' fontSize='small' />
            <Button
              variant='icon'
              background='primary'
              style={{ margin: 0, marginLeft: 16 }}
              className={s.searchInputIcon}
              shadow
              onClick={onSearch}
            >
              <SearchIcon style={{ width: 16, height: 16 }} />
              <Typography paddingLeft fontSizeS>
                {t("search")}
              </Typography>
            </Button>
          </Row>
        ),
      }}
    />
  );
};

const Searchbox = ({
  classes: s,
  t,
  selectedLocations: selectedlocations,
  q,
  onSearch,
}) => {
  const [query, setQuery] = React.useState(q);
  const [locations, setLocations] = React.useState([]);
  const [locationPane, setLocationPane] = React.useState(false);
  const [selectedLocations, setSelectedLocations] = React.useState(
    selectedlocations
  );
  const searchRef = React.useRef(null);

  React.useEffect(() => setQuery(q), [q]);
  const handleSearch = () => {
    setLocationPane(false);
    onSearch(query, selectedLocations);
  };
  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSelectLocation = React.useCallback((location) => {
    if (location) {
      setQuery("");
      setSelectedLocations([]);
      locationSummary({
        zipCode: location.zipCode,
        streetName: location.streetName || undefined,
        city: location.city,
        state: location.state,
        country: location.country,
      }).then((res) => {
        if (res.status === 200) {
          setLocations(res.data);
          setLocationPane(true);
        } else if (res.status === 404) {
          setLocations([]);
          setLocationPane(true);
        }
      });
    }
  }, []);
  const handleChangeQuery = React.useCallback((e) => {
    setQuery(e.target.value);
    setLocationPane(false);
  }, []);
  const handleToggleSelection = (location) => {
    if (selectedLocations.indexOf(location) === -1) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      selectedLocations.splice(selectedLocations.indexOf(location), 1);
      setSelectedLocations([...selectedLocations]);
    }
  };
  const handleRemoveSelectedLocations = () => {
    setSelectedLocations([]);
    setQuery("");
    setLocationPane(false);
    onSearch("", []);
  };

  window.addEventListener("click", function (e) {
    if (locationPane) {
      setLocationPane(!locationPane);
    }
  });

  return (
    <div
      className={s.locationWrapper}
      id='search-bar'
      onClick={(e) => e.stopPropagation()}
    >
      <Column
        classes={{
          box: clsx(s.locationPaneWrapper, locationPane && s.boxShadow),
        }}
      >
        <div style={{ width: "100%" }}>
          <Searchbar
            classes={s}
            t={t}
            value={query}
            onKeyUp={handleKeyUp}
            onSelectLocation={handleSelectLocation}
            onChangeQuery={handleChangeQuery}
            onSearch={handleSearch}
            inputRef={searchRef}
            selectedLocations={selectedLocations.length}
            onToggleSelectedLocations={() => setLocationPane(!locationPane)}
            onRemoveSelectedLocations={handleRemoveSelectedLocations}
          />
        </div>

        <Collapse in={locationPane} className={s.locationContentWrapper}>
          {locations &&
            locations.map(
              (location, index) =>
                location && (
                  <React.Fragment key={index}>
                    <Row classes={{ box: s.locationList }}>
                      <Checkbox
                        classes={{ label: s.checkbox }}
                        color='primary'
                        isChecked={
                          (selectedLocations &&
                            selectedLocations.indexOf(location) !== -1) ||
                          false
                        }
                        onChange={() => handleToggleSelection(location)}
                        icon={UncheckIcon}
                        checkedIcon={() => (
                          <div className={s.checkIcon}>
                            <CheckIcon style={{ width: 14, height: 10 }} />
                          </div>
                        )}
                        label={
                          <Typography fontSizeS textSecondary paddingLeft>
                            {[
                              location.streetName,
                              location.streetName && ", ",
                              location.city,
                              location.city && ", ",
                              location.state,
                              location.state && ", ",
                              location.country,
                            ].join("")}
                          </Typography>
                        }
                      />
                      <Stretch />
                      <Typography
                        fontSizeS
                        textMediumGrey
                        textRight
                        justifyChildrenEnd
                        style={{ width: 40 }}
                      >
                        {location.count}
                      </Typography>
                      <div className={s.rightArrow}>
                        <Typography textMediumGrey textRight justifyChildrenEnd>
                          <KeyboardArrowRight />
                        </Typography>
                      </div>
                    </Row>
                  </React.Fragment>
                )
            )}
        </Collapse>
      </Column>
    </div>
  );
};

const OfficeTypeFilterPanel = ({ classes: s, t, types, onApply }) => {
  console.log(types);
  const handleClickType = (type) => {
    if (!types) types = [];
    if (types.indexOf(type) !== -1) {
      types.splice(types.indexOf(type), 1);
    } else {
      types.push(type);
    }
    console.log(types);
    onApply(types);
  };

  return (
    <Column classes={{ box: s.filterPanel }} alignChildrenStart>
      {officeTypes.map((type, index) => (
        <React.Fragment key={index}>
          <Row classes={{ box: s.filterLine }}>
            <Checkbox
              classes={{ label: s.checkbox }}
              color='primary'
              isChecked={(types && types.indexOf(type) !== -1) || false}
              onChange={() => handleClickType(type)}
              icon={UncheckIcon}
              checkedIcon={() => (
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
              color='primary'
              isChecked={(types && types.indexOf(type) !== -1) || false}
              onChange={() => handleClickType(type)}
              icon={UncheckIcon}
              checkedIcon={() => (
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

// const RoomsFilterPanel = ({ classes: s, t, rooms: r, onApply }) => {
//   const [rooms, setRooms] = React.useState(r);
//   React.useEffect(() => setRooms(r), [r]);

//   return (
//     <Column alignChildrenStart classes={{ box: s.numberFilterPanel }}>
//       <Grid
//         container
//         direction='row'
//         justify='space-between'
//         alignItems='center'
//         className={s.filterPanel}
//       >
//         <Typography fontSizeS textSecondary>
//           {t("rooms")}
//         </Typography>
//         <NumberField
//           inputProps={{ min: 0 }}
//           value={rooms}
//           onChange={(e) => setRooms(e.target.value)}
//           className={s.numberField}
//         />
//       </Grid>
//       <Divider />

//       <Grid
//         container
//         direction='row'
//         justify='space-between'
//         alignItems='center'
//         className={s.filterPanel}
//       >
//         <Button
//           link='errorRed'
//           background='secondaryLight'
//           onClick={() => onApply()}
//         >
//           <Typography fontSizeS alignChildrenCenter>
//             <CloseIcon style={{ width: 10, height: 10 }} />
//             <Typography paddingLeft>{t("clear")}</Typography>
//           </Typography>
//         </Button>
//         <Button
//           variant='primary'
//           onClick={() => onApply(rooms)}
//           className={s.applyButton}
//         >
//           <Typography fontSizeS alignChildrenCenter>
//             <CheckIcon style={{ width: 16, height: 12 }} />
//             <Typography paddingLeft>{t("apply")}</Typography>
//           </Typography>
//         </Button>
//       </Grid>
//     </Column>
//   );
// };

const MIN_PRICE = 0;
const MAX_PRICE = 50000; // undefined
const MIN_ROOMS = 0;
const MAX_ROOMS = 50; // undefined
const MIN_EMPLOYEES = 0;
const MAX_EMPLOYEES = 200; // undefined

const AirbnbThumbComponent = ({ ...props }) => {
  const index = props["data-index"];
  return (
    <span {...props}>
      {index === 0 ? (
        <KeyboardArrowLeft style={{ fontSize: "30px" }} />
      ) : (
        <KeyboardArrowRight style={{ fontSize: "30px" }} />
      )}
      {props.children}
    </span>
  );
};

const AirbnbSlider = withStyles((theme) => ({
  root: {
    color: theme.colors.primary.mainColor,
    height: 1,
    padding: "13px 0",
  },
  thumb: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 37,
    width: 37,
    marginTop: -18,
    marginLeft: -18,
    background: theme.colors.primary.borderGrey,
    color: theme.colors.primary.grey,
    boxShadow: "#ebebeb 0px 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0px 2px 3px 1px",
      background: theme.colors.primary.mainColor,
      color: theme.colors.primary.white,
    },
  },
  active: {},
  valueLabel: {
    top: -20,
    ...theme.fonts.size.fontSizeS,
    "& *": {
      background: "transparent",
      color: theme.colors.primary.mainColor,
    },
  },
  track: {
    height: 1.5,
  },
  rail: {
    color: theme.colors.primary.borderGrey,
    opacity: 1,
    height: 1,
  },
  mark: {
    background: theme.colors.primary.borderGrey,
    width: 7,
    height: 7,
    marginLeft: -3,
    marginTop: -3,
    borderRadius: "50%",
  },
  markActive: {
    background: theme.colors.primary.mainColor,
  },
}))(({ min, max, ...props }) => (
  <Slider
    min={min}
    max={max}
    marks={[{ value: min }, { value: max }]}
    defaultValue={[min, max]}
    valueLabelDisplay='on'
    ThumbComponent={AirbnbThumbComponent}
    {...props}
  />
));

const RangeFilterPanel = ({
  classes: s,
  t,
  data,
  min,
  max,
  title,
  subtitle,
  sliderUnit,
  inputUnit,
  onApply,
}) => {
  const [minVal, setMinVal] = React.useState(data?.min || min);
  const [maxVal, setMaxVal] = React.useState(data?.max || max);
  React.useEffect(() => {
    setMinVal(data?.min || min);
    setMaxVal(data?.max || max);
  }, [data, min, max]);
  const getValueLabelFormat = (val) => {
    return val === min || val === max ? "" : val + (sliderUnit || "");
  };
  const onSliderChange = (e, val) => {
    setMinVal(Number(val[0]));
    setMaxVal(Number(val[1]));
  };

  return (
    <Column alignChildrenStart classes={{ box: s.priceFilterPanel }}>
      <Grid container direction='column' className={s.priceFilters}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Typography fontSizeS textSecondary>
            {title}
          </Typography>
          <Typography fontSizeXS textMediumGrey>
            {subtitle || ""}
          </Typography>
        </Grid>
        <AirbnbSlider
          min={min}
          max={max}
          value={[minVal, maxVal]}
          valueLabelFormat={getValueLabelFormat}
          onChange={onSliderChange}
          className={s.priceSlider}
        />
        <Typography fontSizeXS textMediumGrey style={{ marginTop: 48 }}>
          {t("orUseInputRange")}
        </Typography>
        <Grid container spacing={4} className={s.priceInputWrapper}>
          <Grid item xs={12} sm={6}>
            <Row alignChildrenCenter fullWidth>
              <Typography fontSizeS textSecondary paddingRight>
                {t("min")}
              </Typography>
              <Box stretch>
                <TextField
                  fullWidth
                  variant='outlined'
                  value={minVal === min ? "" : minVal}
                  type='number'
                  inputProps={{
                    min: min,
                    max: maxVal,
                  }}
                  onChange={(e) => setMinVal(Number(e.target.value))}
                  endAdornment={
                    <Typography
                      fontSizeS
                      textMediumGrey
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {inputUnit || ""}
                    </Typography>
                  }
                />
              </Box>
            </Row>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Row alignChildrenCenter fullWidth>
              <Typography fontSizeS textSecondary paddingRight>
                {t("max")}
              </Typography>
              <Box stretch>
                <TextField
                  fullWidth
                  variant='outlined'
                  value={maxVal === max ? "" : maxVal}
                  type='number'
                  inputProps={{
                    min: minVal,
                    max: max,
                  }}
                  onChange={(e) => setMaxVal(Number(e.target.value))}
                  endAdornment={
                    <Typography
                      fontSizeS
                      textMediumGrey
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {inputUnit || ""}
                    </Typography>
                  }
                />
              </Box>
            </Row>
          </Grid>
        </Grid>
      </Grid>
      <Divider />

      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={s.filterPanel}
      >
        <Button
          link='errorRed'
          background='secondaryLight'
          onClick={() => onApply()}
        >
          <Typography fontSizeS alignChildrenCenter>
            <CloseIcon style={{ width: 10, height: 10 }} />
            <Typography paddingLeft>{t("clear")}</Typography>
          </Typography>
        </Button>
        <Button
          variant='primary'
          onClick={() => onApply({ min: minVal, max: maxVal })}
          className={s.applyButton}
        >
          <Typography fontSizeS alignChildrenCenter>
            <CheckIcon style={{ width: 16, height: 12 }} />
            <Typography paddingLeft>{t("apply")}</Typography>
          </Typography>
        </Button>
      </Grid>
    </Column>
  );
};

const RoomsFilterPanel = ({ classes: s, t, rooms, onApply }) => {
  const handleApply = (data) => {
    if (!data) {
      onApply();
    } else {
      onApply({ roomsMin: data?.min, roomsMax: data?.max });
    }
  };

  return (
    <RangeFilterPanel
      classes={s}
      t={t}
      min={MIN_ROOMS}
      max={MAX_ROOMS}
      data={{ min: rooms?.roomsMin, max: rooms?.roomsMax }}
      title={t("rooms")}
      inputUnit={t("room")}
      onApply={handleApply}
    />
  );
};

const EmployeesFilterPanel = ({ classes: s, t, employees, onApply }) => {
  const handleApply = (data) => {
    if (!data) {
      onApply();
    } else {
      onApply({ employeesMin: data?.min, employeesMax: data?.max });
    }
  };

  return (
    <RangeFilterPanel
      classes={s}
      t={t}
      min={MIN_EMPLOYEES}
      max={MAX_EMPLOYEES}
      data={{ min: employees?.employeesMin, max: employees?.employeesMax }}
      title={t("numberOfEmployees")}
      inputUnit={t("employees")}
      onApply={handleApply}
    />
  );
};

const PriceFilterPanel = ({ classes: s, t, price, onApply }) => {
  const handleApply = (data) => {
    if (!data) {
      onApply();
    } else {
      onApply({ priceMin: data?.min, priceMax: data?.max });
    }
  };

  return (
    <RangeFilterPanel
      classes={s}
      t={t}
      min={MIN_PRICE}
      max={MAX_PRICE}
      data={{ min: price?.priceMin, max: price?.priceMax }}
      title={t("monthlyPrice")}
      sliderUnit='$'
      inputUnit={t("$/month")}
      onApply={handleApply}
    />
  );
};

const FilterPanel = ({ classes, t, filter, value, onChangeFilter }) => {
  switch (filter.type) {
    case "officeTypes":
      return (
        <OfficeTypeFilterPanel
          classes={classes}
          t={t}
          types={value}
          onApply={onChangeFilter("officeTypes")}
        />
      );

    case "typeOfContracts":
      return (
        <ContractTypeFilterPanel
          classes={classes}
          t={t}
          types={value}
          onApply={onChangeFilter("typeOfContracts")}
        />
      );

    case "rooms":
      return (
        <RoomsFilterPanel
          classes={classes}
          t={t}
          rooms={value}
          onApply={onChangeFilter("rooms")}
        />
      );

    case "employees":
      return (
        <EmployeesFilterPanel
          classes={classes}
          t={t}
          employees={value}
          onApply={onChangeFilter("employees")}
        />
      );

    case "price":
      return (
        <PriceFilterPanel
          classes={classes}
          t={t}
          price={value}
          onApply={onChangeFilter("price")}
        />
      );

    default:
      return null;
  }
};

const FilterWrapper = ({ classes: s, t, filter, value, onChangeFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openAnchor = React.useCallback((e) => setAnchorEl(e.currentTarget), []);
  const closeAnchor = React.useCallback(() => setAnchorEl(null), []);
  const handleChangeFilter = React.useCallback(
    (filter) => (value) => {
      onChangeFilter(filter, value);
      if (filter !== "officeTypes" && filter !== "typeOfContracts") {
        closeAnchor();
      }
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
        id='accountinfo-popover'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
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
};

const MIN_AREA = 0;
const MAX_AREA = 1000;
const MoreFilterDialog = ({
  classes: s,
  t,
  value,
  onChangeFilter,
  onClose,
}) => {
  const [areaMin, setAreaMin] = React.useState(
    value?.area?.areaMin || MIN_AREA
  );
  const [areaMax, setAreaMax] = React.useState(
    value?.area?.areaMax || MAX_AREA
  );
  const [servicesAndAmenities, setServicesAndAmenities] = React.useState(
    value?.servicesAndAmenities || []
  );
  const [showMore, setShowMore] = React.useState(false);
  const onAreaSliderChange = React.useCallback((e, val) => {
    setAreaMin(Number(val[0]));
    setAreaMax(Number(val[1]));
  }, []);
  const changeServicesAndAmenities = (field, value) => {
    setServicesAndAmenities(value);
  };
  const onApply = (value) => {
    onChangeFilter(value);
  };

  return (
    <Dialog open onClose={onClose} classes={{ paper: s.moreFilterDialog }}>
      <DialogTitle id='help-dialog-title' className={s.header}>
        <Row fullWidth>
          <Typography fontSizeM textSecondary fontWeightBold>
            {t("moreFilterOptions")}
          </Typography>
          <Stretch />
          <Button link='errorRed' background='secondaryLight' onClick={onClose}>
            <Typography fontSizeS alignChildrenCenter>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{t("close")}</Typography>
            </Typography>
          </Button>
        </Row>
      </DialogTitle>
      <DialogContent style={{ padding: 0 }}>
        <Grid container direction='column'>
          <Grid container direction='column' className={s.priceFilters}>
            <Typography fontSizeS textSecondary>
              {t("area") + " (m x m)"}
            </Typography>
            <AirbnbSlider
              min={MIN_AREA}
              max={MAX_AREA}
              value={[areaMin, areaMax]}
              onChange={onAreaSliderChange}
              className={s.priceSlider}
            />
          </Grid>
          <Divider />
          <Grid container direction='column' className={s.priceFilters}>
            <Typography fontSizeXS textSecondary>
              {t("servicesAndAmenities")}
            </Typography>
            <Row fullWidth style={{ marginTop: 28 }}>
              <ServicesAmenitiesForm
                office={{ servicesAndAmenities }}
                onChangeField={changeServicesAndAmenities}
                showMore={showMore}
              />
            </Row>
            <Link
              to='#'
              onClick={() => setShowMore(!showMore)}
              variant='normalLight'
              style={{ marginTop: 28 }}
            >
              <Typography fontSizeS>
                {showMore ? t("showLessItems") : t("showMoreItems")}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: 0 }}>
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
          className={s.filterPanel}
        >
          <Button
            link='errorRed'
            background='secondaryLight'
            onClick={() => onApply({ area: null, servicesAndAmenities: null })}
          >
            <Typography fontSizeS alignChildrenCenter>
              <CloseIcon style={{ width: 10, height: 10 }} />
              <Typography paddingLeft>{t("clear")}</Typography>
            </Typography>
          </Button>
          <Button
            variant='primary'
            onClick={() =>
              onApply({ area: { areaMin, areaMax }, servicesAndAmenities })
            }
            className={s.applyButton}
          >
            <Typography fontSizeS alignChildrenCenter>
              <CheckIcon style={{ width: 16, height: 12 }} />
              <Typography paddingLeft>{t("apply")}</Typography>
            </Typography>
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

/** Get filter chips */
const FilterChip = React.memo(({ classes: s, t, filter, value, onChange }) => {
  const handleRemoveFilter = React.useCallback(
    ({ filter, ...params }) => {
      if (
        (filter === "officeTypes" || filter === "typeOfContracts") &&
        typeof params.index === "number"
      ) {
        value.splice(params.index, 1);
        onChange(value);
      } else if (filter === "servicesAndAmenities") {
        const category = params.category;
        const index = params.index;
        if (value[category] && value[category].length) {
          value[category].splice(index, 1);
          if (!value[category].length) {
            delete value[category];
          }
          onChange(value);
        }
      } else {
        onChange();
      }
    },
    [value, onChange]
  );

  switch (filter) {
    case "officeTypes":
      return (
        <React.Fragment>
          {value.map((v, index) => (
            <Chip
              key={filter + index}
              label={t(v)}
              onDelete={() => handleRemoveFilter({ filter, index })}
              className={s.filterValue}
              color='primary'
            />
          ))}
        </React.Fragment>
      );

    case "typeOfContracts":
      return (
        <React.Fragment>
          {value.map((v, index) => (
            <Chip
              key={filter + index}
              label={t(v)}
              onDelete={() => handleRemoveFilter({ filter, index })}
              className={s.filterValue}
              color='primary'
            />
          ))}
        </React.Fragment>
      );

    // case "rooms":
    //   return (
    //     <Chip
    //       key={filter}
    //       label={t("roomsWithNumber", { count: value })}
    //       onDelete={() => handleRemoveFilter({ filter })}
    //       className={s.filterValue}
    //       color='primary'
    //     />
    //   );

    case "price":
      return (
        <Chip
          key={filter}
          label={t("priceRange", {
            min: value?.priceMin || "",
            max: value?.priceMax,
          })}
          onDelete={() => handleRemoveFilter({ filter })}
          className={s.filterValue}
          color='primary'
        />
      );

    case "rooms":
      return (
        <Chip
          key={filter}
          label={t("roomsRange", {
            min: value?.roomsMin || "",
            max: value?.roomsMax,
          })}
          onDelete={() => handleRemoveFilter({ filter })}
          className={s.filterValue}
          color='primary'
        />
      );

    case "employees":
      return (
        <Chip
          key={filter}
          label={t("employeesRange", {
            min: value?.employeesMin || "",
            max: value?.employeesMax,
          })}
          onDelete={() => handleRemoveFilter({ filter })}
          className={s.filterValue}
          color='primary'
        />
      );

    case "area":
      return (
        <Chip
          key={filter}
          label={[value?.areaMin || "", value?.areaMax || ""].join(" - ")}
          onDelete={() => handleRemoveFilter({ filter })}
          className={s.filterValue}
          color='primary'
        />
      );

    case "servicesAndAmenities":
      return (
        <React.Fragment>
          {Object.entries(value).map(([category, options]) => (
            <React.Fragment key={category}>
              {options && options.length
                ? options.map((opt, index) => (
                    <Chip
                      key={index}
                      label={t(opt)}
                      onDelete={() =>
                        handleRemoveFilter({ filter, category, index })
                      }
                      className={s.filterValue}
                      color='primary'
                    />
                  ))
                : null}
            </React.Fragment>
          ))}
        </React.Fragment>
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
    showOnMap: false,
    q: "",
    selectedLocations: [],
    filters: {},
    dialog: null,
    offices: [],
    loading: false,
  };

  filters = [
    {
      type: "officeTypes",
      title: "type",
    },
    {
      type: "price",
      title: "price",
    },
    {
      type: "employees",
      title: "employees",
    },
    {
      type: "rooms",
      title: "rooms",
    },
    {
      type: "typeOfContracts",
      title: "howLong",
    },
  ];

  /** Search office by text, filters, map... */
  searchOffices = () => {
    const params = { q: this.state.q };
    if (this.state.selectedLocations?.length) {
      params["locations"] = this.state.selectedLocations.map((location) => ({
        zipCode: location.zipCode,
        streetName: location.streetName,
        city: location.city,
        state: location.state,
        country: location.country,
      }));
    }
    Object.entries(this.state.filters).forEach(([filter, value]) => {
      if (filter === "price") {
        if (value?.priceMin) {
          params["priceMin"] = value.priceMin;
        }
        if (value?.priceMax) {
          params["priceMax"] = value.priceMax;
        }
      } else if (filter === "rooms") {
        if (value?.roomsMin) {
          params["roomsMin"] = value.roomsMin;
        }
        if (value?.roomsMax) {
          params["roomsMax"] = value.roomsMax;
        }
      } else if (filter === "employees") {
        if (value?.employeesMin) {
          params["employeesMin"] = value.employeesMin;
        }
        if (value?.employeesMax) {
          params["employeesMax"] = value.employeesMax;
        }
      } else if (filter === "area") {
        if (value?.areaMin) {
          params["areaMin"] = value.areaMin;
        }
        if (value?.areaMax) {
          params["areaMax"] = value.areaMax;
        }
      } else if (filter === "servicesAndAmenities") {
        params[filter] = [];
        Object.values(value).forEach((category) => {
          params[filter].push(...(category || []));
        });
      } else {
        params[filter] = value;
      }
    });
    this.setState({ loading: true });
    advancedSearchOffices(params).then(
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
          pathname: "/search",
          state: null,
        });
        this.searchOffices();
      });
    } else {
      this.searchOffices();
    }
  }

  /** Search offices by text */
  handleSearchByTextAndLocation = (q, selectedLocations) => {
    this.setState({ q, selectedLocations }, this.searchOffices);
  };

  /** Search offices by map */
  handleShowOnMap = () => {
    const showOnMap = !this.state.showOnMap;
    this.setState({ showOnMap }, this.searchOffices);
  };

  /** Open more filter dialog */
  handleMoreFilter = () => {
    this.setState({
      dialog: (
        <MoreFilterDialog
          classes={this.props.classes}
          t={this.props.t}
          value={this.state.filters}
          onChangeFilter={(value) => {
            this.handleChangeFilters(value);
            this.handleCloseDialog();
          }}
          onClose={this.handleCloseDialog}
        />
      ),
    });
  };
  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /** Change filter event handler */
  handleChangeFilter = (filter, value) => {
    const { filters } = this.state;
    filters[filter] = value;
    if (!value || (Array.isArray(value) && !value.length)) {
      delete filters[filter];
    }
    if (filter === "price") {
      if (value?.priceMin === MIN_PRICE) value.priceMin = null;
      if (value?.priceMax === MAX_PRICE) value.priceMax = null;
      if (!value?.priceMin && !value?.priceMax) delete filters[filter];
    } else if (filter === "rooms") {
      if (value?.roomsMin === MIN_ROOMS) value.roomsMin = null;
      if (value?.roomsMax === MAX_ROOMS) value.roomsMax = null;
      if (!value?.roomsMin && !value?.roomsMax) delete filters[filter];
    } else if (filter === "employees") {
      if (value?.employeesMin === MIN_EMPLOYEES) value.employeesMin = null;
      if (value?.employeesMax === MAX_EMPLOYEES) value.employeesMax = null;
      if (!value?.employeesMin && !value?.employeesMax) delete filters[filter];
    } else if (filter === "area") {
      if (value?.areaMin === MIN_AREA) value.areaMin = null;
      if (value?.areaMax === MAX_AREA) value.areaMax = null;
      if (!value?.areaMin && !value?.areaMax) delete filters[filter];
    }
    this.setState({ filters }, this.searchOffices);
  };

  handleChangeFilters = (filters) => {
    Object.entries(filters).forEach(([filter, value]) => {
      this.handleChangeFilter(filter, value);
    });
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
    this.props.navigate(
      "offices",
      `${office._id}/${office.location.country}-${office.officeType}-${office.numberOfEmployees}`
    );
  };

  /** Render component */
  render() {
    const { width, classes: s, t } = this.props;
    const {
      showOnMap,
      filters,
      q,
      selectedLocations,
      offices,
      dialog,
    } = this.state;

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
              selectedLocations={selectedLocations}
              onSearch={this.handleSearchByTextAndLocation}
            />
            {!isWidthDown("xs", width) && (
              <React.Fragment>
                <Stretch />
                <Checkbox
                  variant='outlined'
                  label={t("showOnMap")}
                  className={s.showOnMap}
                  isChecked={showOnMap}
                  onChange={this.handleShowOnMap}
                  icon={LocationOnOutlined}
                  checkedIcon={LocationOnOutlined}
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
            <div className={s.filterWrapper}>
              <Button
                onClick={this.handleMoreFilter}
                classes={{ root: s.filterButton }}
                rounded
              >
                {t("moreFilter")}
              </Button>
              {dialog}
            </div>
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
                link='errorRed'
                background='errorRedLight'
                inverse
                variant={isWidthDown("xs", width) ? "icon" : ""}
                onClick={this.handleRemoveAllFilters}
              >
                <CloseIcon style={{ width: 9, height: 9 }} />
                {!isWidthDown("xs", width) && (
                  <Typography
                    paddingLeft
                    fontSizeS
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("clearAllFilters")}
                  </Typography>
                )}
              </Button>
            </Row>
          ) : null}
        </div>

        <div
          style={{ height: showOnMap ? "calc(100vh - 300px)" : "auto" }}
          className={s.valuesWrapper}
        >
          {showOnMap && (
            <div className={s.showOnMapWrapper}>
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

          <Column fullHeight style={{ overflowY: "auto" }}>
            <Column
              classes={{
                box: clsx(s.officesWrapper, showOnMap && s.smallOfficesWrapper),
              }}
            >
              <Typography textSecondary fontSizeS style={{ marginBottom: 24 }}>
                {t("resultsWithNumber", { count: offices.length })}
              </Typography>
              <div className={clsx(s.offices)}>
                <Grid
                  container
                  direction='row'
                  spacing={2}
                  wrap='wrap'
                  className={clsx(s.offices, showOnMap && s.officesWithMap)}
                >
                  {offices.map((office, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={showOnMap ? 12 : 6}
                      md={showOnMap ? 12 : 4}
                      lg={showOnMap ? 6 : 3}
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
  withStyles(styleSheet)(withTranslation(["home", "common"])(Search))
);
