import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import {
  Link,
  Row,
  Column,
  Box,
  Stretch,
  Typography,
  Divider,
  LinearProgress,
  HomeIcon,
  UsersIcon,
  BuildingsIcon,
  PowerIcon,
  ArrowRightAltIcon,
  UserIcon,
  DashboardIcon,
  ImageIcon,
} from '../../../common/base-components';

const styleSheet = (theme) => ({
  accountInfoContent: {
    paddingTop: 30,
  },

  profileCompletenessWrapper: {
    background: theme.colors.primary.whiteGrey,
  },

  accountBlockWrapper: {
    width: '100%',
    padding: 14,
    paddingLeft: 18,
  },

  accountAvatar: {
    width: 80,
    height: 80,
  },

  profileProgress: {
    marginBottom: 10,
  },

  attentionIcon: {
    marginLeft: 25,
    width: 11,
    height: 8,
  },

  accountNavItem: {
    paddingTop: 12,
    paddingBottom: 12,
  },

  smallIcon: {
    width: 16,
    height: 16,
  },

  accountNavIcon: {
    marginRight: 25,
    color: theme.colors.primary.borderGrey,
    opacity: 1,
  },

  errorRedIcon: {
    color: theme.colors.primary.errorRed,
    opacity: 1,
  },

  divider: {
    left: -18,
    right: -14,
    position: 'relative',
    width: 'calc(100% + 32px)',
  },
});

/**
 * Render Account Navigation Item
 * @typedef Props
 * @property  {function}  onClick
 * @property  {component} icon
 * @property  {string}    text
 * @property  {boolean}   errorRed
 * @property  {object}    classes
 */
const NavItem = ({
  onClick,
  icon: NavIcon,
  text,
  errorRed,
  active,
  classes,
}) => (
  <Row classes={{ box: classes.accountNavItem }}>
    <Link to="#" onClick={onClick}>
      <Typography
        fontSizeS
        textErrorRed={errorRed}
        textPrimary={active}
        alignChildrenCenter
      >
        <Box>
          <NavIcon
            className={clsx(
              classes.smallIcon,
              classes.accountNavIcon,
              errorRed && classes.errorRedIcon
            )}
          />
        </Box>
        {text}
      </Typography>
    </Link>
  </Row>
);

/**
 * Render Account Info Form
 * @typedef Props
 * @property  {object}    user
 * @property  {object}    profileProgress
 * @property  {function}  navigate
 * @property  {function}  onToggleRole
 * @property  {object}    classes
 * @property  {function}  t
 */
const AccountInfo = ({
  user,
  role,
  userRole,
  profileProgress,
  navigate,
  onToggleRole,
  location,
  classes: s,
  t,
}) => {
  const {
    profileCompleted,
    profileCharged,
    profileCompleteness,
  } = profileProgress;

  return (
    <Column alignChildrenStart classes={{ box: s.accountInfoContent }}>
      {/* user avatar */}
      <Row justifyChildrenCenter fullWidth>
        <Box
          alignChildrenCenter
          justifyChildrenCenter
          style={{
            borderRadius: role === 'landlord' ? 8 : '50%',
            backgroundImage: user.avatar
              ? `url("${user.avatar.bucketPath}")`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          border
          classes={{
            box: clsx(s.accountAvatar),
          }}
        >
          {!user.avatar &&
            (role === 'landlord' ? (
              <ImageIcon className={s.smallIcon} variant="normal" />
            ) : (
              <UserIcon className={s.smallIcon} variant="normal" />
            ))}
        </Box>
      </Row>

      {/* username */}
      <Row
        paddingTop
        classes={{ box: s.accountBlockWrapper }}
        justifyChildrenCenter
      >
        <Typography fontSizeS textSecondary>
          {user.generalInfo?.username || 'Unknown'}
        </Typography>
      </Row>

      {/* profile completeness */}
      <Row classes={{ box: s.profileCompletenessWrapper }} fullWidth>
        <Column classes={{ box: s.accountBlockWrapper }}>
          <LinearProgress
            value={profileCompleted}
            valueBuffer={profileCharged}
            styles={{
              root: s.profileProgress,
            }}
          />
          <Link to="#" onClick={navigate('profile')}>
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
      </Row>

      {/* links */}
      <Row fullWidth>
        <Column classes={{ box: s.accountBlockWrapper }} alignChildrenStart>
          {location.pathname !== '/' && (
            <NavItem
              onClick={navigate('home')}
              icon={HomeIcon}
              text={t('home')}
              classes={s}
            />
          )}
          {!!userRole && (
            <NavItem
              onClick={navigate('dashboard')}
              icon={DashboardIcon}
              text={t('dashboard')}
              classes={s}
            />
          )}
          <Box padding2 />
          <Divider className={s.divider} />
          {user.roles.map((r, index) => (
            <React.Fragment key={index}>
              <NavItem
                onClick={onToggleRole(r)}
                icon={r === 'company' ? UsersIcon : BuildingsIcon}
                text={r === 'company' ? t('companyPanel') : t('landlordPanel')}
                active={userRole === r}
                classes={s}
              />
            </React.Fragment>
          ))}
          <Divider className={s.divider} />
          <Box padding2 />
          <NavItem
            onClick={navigate('logout')}
            icon={PowerIcon}
            text={t('signOut')}
            classes={s}
            errorRed
          />
        </Column>
      </Row>
    </Column>
  );
};

export default withStyles(styleSheet)(
  withRouter(withTranslation('common')(AccountInfo))
);
