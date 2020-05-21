import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Row, Column } from "../../common/base-components";
import {
  OfficeGallery,
  OfficeTitlebar,
  OfficeGeneralInfo
} from "../../common/base-layouts";
import { withLogin } from "../../common/base-services";

const styleSheet = () => ({
  root: {}
});

class OfficeDetailForm extends PureComponent {
  static propTypes = {
    /** Office info */
    office: PropTypes.object.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  titlebarActions = [];

  /**
   * Renderer function
   */
  render() {
    const { classes: s, office } = this.props;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** Show office title bar */}
        <Row fullWidth paddingBottom>
          <OfficeTitlebar
            office={office}
            actions={this.titlebarActions}
            maxWidth={Math.min(1024, window.innerWidth - 44)}
            topOffset={150}
          />
        </Row>

        {/** Show office general info */}
        <Row fullWidth paddingBottom>
          <OfficeGeneralInfo office={office} />
        </Row>

        {/** Show office coverPhotos */}
        <Row fullWidth paddingBottom>
          <OfficeGallery coverPhotos={office.coverPhotos} />
        </Row>
      </Column>
    );
  }
}

export default withLogin(
  withStyles(styleSheet)(withTranslation("common")(OfficeDetailForm))
);
