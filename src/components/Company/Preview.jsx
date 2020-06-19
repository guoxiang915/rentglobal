import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { KeyboardBackspace } from "@material-ui/icons";
import {
  Column,
  Row,
  Stretch,
  Button,
} from "../../common/base-components";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  fullWidth: {
    width: "100%",
  },
});

class PreviewProfile extends PureComponent {
  static propTypes = {
  };

  render() {
    const { classes: s, t, width } = this.props;
    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          <Stretch />
          <Button
            link='secondary'
            background='secondaryLight'
            onClick={this.backCurrentStep}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>
      </Column>
    )
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(PreviewProfile))
);