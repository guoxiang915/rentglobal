import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
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
  Chip,
  GooglePlaceField,
  GoogleMap,
  EditIcon
} from "../../../../common/base-components";
import { TabWrapper } from "../../../../common/base-layouts";
import { Grid } from "@material-ui/core";
import {
  officeTypes,
  contractTypes,
  guarantees,
  checkOutNotices
} from "../../../../utils/constants";

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
    flex: 1,
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
    width: 249,
    marginRight: theme.spacing(1.5),
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(0.5)
  },

  googleMap: {
    height: 215,
    paddingBottom: 8
  },

  fullWidth: {
    width: "100%"
  }
});

class GeneralInfoForm extends Component {
  static propTypes = {
    office: PropTypes.object.isRequired,
    error: PropTypes.array,
    onChangeField: PropTypes.func.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = { importOfficeUrl: "", spokenLanguage: "", editAddressMode: !(this.props.office && this.props.office.location && this.props.office.location.fullAddress) };

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

  /** Toggle edit address mode */
  handleEditAddress = () => {
    this.setState({ editAddressMode: !this.state.editAddressMode });
  };

  /** Change location fields */
  handleChangeLocation = field => e => {
    const location = { ...this.props.office.location, [field]: e.target.value };
    this.handleChangeProps("location")(location);
  };

  handleSelectLocation = value => {
    const location = { ...this.props.office.location, ...value };
    this.setState({ editAddressMode: false }, () => {
      this.handleChangeProps("location")(location);
    });
  };

  /** Add/Delete spoken languages */
  handleAddLanguage = e => {
    if (e.key === "Enter") {
      let languages = this.props.office.spokenLanguages;
      const language = e.target.value;
      if (!(languages && languages.indexOf(language) !== -1))
        this.handleChangeProps("spokenLanguages")([
          ...(languages || []),
          language
        ]);
      this.setState({ spokenLanguage: "" });
    }
  };

  handleDeleteLanguage = language => () => {
    let languages = this.props.office.spokenLanguages;
    if (languages && languages.indexOf(language) !== -1) {
      languages.splice(languages.indexOf(language), 1);
      this.handleChangeProps("spokenLanguages")(languages);
    }
  };

  /**
   * Import office from url
   * @ignore
   */
  handleImportOffice = () => {};

  /**
   * Render grid row
   */
  renderGridRow = ({
    classes: s,
    title,
    required,
    children,
    labelMd,
    labelSm,
    labelXs,
    ...props
  }) => {
    return (
      <Grid container className={s.gridRow} {...props}>
        <Grid item md={labelMd || 4} sm={labelSm || 6} xs={labelXs || 12}>
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
        <Grid item className={s.gridRowValues}>
          {children}
        </Grid>
      </Grid>
    );
  };

  /** Render general textfields */
  renderFormField = ({ tag, field, options, ...props }) => {
    const { office, error, t } = this.props;
    let validation = null;
    try {
      validation = error && error.find(item => item.param === field);
    } catch (e) {}
    switch (tag) {
      case "textfield":
        return (
          <TextField
            variant="outlined"
            value={office[field]}
            onChange={this.handleChangePropsByEventValue(field)}
            error={!!validation}
            helperText={validation && validation.msg}
            {...props}
          />
        );
      case "numberfield":
        return (
          <NumberField
            value={office[field]}
            onChange={this.handleChangePropsByEventValue(field)}
            error={!!validation}
            helperText={validation && validation.msg}
            {...props}
          />
        );
      case "select":
        return (
          <Select
            options={["", ...options]}
            renderOption={item =>
              !item
                ? t("selectOne")
                : typeof item === "object"
                ? t(...item)
                : t(item)
            }
            displayEmpty
            value={office[field] || ""}
            onChange={this.handleChangePropsByEventValue(field)}
            error={!!validation}
            helperText={validation && validation.msg}
            {...props}
          />
        );
      case "address":
        return (
          <GooglePlaceField
            variant="outlined"
            value={office[field]}
            onChange={this.handleChangePropsByEventValue(field)}
            inputProps={{
              ...props.inputProps,
              error: !!validation,
              helperText: validation && validation.msg
            }}
            {...props}
          />
        );
      default:
        return null;
    }
  };

  componentDidUpdate(prevProps) {
    let state = {};
    if (JSON.stringify(prevProps.office) !== JSON.stringify(this.props.office)) {
      state = {
        ...state,
        editAddressMode: !(this.props.office && this.props.office.location && this.props.office.location.fullAddress)
      }
    }
    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  }

  /**
   * Renderer function
   */
  render() {
    const { office, classes: s, t, width } = this.props;
    const { importOfficeUrl, editAddressMode } = this.state;
    const GridRow = this.renderGridRow;
    const NormalFormField = this.renderFormField;

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
          <NormalFormField
            tag="textfield"
            placeholder={t("officeName")}
            field="title"
            className={s.textField350}
            required
          />
        </GridRow>
        {/** type of office */}
        <GridRow classes={s} title={t("typeOfOffice")} required>
          <NormalFormField
            tag="select"
            field="officeType"
            className={s.textField350}
            options={officeTypes}
            required
          />
        </GridRow>
        {/** price / monthly */}
        <GridRow classes={s} title={t("priceOrMonthly")} required>
          <NormalFormField
            tag="textfield"
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
            field="priceMonthly"
            required
          />
        </GridRow>
        {/** business / other fees */}
        <GridRow classes={s} title={t("businessOrOtherFees")}>
          <NormalFormField
            tag="textfield"
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
            field="businessOtherFees"
          />
        </GridRow>

        <Row paddingTop />
        <Divider />
        <Row paddingTop />

        {/** area */}
        <GridRow classes={s} title={t("area")}>
          <NormalFormField
            tag="textfield"
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
            field="area"
          />
        </GridRow>
        {/** roms */}
        <GridRow classes={s} title={t("rooms")}>
          <NormalFormField
            tag="numberfield"
            className={s.textField175}
            field="rooms"
          />
        </GridRow>
        {/** number of employees */}
        <GridRow classes={s} title={t("numberOfEmployees")} required>
          <NormalFormField
            tag="numberfield"
            className={s.textField175}
            field="numberOfEmployees"
            required
          />
        </GridRow>
        {/** business hours */}
        <GridRow classes={s} title={t("businessHours")}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <NormalFormField
                tag="textfield"
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
                field="businessHoursFrom"
              />
            </Grid>
            <Grid item xs={6}>
              <NormalFormField
                tag="textfield"
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
                field="businessHoursTo"
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
            onKeyPress={this.handleAddLanguage}
            value={this.state.spokenLanguage}
            onChange={this.handleChangeByEventValue("spokenLanguage")}
          />
          <Row paddingTopHalf />
          {office.spokenLanguages &&
            office.spokenLanguages.map((language, index) => (
              <React.Fragment key={index}>
                <Chip
                  className={s.textField250Fixed}
                  label={language}
                  onDelete={this.handleDeleteLanguage(language)}
                />
              </React.Fragment>
            ))}
        </GridRow>
        {/** lease duration / months */}
        <GridRow classes={s} title={t("leaseDurationPerMonths")}>
          <NormalFormField
            tag="numberfield"
            className={s.textField175}
            field="leaseDurationPerMonths"
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

        <Grid container spacing={1}>
          <Grid item md={editAddressMode ? 12 : 8} sm={12} xs={12}>
            {/** office number */}
            <GridRow
              classes={s}
              title={t("officeNumber")}
              labelMd={editAddressMode ? 4 : 6}
            >
              <NormalFormField
                tag="textfield"
                type="number"
                placeholder={t("number")}
                className={clsx(editAddressMode ? s.textField350 : s.fullWidth)}
                field="officeNumber"
              />
            </GridRow>
            {/** office floor */}
            <GridRow
              classes={s}
              title={t("officeFloor")}
              labelMd={editAddressMode ? 4 : 6}
            >
              <NormalFormField
                tag="textfield"
                type="number"
                placeholder={t("floor")}
                className={clsx(editAddressMode ? s.textField350 : s.fullWidth)}
                field="officeFloor"
              />
            </GridRow>
            {editAddressMode ? (
              <>
                {/** location */}
                <GridRow classes={s} title={t("location")} required>
                  <NormalFormField
                    tag="address"
                    field="location"
                    value={office.location && office.location.fullAddress}
                    onChange={this.handleChangeLocation("fullAddress")}
                    onSelect={this.handleSelectLocation}
                    inputProps={{
                      placeholder: t("officeAddress"),
                      required: true,
                      fullWidth: true
                    }}
                  />
                </GridRow>
              </>
            ) : (
              <>
                {/** street address */}
                <GridRow classes={s} title={t("streetAddress")} labelMd={6}>
                  <NormalFormField
                    tag="textfield"
                    field="streetName"
                    fullWidth
                    value={office.location && office.location.streetName}
                  />
                </GridRow>
                {/** city */}
                <GridRow classes={s} title={t("city")} labelMd={6}>
                  <NormalFormField
                    tag="textfield"
                    field="city"
                    fullWidth
                    value={office.location && office.location.city}
                  />
                </GridRow>
                {/** state */}
                <GridRow classes={s} title={t("state")} labelMd={6}>
                  <NormalFormField
                    tag="textfield"
                    field="state"
                    fullWidth
                    value={office.location && office.location.state}
                  />
                </GridRow>
                {/** zipCode */}
                <GridRow classes={s} title={t("zipCode")} labelMd={6}>
                  <NormalFormField
                    tag="textfield"
                    field="zipCode"
                    fullWidth
                    value={office.location && office.location.zipCode}
                  />
                </GridRow>
                {/** country */}
                <GridRow classes={s} title={t("country")} labelMd={6}>
                  <NormalFormField
                    tag="textfield"
                    field="country"
                    fullWidth
                    value={office.location && office.location.country}
                  />
                </GridRow>
                {/** edit button */}
                <Grid container className={s.gridRow} justify="flex-end">
                  <Row>
                    <Button
                      link="primary"
                      background="normalLight"
                      inverse
                      onClick={this.handleEditAddress}
                      variant={isWidthDown("xs", width) ? "icon" : null}
                      justify="flex-end"
                    >
                      <EditIcon style={{ width: 20, height: 18 }} />
                      {!isWidthDown("xs", width) && (
                        <Typography paddingLeft fontSizeS>
                          {t("edit")}
                        </Typography>
                      )}
                    </Button>
                  </Row>
                </Grid>
              </>
            )}
          </Grid>
          {!editAddressMode && (
            <Grid item md={4} sm={12} xs={12}>
              <Row fullWidth classes={{ box: s.googleMap }}>
                <GoogleMap
                  coordinates={office.location && office.location.coordinates}
                />
              </Row>
            </Grid>
          )}
        </Grid>
        {/** description */}
        <GridRow classes={s} title={t("description")}>
          <NormalFormField
            tag="textfield"
            placeholder={t("officeBriefDescription")}
            fullWidth
            rows={isWidthDown("xs", width) ? 6 : 16}
            multiline
            field="description"
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
            <NormalFormField
              tag="select"
              field="contractType"
              className={s.textField350}
              options={contractTypes}
            />
          </GridRow>
          {/** guarantees / security deposit */}
          <GridRow classes={s} title={t("guaranteesOrSecurityDeposit")}>
            <NormalFormField
              tag="select"
              className={s.textField350}
              options={guarantees}
              field="guarantees"
            />
          </GridRow>
          {/** check out notice */}
          <GridRow classes={s} title={t("checkOutNotice")}>
            <NormalFormField
              tag="select"
              className={s.textField350}
              options={checkOutNotices}
              field="checkOutNotice"
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
