import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  TextField,
  Row,
  Column,
  Select,
  SearchIcon
} from "../base-components";

const styleSheet = theme => ({
  root: {},

  searchbar: {
    background: theme.colors.primary.white
  },

  sorter: {
    background: theme.colors.primary.white,
    height: 47,
    width: 140,
    marginLeft: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      height: 36,
      width: "100%"
    }
  }
});

export default withStyles(styleSheet, { name: "SearchbarWithSorter" })(
  withTranslation("common")(
    ({ classes: s, t, title, query: q, sorter, sortOptions, onChange }) => {
      const [query, setQuery] = useState(q);

      const handleSearch = sort => {
        onChange({ query, sorter: sort || sorter });
      };

      const handleSearchKeyUp = e => e.key === "Enter" && handleSearch();

      const handleChangeSort = e => handleSearch(e.target.value);

      return (
        <Row fullWidth wrap>
          <Column stretch>
            <TextField
              placeholder={title}
              value={query}
              onChange={e => setQuery(e.target.value)}
              startAdornment={<SearchIcon style={{ width: 16, height: 16 }} />}
              classes={{ input: s.searchbar }}
              onKeyUp={handleSearchKeyUp}
              fullWidth
            />
          </Column>
          {sortOptions && (
            <Select
              options={sortOptions}
              renderOption={item => (
                <Typography fontSizeS textMediumGrey>
                  {t(item.title)}
                </Typography>
              )}
              displayEmpty
              value={sorter}
              onChange={handleChangeSort}
              classes={{ root: s.sorter }}
            />
          )}
        </Row>
      );
    }
  )
);
