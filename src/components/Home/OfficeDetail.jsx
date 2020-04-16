import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  Link,
  Divider,
  UserIcon,
} from '../../common/base-components';
import { TabWrapper, OfficeItem } from '../../common/base-layouts';
import { KeyboardBackspace } from '@material-ui/icons';
import OfficeDetailForm from '../../containers/Layout/OfficeDetailForm';
import { formatDate1 } from '../../utils/formatters';
import {
  getApprovedOfficeById,
  getLandlordByOffice,
  getReviewsByOffice,
  getSimilarOffices,
} from '../../api/endpoints';
import Carousel from '@brainhubeu/react-carousel';

const styleSheet = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    background: theme.colors.primary.white,
    minHeight: 'calc(100vh - 250px)',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 166px)',
    },
  },

  fixedWidth: {
    maxWidth: 1024 + 44,
    width: '100%',
    paddingLeft: 22,
    paddingRight: 22,
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 22,
      paddingRight: 22,
    },
  },

  fullWidth: {
    width: '100%',
  },

  addOfficeTabWrapper: {
    paddingTop: 20,
    paddingBottom: 106,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 8,
      paddingBottom: 50,
    },
  },

  formButtons: {
    paddingTop: 160,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 64,
    },
  },

  landlordInfo: {
    paddingTop: 53,
    paddingBottom: 58,
  },

  landlordAvatarWrapper: {
    width: 67,
    height: 67,
    borderRadius: '50%',
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 26,
  },

  landlordAvatar: {
    width: 67,
    height: 67,
    objectFit: 'contain',
  },

  landlordMoreInfo: {
    // paddingLeft: 93
  },

  reviewsWrapper: {
    paddingTop: 48,
    paddingBottom: 48,
  },

  similarOfficesWrapper: {
    paddingTop: 46,
    paddingBottom: 74,
  },

  similarOffices: {
    paddingTop: 54,
    overflow: 'hidden',
  },

  reviewCompanyInfo: {
    marginRight: 68,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  reviewAvatarWrapper: {
    width: 39,
    height: 39,
    borderRadius: '50%',
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 20,
  },

  reviewAvatar: {
    width: 39,
    height: 39,
    objectFit: 'contain',
  },

  divider: {
    height: 1,
  },
});

class OfficeDetail extends Component {
  static propTypes = {
    /** office id to show */
    officeId: PropTypes.string.isRequired,
    /** navigate handler */
    navigate: PropTypes.func.isRequired,
    /** function for getting office from office id */
    // getOfficeById: PropTypes.func.isRequired,
    /** function for getting landlord from office */
    // getLandlordByOffice: PropTypes.func.isRequired,
    /** function for getting reviews from office */
    // getReviewsByOffice: PropTypes.func,
    /** function for getting similar offices */
    // getSimilarOffices: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    office: {},
    landlord: {},
    reviews: [],
    similarOffices: [],
    dialog: null,
  };

  componentDidMount() {
    /** Get office from id */
    const { officeId } = this.props;
    // this.props.
    getApprovedOfficeById(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ office: response.data });
      }
    });

    /** Get landlord info from office */
    // this.props.
    getLandlordByOffice(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ landlord: response.data });
      }
    });

    /** Get reviews from office */
    // this.props.
    getReviewsByOffice(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ reviews: response.data });
      }
    });

    /** Get similar offices */
    // this.props.
    getSimilarOffices(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ similarOffices: response.data });
      }
    });
  }

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.history.push('/');
  };

  /** Goto office detail of similar offices */
  goDetail = (officeId) => () => {
    console.log(officeId);
    this.props.navigate('offices', officeId);
  };

  /** Contact req of landlord */
  handleContactReq = () => {};

  /** More info req of landlord */
  handleMoreInfoReq = () => {};

  /** Follow up of landlord */
  handleFollowUp = () => {};

  /** Load more reviews */
  handleMoreReviews = () => {};

  /** Render review component */
  renderReview = ({ review, classes: s }) => {
    const company = review.company;
    const createDate = formatDate1(review.createdAt);

    return (
      <Row fullWidth alignChildrenStart wrap>
        <Column
          classes={{ box: s.reviewCompanyInfo }}
          alignChildrenStart
          paddingBottomHalf
        >
          {/** Show review avatar, name, created date */}
          <Row>
            <Box classes={{ box: s.reviewAvatarWrapper }}>
              {company.avatar && company.avatar.bucketPath ? (
                <img
                  src={company.avatar.bucketPath}
                  alt=""
                  className={s.reviewAvatar}
                />
              ) : (
                <UserIcon color="secondary" style={{ width: 16, height: 21 }} />
              )}
            </Box>
            <Column alignChildrenStart>
              <Typography fontSizeM fontWeightBold textSecondary>
                {company.generalInfo?.username}
              </Typography>
              <Typography fontSizeS textMediumGrey style={{ paddingTop: 4 }}>
                {createDate}
              </Typography>
            </Column>
          </Row>
        </Column>

        <Column stretch>
          {/** Show review content */}
          <Typography fullWidth fontSizeS textSecondary>
            {review.content}
          </Typography>
        </Column>
      </Row>
    );
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const { office, landlord, reviews, similarOffices, dialog } = this.state;
    const Review = this.renderReview;

    return (
      <Row justifyChildrenCenter classes={{ box: s.root }}>
        <Column
          classes={{ box: s.fixedWidth }}
          fullWidth
          alignChildrenStart
          paddingTopDouble
          paddingBottomDouble
        >
          <Row fullWidth paddingBottom>
            <Stretch />
            <Button
              link="secondary"
              background="secondaryLight"
              onClick={this.handleBack}
            >
              <KeyboardBackspace />
              <Typography paddingLeft fontSizeS>
                {t('back')}
              </Typography>
            </Button>
          </Row>

          <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
            {office && <OfficeDetailForm office={office} />}
          </Row>

          {/** Show office created landlord info */}
          <Divider className={s.divider} />

          <Column classes={{ box: s.landlordInfo }}>
            <Row fullWidth alignChildrenStart>
              {/** Show landlord avatar, name, description */}
              <Box classes={{ box: s.landlordAvatarWrapper }}>
                {landlord.avatar && landlord.avatar.bucketPath ? (
                  <img
                    src={landlord.avatar.bucketPath}
                    alt=""
                    className={s.landlordAvatar}
                  />
                ) : (
                  <UserIcon
                    color="secondary"
                    style={{ width: 27, height: 35 }}
                  />
                )}
              </Box>
              <Column
                classes={{ box: s.landlordName }}
                alignChildrenStart
                stretch
              >
                <Typography fontSizeM fontWeightBold textSecondary>
                  {landlord.generalInfo?.username}
                </Typography>
                <Typography fontSizeS textSecondary paddingTopHalf>
                  {landlord.description}
                </Typography>
              </Column>
            </Row>

            <Row
              fullWidth
              paddingTopDouble
              justifyChildrenEnd
              classes={{ box: s.landlordMoreInfo }}
              wrap
            >
              {/** Show landlord request buttons */}
              <Box paddingLeftHalf paddingBottomHalf>
                <Button
                  variant="secondary"
                  onClick={this.handleContactReq}
                  shadow
                >
                  {t('contactReq')}
                </Button>
              </Box>
              <Box paddingLeftHalf paddingBottomHalf>
                <Button
                  variant="secondary"
                  onClick={this.handleMoreInfoReq}
                  shadow
                >
                  {t('moreInfoReq')}
                </Button>
              </Box>
              <Box paddingLeftHalf paddingBottomHalf>
                <Button variant="primary" onClick={this.handleFollowUp} shadow>
                  {t('followUp')}
                </Button>
              </Box>
            </Row>
          </Column>

          {/** Show reviews */}
          <Divider />

          <Row fullWidth classes={{ box: s.reviewsWrapper }}>
            <TabWrapper
              title={t('reviews') + ` (${reviews.length})`}
              open={true}
              insideOpen
            >
              {reviews.map((review, index) => (
                <React.Fragment key={index}>
                  <Row fullWidth paddingTopHalf paddingBottom>
                    <Review review={review} classes={s} t={t} />
                  </Row>
                </React.Fragment>
              ))}
              <Link
                to="#"
                onClick={this.handleMoreReviews}
                variant="normalLight"
              >
                <Typography fontSizeS>{t('loadMore')}</Typography>
              </Link>
            </TabWrapper>
          </Row>

          {/** Show similar offices */}
          <Divider />
          <Row fullWidth classes={{ box: s.similarOfficesWrapper }}>
            <Column fullWidth alignChildrenStart>
              <Typography fontSizeM textBlackGrey fontWeightBold>
                {t('similarOffice')}
              </Typography>
              <Row fullWidth classes={{ box: s.similarOffices }}>
                <div style={{ width: '100%', height: '100%' }}>
                  <Carousel
                    itemWidth={255}
                    offset={20}
                    keepDirectionWhenDragging
                  >
                    {similarOffices.map((office, index) => (
                      <div
                        style={{ position: 'relative', cursor: 'pointer' }}
                        key={index}
                        onClick={this.goDetail(office._id)}
                      >
                        <OfficeItem office={office} setFavorite />
                      </div>
                    ))}
                  </Carousel>
                </div>
              </Row>
            </Column>
          </Row>

          {/** Show dialog */}
          {dialog}
        </Column>
      </Row>
    );
  }
}

export default withRouter(
  withStyles(styleSheet)(withTranslation('common')(OfficeDetail))
);
