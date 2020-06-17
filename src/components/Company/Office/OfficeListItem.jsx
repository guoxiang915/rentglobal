import React from 'react';
import { withStyles } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Carousel from '@brainhubeu/react-carousel';
import {
  Typography,
  Row,
  Column,
  Stretch,
  Box,
  StarIcon,
  Button,
  LinearProgress,
  ShareIcon,
  CloseIcon,
} from '../../../common/base-components';
import { ShareOfficeDialog } from '../../Layout/Dialogs';
import { getOfficeStatus } from '../../../utils/validators';

const styleSheet = (theme) => ({
  officeWrapper: {
    width: '100%',
  },

  officeCarousel: {
    width: 235,
    height: 175,
    borderRadius: 8,
    border: `1px solid ${theme.colors.primary.borderGrey}`,
    position: 'relative',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  officeImage: {
    width: 235,
    height: 175,
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  officeGeneralInfo: {
    paddingLeft: 27,
    paddingTop: 0,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingTop: 16,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },

  officeLeaseInfo: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },

  tipOverWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 44,
    zIndex: 1,
  },

  primaryTipOver: {
    width: 36,
    height: 36,
    color: theme.colors.primary.white,
    background: theme.colors.primary.mainColor,
    marginLeft: 10,
    position: 'relative',
    '&::after': {
      content: "' '",
      position: 'absolute',
      bottom: -8,
      width: '100%',
      borderTop: `8px solid ${theme.colors.primary.mainColor}`,
      borderLeft: '18px solid transparent',
      borderRight: '18px solid transparent',
      borderBottom: 'none',
    },
  },

  errorRedTipOver: {
    width: 36,
    height: 36,
    color: theme.colors.primary.white,
    background: theme.colors.primary.errorRed,
    marginLeft: 6,
    position: 'relative',
    '&::after': {
      content: "' '",
      position: 'absolute',
      bottom: -8,
      width: '100%',
      borderTop: `8px solid ${theme.colors.primary.errorRed}`,
      borderLeft: '18px solid transparent',
      borderRight: '18px solid transparent',
      borderBottom: 'none',
    },
  },

  progressbar: {
    width: 200,
    marginTop: 20,
    marginBottom: 10,
  },
});

/**
 * Function component for uploading document
 * @typeof Props
 * @property  {object} office Office information
 * @property  {number} autoPlay Duration of autoplay for carousel (default: 4000)
 */
const OfficeListItem = ({
  classes: s,
  t,
  autoPlay,
  office,
  noMoreInfo,
  goDetail,
}) => {
  const [dialog, setDialog] = React.useState(null);

  const handleCloseDialog = () => setDialog(null);

  const handleAddToShortList = (e) => {
    e.stopPropagation();
    // setDialog(
    //   <ContactInfoDialog
    //     title={t('contactInfo')}
    //     contact={{
    //       username: 'Name Family',
    //       type: 'Consultant',
    //       phoneNumber: '(123) 123-4567',
    //       email: 'consultantname@domainanme.com',
    //     }}
    //     onClose={handleCloseDialog}
    //   />,
    // );
  };

  /** Share office */
  const handleShare = () => {
    setDialog(
      <ShareOfficeDialog
        office={office}
        onClose={handleCloseDialog}
      />
    );
  };

  const handleRemove = () => {
    // TODO: Handle remove
  };

  const officeStatus = getOfficeStatus(office);
  let status = officeStatus ? officeStatus.status : null;
  status = status === 'rejected'
    ? 'rejectedByConsultant'
    : status === 'pendingForApprove'
      ? 'pendingForApprove'
      : status === 'unpublished'
        ? 'unpublish'
        : status === 'incomplete'
          ? 'mustCompleteData'
          : null;
  const progress = officeStatus && officeStatus.progress < 100 ? officeStatus.progress : null;

  return (
    <Row classes={{ box: s.officeWrapper }} wrap alignChildrenStretch>
      <Box classes={{ box: s.officeCarousel }}>
        {/** office images */}
        <div style={{ width: '100%', height: '100%' }}>
          {office.coverPhotos && (
            <Carousel
              slidesPerPage={1}
              infinite
              autoPlay={autoPlay || 7000}
              stopAutoPlayOnHover
              keepDirectionWhenDragging
            >
              {office.coverPhotos.map((photo, index) => (
                <React.Fragment key={index}>
                  {/* <Box fullWidth> */}
                  <img
                    src={photo.mobile ? photo.mobile.bucketPath : photo.bucketPath}
                    alt=""
                    className={s.officeImage}
                  />
                  {/* </Box> */}
                </React.Fragment>
              ))}
            </Carousel>
          )}
        </div>
      </Box>

      {/** show office general info */}
      <Column classes={{ box: s.officeGeneralInfo }} alignChildrenStart>
        {/** office title */}
        <Box>
          <Typography
            fontSizeM
            textBlackGrey
            fontWeightBold
            onClick={goDetail}
            style={{ cursor: 'pointer' }}
          >
            {office.title}
          </Typography>
        </Box>

        {/** show office property */}
        <Row paddingTopHalf>
          <Typography fontSizeM textSecondary>
            {t(office.officeType)}
          </Typography>
        </Row>

        <Row paddingTopHalf>
          <Typography textPrimary>
            <StarIcon style={{ width: 12, height: 12 }} />
          </Typography>
          <Typography fontSizeS textMediumGrey paddingLeftHalf>
            3.5
            {' '}
            {/* office.rating */}
          </Typography>
        </Row>

        <Stretch />

        {/** show office price */}
        <Row paddingTopHalf>
          <Typography fontSizeS textPrimary>
            {t('dollarPerMonth', { dollar: office.priceMonthly || 0 })}
          </Typography>
        </Row>
      </Column>

      {/** office more information */}
      <Stretch style={{ minWidth: 1 }} />
      {!noMoreInfo && (
        <Column classes={{ box: s.officeLeaseInfo }} alignChildrenEnd>
          {/** leased by */}
          {office.approved ? (
            office.leasedBy ? (
              <Typography
                textPrimary
                fontSizeS
                paddingTopHalf
                style={{ lineHeight: '26px' }}
              >
                {t('availableForLeasing')}
              </Typography>
            ) : (
              <React.Fragment>
                <Row paddingTopHalf style={{ lineHeight: '26px' }}>
                  <Typography textErrorRed fontSizeS fontWeightBold>
                    {t('occupied')}
                  </Typography>
                </Row>
              </React.Fragment>
            )
          ) : (
            <React.Fragment>
              {status && (
                <Typography
                  textErrorRed
                  fontSizeS
                  paddingTopHalf
                  style={{ lineHeight: '26px' }}
                >
                  {t(status)}
                </Typography>
              )}
              {progress && (
                <LinearProgress
                  styles={{ root: s.progressbar }}
                  value={progress}
                />
              )}
            </React.Fragment>
          )}

          {/** action buttons */}
          <Stretch />
          <Row paddingTopHalf>
            <Button link="secondary" background="secondaryLight" onClick={handleShare}>
              <ShareIcon style={{ width: 13, height: 15 }} />
              <Typography paddingLeft fontSizeS fontWeightBold>{t('share')}</Typography>
            </Button>
            <Box paddingLeft>
              <Button link="secondary" background="secondaryLight" onClick={handleRemove}>
                <CloseIcon style={{ width: 13, height: 15 }} />
                <Typography paddingLeft fontSizeS fontWeightBold>{t('remove')}</Typography>
              </Button>
            </Box>
          </Row>

          <Box paddingTopHalf />
          <Button variant="white" background="primary" onClick={handleAddToShortList} shadow>
            <AddIcon />
            <Typography paddingLeft fontSizeS fontWeightBold>{t('addToShortList')}</Typography>
          </Button>
        </Column>
      )}

      {/** show dialog */}
      {dialog}
    </Row>
  );
};

OfficeListItem.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  autoPlay: PropTypes.number,
  office: PropTypes.object.isRequired,
  noActions: PropTypes.bool,
  noMoreInfo: PropTypes.bool,
  goDetail: PropTypes.func,
};

export default withStyles(styleSheet, { name: 'OfficeListItem' })(
  withTranslation('common')(OfficeListItem),
);
