import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import { Column } from "../../../common/base-components";

const styleSheet = theme => ({
  root: {}
});

class PictureGalleryForm extends Component {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {};

  /**
   * Update state
   * @member
   * @param {string} field Name of field to be updated
   */
  updateState = field => value => {
    this.setState({ [field]: value });
  };

  /**
   * Update state by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeByEvent = field => value => () => {
    this.setState({ [field]: value });
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s } = this.props;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart></Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(PictureGalleryForm))
);
