import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";

const styleSheet = theme => {
  let padding = theme.spacing(2);
  return {
    /* display mode */
    box: {
      display: "flex"
    },
    block: {
      display: "block"
    },
    span: {
      display: "inline"
    },
    container: {
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "nowrap"
    },
    row: {
      flexDirection: "row"
    },
    column: {
      flexDirection: "column"
    },

    /* aligning */
    justifyChildrenStart: {
      justifyContent: "flex-start"
    },
    justifyChildrenEnd: {
      justifyContent: "flex-end"
    },
    justifyChildrenCenter: {
      justifyContent: "center"
    },
    justifyChildrenSpaceBetween: {
      justifyContent: "space-between"
    },
    justifyChildrenpaceAround: {
      justifyContent: "space-around"
    },
    justifyChildrenSpaceEvenly: {
      justifyContent: "space-evenly"
    },
    alignChildrenStart: {
      alignItems: "flex-start"
    },
    alignChildrenEnd: {
      alignItems: "flex-end"
    },
    alignChildrenCenter: {
      alignItems: "center"
    },
    alignChildrenStretch: {
      alignItems: "stretch"
    },

    stretch: {
      flex: 1
    },
    noStretch: {
      flex: 0
    },
    wrap: {
      flexWrap: "wrap"
    },
    nowrap: {
      flexWrap: "nowrap"
    },

    alignStart: {
      alignSelf: "flex-start"
    },
    alignEnd: {
      alignSelf: "flex-end"
    },
    alignCenter: {
      alignSelf: "center"
    },
    alignStretch: {
      alignSelf: "stretch"
    },

    /* size */
    fullWidth: {
      width: "100%"
    },
    fullHeight: {
      height: "100%"
    },
    fill: {
      width: "100%",
      height: "100%"
    },

    /* background */
    background: {
      backgroundColor: theme.colors.primary.lightGrey
    },
    backgroundPrimary: {
      backgroundColor: theme.colors.primary.mainColor
    },
    backgroundSecondary: {
      backgroundColor: theme.colors.primary.grey
    },
    backgroundAction: {
      backgroundColor: theme.colors.primary.actionGreen
    },
    backgroundHighlight: {
      backgroundColor: theme.colors.primary.backgroundGrey
    },
    backgroundErrorRed: {
      backgroundColor: theme.colors.primary.errorRed
    },

    /* borders */
    borderHalf: {
      border: `0.5px solid ${theme.colors.primary.borderGrey}`
    },
    borderTopHalf: {
      borderTop: `0.5px solid ${theme.colors.primary.borderGrey}`
    },
    borderRightHalf: {
      borderRight: `0.5px solid ${theme.colors.primary.borderGrey}`
    },
    borderLeftHalf: {
      borderLeft: `0.5px solid ${theme.colors.primary.borderGrey}`
    },
    borderBottomHalf: {
      borderBottom: `0.5px solid ${theme.colors.primary.borderGrey}`
    },
    border: {
      border: `1px solid ${theme.colors.primary.borderGrey}`
    },
    borderTopNone: {
      borderTop: `none`
    },
    borderBottomNone: {
      borderBottom: `none`
    },
    borderTop: {
      borderTop: `1px solid ${theme.colors.primary.borderGrey}`
    },
    borderRight: {
      borderRight: `1px solid ${theme.colors.primary.borderGrey}`
    },
    borderBottom: {
      borderBottom: `1px solid ${theme.colors.primary.borderGrey}`
    },
    borderLeft: {
      borderLeft: `1px solid ${theme.colors.primary.borderGrey}`
    },
    borderDouble: {
      border: `2px solid ${theme.colors.primary.borderGrey}`
    },
    borderDark: {
      borderColor: `${theme.colors.primary.lightGrey}`
    },
    borderColorSecondary: {
      borderColor: theme.colors.primary.secondaryBlue
    },
    borderWhite: {
      borderColor: theme.colors.primary.white
    },
    borderDarkWhite: {
      borderColor: theme.colors.primary.darkWhite
    },

    roundCorners: {
      borderRadius: 3
    },
    round: {
      borderRadius: "50%"
    },
    shadow: {
      boxShadow: "0 1px 4px rgba(0, 0, 0, .6)"
    },

    /* paddings */
    paddingDouble: {
      padding: 2 * padding
    },
    padding: {
      padding: padding
    },
    paddingHalf: {
      padding: padding / 2
    },
    paddingNone: {
      padding: 0
    },
    paddingTopDouble: {
      paddingTop: 2 * padding
    },
    paddingTop: {
      paddingTop: padding
    },
    paddingTopHalf: {
      paddingTop: padding / 2
    },
    paddingRightQuad: {
      paddingRight: 4 * padding
    },
    paddingRightDouble: {
      paddingRight: 2 * padding
    },
    paddingRight: {
      paddingRight: padding
    },
    paddingRightHalf: {
      paddingRight: padding / 2
    },
    paddingRightNone: {
      paddingRight: 0
    },
    paddingBottomDouble: {
      paddingBottom: 2 * padding
    },
    paddingBottom: {
      paddingBottom: padding
    },
    paddingBottomHalf: {
      paddingBottom: padding / 2
    },
    paddingBottomNone: {
      paddingBottom: 0
    },
    paddingLeftDouble: {
      paddingLeft: 2 * padding
    },
    paddingLeft: {
      paddingLeft: padding
    },
    paddingLeftHalf: {
      paddingLeft: padding / 2
    },
    paddingLeftNone: {
      paddingLeft: 0
    },

    /* font styles */
    fontSizeXS: { ...theme.fonts.size.fontSizeXS },
    fontSizeS: { ...theme.fonts.size.fontSizeS },
    fontSizeM: { ...theme.fonts.size.fontSizeM },
    fontSizeL: { ...theme.fonts.size.fontSizeL },
    fontSizeXL: { ...theme.fonts.size.fontSizeXL },
    fontWeightLight: { ...theme.fonts.weight.fontWeightLight },
    fontWeightMedium: { ...theme.fonts.weight.fontWeightMedium },
    fontWeightBold: { ...theme.fonts.weight.fontWeightBold },
    textBlackGrey: {
      color: theme.colors.primary.blackGrey
    },
    textDarkGrey: {
      color: theme.colors.primary.darkGrey
    },
    textMediumGrey: {
      color: theme.colors.primary.grey
    },
    textLightGrey: {
      color: theme.colors.primary.lightGrey
    },
    textWhiteGrey: {
      color: theme.colors.primary.whiteGrey
    },
    textPrimary: {
      color: theme.colors.primary.mainColor
    },
    textPrimaryDark: {
      color: theme.colors.primary.darkColor
    },
    textSecondary: {
      color: theme.colors.primary.darkGrey
    },
    textSecondaryDark: {
      color: theme.colors.primary.blackGrey
    },
    textWhite: {
      color: theme.colors.primary.white
    },
    textBlack: {
      color: theme.colors.primary.black
    },
    textErrorRed: {
      color: theme.colors.primary.errorRed
    },
    textCenter: {
      textAlign: "center"
    },
    textLeft: {
      textAlign: "left"
    },
    textRight: {
      textAlign: "right"
    },
    bold: {
      fontWeight: "bold"
    },
    italic: {
      fontStyle: "italic"
    },
    uppercase: {
      textTransform: "uppercase"
    },

    /* layout styles */
    verticalScroll: {
      overflowY: "auto"
    },
    noOverflow: {
      overflowY: "hidden"
    },
    inline: {
      display: "inline-flex"
    },
    absolute: {
      position: "absolute"
    },
    relative: {
      position: "relative"
    },
    top: {
      top: 0
    },
    right: {
      right: 0
    },
    bottom: {
      bottom: 0
    },
    left: {
      left: 0
    },

    padding1: {
      padding: 2
    },
    padding2: {
      padding: 4
    },
    padding3: {
      padding: 8
    },
    padding4: {
      padding: 16
    },
    padding5: {
      padding: 32
    },

    margin: {
      margin: 2
    },
    margin2: {
      margin: 4
    },
    margin3: {
      margin: 8
    },
    margin4: {
      margin: 16
    },
    margin5: {
      margin: 32
    },

    pointer: {
      cursor: "pointer"
    },
    noRoundCorners: {
      borderRadius: 0
    }
  };
};

export const Box = withStyles(styleSheet, { name: "Box" })(
  class Box extends PureComponent {
    static propTypes = {
      classes: PropTypes.object.isRequired,
      children: PropTypes.any
    };

    render() {
      let { children, style, classes, onClick, ...props } = this.props;
      let propsClasses = {};
      Object.entries(props).forEach(
        ([key, value]) => (propsClasses[classes[key]] = value)
      );

      return (
        <div
          style={style}
          className={clsx({
            [classes.box]: true,
            [classes.container]: props.row || props.column,
            ...propsClasses
          })}
          onClick={onClick}
        >
          {children}
        </div>
      );
    }
  }
);

export const Row = props => <Box row {...props} />;

export const Column = props => <Box column {...props} />;

export const Padding = props => <Box padding {...props} />;

export const Stretch = props => <Box stretch {...props} />;

export const Line = props => <Box stretch borderHalf {...props} />;
