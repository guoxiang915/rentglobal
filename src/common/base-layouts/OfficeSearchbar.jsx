import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/styles";
import { withTranslation } from "react-i18next";
import { Collapse } from "@material-ui/core";
import { GpsFixedOutlined, KeyboardArrowRight } from "@material-ui/icons";
import {
  Row,
  Column,
  Stretch,
  Button,
  Typography,
  Checkbox,
  GooglePlaceField,
  CloseIcon,
  SearchIcon,
  UncheckIcon,
  CheckIcon
} from "../../common/base-components";
import { locationSummary } from "../../api/endpoints";

const styleSheet = theme => ({
  searchInput: {
    position: "relative",
    width: "100%"
  },

  searchRootProps: {
    border: "none",
    "&::before": {
      border: "none !important"
    },
    "&::after": {
      border: "none !important"
    }
  },

  searchInputProps: {
    fontSize: "17px",
    lineHeight: "23px",
    padding: "16px 26px",
    fontWeight: 500,
    color: theme.colors.primary.darkGrey,
    border: "none",
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
      lineHeight: "20px"
    }
  },

  searchInputWrapper: {
    position: "absolute",
    right: 5,
    bottom: 5,
    margin: 0
  },

  searchInputIcon: {
    minWidth: 43,
    height: 43,
    color: theme.colors.primary.white,
    [theme.breakpoints.down("xs")]: {
      minWidth: 37,
      height: 37
    }
  },

  locationsSelected: {
    height: 43,
    minWidth: 200,
    background: theme.colors.primary.white,
    [theme.breakpoints.down("xs")]: {
      minWidth: 37,
      height: 37
    }
  },

  showOnMap: {
    width: 215,
    height: 53,
    marginLeft: 16,
    background: theme.colors.primary.white,
    [theme.breakpoints.down("xs")]: {
      width: "auto",
      height: 36
    }
  },

  locationWrapper: {
    width: "100%",
    height: 52,
    position: "relative"
  },

  locationPaneWrapper: {
    position: "absolute",
    width: "100%",
    border: `1px solid ${theme.colors.primary.mainColor}`,
    borderRadius: 27,
    background: theme.colors.primary.white,
    zIndex: 3
  },

  boxShadow: {
    boxShadow: "5px 5px 6px #0000000A"
  },

  locationContentWrapper: {
    width: "100%",
    maxHeight: 300,
    overflowY: "auto"
  },

  locationList: {
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 25,
    paddingBottom: 20
  },

  rightArrow: {
    width: 290
  },

  checkIcon: {
    borderRadius: "50%",
    border: `1px solid ${theme.colors.primary.mainColor}`,
    boxShadow: `0px 6px 12px ${theme.colors.primary.mainColor}4D`,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 28,
    height: 28
  },

  checkbox: {
    borderColor: theme.colors.primary.borderGrey
  }
});

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
  onRemoveSelectedLocations
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
                variant="icon"
                link="secondary"
                style={{ margin: 0, marginRight: 16 }}
                onClick={onToggleSelectedLocations}
                className={s.locationsSelected}
                color="secondary"
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
            <GpsFixedOutlined color="secondary" fontSize="small" />
            <Button
              variant="icon"
              background="primary"
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
        )
      }}
    />
  );
};

const Searchbox = ({
  classes: s,
  t,
  selectedLocations: selectedlocations,
  q,
  onSearch
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
  const handleKeyUp = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const handleSelectLocation = React.useCallback(location => {
    if (location) {
      setQuery("");
      setSelectedLocations([]);
      locationSummary({
        streetName: location.streetName || undefined,
        city: location.city,
        state: location.state,
        country: location.country
      }).then(res => {
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
  const handleChangeQuery = React.useCallback(e => {
    setQuery(e.target.value);
    setLocationPane(false);
  }, []);
  const handleToggleSelection = location => {
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

  window.addEventListener("click", () => {
    if (locationPane) {
      setLocationPane(!locationPane);
    }
  });

  return (
    <div
      className={s.locationWrapper}
      id="search-bar"
      onClick={e => e.stopPropagation()}
    >
      <Column
        classes={{
          box: clsx(s.locationPaneWrapper, locationPane && s.boxShadow)
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
                        color="primary"
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
                              location.country
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

export default withStyles(styleSheet)(withTranslation()(Searchbox));
