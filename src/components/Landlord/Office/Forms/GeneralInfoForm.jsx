import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { Grid } from "@material-ui/core";
import {
  Box,
  Row,
  Column,
  Stretch,
  Typography,
  TextField,
  NumberField,
  Checkbox,
  Button,
  Select,
  // ArrowDownIcon,
  Divider,
  // Chip,
  GooglePlaceField,
  GoogleMap,
  EditIcon,
  CloseIcon,
  CheckIcon
} from "../../../../common/base-components";
import { TabWrapper } from "../../../../common/base-layouts";
import {
  officeTypes,
  contractTypes,
  guarantees,
  checkOutNotices
} from "../../../../utils/constants";
// import { getPlaceDetails } from '../../../../api/endpoints';

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
  },

  formButtons: {
    paddingTop: 160,
    paddingBottom: 56,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 64,
      paddingBottom: 24
    }
  }
});

// const types = ['bar', 'bicycle_store', 'bus_station', 'gym', 'train_station', 'taxi_stand', 'subway_station', 'parking'];

class GeneralInfoForm extends PureComponent {
  static propTypes = {
    office: PropTypes.object.isRequired,
    error: PropTypes.array,
    onCancel: PropTypes.func,
    onSave: PropTypes.func,
    onNext: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    // importOfficeUrl: '',
    redraw: false,
    editAddressMode: !this.props.office?.location?.fullAddress,
    office: this.props.office || {}
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
   * Update parent value by event
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeOffice = field => value => {
    const { office } = this.state;
    office[field] = value;
    this.setState({ redraw: !this.state.redraw });
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
  handleChangeOfficeByEvent = field => value => () => {
    this.handleChangeOffice(field)(value);
  };

  /**
   * Update parent value by event value
   * @member
   * @param {string} field Name of field to be updated
   */
  handleChangeOfficeByEventValue = field => e => {
    this.handleChangeOffice(field)(e.target.value);
  };

  /** Toggle edit address mode */
  handleEditAddress = () => {
    this.setState({ editAddressMode: !this.state.editAddressMode });
  };

  /** Change location fields */
  handleChangeLocation = field => e => {
    const location = { ...this.state.office.location, [field]: e.target.value };
    this.handleChangeOffice("location")(location);
  };

  handleSelectLocation = value => {
    const location = { ...this.state.office.location, ...value };
    this.setState({ editAddressMode: false }, () => {
      this.handleChangeOffice("location")(location);
    });
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
    const { error, t } = this.props;
    const { office } = this.state;
    let validation = null;
    try {
      validation = error && error.find(item => item.param === field);
    } catch (e) {
      validation = null;
    }
    switch (tag) {
    case "textfield":
      return (
        <TextField
          variant="outlined"
          value={office[field]}
          onChange={this.handleChangeOfficeByEventValue(field)}
          error={!!validation}
          helperText={validation && validation.msg}
          {...props}
        />
      );
    case "numberfield":
      return (
        <NumberField
          value={office[field]}
          onChange={this.handleChangeOfficeByEventValue(field)}
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
          onChange={this.handleChangeOfficeByEventValue(field)}
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
          onChange={this.handleChangeOfficeByEventValue(field)}
          {...props}
          inputProps={{
            ...props.inputProps,
            error: !!validation,
            helperText: validation && validation.msg
          }}
        />
      );
    default:
      return null;
    }
  };

  componentDidUpdate(prevProps) {
    let state = {};
    if (
      JSON.stringify(prevProps.office) !== JSON.stringify(this.props.office)
    ) {
      state = {
        ...state,
        office: this.props.office || {},
        editAddressMode: !this.props.office?.location?.fullAddress
      };
    }
    if (Object.keys(state).length > 0) {
      this.setState(state);
    }
  }

  handleSave = () => {
    const { onSave } = this.props;
    onSave(this.state.office);
  };

  handleNext = () => {
    const { onNext } = this.props;
    onNext(this.state.office);
  };

  /**
   * Renderer function
   */
  render() {
    const {
      onCancel,
      onSave,
      onNext,
      isLoading,
      classes: s,
      t,
      width
    } = this.props;
    const {
      // importOfficeUrl,
      office,
      editAddressMode
    } = this.state;
    const GridRow = this.renderGridRow;
    const NormalFormField = this.renderFormField;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** import office data from another url */}
        {/**
        <Typography
          fontSizeS
          textMediumGrey
          paddingBottomDouble={isWidthDown('xs', width)}
          paddingBottom
        >
          {t('importOfficeFromUrl')}
        </Typography>
        <GridRow classes={s} title={t('url')}>
          <TextField
            variant="outlined"
            placeholder="http://"
            fullWidth
            value={importOfficeUrl}
            onChange={this.handleChangeByEventValue('importOfficeUrl')}
          />
        </GridRow>
        <Row fullWidth justifyChildrenEnd>
          <Button
            variant="primary"
            className={s.importOfficeButton}
            onClick={this.handleImportOffice}
          >
            <DownloadIcon style={{ width: 13, height: 14 }} />
            <Typography paddingLeft>{t('importOfficeData')}</Typography>
          </Button>
        </Row>

        <Divider />
        <Row paddingTop />
        */}

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
        <GridRow classes={s} title={t("pricePerMonth")} required>
          <NormalFormField
            tag="textfield"
            className={s.textField350}
            type="number"
            inputProps={{ min: 0 }}
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

        <Row paddingTop />
        <Divider />
        <Row paddingTop />

        {/** area */}
        <GridRow classes={s} title={t("area")}>
          <NormalFormField
            tag="textfield"
            type="number"
            inputProps={{ min: 1 }}
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
            inputProps={{ min: 0 }}
            className={s.textField175}
            field="rooms"
          />
        </GridRow>
        {/** number of employees */}
        <GridRow classes={s} title={t("numberOfEmployees")} required>
          <NormalFormField
            tag="numberfield"
            inputProps={{ min: 0 }}
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
                inputProps={{ min: 1, max: 12 }}
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
                inputProps={{ min: 1, max: 12 }}
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
            onChange={this.handleChangeOfficeByEvent("fullTimeAccessibility")(
              !office.fullTimeAccessibility
            )}
          />
        </GridRow>
        {/** lease duration / months */}
        <GridRow classes={s} title={t("leaseDurationPerMonths")}>
          <NormalFormField
            tag="numberfield"
            inputProps={{ min: 0 }}
            className={s.textField175}
            field="leaseDurationPerMonths"
          />
          <Row paddingTopHalf />
          <Checkbox
            variant="outlined"
            label={t("undefineDuration")}
            className={s.textField250Fixed}
            isChecked={office.leaseDurationPerMonths === null}
            onChange={this.handleChangeOfficeByEvent("leaseDurationPerMonths")(
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
                inputProps={{ min: 0 }}
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
                inputProps={{ min: 1 }}
                placeholder={t("floor")}
                className={clsx(editAddressMode ? s.textField350 : s.fullWidth)}
                field="officeFloor"
              />
            </GridRow>
            {editAddressMode ? (
              <React.Fragment>
                {/** location */}
                <GridRow classes={s} title={t("location")} required>
                  <NormalFormField
                    tag="address"
                    field="locationAddress"
                    value={office?.locationAddress}
                    // onChange={this.handleChangeLocation("fullAddress")}
                    onSelect={this.handleSelectLocation}
                    inputProps={{
                      placeholder: t("officeAddress"),
                      required: true,
                      fullWidth: true
                    }}
                  />
                </GridRow>
              </React.Fragment>
            ) : (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </Grid>
          {!editAddressMode && (
            <Grid item md={4} sm={12} xs={12}>
              <Row fullWidth classes={{ box: s.googleMap }}>
                <GoogleMap
                  coordinates={
                    office.location &&
                    office.location.coordinates && [office.location.coordinates]
                  }
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
        <TabWrapper title={t("moreInfo")} open insideOpen>
          {/** type of contract */}
          <GridRow classes={s} title={t("typeOfContract")}>
            <NormalFormField
              tag="select"
              field="typeOfContract"
              className={s.textField350}
              options={contractTypes}
            />
          </GridRow>
          {/** guarantees / security deposit */}
          <GridRow classes={s} title={t("guaranteesAndSecurityDeposit")}>
            <NormalFormField
              tag="select"
              className={s.textField350}
              options={guarantees}
              field="guaranteesAndSecurityDeposit"
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
              onClick={this.handleSave}
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
              onClick={this.handleNext}
              style={{ width: 215 }}
              shadow
            >
              <Typography fontSizeS>{t("nextStep")}</Typography>
            </Button>
          )}
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(GeneralInfoForm))
);
