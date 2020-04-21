import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth from "@material-ui/core/withWidth";
import { Grid } from "@material-ui/core";
import {
  Row,
  Column,
  Box,
  Typography,
  Checkbox,
  Divider,
  TextField,
  Chip
} from "../../../../common/base-components";
import { TabWrapper } from "../../../../common/base-layouts";
import { servicesCategories } from "../../../../utils/constants";

const styleSheet = theme => ({
  root: {},

  categoryIcon: {
    width: 24,
    height: 24,
    color: theme.colors.primary.darkGrey,
    opacity: 0.15
  },

  optionWrapper: {},

  textField250Fixed: {
    width: 249,
    marginRight: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },

  gridRow: {
    width: "100%"
  },

  gridRowHeader: {
    maxHeight: 47
  },

  gridRowValues: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: -15,
      marginRight: -15,
      maxWidth: "calc(100% + 30px)",
      width: "calc(100% + 30px)",
      flexBasis: "auto"
    }
  }
});

class ServicesAmenitiesForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    customFeature: ""
  };

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
  handleChangeByEventValue = field => e => {
    this.setState({ [field]: e.target.value });
  };

  /** Toggle options */
  handleToggleOption = (category, option, isRemove = true) => () => {
    const office = this.props.office;
    const services = { ...(office.servicesAndAmenities || {}) };
    services[category] = services[category] || [];
    if (services[category].indexOf(option) === -1) {
      services[category] = [...services[category], option];
    } else if (isRemove) {
      services[category].splice(services[category].indexOf(option), 1);
    }
    this.props.onChangeField("servicesAndAmenities", services);
  };

  /** Add/Delete custom feature */
  handleAddCustomFeature = e => {
    if (e.key === "Enter") {
      this.handleToggleOption("custom", e.target.value, false)();
      this.setState({ customFeature: "" });
    }
  };

  handleDeleteCustomFeature = feature => () => {
    this.handleToggleOption("custom", feature)();
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, office, t } = this.props;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {servicesCategories.map(
          (category, index) =>
            category.value !== "custom" && (
              <React.Fragment key={index}>
                <Row fullWidth paddingBottom>
                  <TabWrapper
                    title={
                      <Typography alignChildrenCenter fontSizeS textMediumGrey>
                        <category.icon className={s.categoryIcon} />
                        <Typography paddingLeft>{t(category.name)}</Typography>
                      </Typography>
                    }
                    open={true}
                    insideOpen
                  >
                    <Row fullWidth wrap paddingTop>
                      {category.options.map((opt, optIndex) => (
                        <React.Fragment key={optIndex}>
                          <Box classes={{ box: s.optionWrapper }}>
                            <Checkbox
                              variant="outlined"
                              label={t(opt.name)}
                              className={s.textField250Fixed}
                              isChecked={
                                !!(
                                  office.servicesAndAmenities &&
                                  office.servicesAndAmenities[category.value] &&
                                  office.servicesAndAmenities[
                                    category.value
                                  ].indexOf(opt.value) !== -1
                                )
                              }
                              onChange={this.handleToggleOption(
                                category.value,
                                opt.value
                              )}
                            />
                          </Box>
                        </React.Fragment>
                      ))}
                    </Row>
                  </TabWrapper>
                </Row>
              </React.Fragment>
            )
        )}

        <Row paddingTop />
        <Divider />

        {/** Render custom feature form */}
        <Row paddingTopDouble fullWidth>
          <Grid container className={s.gridRow}>
            <Grid item md={4} sm={6} xs={12}>
              <Typography
                fullHeight
                paddingTopHalf
                paddingBottomHalf
                alignChildrenCenter
                classes={{ box: s.gridRowHeader }}
              >
                {t("enterCustomFeature")}
              </Typography>
            </Grid>
            <Grid item md={8} sm={6} xs={12} className={s.gridRowValues}>
              <TextField
                placeholder={t("featureName")}
                fullWidth
                onKeyPress={this.handleAddCustomFeature}
                value={this.state.customFeature}
                onChange={this.handleChangeByEventValue("customFeature")}
              />
              <Row paddingTopHalf />
              {office.servicesAndAmenities &&
                office.servicesAndAmenities.custom &&
                office.servicesAndAmenities.custom.map((feature, index) => (
                  <React.Fragment key={index}>
                    <Chip
                      className={s.textField250Fixed}
                      label={feature}
                      onDelete={this.handleDeleteCustomFeature(feature)}
                    />
                  </React.Fragment>
                ))}
            </Grid>
          </Grid>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(ServicesAmenitiesForm))
);
