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
    const { classes: s, t, width } = this.props;
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
          <TextField variant="outlined" placeholder="http://" fullWidth />
        </GridRow>
        <Row fullWidth justifyChildrenEnd>
          <Button variant="primary" className={s.importOfficeButton}>
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
          />
        </GridRow>
        {/** type of office */}
        <GridRow classes={s} title={t("typeOfOffice")} required>
          <Select
            className={s.textField350}
            options={["", ...officeTypes]}
            renderOption={item => (!item ? t("selectOne") : t(item))}
            displayEmpty
            value=""
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
          />
        </GridRow>

        <Row paddingTop />
        <Divider />
        <Row paddingTop />

        {/** area */}
        <GridRow classes={s} title={t("area")}>
          <TextField
            placeholder={t("area")}
            className={s.textField350}
            endAdornment={
              <Typography
                fontSizeS
                textMediumGrey
                style={{ whiteSpace: "nowrap" }}
              >
                mxx
              </Typography>
            }
          />
        </GridRow>
        {/** roms */}
        <GridRow classes={s} title={t("rooms")}>
          <NumberField className={s.textField175} />
        </GridRow>
        {/** number of employees */}
        <GridRow classes={s} title={t("numberOfEmployees")} required>
          <NumberField className={s.textField175} />
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
            isChecked={true}
          />
        </GridRow>
        {/** spoken language */}
        <GridRow classes={s} title={t("spokenLanguage")}>
          <TextField
            placeholder={t("enterLanguage")}
            className={s.textField350}
          />
          <Row paddingTopHalf />
          <Chip
            className={s.textField250Fixed}
            label={t("english")}
            onDelete={() => console.log("delete")}
          />
          <Chip
            className={s.textField250Fixed}
            label={t("french")}
            onDelete={() => console.log("delete")}
          />
        </GridRow>
        {/** lease duration / months */}
        <GridRow classes={s} title={t("leaseDurationPerMonths")}>
          <NumberField className={s.textField175} />
          <Row paddingTopHalf />
          <Checkbox
            variant="outlined"
            label={t("undefineDuration")}
            className={s.textField250Fixed}
            isChecked={true}
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
          />
        </GridRow>
        {/** office floor */}
        <GridRow classes={s} title={t("officeFloor")}>
          <TextField
            type="number"
            placeholder={t("floor")}
            className={s.textField350}
          />
        </GridRow>
        {/** location */}
        <GridRow classes={s} title={t("location")} required>
          <TextField
            placeholder={t("officeAddress") + " (" + t("autocomplete") + ")"}
            fullWidth
          />
        </GridRow>
        {/** description */}
        <GridRow classes={s} title={t("description")}>
          <TextField
            placeholder={t("officeBriefDescription")}
            fullWidth
            rows={isWidthDown("xs", width) ? 6 : 16}
            multiline
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
              renderOption={item => (!item ? t("selectOne") : t(item))}
              displayEmpty
              value=""
            />
          </GridRow>
          {/** guarantees / security deposit */}
          <GridRow classes={s} title={t("guaranteesOrSecurityDeposit")}>
            <Select
              className={s.textField350}
              options={["", ...guarantees]}
              renderOption={item => (!item ? t("selectOne") : t(item))}
              displayEmpty
              value=""
            />
          </GridRow>
          {/** check out notice */}
          <GridRow classes={s} title={t("checkOutNotice")}>
            <Select
              className={s.textField350}
              options={["", ...checkOutNotices]}
              renderOption={item => (!item ? t("selectOne") : t(item))}
              displayEmpty
              value=""
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
