import React, { PureComponent, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import { Box as MUIBox } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import {
  Row,
  Column,
  Stretch,
  Box,
  Link,
  LinearProgress,
  Typography,
  GoogleMap,
  GoogleMapMarker,
  Button,
  Checkbox,
  BuildingsIcon,
  ArrowRightAltIcon,
  ImageIcon,
  UserIcon,
  FavoriteIcon,
  NoteIcon,
  OptimizationIcon,
  CalendarIcon,
  AdjustIcon,
  CloseIcon,
  IndependentOfficeIcon,
  PrivateOfficeIcon,
  AssignedOfficeIcon,
  UnassignedOfficeIcon,
} from '../../common/base-components';
import { formatDate, getWeekday } from '../../utils/formatters';
import { getProfileStatus } from '../../utils/validators';
import {
  TabWrapper,
  StatisticIconBox,
  OfficeDetailItem,
} from '../../common/base-layouts';
import { withCarousel as CarouselWrapper } from '../../common/base-services';
import { ConditionalWrapper } from '../../utils/helpers';


const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    marginBottom: 120,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 27,
      paddingRight: 27,
      marginBottom: 80,
    },
  },

  fullWidth: {
    width: '100%',
  },

  lightIcon: {
    color: theme.colors.primary.darkGrey,
    opacity: 0.15,
  },

  normalIcon: {
    color: theme.colors.primary.grey,
  },

  darkIcon: {
    color: theme.colors.primary.darkGrey,
  },

  profilePanel: {
    background: theme.colors.primary.white,
    padding: '23px 33px 27px',
    position: 'relative',
  },

  accountAvatar: {
    width: 80,
    height: 80,
    marginRight: 24,
  },

  accountName: {
    minHeight: 75,
  },

  profileCompletenessWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 14,
    paddingLeft: 18,
    width: 228,
    background: theme.colors.primary.whiteGrey,
  },

  profileProgress: {
    marginBottom: 10,
  },

  attentionIcon: {
    marginLeft: 25,
    width: 11,
    height: 8,
  },

  officesMapWrapper: {
    marginTop: 40,
    marginBottom: 40,
    width: '100%',
  },

  tabWrapper: {
    paddingTop: 28,
  },

  officesMap: {
    position: 'relative',
    width: '100%',
    height: 450,
    [theme.breakpoints.down('sm')]: {
      height: 450,
    },
    [theme.breakpoints.down('xs')]: {
      height: 570,
      marginLeft: -27,
      marginRight: -27,
      width: 'calc(100% + 54px)',
    },
  },

  statisticBoxWrapper: {},

  statisticBox: {
    marginBottom: 10,
    padding: 0,
    paddingRight: 8,
    '&:last-of-type': {
      paddingRight: 0,
    },
  },

  currentOfficeWrapper: {
    width: 232,
    height: '100%',
  },

  officeFilterWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 7,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 30,
      paddingLeft: 20,
    },
  },

  officeFilters: {
    paddingLeft: 6,
  },

  officeFilter: {
    background: theme.colors.primary.white,
    width: 162,
  },

  toggleFilterButton: {
    width: 32,
    height: 32,
    marginLeft: 12,
    background: theme.colors.primary.white,
    '&:hover': {
      background: theme.colors.primary.white,
    },
  },

  clearCurrentOfficeButton: {
    width: 32,
    height: 32,
    position: 'absolute',
    top: 'calc(50% - 16px)',
    right: 16,
    background: theme.colors.primary.white,
    '&:hover': {
      background: theme.colors.primary.white,
    },
  },

  officeDetailWrapper: {
    height: '100%',
    background: theme.colors.primary.white,
  },

  officeDetail: {
    width: 235,
    padding: 12,
  },

  officeFullView: {
    padding: 25,
    background: theme.colors.primary.mainColor,
    cursor: 'pointer',
  },

  officeMarkerTooltip: {
    color: theme.colors.primary.mainColor,
    width: 32,
    height: 32,
  },
});

class Dashboard extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    getOffices: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    offices: [],
    showOfficeFilters: true,
    selectedOfficeTypes: [],
    currentOfficeFilter: 'allOffices',
    currentOffice: null,
  };

  markerTooltipIcons = {
    independentOffice: null,
    privateOffice: null,
    assignedWorkstation: null,
    unassignedWorkstation: null,
  };

  officeFilters = {
    allOffices: {
      name: 'allOffices',
    },
    leasedOffices: {
      name: 'leased',
    },
    availableOffices: {
      name: 'available',
    },
  };

  officeTypes = {
    independentOffice: {
      name: 'independent',
      icon: IndependentOfficeIcon,
    },
    privateOffice: {
      name: 'privateOffice',
      icon: PrivateOfficeIcon,
    },
    assignedWorkstation: {
      name: 'assigned',
      icon: AssignedOfficeIcon,
    },
    unassignedWorkstation: {
      name: 'unassigned',
      icon: UnassignedOfficeIcon,
    },
  };

  /** Navigation */
  navigate = (path) => () => {
    this.props.navigate(path);
  };

  /** Get landlord offices */
  componentDidMount() {
    this.props.getOffices().then(
      (response) => {
        this.setState({ offices: response.data });

        this.officeFilters.allOffices.value = response.data;
        this.officeFilters.leasedOffices.value = response.data.filter(
          (o) => !!o.leasedBy,
        );
        this.officeFilters.availableOffices.value = response.data.filter(
          (o) => !o.leasedBy,
        );

        Object.keys(this.officeTypes).forEach(
          (key) => (this.officeTypes[key].value = response.data.filter(
            (o) => o.officeType === key,
          )),
        );
      },
      () => {},
    );
  }

  /** navigate to office detail page */
  handleNavigateOfficeDetail = (office) => () => {
    if (office.published === true) {
      this.props.navigate('offices', office._id);
    } else {
      this.props.navigate('offices', `${office._id}/edit`);
    }
  };

  /** Toggle office filter */
  handleToggleOfficeFilter = () => {
    this.setState({ showOfficeFilters: !this.state.showOfficeFilters });
  };

  /** Set office filter */
  handleSelectOfficeFilter = (filter) => () => {
    this.setState({
      currentOfficeFilter: filter,
      offices: this.officeFilters[filter].value,
    });
  };

  /** Toggle selected office types */
  handleToggleOfficeTypes = (officeType) => () => {
    const selectedOfficeTypes = [...this.state.selectedOfficeTypes];
    if (selectedOfficeTypes.indexOf(officeType) !== -1) {
      selectedOfficeTypes.splice(selectedOfficeTypes.indexOf(officeType), 1);
    } else {
      selectedOfficeTypes.push(officeType);
    }
    this.setState({ selectedOfficeTypes });
  };

  /** Select office from map */
  handleSelectOffice = (office) => () => {
    this.setState({ currentOffice: office || null });
  };

  /** Clear selected office */
  handleClearCurrentOffice = () => {
    this.setState({ currentOffice: null });
  };

  renderDateTime = () => {
    const [time, setTime] = React.useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => setTime(new Date()), 1000 * 60);
      return () => clearInterval(intervalId);
    }, []);

    return (
      <Column alignChildrenEnd>
        <Typography fontSizeXS textMediumGrey>
          {[formatDate(time), getWeekday(time)].join(' ')}
        </Typography>
        <Typography fontSizeS textSecondary paddingTopHalf>
          {time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </Typography>
      </Column>
    );
  };

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const {
      offices,
      currentOffice,
      showOfficeFilters,
      currentOfficeFilter,
      selectedOfficeTypes,
    } = this.state;
    const { user, userRole } = this.props.auth;
    const profileStatus = getProfileStatus(user, userRole);
    const {
      completed: profileCompleted,
      charged: profileCharged,
      completeness: profileCompleteness,
    } = profileStatus;

    const DateTime = this.renderDateTime;

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
            {t('dashboard')}
          </Typography>
          {isWidthDown('xs', width) ? (
            <React.Fragment>
              <Stretch />
              <div style={{ marginTop: 4 }}>
                <DateTime />
              </div>
            </React.Fragment>
          ) : null}
        </Row>

        {/** show sub title and datetime */}
        <Row fullWidth alignChildrenCenter>
          <BuildingsIcon
            style={{ width: 27, height: 22 }}
            className={s.lightIcon}
          />
          <Typography paddingLeft fontSizeS textMediumGrey>
            {t('welcomeToLandlord')}
          </Typography>

          {!isWidthDown('xs', width) ? (
            <React.Fragment>
              <Stretch />
              <DateTime />
            </React.Fragment>
          ) : null}
        </Row>

        {/** show profile */}
        <Box paddingTopDouble />
        <Row classes={{ box: s.profilePanel }} fullWidth wrap>
          {/* user avatar */}
          <Box
            alignChildrenCenter
            justifyChildrenCenter
            style={{
              borderRadius: userRole === 'landlord' ? 8 : '50%',
              backgroundImage: user.avatar
                ? `url("${user.avatar.bucketPath}")`
                : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            border
            classes={{
              box: s.accountAvatar,
            }}
          >
            {!user.avatar
              && (userRole === 'landlord' ? (
                <ImageIcon className={s.smallIcon} variant="normal" />
              ) : (
                <UserIcon className={s.smallIcon} variant="normal" />
              ))}
          </Box>

          {/* user name and last login datetime */}
          <Column
            classes={{ box: s.accountName }}
            justifyChildrenCenter
            alignChildrenStart
          >
            <Typography fontSizeS textSecondary>
              {user.generalInfo?.username || 'Unknown'}
            </Typography>
            <Typography fontSizeXS textMediumGrey paddingTopHalf>
              {t('lastLogin', {
                datetime: [
                  formatDate(user.updatedAt),
                  new Date(user.updatedAt).toLocaleTimeString(),
                ].join(' '),
              })}
            </Typography>
          </Column>

          {/* profile completeness */}
          <Stretch />
          <Column style={{ minHeight: 60, width: 228 }}>
            <Column classes={{ box: s.profileCompletenessWrapper }}>
              <LinearProgress
                value={profileCompleted}
                valueBuffer={profileCharged}
                styles={{
                  root: s.profileProgress,
                }}
              />
              <Link to="#" onClick={this.navigate('profile')}>
                <Box
                  fullWidth
                  textPrimary={profileCompleteness === 'profileCompleted'}
                  textMediumGrey={profileCompleteness === 'profileNotComplete'}
                  textErrorRed={profileCompleteness === 'profileNeedAttention'}
                >
                  <Typography fontSizeXS>{t(profileCompleteness)}</Typography>
                  <Stretch />
                  <Typography fontSizeS alignChildrenCenter>
                    <ArrowRightAltIcon
                      className={s.attentionIcon}
                      variant={profileCompleted < 100 ? 'errorRed' : 'normal'}
                    />
                  </Typography>
                </Box>
              </Link>
            </Column>
          </Column>
        </Row>

        {/** show google map with offices in it */}
        <Row classes={{ box: s.officesMapWrapper }}>
          <ConditionalWrapper
            condition={isWidthDown('sm', width)}
            wrapper={(children) => (
              <TabWrapper
                open
                insideOpen
                title={t('map')}
                bodyClass={s.tabWrapper}
              >
                {children}
              </TabWrapper>
            )}
          >
            <Row classes={{ box: s.officesMap }}>
              <Column stretch fullHeight noOverflow relative>
                <GoogleMap
                  coordinates={offices
                    .filter(
                      (office) => office.location && office.location.coordinates,
                    )
                    .map((office) => office.location.coordinates)}
                  markers={offices
                    .filter(
                      (office) => office.location && office.location.coordinates,
                    )
                    .map((office, index) => (
                      <GoogleMapMarker
                        key={index}
                        size={30}
                        lat={office.location.coordinates.lat}
                        lng={office.location.coordinates.lng}
                        color={
                          currentOffice === office ? 'mainColor' : undefined
                        }
                        badge={
                          office.leasedBy && office.leasedBy.overduePayment
                        }
                        tooltip={
                          (currentOffice === office
                            || selectedOfficeTypes.indexOf(office.officeType)
                              !== -1) && (
                            <MUIBox
                              component={() => {
                                const Icon = this.officeTypes[office.officeType]
                                  .icon;
                                return (
                                  <Icon className={s.officeMarkerTooltip} />
                                );
                              }}
                            />
                          )
                        }
                        onClick={this.handleSelectOffice(office)}
                      />
                    ))}
                />

                {currentOffice && (
                  <Button
                    variant="icon"
                    className={s.clearCurrentOfficeButton}
                    onClick={this.handleClearCurrentOffice}
                  >
                    <CloseIcon
                      style={{ width: 11, height: 11 }}
                      className={s.normalIcon}
                    />
                  </Button>
                )}
              </Column>

              {/* show office filters */}
              {(!isWidthDown('xs', width) || !currentOffice) && (
                <Row
                  classes={{ box: s.officeFilterWrapper }}
                  alignChildrenStart
                >
                  {showOfficeFilters && (
                    <Column classes={{ box: s.officeFilters }}>
                      {Object.entries(this.officeFilters).map(
                        ([key, filter]) => (
                          <React.Fragment key={key}>
                            <Box paddingBottomHalf>
                              <Checkbox
                                variant="outlined"
                                isChecked={key === currentOfficeFilter}
                                label={
                                  `${t(filter.name)
                                  } (${
                                    filter.value ? filter.value.length : 0
                                  })`
                                }
                                onChange={this.handleSelectOfficeFilter(key)}
                                className={s.officeFilter}
                              />
                            </Box>
                          </React.Fragment>
                        ),
                      )}
                      {Object.entries(this.officeTypes).map(([key, type]) => (
                        <React.Fragment key={key}>
                          <Box paddingBottomHalf>
                            <Checkbox
                              variant="outlined"
                              isChecked={
                                selectedOfficeTypes.indexOf(key) !== -1
                              }
                              label={
                                `${t(type.name)
                                } (${
                                  type.value ? type.value.length : 0
                                })`
                              }
                              onChange={this.handleToggleOfficeTypes(key)}
                              className={s.officeFilter}
                            />
                          </Box>
                        </React.Fragment>
                      ))}
                    </Column>
                  )}

                  <Button
                    variant="icon"
                    className={s.toggleFilterButton}
                    onClick={this.handleToggleOfficeFilter}
                  >
                    {showOfficeFilters ? (
                      <ArrowBackIos
                        style={{ width: 18, height: 18, marginLeft: 6 }}
                        className={s.normalIcon}
                      />
                    ) : (
                      <AdjustIcon
                        style={{ width: 19, height: 18 }}
                        className={s.normalIcon}
                      />
                    )}
                  </Button>
                </Row>
              )}

              {/* show office detail info */}
              {currentOffice && (
                <Column classes={{ box: s.officeDetailWrapper }}>
                  <Box classes={{ box: s.officeDetail }}>
                    <OfficeDetailItem office={currentOffice} />
                  </Box>
                  <Stretch />
                  <Box
                    classes={{ box: s.officeFullView }}
                    onClick={this.handleNavigateOfficeDetail(currentOffice)}
                    fullWidth
                    justifyChildrenCenter
                  >
                    <Typography fontSizeXS textWhite>
                      {t('fullView')}
                    </Typography>
                  </Box>
                </Column>
              )}
            </Row>
          </ConditionalWrapper>
        </Row>

        {/** show statistics */}
        <Row classes={{ box: s.statisticBoxWrapper }} wrap fullWidth>
          <ConditionalWrapper
            condition={isWidthDown('sm', width)}
            wrapper={(children) => (
              <TabWrapper
                open
                insideOpen
                title={t('stat')}
                bodyClass={s.tabWrapper}
              >
                <CarouselWrapper itemWidth={200} itemOffset={10}>
                  {children}
                </CarouselWrapper>
              </TabWrapper>
            )}
          >
            <Box classes={{ box: s.statisticBox }}>
              <StatisticIconBox
                icon={(
                  <FavoriteIcon
                    className={s.lightIcon}
                    style={{ width: 14, height: 13 }}
                  />
                )}
                title={t('favoriteOffice')}
                statistics={[{ value: 0, variant: 'primary' }]}
              />
            </Box>
            <Box classes={{ box: s.statisticBox }}>
              <StatisticIconBox
                icon={(
                  <NoteIcon
                    className={s.lightIcon}
                    style={{ width: 14, height: 16 }}
                  />
                )}
                title={t('totalContracts')}
                statistics={[{ value: 2, variant: 'primary' }]}
              />
            </Box>
            <Box classes={{ box: s.statisticBox }}>
              <StatisticIconBox
                icon={(
                  <OptimizationIcon
                    className={s.lightIcon}
                    style={{ width: 17, height: 19 }}
                  />
                )}
                title={t('totalOptimization')}
                statistics={[{ value: 1, variant: 'primary' }]}
              />
            </Box>
            <Box classes={{ box: s.statisticBox }}>
              <StatisticIconBox
                icon={(
                  <CalendarIcon
                    className={s.lightIcon}
                    style={{ width: 16, height: 15 }}
                  />
                )}
                title={t('calendarEvents')}
                statistics={[{ value: 4, variant: 'primary' }]}
              />
            </Box>
          </ConditionalWrapper>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withRouter(withStyles(styleSheet)(withTranslation('common')(Dashboard))),
);
