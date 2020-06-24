import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  TextField,
  Row,
  Column,
  SearchIcon,
  DropDown,
} from "../base-components";

const styleSheet = (theme) => ({
  root: {},

  searchWrapper: {
    flex: 1,
    [theme.breakpoints.down("xs")]: {
      flex: "none",
      width: "100%",
    },
  },

  searchbar: {
    background: theme.colors.primary.white,
  },

  sorter: {
    height: 47,
    width: 140,
    marginLeft: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      width: "100%",
      marginBottom: 8,
    },
  },

  sorterBox: {
    marginLeft: 0,
    background: theme.colors.primary.white,
  },
});

export default withStyles(styleSheet, { name: "SearchbarWithSorter" })(
  withTranslation("common")(
    ({ classes: s, t, title, query: q, sorter, sortOptions, onChange }) => {
      const [query, setQuery] = useState(q);

      const handleSearch = (sort) => {
        onChange({ query, sorter: sort || sorter });
      };

      const handleSearchKeyUp = (e) => e.key === "Enter" && handleSearch();

      const handleChangeSort = (e) => handleSearch(e.target.value);

      return (
        <Row fullWidth wrap rowReverse>
          {sortOptions && (
            <DropDown
              options={sortOptions}
              renderOption={(item) => (
                <Typography fontSizeS textMediumGrey>
                  {t(item.title)}
                </Typography>
              )}
              displayEmpty
              value={sorter}
              onChange={handleChangeSort}
              className={s.sorter}
              classes={{ root: s.sorterBox }}
            />
          )}
          <Column classes={{ box: s.searchWrapper }}>
            <TextField
              placeholder={title}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startAdornment={
                <Typography textMediumGrey>
                  <SearchIcon style={{ width: 16, height: 16 }} />
                </Typography>
              }
              classes={{ root: s.searchbar }}
              onKeyUp={handleSearchKeyUp}
              fullWidth
            />
          </Column>
        </Row>
      );
    }
  )
);
