import React, { useState } from "react";
import { withStyles, Card } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Link,
  Row,
  Column,
  Box,
  Stretch
} from "../base-components";
import { KeyboardArrowRight } from "@material-ui/icons";

const styleSheet = theme => ({
  root: {
    width: 192,
    height: 116
  },

  title: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginTop: 3
  },

  infoWrapper: {
    width: 120,
    height: 24,
    overflow: "hidden",
    position: "relative",
    fontSize: "19px"
  }
});

/**
 * Function component for uploading document
 * @typeof Props
 * @property  {{value:number;variant:string;navigate:function;}[]} statistics  Statistics information
 * @property  {string} title  Title of box
 */
const StatisticBox = ({ classes, statistics, title, onClick }) => {
  /** current shown info */
  const [current, setCurrent] = useState(0);
  /** move right the current info */
  const nextCurrent = () =>
    setCurrent(current === statistics.length - 1 ? 0 : current + 1);
  /** navigate to selected statistic info */
  const handleNavigate = () =>
    statistics[current].navigate && statistics[current].navigate();

  return (
    <Card variant="outlined" onClick={onClick} className={classes.root}>
      <Column fullWidth padding>
        <Typography
          classes={{ box: classes.title }}
          fontSizeS
          textSecondary
          paddingLeftHalf
          paddingRightHalf
          fullWidth
          justifyChildrenStart
        >
          {title}
        </Typography>
        <Row style={{ paddingTop: 24 }}>
          {statistics && statistics.length && (
            <Box classes={{ box: classes.infoWrapper }}>
              <Link
                to="#"
                onClick={handleNavigate}
                variant={statistics[current].variant || "normalLight"}
              >
                {statistics[current].value}
              </Link>
            </Box>
          )}
          <Stretch />
          <Box style={{ width: 24, height: 24 }}>
            <Link to="#" variant="secondaryLight" onClick={nextCurrent}>
              <KeyboardArrowRight disabled />
            </Link>
          </Box>
        </Row>
      </Column>
    </Card>
  );
};

export default withStyles(styleSheet, { name: "StatisticBox" })(
  withTranslation("common")(StatisticBox)
);
