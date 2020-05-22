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
  Stretch,
  Button,
  Typography,
  Checkbox,
  Divider,
  TextField,
  Chip,
  CheckIcon,
  CloseIcon
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
  },

  formButtons: {
    paddingTop: 72,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 36,
      paddingBottom: 24
    }
  }
});

class ServicesAmenitiesForm extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
    showMore: PropTypes.bool,
    onChangeField: PropTypes.func,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onNext: PropTypes.func,
    isLoading: PropTypes.bool
  };

  state = {
    customFeature: "",
    office: this.props.office || {},
    redraw: false
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
    const { office } = this.state;
    const services = { ...(office.servicesAndAmenities || {}) };
    services[category] = services[category] || [];
    if (services[category].indexOf(option) === -1) {
      services[category] = [...services[category], option];
    } else if (isRemove) {
      services[category].splice(services[category].indexOf(option), 1);
    }
    if (this.props.onChangeField) {
      this.props.onChangeField("servicesAndAmenities", services);
    } else {
      office["servicesAndAmenities"] = services;
      this.setState({ redraw: !this.state.redraw });
    }
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
    const {
      classes: s,
      showMore,
      t,
      onCancel,
      onNext,
      onSave,
      isLoading
    } = this.props;
    const { office } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {servicesCategories.map(
          (category, index) =>
            category.value !== "custom" &&
            (showMore !== false || index < 2) && (
              <React.Fragment key={index}>
                <Row fullWidth paddingBottom>
                  <TabWrapper
                    title={
                      <Typography alignChildrenCenter fontSizeS textMediumGrey>
                        <category.icon className={s.categoryIcon} />
                        <Typography paddingLeft>{t(category.name)}</Typography>
                      </Typography>
                    }
                    open
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

        {showMore !== false && (
          <React.Fragment>
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
          </React.Fragment>
        )}

        {/** Show form buttons */}
        {(onCancel || onSave || onNext) && (
          <Row fullWidth classes={{ box: s.formButtons }}>
            {/** Show cancel button */}
            {onCancel && (
              <Button
                link="errorRed"
                background="secondaryLight"
                onClick={onCancel}
              >
                <CloseIcon style={{ width: 9, height: 9 }} />
                <Typography paddingLeft fontSizeS>
                  {t("cancel")}
                </Typography>
              </Button>
            )}

            <Stretch />

            {/** Show save button */}
            {onSave && (
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={() => onSave(this.state.office)}
                loading={isLoading}
              >
                <CheckIcon style={{ width: 16, height: 16 }} />
                <Typography paddingLeft fontSizeS>
                  {t("save")}
                </Typography>
              </Button>
            )}

            <Box paddingLeft />

            {/** Show next button */}
            {onNext && (
              <Button
                variant="primary"
                onClick={() => onNext(this.state.office)}
                style={{ width: 215 }}
                shadow
              >
                <Typography fontSizeS>{t("nextStep")}</Typography>
              </Button>
            )}
          </Row>
        )}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(ServicesAmenitiesForm))
);
