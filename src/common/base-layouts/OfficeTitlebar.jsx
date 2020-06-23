import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Row,
  Column,
  Typography,
  StarIcon,
  Button,
} from "../../common/base-components";
import { numberWithSpaces } from "../../utils/formatters";
import Sticky from "react-sticky";

const styleSheet = (theme) => ({
  favoriteIcon: {
    width: 17,
    height: 16,
  },

  stickyBox: {
    background: theme.colors.primary.mainColor,
    paddingTop: 8,
    paddingBottom: 24,
    zIndex: 3,
  },

  titleBar: {
    position: "relative",
  },

  stickyTitleBar: {
    boxSizing: "content-box",
    marginLeft: -40,
    marginRight: -40,
    paddingLeft: 40,
    paddingRight: 40,
    [theme.breakpoints.down("sm")]: {
      marginLeft: -27,
      marginRight: -27,
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  titleBarHolder: {
    height: 52,
    [theme.breakpoints.down("xs")]: {
      height: 84,
    },
  },

  iconButton: {
    padding: "7px 14px",
  },
});

class OfficeTitlebar extends PureComponent {
  static propTypes = {
    /** office info */
    office: PropTypes.object.isRequired,
    /** office action buttons */
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.any,
        styles: PropTypes.any,
        revertStyles: PropTypes.any,
        onClick: PropTypes.func,
        hideIcon: PropTypes.bool,
      })
    ),
    /** form max-width */
    maxWidth: PropTypes.number,
    /** top offset for sticky */
    topOffset: PropTypes.number,
    /** holder height */
    holderHeight: PropTypes.number,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  render() {
    const {
      classes: s,
      t,
      width,
      office,
      actions,
      maxWidth,
      topOffset,
      holderHeight,
    } = this.props;

    return (
      <Column alignChildrenStart fullWidth relative>
        <Sticky topOffset={topOffset || 20} style={{ width: "100%" }} relative>
          {({ style, isSticky }) => (
            <div style={{ width: "100%" }}>
              <div
                style={{
                  ...style,
                  position: isSticky ? style.position : "absolute",
                  top: isSticky ? 95 : 0,
                  left: 0,
                  width: "100%",
                }}
                className={clsx(isSticky && s.stickyBox)}
              >
                <Row
                  paddingTopHalf
                  // fullWidth
                  wrap
                  alignChildrenCenter
                  style={{
                    left: style.left,
                    maxWidth: maxWidth,
                    flexDirection: isSticky ? "row" : "row-reverse",
                  }}
                  classes={{
                    box: clsx(s.titleBar, isSticky && s.stickyTitleBar),
                  }}
                >
                  {/** Show office title */}
                  {isSticky && (
                    <Column alignChildrenStart stretch>
                      <Row
                        paddingTopHalf
                        fontSizeM
                        textBlackGrey
                        fontWeightBold
                      >
                        {office.title}
                      </Row>
                    </Column>
                  )}

                  {/** Show favorite, share, follow up buttons */}
                  <Column alignChildrenEnd fullWidth={isWidthDown("xs", width)}>
                    {office.published && (
                      <Row style={{ float: "right" }} paddingTopHalf>
                        {actions.map((action, index) => (
                          <React.Fragment key={index}>
                            {index > 0 && <Box paddingRightHalf />}
                            <Button
                              {...action.styles}
                              {...[(isSticky && action.revertStyles) || {}][0]}
                              onClick={(e) => action.onClick?.(e)}
                              className={clsx(
                                isWidthDown("xs", width) && s.iconButton
                              )}
                            >
                              {(!action.hideIcon ||
                                isWidthDown("xs", width)) && <action.icon />}
                              {!isWidthDown("xs", width) ? (
                                <Typography
                                  paddingLeft
                                  fontSizeS
                                  fontWeightBold
                                >
                                  {action.title}
                                </Typography>
                              ) : null}
                            </Button>
                          </React.Fragment>
                        ))}
                      </Row>
                    )}
                  </Column>

                  {/** Show office title */}
                  {!isSticky && (
                    <Column alignChildrenStart stretch>
                      <Row
                        paddingTopHalf
                        fontSizeM
                        textBlackGrey
                        fontWeightBold
                      >
                        {office.title}
                      </Row>
                    </Column>
                  )}
                </Row>
              </div>
            </div>
          )}
        </Sticky>
        <div
          className={s.titleBarHolder}
          style={{ height: holderHeight || undefined }}
        ></div>
        <Row paddingTopHalf fontSizeM textSecondary fontWeightBold>
          {t(office.officeType)}
        </Row>
        <Row paddingTopHalf fontSizeS textPrimary>
          {t("dollarPerMonth", { dollar: office.priceMonthly || 0 })}
        </Row>
        {office.published && (
          // office.rating &&
          <Row paddingTopHalf>
            <Typography textPrimary>
              <StarIcon style={{ width: 12, height: 12 }} />
            </Typography>
            <Typography fontSizeS textSecondary paddingLeftHalf>
              3.5 {/* office.rating */}
            </Typography>
          </Row>
        )}
        {(office.refId ?? false) !== false ? (
          <Row paddingTopHalf>
            <Typography fontSizeS textSecondary>
              {t("refID")}
              :&nbsp;
            </Typography>
            <Typography fontSizeM fontWeightBold textSecondary>
              #{numberWithSpaces(office.refId + 1, 3)}
            </Typography>
          </Row>
        ) : null}
      </Column>
    );
  }
}

export default withTranslation("common")(
  withWidth()(withStyles(styleSheet)(OfficeTitlebar))
);
