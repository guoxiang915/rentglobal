import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core';

const styleSheet = (theme) => {
  const padding = theme.spacing(2);
  return {
    /* display mode */
    box: {
      display: 'flex',
    },
    block: {
      display: 'block',
    },
    span: {
      display: 'inline',
    },
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      flexDirection: 'column',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    columnReverse: {
      flexDirection: 'column-reverse',
    },

    /* aligning */
    justifyChildrenStart: {
      justifyContent: 'flex-start',
    },
    justifyChildrenEnd: {
      justifyContent: 'flex-end',
    },
    justifyChildrenCenter: {
      justifyContent: 'center',
    },
    justifyChildrenSpaceBetween: {
      justifyContent: 'space-between',
    },
    justifyChildrenpaceAround: {
      justifyContent: 'space-around',
    },
    justifyChildrenSpaceEvenly: {
      justifyContent: 'space-evenly',
    },
    alignChildrenStart: {
      alignItems: 'flex-start',
    },
    alignChildrenEnd: {
      alignItems: 'flex-end',
    },
    alignChildrenCenter: {
      alignItems: 'center',
    },
    alignChildrenStretch: {
      alignItems: 'stretch',
    },

    stretch: {
      flex: 1,
    },
    noStretch: {
      flex: 0,
    },
    wrap: {
      flexWrap: 'wrap',
    },
    nowrap: {
      flexWrap: 'nowrap',
    },

    /* size */
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    fill: {
      width: '100%',
      height: '100%',
    },

    /* borders */
    border: {
      border: `1px solid ${theme.colors.primary.borderGrey}`,
    },

    shadow: {
      boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
    },

    /* paddings */
    paddingDouble: {
      padding: 2 * padding,
    },
    padding: {
      padding,
    },
    paddingHalf: {
      padding: padding / 2,
    },
    paddingNone: {
      padding: 0,
    },
    paddingTopDouble: {
      paddingTop: 2 * padding,
    },
    paddingTop: {
      paddingTop: padding,
    },
    paddingTopHalf: {
      paddingTop: padding / 2,
    },
    paddingRightQuad: {
      paddingRight: 4 * padding,
    },
    paddingRightDouble: {
      paddingRight: 2 * padding,
    },
    paddingRight: {
      paddingRight: padding,
    },
    paddingRightHalf: {
      paddingRight: padding / 2,
    },
    paddingRightNone: {
      paddingRight: 0,
    },
    paddingBottomDouble: {
      paddingBottom: 2 * padding,
    },
    paddingBottom: {
      paddingBottom: padding,
    },
    paddingBottomHalf: {
      paddingBottom: padding / 2,
    },
    paddingBottomNone: {
      paddingBottom: 0,
    },
    paddingLeftDouble: {
      paddingLeft: 2 * padding,
    },
    paddingLeft: {
      paddingLeft: padding,
    },
    paddingLeftHalf: {
      paddingLeft: padding / 2,
    },
    paddingLeftNone: {
      paddingLeft: 0,
    },

    /* font styles */
    fontSizeXXS: { ...theme.fonts.size.fontSizeXXS },
    fontSizeXS: { ...theme.fonts.size.fontSizeXS },
    fontSizeS: { ...theme.fonts.size.fontSizeS },
    fontSizeM: { ...theme.fonts.size.fontSizeM },
    fontSizeL: { ...theme.fonts.size.fontSizeL },
    fontSizeXL: { ...theme.fonts.size.fontSizeXL },
    fontWeightLight: { ...theme.fonts.weight.fontWeightLight },
    fontWeightMedium: { ...theme.fonts.weight.fontWeightMedium },
    fontWeightBold: { ...theme.fonts.weight.fontWeightBold },
    textBlackGrey: {
      color: theme.colors.primary.blackGrey,
    },
    textDarkGrey: {
      color: theme.colors.primary.darkGrey,
    },
    textMediumGrey: {
      color: theme.colors.primary.grey,
    },
    textLightGrey: {
      color: theme.colors.primary.lightGrey,
    },
    textWhiteGrey: {
      color: theme.colors.primary.whiteGrey,
    },
    textGrey: {
      color: theme.colors.primary.grey,
    },
    textPrimary: {
      color: theme.colors.primary.mainColor,
    },
    textPrimaryDark: {
      color: theme.colors.primary.darkColor,
    },
    textSecondary: {
      color: theme.colors.primary.darkGrey,
    },
    textSecondaryDark: {
      color: theme.colors.primary.blackGrey,
    },
    textWhite: {
      color: theme.colors.primary.white,
    },
    textBlack: {
      color: theme.colors.primary.black,
    },
    textErrorRed: {
      color: theme.colors.primary.errorRed,
    },
    textBorderGrey: {
      color: theme.colors.primary.borderGrey,
    },
    textCenter: {
      textAlign: 'center',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    bold: {
      fontWeight: 'bold',
    },
    italic: {
      fontStyle: 'italic',
    },
    uppercase: {
      textTransform: 'uppercase',
    },

    /* layout styles */
    noOverflow: {
      overflowY: 'hidden',
    },
    inline: {
      display: 'inline-flex',
    },
    absolute: {
      position: 'absolute',
    },
    relative: {
      position: 'relative',
    },
  };
};

export const Box = withStyles(styleSheet, { name: 'Box' })(
  class Box extends PureComponent {
    static propTypes = {
      classes: PropTypes.object.isRequired,
      children: PropTypes.any,
    };

    render() {
      const {
        children, style, classes, onClick, onMouseEnter, onMouseLeave, ...props
      } = this.props;
      const propsClasses = {};
      Object.entries(props).forEach(
        ([key, value]) => (propsClasses[classes[key]] = value),
      );

      return (
        <div
          style={style}
          className={clsx({
            [classes.box]: true,
            [classes.container]: props.row || props.column,
            ...propsClasses,
          })}
          onClick={onClick}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </div>
      );
    }
  },
);

export const Row = (props) => <Box row {...props} />;

export const Column = (props) => <Box column {...props} />;

export const Padding = (props) => <Box padding {...props} />;

export const Stretch = (props) => <Box stretch {...props} />;
