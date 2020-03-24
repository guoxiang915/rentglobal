import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  EyeDisIcon,
  DeleteIcon,
  EditIcon
} from "../../common/base-components";
import { KeyboardBackspace } from "@material-ui/icons";
import OfficeDetailForm from "../../containers/Layout/OfficeDetailForm";

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

  addOfficeTabWrapper: {
    paddingTop: 20,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 8,
      paddingBottom: 24
    }
  },

  formButtons: {
    paddingTop: 160,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 64
    }
  }
});

class OfficeDetail extends Component {
  static propTypes = {
    /** office id to show */
    officeId: PropTypes.string.isRequired,
    /** function for getting office from office id */
    getOfficeById: PropTypes.func.isRequired,
    /** function for getting landlord from office */
    getLandlordByOffice: PropTypes.func.isRequired,
    /** function for getting reviews from office */
    getReviewsByOffice: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    office: {},
    dialog: null
  };

  /** Get office from id */
  componentDidMount() {
    const { officeId } = this.props;

    this.props.getOfficeById(officeId).then(response => {
      if (response.status === 200) {
        this.setState({ office: response.data });
      }
    });
  }

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate("back");
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { office, dialog } = this.state;

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
            link="secondary"
            background="secondaryLight"
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
          {office && <OfficeDetailForm office={office} />}
        </Row>

        {/** Show landlord info */}

        {/** Show company info */}

        {/** Show similar office */}

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeDetail))
);
