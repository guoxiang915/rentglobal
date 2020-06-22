import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Row,
  Column,
  Typography,
  Stretch,
  Divider,
  ArrowUpIcon,
  ArrowDownIcon,
  Rating,
  Select,
} from "../base-components";
import { TabWrapper } from ".";
import { getReviewsByCompany } from "../../api/endpoints";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Grid,
} from "@material-ui/core";
import { formatDate1 } from "../../utils/formatters";
import { reviewSortOptions } from "../../utils/constants";
import { Pagination } from "@material-ui/lab";

const styleSheet = (theme) => ({
  root: {},

  sortWrapper: {
    marginBottom: 20,
  },

  sorterWrapper: {
    height: 47,
  },

  sorter: {
    background: theme.colors.primary.white,
    height: 47,
    width: 140,
    marginLeft: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
      height: 36,
      width: "100%"
    }
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
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 17,
    },
  },

  reviewToggler: {
    marginTop: 4,
    marginRight: 4,
    
  },

  reviewTitle: {
    fontSize: 19,
  },

  toggleButton: {
    width: 20,
    height: 20,
  },

  reviewAvatar: {
    background: theme.colors.primary.whiteGrey,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    width: 32,
    height: 32,
  },

  reviewContent: {
    marginTop: -24,
    padding: "8px 20px 4px 56px",
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 17,
      paddingRight: 17,
    },
  },

  reviewMiniContent: {
    maxHeight: 36,
    overflow: "hidden",
  },

  reviewMessage: {
    background: theme.colors.primary.whiteGrey,
    borderRadius: 15,
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
      isMobile,
    }) => {
      console.log(review);
      return (
        <Card className={s.reviewCard}>
          <CardHeader
            avatar={
              <Avatar
                className={s.reviewAvatar}
                src={review.office?.avatar?.bucketPath}
              >
                {review.office?.title || ""}
              </Avatar>
            }
            title={review.office?.title || ""}
            action={
              <Typography
                textSecondary
                alignChildrenCenter={!isMobile}
                alignChildrenEnd={isMobile}
                columnReverse={isMobile}
                justifyChildrenEnd
              >
                <Typography fontSizeXS paddingRightDouble={!isMobile} alignChildrenCenter>
                  {formatDate1(review.createdAt)}
                </Typography>
                {
                  <IconButton className={s.toggleButton} onClick={onToggleExpand}>
                    {expanded ? (
                      <ArrowUpIcon style={{ width: 17, height: 7 }} />
                    ) : (
                      <ArrowDownIcon style={{ width: 17, height: 7 }} />
                    )}
                  </IconButton>
                }
              </Typography>
            }
            classes={{ root: s.reviewHeader, action: s.reviewToggler, title: s.reviewTitle }}
          />
          <CardContent
            className={clsx(s.reviewContent, !expanded && s.reviewMiniContent)}
          >
            <Column fullWidth alignChildrenStart>
              <Row>
                <Rating
                  rating={review.office?.rating}
                  iconSize={11}
                />
              </Row>
              <Typography fontSizeM={!isMobile} fontSizeS={isMobile} textSecondary fullWidth paddingTop>
                {review.content}
              </Typography>
              <Row fullWidth paddingTop>
                <TabWrapper
                  title={
                    <Typography fontSizeXXS textGrey>
                      {t("see")} {review.company?.generalInfo?.username} {t("review")}
                    </Typography>
                  }
                  open
                  insideOpen
                >
                  <Typography fontSizeXS textSecondary padding classes={{ box: s.reviewMessage }}>
                    {review.review?.msg || ""}
                  </Typography>
                </TabWrapper>
              </Row>
            </Column>
          </CardContent>
        </Card>
      );
    }
  )
);

class CompanyReviews extends PureComponent {
  static propTypes = {
    /** Office info */
    officeId: PropTypes.string.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    reviews: [],
    expanded: [0],
    query: "",
    sorter: reviewSortOptions[0],
  };

  componentDidMount() {
    getReviewsByCompany(this.props.officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ reviews: response.data });
      }
    });
  }

  handleExpandReview = (expanded) => {
    if (this.state.expanded.includes(expanded)) {
      this.setState({ expanded: [...this.state.expanded.filter(e => e !== expanded)] });
    } else {
      this.setState({ expanded: [...this.state.expanded, expanded] });
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

  handleChangeSort = e => {
    console.log('Change sort: ', e.target.value);
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { reviews, sorter, expanded } = this.state;

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        <Row fullWidth classes={{ box: s.sortWrapper }}>
          {!isWidthDown("xs", width) && <Stretch />}
          <Select
            options={reviewSortOptions}
            renderOption={item => (
              <Typography fontSizeS textMediumGrey>
                {t(item.title)}
              </Typography>
            )}
            displayEmpty
            value={sorter}
            onChange={this.handleChangeSort}
            className={s.sorterWrapper}
            classes={{ root: s.sorter }}
            fullWidth={isWidthDown("xs", width)}
          />
        </Row>
        <Row fullWidth paddingBottomDouble>
          <Column alignChildrenStart>
            {reviews?.map((review, index) => (
              <React.Fragment key={index}>
                <Row fullWidth paddingBottom>
                  <ReviewPanel
                    review={review}
                    expanded={expanded.includes(index)}
                    onToggleExpand={() => this.handleExpandReview(index)}
                    onApprove={this.handleApproveReview(index)}
                    onDelete={this.handleDeleteReview(index)}
                    onChangeFeedback={this.handleChangeFeedback}
                    isMobile={isWidthDown("xs", width)}
                  />
                </Row>
              </React.Fragment>
            ))}
          </Column>
        </Row>

        <Divider />
        
        <Grid container>
          <Column paddingTop fullWidth textMediumGrey>
            <Pagination
              count={10}
              shape='rounded'
              classes={{ root: s.pagination }}
              // onChange={this.handleChangePage}
              page={1}
              size={isWidthDown("xs", width) ? "small" : "medium"}
            />
          </Column>
        </Grid>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation("common")(withWidth()(CompanyReviews)));
