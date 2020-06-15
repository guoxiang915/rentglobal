import React, { useState } from 'react';
import { Collapse, withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Typography,
  Button,
  Row,
  Column,
  Box,
  Stretch,

  ArrowUpIcon,
  ArrowDownIcon,
  CloseIcon,
  EditIcon,
} from '../base-components';
import { Launch as LaunchIcon } from "@material-ui/icons";


/**
 * Stylesheet for TabWrapper component
 * @param {Object} theme
 */
const styleSheet = () => ({
  headerClass: {
    minHeight: 34,
  },

  fullWidth: {
    width: '100%',
  },
});

/**
 * Function component for rendering tab wrapper
 * @param {Object} props
 */
const TabWrapper = (props) => {
  const {
    children,
    classes,
    className,
    headerClass,
    bodyClass,
    isEdit,
    isEditable,
    actionButton,
    open,
    onToggleEdit,
    onToggleOpen,
    insideOpen,
    color,
    t,
    title,
    showSaveButton = false,
    showPreviewButton = false,
    onSave,
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
    <Column fullWidth alignChildrenStart classes={{ box: clsx(className) }}>
      <Row fullWidth classes={{ box: clsx(headerClass, classes.headerClass) }}>
        <Box
          onClick={handleToggleOpen}
          alignChildrenCenter
          textMediumGrey={!color}
          style={{ cursor: 'pointer' }}
          {...color}
        >
          <Typography fontSizeS paddingRight>
            {title}
          </Typography>
          {opened ? (
            <ArrowUpIcon style={{ width: 12, height: 7 }} />
          ) : (
            <ArrowDownIcon style={{ width: 12, height: 7 }} />
          )}
        </Box>
        <Stretch />
        {isEdit && !showSaveButton && (
          <Button
            link="errorRed"
            background="errorRedLight"
            inverse
            onClick={onToggleEdit}
          >
            <CloseIcon style={{ width: 9, height: 9 }} />
            <Typography paddingLeft fontSizeS>
              {t('cancel')}
            </Typography>
          </Button>
        )}
        {isEdit && showSaveButton && (
          <>
            {showPreviewButton &&
              <Box>
                <Button
                  link="primary"
                  background="normalLight"
                  inverse
                  onClick={onToggleEdit}
                >
                  <LaunchIcon style={{ width: 16, height: 16 }} />
                  <Typography paddingLeft fontSizeS>
                    {t('preview')}
                  </Typography>
                </Button>
              </Box>
            }
            <Box paddingLeft>
              <Button
                link="white"
                background="primary"
                inverse
                onClick={onSave}
                paddingLeft
              >
                <Typography fontSizeS>
                  {t('save')}
                </Typography>
              </Button>
            </Box>
          </>
        )}
        {!isEdit && isEditable && (
          <Button
            link="primary"
            background="normalLight"
            inverse
            onClick={onToggleEdit}
          >
            <EditIcon style={{ width: 16, height: 16 }} />
            <Typography paddingLeft fontSizeS>
              {t('edit')}
            </Typography>
          </Button>
        )}
        {actionButton}
      </Row>
      <Collapse in={opened} className={classes.fullWidth}>
        <Column
          paddingTopHalf
          alignChildrenStart
          classes={{ box: clsx(bodyClass) }}
        >
          {children}
        </Column>
      </Collapse>
    </Column>
  );
};

export default withStyles(styleSheet, { name: 'TabWrapper' })(
  withTranslation('common')(TabWrapper),
);
