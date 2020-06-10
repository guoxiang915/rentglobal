import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Grid, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { withTranslation } from 'react-i18next';
import withWidth from '@material-ui/core/withWidth';
import {
  Button,
  Typography,
  Row,
  Box,
  Stretch,
  Column,
  Link,
  GoogleMap,
} from '../../../common/base-components';
import {
  CloseIcon,
  BankIcon,
  BarIcon,
  BicycleIcon,
  GymIcon,
  ParkingIcon,
  // RestaurantIcon,
  SubwayIcon,
  TaxiIcon,
} from '../../../common/base-components/Icons';
import { geoDistance } from '../../../utils/googlemap';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 768,
    padding: 0,
    width: '80%',
    height: '80%',
    borderRadius: 8,

    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  header: {
    width: '100%',
    padding: '12px 12px 12px 40px',

    [theme.breakpoints.down('xs')]: {
      padding: 12,
    },
  },

  content: {
    height: '100%',
    padding: 0,
  },

  googleMapSide: {
    width: '100%',
    height: '100%',
    minHeight: 150,
    [theme.breakpoints.down('xs')]: {
      height: 250,
    },
  },

  descriptions: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderLeft: `0.5px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      borderUp: `0.5px solid ${theme.colors.primary.borderGrey}`,
    },
  },

  descriptionsWrapper: {
    padding: '30px 30px 30px 40px',
    height: '100%',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
  },

  typeWrapper: {
    padding: '30px 30px 30px 40px',

    [theme.breakpoints.down('xs')]: {
      padding: 12,
      width: '100%',
      overflow: 'hidden',
    },
  },

  type: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    position: 'relative',
    cursor: 'pointer',
  },

  typeIconContainer: {
    minWidth: 34,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#E8E8E8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10,
    padding: 13,
    zIndex: 99,
    cursor: 'pointer',

    '&:hover': {
      transition: '0.3s',
      width: 'unset',
      backgroundColor: `${theme.colors.primary.mainColor}`,
    },

    '&:hover .icon': {
      transition: '0.3s',
      color: 'white',
      fill: 'white',
      marginRight: 8,
    },

    '&:hover .icon .icon-path': {
      fill: 'white',
      stroke: 'white',
    },

    '&:hover .iconName': {
      transition: '0.3s',
      display: 'block',
      color: 'white',
    },
  },

  icon: {
    width: 'unset',
    height: 'unset',
  },

  iconName: {
    display: 'none',
  },

  typeIcon: {
    marginRight: 10,
  },

  iconDescription: {},

  markerIconWrapper: {
    width: 20,
    height: 20,
    marginLeft: -10,
    marginTop: -28.28,
    borderRadius: '10px 10px 10px 0',
    transform: 'rotate(-45deg)',
    backgroundColor: `${theme.colors.primary.errorRed}`,
    overflow: 'hidden',
    zIndex: -1,
  },

  selectedMarkerIconWrapper: {
    backgroundColor: `${theme.colors.primary.mainColor}`,
  },

  markerIcon: {
    padding: 4,
    width: 20,
    height: 20,
    transform: 'rotate(45deg)',
    color: 'white',
  },

  typeDescription: {
    position: 'absolute',
    left: 45,
    whiteSpace: 'nowrap',
  },

  footer: {
    width: '100%',
    padding: '12px 12px 12px 40px',
  },
});

class LocationDialog extends PureComponent {
  static propTypes = {
    location: PropTypes.object,
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  state = {
    selectedNearbyPlace: null,
  };

  /** TODO: show description for this location */
  descriptions = [
    // {
    //   title: 'Verdun,H4G2V9, Québec, Canada',
    //   content:
    //     'If you walk, It is so close to green line metro station -Jolicoeur , just 5-6 minutes walking distance to there . If you drive , it is so close to highway 15 (15-20 minutes to Bridge Champlain to the necessary...',
    // },
    // {
    //   title: 'Getting around',
    //   content:
    //     'You can park your car in the private driveway side of house face to boulevard Champlain , but extra parking fee collected by host in cash. Of course , you also can park your car in the street side front of…',
    // },
  ];

  /** Close dialog */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  handleHoverPlaceChip = (place) => {
    this.setState({ selectedNearbyPlace: place.id });
  };

  handleLeavePlaceChip = () => {
    this.setState({ selectedNearbyPlace: null });
  };

  renderNearbyPlaceChip = (Icon, type, place) => {
    const { classes: s, location } = this.props;

    return (
      <span className={s.type} onMouseOver={() => this.handleHoverPlaceChip(place)} onMouseLeave={this.handleLeavePlaceChip}>
        <span className={s.typeIconContainer}>
          <Icon className={clsx(s.icon, 'icon')} />
          <span className={clsx(s.iconName, 'iconName')}>{type}</span>
        </span>
        <span className={s.typeDescription}>
          {place.name}{' '}
          {Math.floor(
            Math.abs(
              geoDistance(place.geometry?.location, location.coordinates)
            )
          )}
          m
        </span>
      </span>
    );
  };

  renderType = (place) => {
    const { t } = this.props;

    return (
      <React.Fragment key={place.id}>
        {place.types.includes('bar') &&
          this.renderNearbyPlaceChip(BarIcon, t('bar'), place)}
        {place.types.includes('bank') &&
          this.renderNearbyPlaceChip(BankIcon, t('bank'), place)}
        {place.types.includes('bicycle_store') &&
          this.renderNearbyPlaceChip(BicycleIcon, t('bicycle'), place)}
        {place.types.includes('bus_station') &&
          this.renderNearbyPlaceChip(SubwayIcon, t('bus'), place)}
        {place.types.includes('gym') &&
          this.renderNearbyPlaceChip(GymIcon, t('gym'), place)}
        {place.types.includes('train_station') &&
          this.renderNearbyPlaceChip(SubwayIcon, t('train'), place)}
        {place.types.includes('taxi_stand') &&
          this.renderNearbyPlaceChip(TaxiIcon, t('taxi'), place)}
        {place.types.includes('subway_station') &&
          this.renderNearbyPlaceChip(SubwayIcon, t('subwayStation'), place)}
        {place.types.includes('parking') &&
          this.renderNearbyPlaceChip(ParkingIcon, t('parking'), place)}
      </React.Fragment>
    );
  };

  /** Load more descriptions */
  handleMoreDescriptions = () => {};

  /** Render */
  render() {
    const { location, className, classes: s, t } = this.props;
    const { selectedNearbyPlace } = this.state;

    const { fullAddress, placesNearby } = location;

    const coordinates = [];
    if (location && location.coordinates) {
      coordinates.push(location.coordinates);
    }

    for (let place of placesNearby) {
      if (place.geometry && place.geometry.location) {
        coordinates.push({
          ...place.geometry.location,
          iconComponent: place.types.includes('bar') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <BarIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('bank') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <BankIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('bicycle_store') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <BicycleIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('bus_station') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <SubwayIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('gym') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <GymIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('train_station') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <SubwayIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('taxi_stand') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <TaxiIcon className={s.markerIcon} />
            </span>
          ) : place.types.includes('subway_station') ? (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <SubwayIcon className={s.markerIcon} />
            </span>
          ) : (
            <span className={clsx(s.markerIconWrapper, place.id == selectedNearbyPlace && s.selectedMarkerIconWrapper)}>
              <ParkingIcon className={s.markerIcon} />
            </span>
          ),
        });
      }
    }

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        className={s.dialogWrapper}
        classes={{ paper: clsx(s.root, className) }}
      >
        <Grid container className={s.content}>
          <Grid item xs={12} sm={6} className={s.googleMapSide}>
            {/** location panel */}
            <Box fill justifyChildrenCenter alignChildrenCenter>
              <GoogleMap
                coordinates={coordinates}
                shadowWidth={50}
                center={coordinates[0]}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className={s.descriptions}>
            <Column fullHeight>
              {/** header */}
              <Row fullWidth classes={{ box: s.header }}>
                <Typography fontSizeM fontWeightBold textSecondary>
                  {fullAddress}
                </Typography>
                <Stretch />
                <Button
                  link="errorRed"
                  background="secondaryLight"
                  onClick={this.handleClose}
                >
                  <Typography fontSizeS alignChildrenCenter>
                    <CloseIcon style={{ width: 10, height: 10 }} />
                    <Typography paddingLeft>{t('close')}</Typography>
                  </Typography>
                </Button>
              </Row>

              <Row fullWidth wrap>
                <Column classes={{ box: s.typeWrapper }} alignChildrenStart>
                  {placesNearby.map((place) => this.renderType(place))}
                </Column>
              </Row>

              {/** descriptions panel */}
              <Row stretch fullWidth>
                <Column
                  classes={{ box: s.descriptionsWrapper }}
                  alignChildrenStart
                >
                  {this.descriptions.map((item, index) => (
                    <React.Fragment key={index}>
                      <Typography fontWeightBold textSecondary fontSizeM>
                        {item.title}
                      </Typography>
                      <Typography
                        textSecondary
                        fontSizeS
                        paddingTopHalf
                        paddingBottom
                        fullWidth
                      >
                        {item.content}
                      </Typography>
                    </React.Fragment>
                  ))}
                  <Link
                    to="#"
                    onClick={this.handleMoreDescriptions}
                    variant="normalLight"
                  >
                    <Typography fontSizeS>{t('loadMore')}</Typography>
                  </Link>
                </Column>
              </Row>
            </Column>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'LocationDialog' })(
  withTranslation('common')(withWidth()(LocationDialog))
);
