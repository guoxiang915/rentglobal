import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Row,
  Column,
  Typography,
  TextField,
  Button,
  Stretch,
  Divider,
  EyeIcon,
  CheckIcon,
  CloseIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "../base-components";
import { TabWrapper } from "../base-layouts";
import { StatisticBox } from ".";
import SearchbarWithSorter from "./SearchbarWithSorter";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Badge,
  IconButton,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { formatDate1, formatHrMin } from "../../utils/formatters";
import { reviewSortOptions } from "../../utils/constants";
import { Check } from "@material-ui/icons";
import ReactStars from "react-rating-stars-component";
import { getReviewsByOffice } from "../../api/endpoints";

const REVIEWS_PER_PAGE = 8;

const styleSheet = (theme) => ({
  root: {},

  statisticWrapper: {
    maxWidth: 192,
    minWidth: 156,
    maxHeight: 116,
    minHeight: 96,
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

  reviewAvatar: {
    background: theme.colors.primary.whiteGrey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    width: 32,
    height: 32,
  },

  reviewContent: {
    padding: "8px 20px 4px 56px",
    [theme.breakpoints.down("xs")]: {
      padding: "4px 10px",
    },
  },

  reviewMiniContent: {
    maxHeight: 36,
    overflow: "hidden",
  },

  reviewActions: {
    paddingRight: 18,
    paddingBottom: 18,
  },

  badge: {
    borderRadius: "50%",
    width: 24,
    height: 24,
  },

  rejectedMsg: {
    background: theme.colors.primary.whiteGrey,
    borderRadius: 16,
  },

  pagination: {
    marginTop: 20,
    marginBottom: 60,
    color: theme.colors.primary.grey,
  },
});

const ReviewPanel = withStyles(styleSheet)(
  withTranslation("common")(
    ({
      classes: s,
      t,
      review,
      expanded,
      onToggleExpand,
      onApprove,
      onDelete,
      onChangeFeedback,
      width,
    }) => {
      return (
        <Card className={s.reviewCard}>
          <CardHeader
            avatar={
              <Badge
                color={
                  review.status === "approved"
                    ? "primary"
                    : review.status === "rejected"
                      ? "error"
                      : "secondary"
                }
                badgeContent={
                  review.status === "approved" ? (
                    <Check fontSize='small' />
                  ) : review.status === "rejected" ? (
                    <CloseIcon
                      style={{ width: 9, height: 9, color: "white" }}
                    />
                  ) : (
                    <EyeIcon
                      style={{ width: 16, height: 16, color: "white" }}
                    />
                  )
                }
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                classes={{ badge: s.badge }}
              >
                <Avatar
                  className={s.reviewAvatar}
                  src={review.company?.avatar?.bucketPath}
                >
                  {review.company?.generalInfo?.username || ""}
                </Avatar>
              </Badge>
            }
            action={
              <Typography textSecondary alignChildrenCenter>
                {!isWidthDown("xs", width) && (
                  <Typography fontSizeXS paddingRightDouble alignChildrenCenter>
                    {formatDate1(review.createdAt)}
                  </Typography>
                )}
                <IconButton onClick={onToggleExpand}>
                  {expanded ? (
                    <ArrowUpIcon style={{ width: 17, height: 7 }} />
                  ) : (
                    <ArrowDownIcon style={{ width: 17, height: 7 }} />
                  )}
                </IconButton>
              </Typography>
            }
            title={
              <Column alignChildrenStart>
                <Typography fontSizeM textSecondary>
                  {review.company?.generalInfo?.username}
                </Typography>
                {!isWidthDown("xs", width) && (
                  <ReactStars
                    count={5}
                    size={16}
                    value={review.company?.rating}
                  />
                )}
              </Column>
            }
            classes={{ root: s.reviewHeader, action: s.reviewToggler }}
          />
          <CardContent
            className={clsx(s.reviewContent, !expanded && s.reviewMiniContent)}
          >
            <Column fullWidth alignChildrenStart>
              {isWidthDown("xs", width) && (
                <Row fullWidth paddingBottom>
                  <ReactStars
                    count={5}
                    size={16}
                    value={review.company?.rating}
                  />
                  <Stretch />
                  <Typography fontSizeXS paddingRightDouble alignChildrenCenter>
                    {formatDate1(review.createdAt)}
                  </Typography>
                </Row>
              )}
              <Typography
                fontSizeM={!isWidthDown("xs", width)}
                fontSizeS={isWidthDown("xs", width)}
                textSecondary
                fullWidth
              >
                {review.content}
              </Typography>
              <Row fullWidth paddingTop>
                {review.status === "approved" && (
                  <TabWrapper
                    title={
                      <Typography fontSizeXS>
                        <Typography fontSizeXS textPrimary>
                          <CheckIcon style={{ width: 16, height: 16 }} />
                          <Typography paddingLeftHalf>
                            {t("approved")}
                          </Typography>
                        </Typography>
                        <Typography fontSizeXS textMediumGrey paddingLeft>
                          {review.approved?.consultant}{" "}
                          {formatDate1(review.approved?.datetime)}{" "}
                          {formatHrMin(review.approved?.datetime)}
                        </Typography>
                      </Typography>
                    }
                    open
                    insideOpen
                  >
                    <Typography fontSizeS textSecondary>
                      {t("writeFeedbackForCompany")}
                    </Typography>
                    <Row paddingTopHalf />
                    <TextField
                      multiline
                      rows={4}
                      variant='outlined'
                      fullWidth
                      value={review.feedback?.msg}
                      onChange={(e) =>
                        onChangeFeedback(review, "msg")(e.target.value)
                      }
                    />
                    <Row fullWidth paddingTopDouble alignChildrenCenter>
                      <Typography
                        fontSizeS={!isWidthDown("xs", width)}
                        fontSizeXS={isWidthDown("xs", width)}
                        textSecondary
                        paddingRight
                      >
                        {t("giveCompanyRate")}
                      </Typography>
                      {isWidthDown("xs", width) && <Stretch />}
                      <ReactStars
                        count={5}
                        size={isWidthDown("xs", width) ? 28 : 32}
                        value={review.feedback?.rating}
                        onChange={onChangeFeedback(review, "rating")}
                      />
                      {!isWidthDown("xs", width) && (
                        <React.Fragment>
                          <Stretch />
                          <Button variant='primary'>{t("send")}</Button>
                        </React.Fragment>
                      )}
                    </Row>
                    {isWidthDown("xs", width) && (
                      <Row fullWidth justifyChildrenCenter paddingTopDouble>
                        <Button variant='primary'>{t("send")}</Button>
                      </Row>
                    )}
                  </TabWrapper>
                )}
                {review.status === "rejected" && (
                  <TabWrapper
                    title={
                      <Typography fontSizeXS textErrorRed alignChildrenCenter>
                        <CloseIcon style={{ width: 9, height: 9 }} />
                        <Typography paddingLeftHalf>{t("rejected")}</Typography>
                      </Typography>
                    }
                    open
                    insideOpen
                  >
                    <Column
                      fullWidth
                      classes={{ box: s.rejectedMsg }}
                      padding
                      alignChildrenStart
                    >
                      <Typography fontSizeXS textSecondary fullWidth>
                        {review.rejected?.msg}
                      </Typography>
                      <Typography fontSizeXS textMediumGrey paddingTop>
                        {review.rejected?.consultant}{" "}
                        {formatDate1(review.rejected?.datetime)}{" "}
                        {formatHrMin(review.rejected?.datetime)}
                      </Typography>
                    </Column>
                  </TabWrapper>
                )}
                {review.status === "underReview" && (
                  <Typography fontSizeXS textMediumGrey>
                    <EyeIcon style={{ width: 16, height: 16 }} />
                    <Typography paddingLeftHalf>{t("underReview")}</Typography>
                  </Typography>
                )}
              </Row>
            </Column>
          </CardContent>
          {/* <CardActions className={s.reviewActions}>
            <Row fullWidth justifyChildrenEnd>
              <Button
                link="errorRedNormal"
                background="errorRedLight"
                inverse
                onClick={onDelete}
                variant="icon"
              >
                <DeleteIcon style={{ width: 20, height: 18 }} />
              </Button>
              {!review.approved && (
                <React.Fragment>
                  <Box paddingLeft />
                  <Button
                    variant="primary"
                    onClick={onApprove}
                    style={{ width: 150 }}
                    shadow
                  >
                    <EyeIcon style={{ width: 16, height: 16 }} />
                    <Typography fontSizeS paddingLeft>
                      {t("approve")}
                    </Typography>
                  </Button>
                </React.Fragment>
              )}
            </Row>
          </CardActions>
         */}
        </Card>
      );
    }
  )
);

class OfficeReviews extends PureComponent {
  static propTypes = {
    /** Office info */
    officeId: PropTypes.string.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    reviews: [],
    expanded: 0,
    query: "",
    sorter: reviewSortOptions[0],
    page: 1,
    totalLength: 0,
  };

  getReivews = () => {
    const params = {
      // page: this.state.page,
      // limit: REVIEWS_PER_PAGE
    };
    if (getReviewsByOffice) {
      getReviewsByOffice(this.props.officeId, params).then((response) => {
        if (response.status === 200) {
          this.setState({
            reviews: response.data,
            totalLength: response.data.length,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.getReivews();
  }

  handleExpandReview = (expanded) => {
    if (this.state.expanded === expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded });
    }
  };

  handleApproveReview = () => {};

  handleDeleteReview = () => {};

  handleFilterChange = (filter) => {
    this.setState(filter);
  };

  handleChangeFeedback = (review, field) => (value) => {
    this.setState((state) => {
      const { reviews } = state;
      const index = reviews.indexOf(review);
      if (index !== -1) {
        reviews[index].feedback = {
          ...reviews[index].feedback,
          [field]: value,
        };
        return { reviews: [...reviews] };
      }
      return {};
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page }, this.getReivews);
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { reviews, query, sorter, expanded, totalLength, page } = this.state;

    const pageCount = Math.ceil(totalLength / REVIEWS_PER_PAGE);

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Row fullWidth style={{ marginBottom: 42 }}>
          <SearchbarWithSorter
            query={query}
            sorter={sorter}
            sortOptions={reviewSortOptions}
            title={t("searchOnReviews")}
            onChange={this.handleFilterChange}
          />
        </Row>

        <Typography textMediumGrey fontSizeS style={{ marginBottom: 22 }}>
          {t("reviews") + ` (${reviews.length})`}
        </Typography>

        <Row fullWidth style={{ marginBottom: 56 }}>
          <Box classes={{ box: s.statisticWrapper }}>
            <StatisticBox
              title={t("approveComments")}
              statistics={[
                {
                  value: reviews?.filter((r) => !!r.approved)?.length,
                  variant: "primary",
                },
              ]}
            />
          </Box>
          <Box classes={{ box: s.statisticWrapper }}>
            <StatisticBox
              title={t("pendingComments")}
              statistics={[
                {
                  value: reviews?.filter((r) => !r.approved)?.length,
                  variant: "errorRedNormal",
                },
              ]}
            />
          </Box>
        </Row>

        <Row fullWidth paddingBottomDouble>
          <Column alignChildrenStart>
            {reviews?.map((review, index) => (
              <React.Fragment key={index}>
                <Row fullWidth paddingBottom>
                  <ReviewPanel
                    review={review}
                    expanded={expanded === index}
                    onToggleExpand={() => this.handleExpandReview(index)}
                    onApprove={this.handleApproveReview(index)}
                    onDelete={this.handleDeleteReview(index)}
                    onChangeFeedback={this.handleChangeFeedback}
                    width={width}
                  />
                </Row>
              </React.Fragment>
            ))}
          </Column>
        </Row>

        <Divider />
        <Column paddingTop fullWidth textMediumGrey>
          <Pagination
            count={pageCount}
            size={isWidthDown("xs", width) ? "small" : "medium"}
            shape='rounded'
            classes={{ root: s.pagination }}
            onChange={this.handleChangePage}
            page={page}
          />
        </Column>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation("common")(OfficeReviews))
);
