import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Row,
  Column,
  Typography,
  TextField,
  NumberField,
  Checkbox,
  Button,
  Select,
  ArrowDownIcon,
  Divider,
  Chip
} from "../../../common/base-components";
import { TabWrapper } from "../../../common/base-layouts";
import { Grid } from "@material-ui/core";
import {
  officeTypes,
  contractTypes,
  guarantees,
  checkOutNotices
} from "../../../utils/constants";

const styleSheet = theme => ({
  root: {},

  gridRow: {
    width: "100%",
    paddingBottom: 8
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

  importOfficeButton: {
    width: 215,
    marginTop: 16,
    marginBottom: 24,
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      marginBottom: 32,
      marginRight: -15
    }
  },

  textField350: {
    width: 350,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  textField175: {
    width: 175,
    [theme.breakpoints.down("xs")]: {
      width: "calc(50% - 10px)"
    }
  },

  textField250Fixed: {
    width: 250,
    marginRight: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  }
});

class GeneralInfoForm extends Component {
  static propTypes = {
    office: PropTypes.object.isRequired,
    onChangeField: PropTypes.func.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { importOfficeUrl: "" };

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

  /**
   * Update parent value by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangePropsByEvent = field => value => () => {
    this.props.onChangeField(field, value);
  };

  /**
   * Update parent value by event value
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangePropsByEventValue = field => e => {
    this.props.onChangeField(field, e.target.value);
  };

  /**
   * Update parent value by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeProps = field => value => {
    console.log(field, value);
    this.props.onChangeField(field, value);
  };

  /**
   * Import office from url
   * @ignore
   */
  handleImportOffice = () => {};

  /**
   * Render grid row
   */
  renderGridRow = ({ classes: s, title, required, children }) => {
    return (
      <Grid container className={s.gridRow}>
        <Grid item md={4} sm={6} xs={12}>
          <Typography
            fullHeight
            paddingTopHalf
            paddingBottomHalf
            alignChildrenCenter
            classes={{ box: s.gridRowHeader }}
          >
            {title}
            {required && (
              <Typography paddingLeftHalf textErrorRed>
                *
              </Typography>
            )}
          </Typography>
        </Grid>
        <Grid item md={8} sm={6} xs={12} className={s.gridRowValues}>
          {children}
        </Grid>
      </Grid>
    );
  };

  /**
   * Renderer function
   */
  render() {
    const { office, classes: s, t, width } = this.props;
    const { importOfficeUrl } = this.state;
    const GridRow = this.renderGridRow;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** import office data from another url */}
        <Typography
          fontSizeS
          textMediumGrey
          paddingBottomDouble={isWidthDown("xs", width)}
          paddingBottom
        >
          {t("importOfficeFromUrl")}
        </Typography>
        <GridRow classes={s} title={t("url")}>
          <TextField
            variant="outlined"
            placeholder="http://"
            fullWidth
            value={importOfficeUrl}
            onChange={this.handleChangeByEventValue("importOfficeUrl")}
          />
        </GridRow>
        <Row fullWidth justifyChildrenEnd>
          <Button
            variant="primary"
            className={s.importOfficeButton}
            onClick={this.handleImportOffice}
          >
            <ArrowDownIcon style={{ width: 16, height: 18 }} />
            <Typography paddingLeft>{t("importOfficeData")}</Typography>
          </Button>
        </Row>

        <Divider />
        <Row paddingTop />

        {/** office name */}
        <GridRow classes={s} title={t("title")} required>
          <TextField
            variant="outlined"
            placeholder={t("officeName")}
            className={s.textField350}
            value={office.title}
            onChange={this.handleChangePropsByEventValue("title")}
            required
          />
        </GridRow>
        {/** type of office */}
        <GridRow classes={s} title={t("typeOfOffice")} required>
          <Select
            className={s.textField350}
            options={["", ...officeTypes]}
            renderOption={item => (!item ? t("selectOne") : t(item))}
            displayEmpty
            value={office.officeType || ""}
            onChange={this.handleChangePropsByEventValue("officeType")}
            required
          />
        </GridRow>
        {/** price / monthly */}
        <GridRow classes={s} title={t("priceOrMonthly")} required>
          <TextField
            variant="outlined"
            className={s.textField350}
            type="number"
            endAdornment={
              <Typography
                fontSizeS
                textMediumGrey
                style={{ whiteSpace: "nowrap" }}
              >
                {t("$/month")}
              </Typography>
            }
            value={office.priceMonthly}
            onChange={this.handleChangePropsByEventValue("priceMonthly")}
            required
          />
        </GridRow>
        {/** business / other fees */}
        <GridRow classes={s} title={t("businessOrOtherFees")}>
          <TextField
            variant="outlined"
            className={s.textField350}
            type="number"
            endAdornment={
              <Typography
                fontSizeS
                textMediumGrey
                style={{ whiteSpace: "nowrap" }}
              >
                {t("$/month")}
              </Typography>
            }
            value={office.businessOtherFees}
            onChange={this.handleChangePropsByEventValue("businessOtherFees")}
          />
        </GridRow>

        <Row paddingTop />
        <Divider />
        <Row paddingTop />

        {/** area */}
        <GridRow classes={s} title={t("area")}>
          <TextField
            type="number"
            placeholder={t("area")}
            className={s.textField350}
            endAdornment={
              <Typography
                fontSizeS
                textMediumGrey
                style={{ whiteSpace: "nowrap" }}
              >
                mxm
              </Typography>
            }
            value={office.area}
            onChange={this.handleChangePropsByEventValue("area")}
          />
        </GridRow>
        {/** roms */}
        <GridRow classes={s} title={t("rooms")}>
          <NumberField
            className={s.textField175}
            value={office.rooms}
            onChange={this.handleChangePropsByEventValue("rooms")}
          />
        </GridRow>
        {/** number of employees */}
        <GridRow classes={s} title={t("numberOfEmployees")} required>
          <NumberField
            className={s.textField175}
            value={office.numberOfEmployees}
            onChange={this.handleChangePropsByEventValue("numberOfEmployees")}
            required
          />
        </GridRow>
        {/** business hours */}
        <GridRow classes={s} title={t("businessHours")}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                type="number"
                endAdornment={
                  <Typography
                    fontSizeS
                    textMediumGrey
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("am")}
                  </Typography>
                }
                value={office.businessHoursFrom}
                onChange={this.handleChangePropsByEventValue(
                  "businessHoursFrom"
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                endAdornment={
                  <Typography
                    fontSizeS
                    textMediumGrey
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {t("pm")}
                  </Typography>
                }
                value={office.businessHoursTo}
                onChange={this.handleChangePropsByEventValue("businessHoursTo")}
              />
            </Grid>
          </Grid>
        </GridRow>
        {/** 24 hour accessbility */}
        <GridRow classes={s} title={t("24HourAccessibility")}>
          <Checkbox
            variant="outlined"
            label="24x7"
            className={s.textField250Fixed}
            isChecked={!!office.fullTimeAccessibility}
            onChange={this.handleChangePropsByEvent("fullTimeAccessibility")(
              !office.fullTimeAccessibility
            )}
          />
        </GridRow>
        {/** spoken language */}
        <GridRow classes={s} title={t("spokenLanguage")}>
          <TextField
            placeholder={t("enterLanguage")}
            className={s.textField350}
            value={this.state.spokenLanguage}
            onChange={this.handleChangeByEventValue("spokenLanguage")}
          />
          <Row paddingTopHalf />
          {office.spokenLanguages &&
            office.spokenLanguages.map(language => (
              <Chip
                className={s.textField250Fixed}
                label={language}
                onDelete={this.handleDeleteLanguage(language)}
              />
            ))}
        </GridRow>
        {/** lease duration / months */}
        <GridRow classes={s} title={t("leaseDurationPerMonths")}>
          <NumberField
            className={s.textField175}
            value={office.leaseDurationPerMonths}
            onChange={this.handleChangePropsByEventValue(
              "leaseDurationPerMonths"
            )}
          />
          <Row paddingTopHalf />
          <Checkbox
            variant="outlined"
            label={t("undefineDuration")}
            className={s.textField250Fixed}
            isChecked={office.leaseDurationPerMonths === null}
            onChange={this.handleChangePropsByEvent("leaseDurationPerMonths")(
              null
            )}
          />
        </GridRow>

        <Row paddingTop />
        <Divider />
        <Row paddingTop />

        {/** office number */}
        <GridRow classes={s} title={t("officeNumber")}>
          <TextField
            type="number"
            placeholder={t("number")}
            className={s.textField350}
            value={office.officeNumber}
            onChange={this.handleChangePropsByEventValue("officeNumber")}
          />
        </GridRow>
        {/** office floor */}
        <GridRow classes={s} title={t("officeFloor")}>
          <TextField
            type="number"
            placeholder={t("floor")}
            className={s.textField350}
            value={office.officeFloor}
            onChange={this.handleChangePropsByEventValue("officeFloor")}
          />
        </GridRow>
        {/** location */}
        <GridRow classes={s} title={t("location")} required>
          <TextField
            placeholder={t("officeAddress") + " (" + t("autocomplete") + ")"}
            fullWidth
            value={office.location && office.location.fullAddress}
            onChange={this.handleChangePropsByEventValue("location")}
          />
        </GridRow>
        {/** description */}
        <GridRow classes={s} title={t("description")}>
          <TextField
            placeholder={t("officeBriefDescription")}
            fullWidth
            rows={isWidthDown("xs", width) ? 6 : 16}
            multiline
            value={office.description}
            onChange={this.handleChangePropsByEventValue("description")}
          />
        </GridRow>

        <Row paddingTop />
        <Divider />
        <Row paddingTop />

        {/**
         * More info of office
         */}
        <TabWrapper title={t("moreInfo")} open={true} insideOpen>
          {/** type of contract */}
          <GridRow classes={s} title={t("typeOfContract")}>
            <Select
              className={s.textField350}
              options={["", ...contractTypes]}
              renderOption={item => (!item ? t("selectOne") : item)}
              displayEmpty
              value={office.contractType || ""}
              onChange={this.handleChangePropsByEventValue("contractType")}
            />
          </GridRow>
          {/** guarantees / security deposit */}
          <GridRow classes={s} title={t("guaranteesOrSecurityDeposit")}>
            <Select
              className={s.textField350}
              options={["", ...guarantees]}
              renderOption={item => (!item ? t("selectOne") : item)}
              displayEmpty
              value={office.guarantees || ""}
              onChange={this.handleChangePropsByEventValue("guarantees")}
            />
          </GridRow>
          {/** check out notice */}
          <GridRow classes={s} title={t("checkOutNotice")}>
            <Select
              className={s.textField350}
              options={["", ...checkOutNotices]}
              renderOption={item => (!item ? t("selectOne") : item)}
              displayEmpty
              value={office.checkOutNotice || ""}
              onChange={this.handleChangePropsByEventValue("checkOutNotice")}
            />
          </GridRow>
        </TabWrapper>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(GeneralInfoForm))
);
