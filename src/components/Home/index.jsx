import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import HeaderImage from "../../assets/img/img_header.jpg";
import HeaderImageLarger from "../../assets/img/img_header@2x.jpg";
import { Typography, Grid, Card } from "@material-ui/core";
import {
  Box,
  Row,
  Column,
  Stretch,
  TextField,
  Button
} from "../../common/base-components";

const styleSheet = theme => ({
  root: {
    // flexGrow: 1,
    display: "block",
    width: "100%",
    height: "100%"
  },

  landingBoardWrapper: {
    display: "block",
    width: "100%",
    position: "relative",
    background: `url(${require("../../assets/img/img_header@2x.jpg")}) 0% 0% no-repeat padding-box`,
    backgroundSize: "cover",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      background: `url(${require("../../assets/img/img_header.jpg")}) 0% 0% no-repeat padding-box`,
      backgroundSize: "170% auto",
      backgroundPosition: "100% 0%"
    }
  },

  landingBoardImage: {
    visibility: "hidden",
    [theme.breakpoints.down("sm")]: {
      width: "170%"
    }
  },

  landingBoard: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    padding: "128px 16px 56px 16px",
    [theme.breakpoints.down("sm")]: {
      padding: "24px 16px"
    }
  },

  searchWrapper: {
    maxWidth: 580,
    width: "100%",
    boxShadow: "box-shadow: 0px 24px 24px #0000001A;",
    padding: `${theme.spacing(4)}px ${theme.spacing(4.5)}px`,
    [theme.breakpoints.down("sm")]: {
      boxShadow: "0px 14px 14px #0000001A",
      padding: `${theme.spacing(2)}px ${theme.spacing(1.5)}px`
    }
  },

  actionButtonsWrapper: {}
});

class Home extends Component {
  render() {
    const { classes, t } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.landingBoardWrapper}>
          <img
            srcSet={`${HeaderImageLarger} 2x`}
            src={HeaderImage}
            alt=""
            width="100%"
            className={classes.landingBoardImage}
          />
          <Grid
            container
            justify="space-between"
            alignItems="center"
            direction="column"
            className={classes.landingBoard}
          >
            <Grid item width="100%">
              {/* <Box classes={{ box: classes.searchWrapper }} padding> */}
              <Card className={classes.searchWrapper}>
                <Column alignChildrenStart>
                  <Typography variant="h6">
                    {t("dashboardLandingTitle", { name: "TESSI" })}
                  </Typography>
                  <Box paddingTopHalf>
                    <Typography variant="caption">
                      {t("dashboardLandingSubtitle")}
                    </Typography>
                  </Box>
                  <Box paddingTop fullWidth>
                    <TextField fullWidth variant="outlined" />
                  </Box>
                </Column>
              </Card>
              {/* </Box> */}
            </Grid>
            <Grid item>
              {/* <Row classes={{ box: classes.actionButtonsWrapper }} padding> */}
              <Grid
                container
                spacing={5}
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Button>{t("chatWithTessi")}</Button>
                </Grid>
                <Grid item>
                  <Button>{t("advancedSearch")}</Button>
                </Grid>
              </Grid>
              {/* </Row> */}
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styleSheet)(
  withTranslation(["home", "common"])(Home)
);
