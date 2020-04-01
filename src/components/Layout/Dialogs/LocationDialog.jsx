import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog, Grid, withStyles } from "@material-ui/core";
import clsx from "clsx";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  Column,
  Link,
  GoogleMap
} from "../../../common/base-components";
import { CloseIcon } from "../../../common/base-components/Icons";

const styleSheet = theme => ({
  root: {
    maxWidth: 1056,
    maxHeight: 768,
    padding: 0,
    width: "80%",
    height: "80%",
    borderRadius: 8
  },

  header: {
    width: "100%",
    padding: "12px 12px 12px 40px"
  },

  content: {
    height: "100%",
    padding: 0
  },

  googleMapSide: {
    width: "100%",
    height: "100%",
    minHeight: 150,
    [theme.breakpoints.down("xs")]: {
      height: 250
    }
  },

  descriptions: {
    width: "100%",
    height: "100%",
    border: "none",
    borderLeft: `0.5px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down("xs")]: {
      border: "none",
      borderUp: `0.5px solid ${theme.colors.primary.borderGrey}`
    }
  },

  descriptionsWrapper: {
    padding: "30px 30px 30px 40px",
    height: "100%",
    overflowY: "auto"
  },

  footer: {
    width: "100%",
    padding: "12px 12px 12px 40px"
  }
});

class LocationDialog extends Component {
  static propTypes = {
    location: PropTypes.object,
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func
  };

  /** TODO: show description for this location */
  descriptions = [
    {
      title: "Verdun,H4G2V9, Québec, Canada",
      content:
        "If you walk, It is so close to green line metro station -Jolicoeur , just 5-6 minutes walking distance to there . If you drive , it is so close to highway 15 (15-20 minutes to Bridge Champlain to the necessary..."
    },
    {
      title: "Getting around",
      content:
        "You can park your car in the private driveway side of house face to boulevard Champlain , but extra parking fee collected by host in cash. Of course , you also can park your car in the street side front of…"
    }
  ];

  /** Close dialog */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  /** Load more descriptions */
  handleMoreDescriptions = () => {};

  /** Render */
  render() {
    const { location, className, classes: s, t } = this.props;

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        <Grid container className={s.content}>
          <Grid item xs={12} sm={6} className={s.googleMapSide}>
            {/** location panel */}
            <Box fullWidth fullHeight justifyChildrenCenter alignChildrenCenter>
              <GoogleMap
                coordinates={location && [location.coordinates]}
                shadowWidth={50}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={s.descriptions}>
            <Column fullHeight>
              {/** header */}
              <Row fullWidth classes={{ box: s.header }}>
                <Typography fontSizeM fontWeightBold textSecondary>
                  {t("location")}
                </Typography>
                <Stretch />
                <Button
                  link="errorRed"
                  background="secondaryLight"
                  onClick={this.handleClose}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    <CloseIcon style={{ width: 10, height: 10 }} />
                    <Typography paddingLeft>{t("close")}</Typography>
                  </Typography>
                </Button>
              </Row>

              {/** descriptions panel */}
              <Row stretch fullWidth>
                <Column
                  classes={{ box: s.descriptionsWrapper }}
                  alignChildrenStart
                >
                  {this.descriptions.map((item, index) => (
                    <React.Fragment key={index}>
                      <Typography fontWeightBold textSecondary fontSizeM>
                        {item.title}
                      </Typography>
                      <Typography
                        textSecondary
                        fontSizeS
                        paddingTopHalf
                        paddingBottom
                        fullWidth
                      >
                        {item.content}
                      </Typography>
                    </React.Fragment>
                  ))}
                  <Link
                    to="#"
                    onClick={this.handleMoreDescriptions}
                    variant="normalLight"
                  >
                    <Typography fontSizeS>{t("loadMore")}</Typography>
                  </Link>
                </Column>
              </Row>

              {/** footer */}
              <Row fullWidth classes={{ box: s.footer }}>
                <Stretch />
                <Button
                  link="errorRed"
                  background="secondaryLight"
                  onClick={this.handleClose}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    <CloseIcon style={{ width: 10, height: 10 }} />
                    <Typography paddingLeft>{t("close")}</Typography>
                  </Typography>
                </Button>
              </Row>
            </Column>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: "LocationDialog" })(
  withTranslation("common")(withWidth()(LocationDialog))
);
