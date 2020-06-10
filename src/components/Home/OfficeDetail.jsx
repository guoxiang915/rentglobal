import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withRouter } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { KeyboardBackspace } from "@material-ui/icons";
import Carousel from "@brainhubeu/react-carousel";
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  Link,
  Divider,
  FavoriteIcon,
  FavoriteFilledIcon,
  ShareIcon,
  CallIcon,
  UserIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MessageIcon
} from "../../common/base-components";
import {
  TabWrapper,
  OfficeItem,
  OfficeGallery,
  OfficeTitlebar,
  OfficeGeneralInfo
} from "../../common/base-layouts";
import { formatDate1 } from "../../utils/formatters";
import {
  favoriteOffice,
  getApprovedOfficeByRefId,
  getConsultantByOffice,
  getReviewsByOffice,
  getSimilarOffices
} from "../../api/endpoints";
import {
  ContactInfoDialog,
  ShareOfficeDialog,
  CallConsultantDialog
} from "../Layout/Dialogs";
import { withLogin } from "../../common/base-services";

const styleSheet = theme => ({
  root: {
    width: "100%",
    height: "100%",
    background: theme.colors.primary.white,
    minHeight: "calc(100vh - 245px)"
  },

  fixedWidth: {
    maxWidth: 1024 + 44,
    width: "100%",
    paddingLeft: 22,
    paddingRight: 22,
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 22,
      paddingRight: 22
    }
  },

  fullWidth: {
    width: "100%"
  },

  addOfficeTabWrapper: {
    paddingTop: 20,
    paddingBottom: 106,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 8,
      paddingBottom: 50
    }
  },

  formButtons: {
    paddingTop: 160,
    [theme.breakpoints.down("xs")]: {
      paddingTop: 64
    }
  },

  consultantInfo: {
    paddingTop: 53,
    paddingBottom: 58
  },

  consultantAvatarWrapper: {
    width: 67,
    height: 67,
    borderRadius: "50%",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 26
  },

  consultantAvatar: {
    width: 67,
    height: 67,
    objectFit: "contain"
  },

  consultantMoreInfo: {
    paddingLeft: 93
  },

  reviewsWrapper: {
    paddingTop: 48,
    paddingBottom: 48
  },

  similarOfficesWrapper: {
    paddingTop: 46,
    paddingBottom: 74
  },

  similarOffices: {
    paddingTop: 54,
    overflow: "hidden"
  },

  reviewCompanyInfo: {
    marginRight: 68,
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    }
  },

  reviewAvatarWrapper: {
    width: 39,
    height: 39,
    borderRadius: "50%",
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginRight: 20
  },

  reviewAvatar: {
    width: 39,
    height: 39,
    objectFit: "contain"
  },

  divider: {
    height: 1
  },

  favoriteIcon: {
    width: 17,
    height: 16
  }
});

class OfficeDetail extends PureComponent {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    /** office id to show */
    officeId: PropTypes.string.isRequired,
    /** navigate handler */
    navigate: PropTypes.func.isRequired,
    /** function for getting office from office id */
    // getOfficeById: PropTypes.func.isRequired,
    /** function for getting consultant from office */
    // getConsultantByOffice: PropTypes.func.isRequired,
    /** function for getting reviews from office */
    // getReviewsByOffice: PropTypes.func,
    /** function for getting similar offices */
    // getSimilarOffices: PropTypes.func,

    classes: PropTypes.object,
    t: PropTypes.func
  };

  state = {
    office: {},
    consultant: {},
    reviews: [],
    similarOffices: [],
    dialog: null,
    titlebarActions: []
  };

  componentDidMount() {
    /** Get office from id */
    const { refId } = this.props;
    // this.props.
    getApprovedOfficeByRefId(refId).then(response => {
      if (response.status === 200) {
        const office = response.data;
        this.setState({
          titlebarActions: [
            {
              title: this.props.t("favorite"),
              icon: () =>
                office?.favorite ? (
                  <FavoriteFilledIcon
                    className={this.props.classes.favoriteIcon}
                    style={{ opacity: 1 }}
                  />
                ) : (
                  <FavoriteIcon className={this.props.classes.favoriteIcon} />
                ),
              styles: {
                variant: null,
                link: "secondary",
                background: "secondaryLight"
              },
              revertStyles: {
                variant: "primary",
                link: null,
                background: null
              },
              onClick: this.handleSetFavorite
            },
            {
              title: this.props.t("share"),
              icon: () => <ShareIcon style={{ width: 13, height: 15 }} />,
              styles: {
                variant: null,
                link: "secondary",
                background: "secondaryLight"
              },
              revertStyles: {
                variant: "primary",
                link: null,
                background: null
              },
              onClick: this.handleShare
            },
            {
              title: this.props.t("call"),
              icon: () => <CallIcon style={{ width: 15, height: 17 }} />,
              styles: {
                variant: null,
                link: "secondary",
                background: "secondaryLight"
              },
              revertStyles: {
                variant: "primary",
                link: null,
                background: null
              },
              onClick: this.handleCall
            },
            {
              title: this.props.t("sendMessage"),
              icon: () => <MessageIcon style={{ width: 18, height: 16 }} />,
              styles: isWidthDown("xs", this.props.width)
                ? {
                  variant: null,
                  link: "secondary",
                  background: "secondaryLight"
                }
                : {
                  variant: "secondary",
                  background: null,
                  style: { borderColor: null }
                },
              revertStyles: isWidthDown("xs", this.props.width)
                ? {
                  variant: "primary",
                  link: null,
                  background: null
                }
                : {
                  variant: "primary",
                  link: null,
                  background: "primary",
                  style: { borderColor: "white" }
                },
              onClick: this.handleSendMessage,
              hideIcon: !isWidthDown("xs", this.props.width)
            },
            {
              title: this.props.t("visitAnOffice"),
              // icon: () => <CalendarIcon style={{ width: 13, height: 15 }} />,
              icon: () => (
                <Typography fontSizeS textSecondary>
                  {this.props.t("visit")}
                </Typography>
              ),
              styles: {
                variant: "primary",
                shadow: true
              },
              revertStyles: { variant: "secondary" },
              onClick: this.handleVisitOffice,
              hideIcon: true
            }
          ]
        });
        this.setState({ office }, () => {
          this.getConsultantByOffice(office.id);
          this.getReviewsByOffice(office.id);
          this.getSimilarOffices(office.id);
        });
      }
    });
  }

  getConsultantByOffice = officeId => {
    /** Get consultant info from office */
    // this.props.
    getConsultantByOffice(officeId).then(response => {
      if (response.status === 200) {
        this.setState({ consultant: response.data });
      }
    });
  };

  getReviewsByOffice = officeId => {
    /** Get reviews from office */
    // this.props.
    getReviewsByOffice(officeId).then(response => {
      if (response.status === 200) {
        this.setState({ reviews: response.data });
      }
    });
  };

  getSimilarOffices = officeId => {
    /** Get similar offices */
    // this.props.
    getSimilarOffices(officeId).then(response => {
      if (response.status === 200) {
        this.setState({ similarOffices: response.data });
      }
    });
  };

  componentDidUpdate(prevProps) {
    const { refId } = this.props;
    const { refId: oldRefId } = prevProps;
    if (refId !== oldRefId) {
      getApprovedOfficeByRefId(refId).then(response => {
        if (response.status === 200) {
          const office = response.data;
          this.setState({ office }, () => {
            this.getConsultantByOffice(office.id);
            this.getReviewsByOffice(office.id);
            this.getSimilarOffices(office.id);
          });
        }
      });
    }
  }

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.history.goBack();
  };

  /** Goto office detail of similar offices */
  goDetail = (office, t) => () => {
    this.props.navigate(
      "offices",
      `${office.refId}/${office.location.country}/${t(office.officeType)}/${
        office.numberOfEmployees
      } ${t("employees")}/${office.refId}-${office.title}`.replace(/\s+/g, "-")
    );
  };

  /** Favorite office */
  handleSetFavorite = () => {
    if (this.props.passLoginDialog()) {
      favoriteOffice(this.state.office._id).then(response => {
        if (response.status === 200) {
          const { office, titlebarActions } = this.state;
          this.setState({
            office: {
              ...office,
              favorite: response.data.favorite
            },
            titlebarActions: [
              {
                title: this.props.t("favorite"),
                icon: () =>
                  response.data.favorite ? (
                    <FavoriteFilledIcon
                      className={this.props.classes.favoriteIcon}
                      style={{ opacity: 1 }}
                    />
                  ) : (
                    <FavoriteIcon className={this.props.classes.favoriteIcon} />
                  ),
                styles: {
                  variant: null,
                  link: "secondary",
                  background: "secondaryLight"
                },
                revertStyles: {
                  variant: "primary",
                  link: null,
                  background: null
                },
                onClick: this.handleSetFavorite
              },
              ...titlebarActions.slice(1)
            ]
          });
        }
      });
    }
  };

  /** Share office */
  handleShare = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <ShareOfficeDialog
            office={this.state.office}
            onClose={this.handleCloseDialog}
          />
        )
      });
    }
  };

  /** Call to Consultant */
  handleCall = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <CallConsultantDialog
            office={this.state.office}
            onClose={this.handleCloseDialog}
          />
        )
      });
    }
  };

  /** Send message
   * @ignore
   */
  handleSendMessage = () => {
    if (this.props.passLoginDialog()) {
      if (this.state.office.consultant && this.state.office.consultant.email) {
        const { user } = this.props.auth;
        window.$zoho.salesiq.chat.agent(this.state.office.consultant.email);
        if (user.generalInfo.username) {
          window.$zoho.salesiq.visitor.name(user.generalInfo.username);
        }
        window.$zoho.salesiq.visitor.email(user.email);
        window.$zoho.salesiq.floatwindow.visible("show");
        window.$zoho.salesiq.chatwindow.visible("show");

        window.$zoho.salesiq.visitor.missed((visitid, data) => {});
      } else {
        console.log("no consultant assigned");
      }
    }
  };

  /** Visit office
   * @ignore
   */
  handleVisitOffice = () => {
    // if (this.props.passLoginDialog()) {
    // }
  };

  /** Contact info of consultant */
  handleContactInfo = () => {
    if (this.props.passLoginDialog()) {
      this.setState({
        dialog: (
          <ContactInfoDialog
            title={this.props.t("followUp")}
            contact={{
              username: "Name Family",
              type: "Consultant",
              phoneNumber: "(123) 123-4567",
              email: "consultantname@domainanme.com"
            }}
            onClose={this.closeDialog}
          />
        )
      });
    }
  };

  /** Load more reviews */
  handleMoreReviews = () => {};

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  /** Render related consultant info */
  renderConsultant = ({ classes: s, t, consultant }) => {
    const [showMore, setShowMore] = React.useState(false);
    return (
      <Column classes={{ box: s.consultantInfo }}>
        <Row fullWidth alignChildrenStart>
          {/** Show consultant avatar, name, description */}
          <Box classes={{ box: s.consultantAvatarWrapper }}>
            {consultant.avatar && consultant.avatar.bucketPath ? (
              <img
                src={consultant.avatar.bucketPath}
                alt=""
                className={s.consultantAvatar}
              />
            ) : (
              <UserIcon color="secondary" style={{ width: 27, height: 35 }} />
            )}
          </Box>
          <Column alignChildrenStart stretch>
            <Typography fontSizeM fontWeightBold textSecondary>
              {consultant.generalInfo?.username}
            </Typography>
            <Typography
              fontSizeS
              textSecondary
              paddingTopHalf
              style={{ overflow: "hidden", height: showMore ? "auto" : 32 }}
            >
              {consultant.description}
            </Typography>
          </Column>
        </Row>

        <Row
          fullWidth
          paddingTopDouble
          justifyChildrenSpaceBetween
          classes={{ box: s.consultantMoreInfo }}
          wrap
        >
          <Link
            to="#"
            onClick={() => setShowMore(!showMore)}
            variant="normalLight"
          >
            <Typography alignChildrenCenter>
              <Typography fontSizeS paddingRight>
                {t("loadMore")}
              </Typography>
              {showMore ? (
                <ArrowUpIcon style={{ width: 12, height: 7 }} />
              ) : (
                <ArrowDownIcon style={{ width: 12, height: 7 }} />
              )}
            </Typography>
          </Link>

          <Box>
            {/** Show consultant request buttons */}
            <Box paddingLeftHalf paddingBottomHalf>
              <Button
                variant="secondary"
                onClick={this.handleSendMessage}
                shadow
              >
                {t("sendMessage")}
              </Button>
            </Box>
            <Box paddingLeft paddingBottomHalf>
              <Button variant="primary" onClick={this.handleContactInfo} shadow>
                {t("contactInfo")}
              </Button>
            </Box>
          </Box>
        </Row>
      </Column>
    );
  };

  /** Render review component */
  renderReview = ({ review, classes: s }) => {
    const { company } = review;
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

  /** Render review list */
  renderReviewList = ({ classes: s, t, reviews }) => {
    const Review = this.renderReview;
    return (
      <Row fullWidth classes={{ box: s.reviewsWrapper }}>
        <TabWrapper
          title={`${t("reviews")} (${reviews.length})`}
          open
          insideOpen
        >
          {reviews.map((review, index) => (
            <React.Fragment key={index}>
              <Row fullWidth paddingTopHalf paddingBottom>
                <Review review={review} classes={s} t={t} />
              </Row>
            </React.Fragment>
          ))}
          <Link to="#" onClick={this.handleMoreReviews} variant="normalLight">
            <Typography fontSizeS>{t("loadMore")}</Typography>
          </Link>
        </TabWrapper>
      </Row>
    );
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t } = this.props;
    const {
      office,
      consultant,
      reviews,
      similarOffices,
      dialog,
      titlebarActions
    } = this.state;
    const ConsultantInfo = this.renderConsultant;
    const ReviewList = this.renderReviewList;

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
                {t("back")}
              </Typography>
            </Button>
          </Row>

          {office && (
            <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
              <Column fullWidth alignChildrenStart>
                {/** Show office gallery */}
                <Row fullWidth paddingBottom>
                  <OfficeGallery coverPhotos={office.coverPhotos} />
                </Row>

                {/** Show office title bar */}
                <Row fullWidth paddingBottom>
                  <OfficeTitlebar
                    office={office}
                    actions={titlebarActions}
                    maxWidth={Math.min(1024, window.innerWidth - 44)}
                    topOffset={Math.min(600, window.innerWidth / 2)}
                  />
                </Row>

                {/** Show office general info */}
                <Row fullWidth paddingBottom>
                  <OfficeGeneralInfo office={office} />
                </Row>
              </Column>
            </Row>
          )}

          {/** Show office created consultant info */}
          <Divider className={s.divider} />
          <ConsultantInfo classes={s} t={t} consultant={consultant} />

          {/** Show reviews */}
          <Divider />
          <ReviewList classes={s} t={t} reviews={reviews} />

          {/** Show similar offices */}
          <Divider />
          <Row fullWidth classes={{ box: s.similarOfficesWrapper }}>
            <Column fullWidth alignChildrenStart>
              <Typography fontSizeM textBlackGrey fontWeightBold>
                {t("similarOffice")}
              </Typography>
              <Row fullWidth classes={{ box: s.similarOffices }}>
                <div style={{ width: "100%", height: "100%" }}>
                  <Carousel
                    itemWidth={255}
                    offset={0}
                    keepDirectionWhenDragging
                  >
                    {similarOffices.map((office, index) => (
                      <div
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          height: "100%"
                        }}
                        key={index}
                      >
                        <OfficeItem
                          office={office}
                          setFavorite
                          onClick={this.goDetail(office, t)}
                        />
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
  withWidth()(
    withLogin(withStyles(styleSheet)(withTranslation("common")(OfficeDetail)))
  )
);
