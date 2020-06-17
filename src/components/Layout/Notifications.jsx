import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import withWidth from "@material-ui/core/withWidth";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import {
  Row,
  Column,
  Box,
  Button,
  Typography,
  Divider,
  CloseIcon,
  CheckIcon,
  HeadsetIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "../../common/base-components";
import { SearchbarWithSorter } from "../../common/base-layouts";
import MiniLogo from "../../assets/mini-logo-gray.svg";
import { formatDate1 } from "../../utils/formatters";
import ReactStars from "react-rating-stars-component";

const NOTIFICATIONS_PER_PAGE = 5;

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: 120,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
      marginBottom: 80,
    },
  },

  container: {
    width: "100%",
    overflowX: "hidden",
    paddingLeft: 32,
    paddingRight: 27,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 17,
      paddingRight: 13,
    },
  },

  statisticWrapper: {
    width: 192,
    height: 116,
    marginRight: 10,
  },

  reviewCard: {
    borderRadius: 27,
    background: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    boxShadow: "none",
  },

  reviewHeader: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 18,
  },

  reviewToggler: {
    marginTop: 4,
    marginRight: 4,
  },

  notificationAvatar: {
    background: theme.colors.primary.whiteGrey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    width: 32,
    height: 32,
  },

  primaryNotificationAvatar: {
    background: theme.colors.primary.mainColor,
  },

  errorNotifcationAvatar: {
    background: theme.colors.primary.errorRed,
  },

  reviewContent: {
    padding: "8px 20px 4px 56px",
  },

  reviewMiniContent: {
    maxHeight: 28,
    overflow: "hidden",
  },

  reviewActionsWrapper: {
    paddingRight: 18,
    paddingBottom: 18,
  },

  reviewActions: {},

  badge: {
    borderRadius: "50%",
    width: 24,
    height: 24,
  },

  rejectedMsg: {
    background: theme.colors.primary.whiteGrey,
    borderRadius: 16,
  },
});

const NotificationItemCard = ({
  avatar,
  title,
  createdAt,
  open,
  content,
  actions,
  classes: s,
  t,
}) => {
  const [expanded, setExpanded] = React.useState(open || false);
  const onToggleExpand = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  return (
    <Card className={s.reviewCard}>
      <CardHeader
        avatar={avatar}
        action={
          <Typography textSecondary alignChildrenCenter>
            <Typography fontSizeXS paddingRightDouble alignChildrenCenter>
              {formatDate1(createdAt)}
            </Typography>
            {
              <IconButton onClick={onToggleExpand}>
                {expanded ? (
                  <ArrowUpIcon style={{ width: 17, height: 7 }} />
                ) : (
                  <ArrowDownIcon style={{ width: 17, height: 7 }} />
                )}
              </IconButton>
            }
          </Typography>
        }
        title={
          <Typography fontSizeM textSecondary>
            {title}
          </Typography>
        }
        classes={{ root: s.reviewHeader, action: s.reviewToggler }}
      />
      <CardContent
        className={clsx(s.reviewContent, !expanded && s.reviewMiniContent)}
      >
        <Column fullWidth alignChildrenStart>
          <Typography fontSizeS textSecondary fullWidth>
            {content}
          </Typography>
        </Column>
      </CardContent>
      {actions?.length ? (
        <CardActions className={s.reviewActionsWrapper}>
          <Row fullWidth justifyChildrenEnd classes={{ box: s.reviewActions }}>
            {actions.map((act, index) => (
              <Box paddingLeft>
                <Button {...act.styles} onClick={act.onClick}>
                  {act.icon && <Box paddingRight>{act.icon}</Box>}
                  {act.title}
                </Button>
              </Box>
            ))}
          </Row>
        </CardActions>
      ) : null}
    </Card>
  );
};

const NotificationItem = ({ notification: item, open, classes: s, t }) => {
  let avatar = null,
    title = "",
    createdAt = item.createdAt,
    content = item.payload?.content,
    actions = [];
  switch (item.type) {
  case "officeReviewed":
    avatar = (
      <Avatar
        className={s.notificationAvatar}
        src={item.payload?.avatar?.bucketPath}
      >
        {item.payload?.generalInfo?.username || ""}
      </Avatar>
    );
    title = (
      <Column alignChildrenStart>
        <Row>
          {t("gotReviewFrom", {
            name: item.payload?.generalInfo?.username || "",
          })}
        </Row>
        <Row>
          <ReactStars count={5} size={16} value={item.payload?.rating} />
        </Row>
      </Column>
    );
    actions = [
      {
        title: t("howDescribe", {
          name: item.payload?.generalInfo?.username,
        }),
        onClick: () => {},
      },
    ];
    break;
  case "newFeature":
    avatar = (
      <Avatar
        className={clsx(s.notificationAvatar, s.primaryNotificationAvatar)}
      >
        <img src={MiniLogo} width={12} />
      </Avatar>
    );
    title = t("newFeature");
    actions = [{ title: t("gotIt"), onClick: () => {} }];
    break;
  case "profileNeedAttention":
    avatar = (
      <Avatar
        className={clsx(s.notificationAvatar, s.errorNotifcationAvatar)}
      >
          !
      </Avatar>
    );
    title = t("profileNeedAttention");
    actions = [
      {
        title: t("editProfile"),
        onClick: () => {},
      },
    ];
    break;
  case "officeReviewRejected":
    avatar = (
      <Avatar
        className={clsx(s.notificationAvatar, s.errorNotifcationAvatar)}
      >
          !
      </Avatar>
    );
    title = t("feedbackRejected");
    actions = [];
    break;
  case "emailVerified":
    avatar = (
      <Avatar
        className={clsx(s.notificationAvatar, s.primaryNotificationAvatar)}
      >
        <CheckIcon style={{ width: 16, height: 16 }} />
      </Avatar>
    );
    title = t("emailVerified");
    actions = [];
    break;
  case "officeAvailable":
    avatar = (
      <Avatar
        className={clsx(s.notificationAvatar)}
        src={item.payload?.avatar?.bucketPath}
      />
    );
    title = (
      <Column alignChildrenStart>
        <Row>
          {t("officeAvailableForLease", {
            name: item.payload?.office?.name,
          })}
        </Row>
        <Row>
          <ReactStars count={5} size={16} value={item.payload?.rating} />
        </Row>
      </Column>
    );
    actions = [
      {
        title: t("removeAlert"),
        styles: {
          link: "errorRedNormal",
          background: "errorRedLight",
          inverse: true,
        },
        onClick: () => {},
      },
      {
        title: t("visitAvailability"),
        onClick: () => {},
      },
    ];
    break;
  case "visitRequestChange":
    avatar = (
      <Avatar
        className={clsx(s.notificationAvatar, s.errorNotifcationAvatar)}
      >
          !
      </Avatar>
    );
    title = t("visitRequestChanges");
    actions = [
      {
        title: t("decline"),
        icon: <CloseIcon style={{ width: 9, height: 9 }} />,
        styles: {
          link: "errorRedNormal",
          background: "errorRedLight",
          inverse: true,
        },
        onClick: () => {},
      },
      {
        title: t("requestForEdit"),
        icon: <HeadsetIcon style={{ width: 16, height: 16 }} />,
        styles: {
          link: "secondary",
          background: "secondaryLight",
        },
        onClick: () => {},
      },
      {
        title: t("accept"),
        icon: <CheckIcon style={{ width: 16, height: 16 }} />,
        onClick: () => {},
      },
    ];
    break;
  default:
    break;
  }

  return (
    <NotificationItemCard
      avatar={avatar}
      title={title}
      createdAt={createdAt}
      open={open}
      content={content}
      actions={actions}
      classes={s}
      t={t}
    />
  );

  // return (
  //   <Card className={s.reviewCard}>
  //     <CardHeader
  //       avatar={
  //         <Avatar
  //           className={s.notificationAvatar}
  //           src={item.payload?.avatar?.bucketPath}
  //         >
  //           {item.payload?.generalInfo?.username || ""}
  //         </Avatar>
  //       }
  //       action={
  //         <Typography textSecondary alignChildrenCenter>
  //           <Typography fontSizeXS paddingRightDouble alignChildrenCenter>
  //             {formatDate1(item.createdAt)}
  //           </Typography>
  //           {
  //             <IconButton onClick={onToggleExpand}>
  //               {expanded ? (
  //                 <ArrowUpIcon style={{ width: 17, height: 7 }} />
  //               ) : (
  //                 <ArrowDownIcon style={{ width: 17, height: 7 }} />
  //               )}
  //             </IconButton>
  //           }
  //         </Typography>
  //       }
  //       title={
  //         <Typography fontSizeM textSecondary>
  //           {item.company?.generalInfo?.username}
  //         </Typography>
  //       }
  //       classes={{ root: s.reviewHeader, action: s.reviewToggler }}
  //     />
  //     <CardContent
  //       className={clsx(s.reviewContent, !expanded && s.reviewMiniContent)}
  //     >
  //       <Column fullWidth alignChildrenStart>
  //         <Row>
  //           <ReactStars count={5} size={16} value={item.company?.rating} />
  //         </Row>
  //         <Typography fontSizeM textSecondary fullWidth paddingTop>
  //           {item.content}
  //         </Typography>
  //         <Row fullWidth paddingTop>
  //           {item.status === "approved" && (
  //             <TabWrapper
  //               title={
  //                 <Typography fontSizeXS>
  //                   <Typography fontSizeXS textPrimary>
  //                     <CheckIcon style={{ width: 16, height: 16 }} />
  //                     <Typography paddingLeftHalf>{t("approved")}</Typography>
  //                   </Typography>
  //                   <Typography fontSizeXS textMediumGrey paddingLeft>
  //                     {item.approved?.consultant}{" "}
  //                     {formatDate1(item.approved?.datetime)}{" "}
  //                     {formatHrMin(item.approved?.datetime)}
  //                   </Typography>
  //                 </Typography>
  //               }
  //               open
  //               insideOpen
  //             >
  //               <Typography fontSizeS textSecondary>
  //                 {t("writeFeedbackForCompany")}
  //               </Typography>
  //               <Row paddingTopHalf />
  //               <TextField
  //                 multiline
  //                 rows={4}
  //                 variant='outlined'
  //                 fullWidth
  //                 value={item.feedback?.msg}
  //                 onChange={(e) =>
  //                   onChangeFeedback(item, "msg")(e.target.value)
  //                 }
  //               />
  //               <Row fullWidth paddingTopDouble alignChildrenCenter>
  //                 <Typography fontSizeS textSecondary paddingRight>
  //                   {t("giveCompanyRate")}
  //                 </Typography>
  //                 <ReactStars
  //                   count={5}
  //                   size={32}
  //                   value={item.feedback?.rating}
  //                   onChange={onChangeFeedback(item, "rating")}
  //                 />
  //                 <Stretch />
  //                 <Button variant='primary'>{t("send")}</Button>
  //               </Row>
  //             </TabWrapper>
  //           )}
  //           {item.status === "rejected" && (
  //             <TabWrapper
  //               title={
  //                 <Typography fontSizeXS textErrorRed>
  //                   <CloseIcon style={{ width: 9, height: 9 }} />
  //                   <Typography paddingLeftHalf>{t("rejected")}</Typography>
  //                 </Typography>
  //               }
  //               open
  //               insideOpen
  //             >
  //               <Column
  //                 fullWidth
  //                 classes={{ box: s.rejectedMsg }}
  //                 padding
  //                 alignChildrenStart
  //               >
  //                 <Typography fontSizeXS textSecondary fullWidth>
  //                   {item.rejected?.msg}
  //                 </Typography>
  //                 <Typography fontSizeXS textMediumGrey paddingTop>
  //                   {item.rejected?.consultant}{" "}
  //                   {formatDate1(item.rejected?.datetime)}{" "}
  //                   {formatHrMin(item.rejected?.datetime)}
  //                 </Typography>
  //               </Column>
  //             </TabWrapper>
  //           )}
  //           {item.status === "underReview" && (
  //             <Typography fontSizeXS textMediumGrey>
  //               <EyeIcon style={{ width: 16, height: 16 }} />
  //               <Typography paddingLeftHalf>{t("underReview")}</Typography>
  //             </Typography>
  //           )}
  //         </Row>
  //       </Column>
  //     </CardContent>
  //     <CardActions className={s.reviewActions}>
  //       <Row fullWidth justifyChildrenEnd>
  //         <Button
  //           link='errorRedNormal'
  //           background='errorRedLight'
  //           inverse
  //           onClick={onDelete}
  //           variant='icon'
  //         >
  //           <DeleteIcon style={{ width: 20, height: 18 }} />
  //         </Button>
  //         {!item.approved && (
  //           <React.Fragment>
  //             <Box paddingLeft />
  //             <Button
  //               variant='primary'
  //               onClick={onApprove}
  //               style={{ width: 150 }}
  //               shadow
  //             >
  //               <EyeIcon style={{ width: 16, height: 16 }} />
  //               <Typography fontSizeS paddingLeft>
  //                 {t("approve")}
  //               </Typography>
  //             </Button>
  //           </React.Fragment>
  //         )}
  //       </Row>
  //     </CardActions>
  //   </Card>
  // );
};

class Notifications extends PureComponent {
  static propTypes = {
    naviate: PropTypes.func,
    getNotifications: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    q: "",
    dialog: null,
    totalLength: 0,
    notifications: [],
    loading: false,
    page: 1,
  };

  /** Get notifications using search query, pagination */
  getNotifications = () => {
    const params = {
      q: this.state.q,
      page: this.state.page,
      limit: NOTIFICATIONS_PER_PAGE,
    };
    if (this.props.getNotifications) {
      this.setState({ loading: true });
      this.props.getNotifications(params).then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              notifications: response.data.docs,
              totalLength: response.data.total,
              loading: false,
            });
          } else if (response.status === 404) {
            this.setState({ notifications: [], loading: false });
          }
        },
        (error) => {
          if (error.response.status === 404) {
            this.setState({
              notifications: [],
              totalLength: 0,
              loading: false,
            });
          }
        }
      );
    }
  };

  componentDidMount() {
    this.getNotifications();
  }

  /** Search offices by text */
  handleChangeQuery = ({ query }) => {
    this.setState({ q: query }, this.getNotifications);
  };

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, this.getNotifications);
  };

  /** Render component */
  render() {
    const { width, classes: s, t } = this.props;
    const { q, notifications, totalLength, page, dialog } = this.state;
    const pageCount = Math.ceil(totalLength / NOTIFICATIONS_PER_PAGE);

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        {/** title */}
        <Row fullWidth style={{ marginBottom: 45 }} alignChildrenStart>
          <Typography fontSizeM textSecondary>
            {t("notifications")}
          </Typography>
        </Row>

        <Row fullWidth style={{ marginBottom: 42 }}>
          <SearchbarWithSorter
            query={q}
            title={t("search")}
            onChange={this.handleChangeQuery}
          />
        </Row>

        {notifications &&
          notifications.map((ntf, index) => (
            <React.Fragment key={index}>
              <Row fullWidth paddingBottom>
                <NotificationItem
                  notification={ntf}
                  open={index === 0}
                  classes={s}
                  t={t}
                  width={width}
                />
              </Row>
            </React.Fragment>
          ))}

        <Divider />
        <Column paddingTop fullWidth textMediumGrey>
          <Pagination
            count={pageCount}
            shape='rounded'
            classes={{ root: s.pagination }}
            onChange={this.handleChangePage}
            page={page}
          />
        </Column>

        {/** show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation(["home", "common"])(Notifications))
);
