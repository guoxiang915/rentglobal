import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Box,
  Row,
  Column,
  Typography,
  EyeIcon,
  Button,
  DeleteIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from "../base-components";
import { StatisticBox } from ".";
import { getReviewsByOffice } from "../../api/endpoints";
import SearchbarWithSorter from "./SearchbarWithSorter";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Badge,
  IconButton
} from "@material-ui/core";
import { formatDate1 } from "../../utils/formatters";
import { reviewSortOptions } from "../../utils/constants";
import { Check, MoreHoriz } from "@material-ui/icons";

const styleSheet = theme => ({
  root: {},

  statisticWrapper: {
    width: 192,
    height: 116,
    marginRight: 10
  },

  reviewCard: {
    borderRadius: 27,
    background: theme.colors.primary.white,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    boxShadow: "none"
  },

  reviewHeader: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 18
  },

  reviewToggler: {
    marginTop: 4,
    marginRight: 4
  },

  reviewAvatar: {
    background: theme.colors.primary.whiteGrey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    width: 32,
    height: 32
  },

  reviewContent: {
    padding: "8px 0px 4px 56px"
  },

  reviewMiniContent: {
    maxHeight: 36,
    overflow: "hidden"
  },

  reviewActions: {
    paddingRight: 18,
    paddingBottom: 18
  },

  badge: {
    borderRadius: "50%",
    width: 24,
    height: 24
  }
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
      onDelete
    }) => {
      return (
        <Card className={s.reviewCard}>
          <CardHeader
            avatar={
              <Badge
                color={review.approved ? "primary" : "error"}
                badgeContent={
                  review.approved ? (
                    <Check fontSize="small" />
                  ) : (
                    <MoreHoriz fontSize="small" />
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
                <Typography fontSizeXS paddingRightDouble alignChildrenCenter>
                  {formatDate1(review.createdAt)}
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
                {review.company?.generalInfo?.username}
              </Typography>
            }
            classes={{ root: s.reviewHeader, action: s.reviewToggler }}
          />
          <CardContent
            className={clsx(s.reviewContent, !expanded && s.reviewMiniContent)}
          >
            <Typography fontSizeM textSecondary fullWidth>
              {review.content}
            </Typography>
          </CardContent>
          <CardActions className={s.reviewActions}>
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
    t: PropTypes.func
  };

  state = {
    reviews: [],
    expanded: 0,
    query: "",
    sorter: reviewSortOptions[0]
  };

  componentDidMount() {
    getReviewsByOffice(this.props.officeId).then(response => {
      if (response.status === 200) {
        this.setState({ reviews: response.data });
      }
    });
  }

  handleExpandReview = expanded => {
    if (this.state.expanded === expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded });
    }
  };

  handleApproveReview = () => {};

  handleDeleteReview = () => {};

  handleFilterChange = filter => {
    this.setState(filter);
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const { reviews, query, sorter, expanded } = this.state;

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
                  value: reviews?.filter(r => !!r.approved)?.length,
                  variant: "primary"
                }
              ]}
            />
          </Box>
          <Box classes={{ box: s.statisticWrapper }}>
            <StatisticBox
              title={t("pendingComments")}
              statistics={[
                {
                  value: reviews?.filter(r => !r.approved)?.length,
                  variant: "error"
                }
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
                  />
                </Row>
              </React.Fragment>
            ))}
          </Column>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(OfficeReviews));
