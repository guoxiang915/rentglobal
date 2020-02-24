import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import {
  Box,
  Row,
  Column,
  Stretch,
  Typography,
  Button
} from "../../common/base-components";
import { Collapse } from "@material-ui/core";
import {
  KeyboardArrowUpSharp,
  KeyboardArrowDownSharp
} from "@material-ui/icons";
import { useState } from "react";

const styleSheet = theme => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27
    }
  },

  fullWidth: {
    width: "100%"
  },

  buttonIcon: {
    width: 20,
    height: 20
  },

  officesTabWrapper: {
    paddingTop: theme.spacing(4)
  }
});

class Offices extends Component {
  state = {};

  renderOfficeTab = ({ children, classes, open, t, title }) => {
    const [expanded, setExpanded] = useState(open);

    return (
      <Column fullWidth alignChildrenStart>
        <Row fullWidth>
          <Box onClick={() => setExpanded(!expanded)}>
            <Typography fontSizeS textMediumGrey paddingRight>
              {title}
            </Typography>
            {expanded ? (
              <KeyboardArrowUpSharp
                color="secondary"
                className={classes.buttonIcon}
              />
            ) : (
              <KeyboardArrowDownSharp
                color="secondary"
                className={classes.buttonIcon}
              />
            )}
          </Box>
        </Row>
        <Collapse in={expanded} className={classes.fullWidth}>
          <Column paddingTopHalf alignChildrenStart>
            {children}
          </Column>
        </Collapse>
      </Column>
    );
  };

  render() {
    const { classes, t } = this.props;
    const OfficeTab = this.renderOfficeTab;

    return (
      <Column
        classes={{ box: classes.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          {/* title */}
          <Typography fontSizeM textSecondary paddingBottom>
            {t("offices")}
          </Typography>
          <Stretch />
          <Button variant="secondary" shadow>
            {t("addNewOffice")}
          </Button>
        </Row>

        {/* requests tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <OfficeTab
            open={true}
            classes={classes}
            t={t}
            title={t("requests")}
          />
        </Row>

        {/* office lists tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <OfficeTab
            open={true}
            classes={classes}
            t={t}
            title={t("officeLists")}
          />
        </Row>

        {/* offices need attention tab */}
        <Row fullWidth classes={{ box: classes.officesTabWrapper }}>
          <OfficeTab
            open={true}
            classes={classes}
            t={t}
            title={t("officeNeedAttention")}
          />
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(Offices));
