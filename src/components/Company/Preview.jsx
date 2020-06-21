import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import {
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import {
  KeyboardBackspace,
  Person,
} from "@material-ui/icons";
import {
  Column,
  Row,
  Box,
  Stretch,
  Button,
  ImageIcon,
  UserIcon,
  Typography,
} from "../../common/base-components";
import { formatDate } from "../../utils/formatters";

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  fullWidth: {
    width: "100%",
  },

  accountAvatar: {
    width: 139,
    height: 139,
    marginRight: 32,
    borderRadius: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  accountName: {
    minHeight: 75,
  },
});

class PreviewProfile extends PureComponent {
  static propTypes = {
  };

  handleBack = () => {
    this.props.navigate("profile");
  }

  render() {
    const { classes: s, t, width } = this.props;
    const { user, userRole } = this.props.auth;

    console.log(user);

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          <Stretch />
          <Button
            link='secondary'
            background='secondaryLight'
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        {/** show profile */}
        <Box paddingTopDouble />
        <Row classes={{ box: s.profilePanel }} fullWidth wrap>
          {/* user avatar */}
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{
              backgroundImage: user.avatar
                ? `url("${user.avatar.bucketPath}")`
                : "none",
            }}
            border
            classes={{
              box: s.accountAvatar,
            }}
          >
            {!user.avatar &&
              (userRole === "company" ? (
                <ImageIcon className={s.smallIcon} variant='normal' />
              ) : (
                <UserIcon className={s.smallIcon} variant='normal' />
              ))}
          </Box>

          {/* user name */}
          <Column
            classes={{ box: s.accountName }}
            justifyChildrenCenter
            alignChildrenStart
          >
            <Typography fontSizeXL textSecondary>
              {user.generalInfo?.username || "User"}
            </Typography>
            <Box>
              <Typography>${t("startup")} (<Person /> {user.companyProfile?.companySize || 0})</Typography>
              <Typography>{user.generalInfo?.address?.city}, {user.generalInfo?.address?.country}</Typography>
              <Typography>{t("joined")}: {formatDate(user.createdAt)}</Typography>
            </Box>
          </Column>
        </Row>
      </Column>
    )
  }
}

export default withStyles(styleSheet)(
  withTranslation("common")(withWidth()(PreviewProfile))
);
