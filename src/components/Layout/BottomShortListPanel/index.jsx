import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Button,
  IconButton,
  Row,
  Column,
  Box,
  Typography,
  CloseIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  StarIcon,
  Stretch,
} from "../../../common/base-components";

import { withLogin } from "../../../common/base-services";

const styleSheet = (theme) => ({
  root: {
    background: theme.colors.primary.lightGrey,
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: 36,
    flexGrow: 1,

    '&.opened': {
      height: 128,
    },

    [theme.breakpoints.down("sm")]: {
      height: 47,

      '&.opened': {
        height: 202,
      },
    },
  },

  contentWrapper: {
    maxWidth: 998,
    marginRight: "auto",
    marginLeft: "auto",
    height: "100%",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "11px 25px 30px",

      '&.opened': {
        padding: 21,
      }
    },
  },

  titleContainer: {
    marginRight: 110,
    
    [theme.breakpoints.down("sm")]: {
      marginRight: 0,
    },
  },

  actionButton: {
    width: 17,
    height: 17,
    padding: 0,
    background: theme.colors.primary.mainColor,
    borderRadius: "50%",
    marginRight: 8,

    '&.grey': {
      background: theme.colors.primary.grey,
    },
  },

  title: {
    fontSize: theme.fonts.size.fontSizeM.fontSize,
    whiteSpace: "nowrap",
  },

  officesWrapper: {
    
    [theme.breakpoints.down("sm")]: {
      marginLeft: 7,
      width: "calc(100% - 7px)",
    },
  },

  office: {
    width: 88,
    position: "relative",
    marginRight: 45,
    
    [theme.breakpoints.down("sm")]: {
      marginTop: 16,
      marginRight: 21,
    },
  },

  deleteIconButton: {
    position: "absolute",
    width: 17,
    height: 17,
    background: theme.colors.primary.errorRed,
    
    [theme.breakpoints.down("sm")]: {
      left: -7,
      top: -8,
      padding: 0,
    },
  },

  officeImage: {
    width: 64,
    height: 48,
    marginLeft: 12,
    
    [theme.breakpoints.down("sm")]: {
      width: 88,
      height: 50,
      marginLeft: 0,
    },
  },

  officeTitle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 3,
    maxWidth: 64,
    marginLeft: 12,
    
    [theme.breakpoints.down("sm")]: {
      maxWidth: 88,
      marginLeft: 0,
    }
  },

  officeRating: {
    marginTop: 3,
    marginLeft: 12,
  },

  officePrice: {
    marginTop: 3,
    maxWidth: 88,
    whiteSpace: "nowrap",
  },

  buttonWrapper: {
    marginLeft: 63,
    
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginTop: 14,
      justifyContent: "center",
    },
  },
});

class BottomShortListPanel extends PureComponent {
  static propTypes = {
    app: PropTypes.object,
    auth: PropTypes.object,

    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    dialog: null,
  };

  handleToggleOpened = () => {
    this.props.onShowBottomShortList();
  };

  handleRemoveFromShortList = (office) => {
    this.props.setOfficeShortList(this.props.shortList.filter(item => item.id !== office.id));
  };

  /** Renderer function */
  render() {
    const {
      width,
      classes: s,
      t,
      showBottomShortList = true,
      shortList = [],
    } = this.props;
    // const { isLoggedIn, user, userRole } = this.props.auth;
    // const { languageEl, accountInfoEl, dialog } = this.state;
    // const role = userRole || user?.role;

    return (
      <div className={clsx(s.root, showBottomShortList && 'opened')}>
        <Box classes={{ box: s.contentWrapper }} row>
          <Row classes={{ box: s.titleContainer }}>
            <IconButton
              classes={{ root: clsx(s.actionButton, showBottomShortList && 'grey') }}
              variant="main"
              onClick={this.handleToggleOpened}
            >
              {!showBottomShortList && <ArrowUpIcon style={{ width: 9, height: 5, color: "white" }} />}
              {showBottomShortList && <ArrowDownIcon style={{ width: 9, height: 5, color: "white" }} />}
            </IconButton>
            <Typography
              fontSizeL={showBottomShortList}
              fontSizeM={!showBottomShortList}
              classes={{ box: clsx(s.title, showBottomShortList && 'opened') }}
            >{t("shortList")}</Typography>
          </Row>
          {showBottomShortList && (
            <>
              <Row fullWidth classes={{ box: s.officesWrapper }}>
                {shortList.map((office, index) => (
                  <Box key={index} classes={{ box: s.office }}>
                    <Button
                      variant="icon"
                      link="secondary"
                      background="errorRed"
                      classes={{ root: s.deleteIconButton }}
                      onClick={() => this.handleRemoveFromShortList(office)}
                    >
                      <CloseIcon style={{ width: 8, height: 8, color: "white" }} />
                    </Button>
                    <Column alignChildrenStart>
                      <Row>
                        <img
                          src={office.coverPhotos[0]?.mobile?.bucketPath}
                          className={s.officeImage}
                        />
                      </Row>
                      <Row fontSizeXXS classes={{ box: s.officeTitle }}>{office.title}</Row>
                      {!isWidthDown("sm", width) && (
                        <>
                          <Row fontSizeXXS classes={{ box: s.officeRating }}>
                            <StarIcon style={{ width: 8, height: 8, color: "#d7df23" }} />
                            3.5 {/** Rating should be calculated later */}
                          </Row>
                          <Row fontSizeXXS classes={{ box: s.officePrice }} textGrey>${office.priceMonthly} CAD/month</Row>
                        </>
                      )}
                    </Column>
                  </Box>
                ))}
                <Stretch />
                {!isWidthDown("sm", width) && <Typography fontSizeXXS textGrey>{t("justOneMoreLeft")}</Typography>}
              </Row>
              <Row classes={{ box: s.buttonWrapper }} fullWidth={isWidthDown("sm", width)}>
                <Button>
                  {t("nextStep")}
                </Button>
              </Row>
            </>
          )}
        </Box>
      </div>
    );
  }
}

export default withLogin(withWidth()(
  withStyles(styleSheet)(withTranslation("common")(BottomShortListPanel))
));
