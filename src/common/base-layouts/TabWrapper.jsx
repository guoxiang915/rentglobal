import React, { useState } from "react";
import { Collapse, withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Button,
  Row,
  Column,
  Box,
  Stretch
} from "../base-components";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CloseIcon,
  EditIcon
} from "../base-components";

/**
 * Stylesheet for TabWrapper component
 * @param {Object} theme
 */
const styleSheet = theme => ({
  fullWidth: {
    width: "100%"
  }
});

/**
 * Function component for rendering tab wrapper
 * @param {Object} props
 */
const TabWrapper = props => {
  const {
    children,
    classes,
    isEdit,
    isEditable,
    actionButton,
    open,
    onToggleEdit,
    onToggleOpen,
    insideOpen,
    t,
    title
  } = props;

  const [openS, setOpenS] = useState(!!open);
  const opened = insideOpen ? openS : open;

  /** Toggle Open Event handler */
  const handleToggleOpen = () => {
    setOpenS(!openS);
    if (onToggleOpen) {
      onToggleOpen();
    }
  };

  /** Renderer */
  return (
    <Column fullWidth alignChildrenStart>
      <Row fullWidth style={{ minHeight: 34 }}>
        <Box onClick={handleToggleOpen} pointer alignChildrenCenter>
          <Typography fontSizeS textMediumGrey paddingRight>
            {title}
          </Typography>
          {opened ? (
            <ArrowUpIcon color="secondary" style={{ width: 12, height: 7 }} />
          ) : (
            <ArrowDownIcon color="secondary" style={{ width: 12, height: 7 }} />
          )}
        </Box>
        <Stretch />
        {isEdit ? (
          <Button
            link="errorRed"
            background="secondaryLight"
            onClick={onToggleEdit}
          >
            <CloseIcon style={{ width: 9, height: 9 }} />
            <Typography paddingLeft fontSizeS>
              {t("cancel")}
            </Typography>
          </Button>
        ) : (
          isEditable && (
            <Button
              link="primary"
              background="normalLight"
              inverse
              onClick={onToggleEdit}
            >
              <EditIcon style={{ width: 16, height: 16 }} />
              <Typography paddingLeft fontSizeS>
                {t("edit")}
              </Typography>
            </Button>
          )
        )}
        {actionButton}
      </Row>
      <Collapse in={opened} className={classes.fullWidth}>
        <Column paddingTopHalf alignChildrenStart>
          {children}
        </Column>
      </Collapse>
    </Column>
  );
};

export default withStyles(styleSheet, { name: "TabWrapper" })(
  withTranslation("common")(TabWrapper)
);