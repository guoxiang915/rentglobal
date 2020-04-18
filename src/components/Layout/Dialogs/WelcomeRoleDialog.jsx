import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { withTranslation } from 'react-i18next';
import withWidth from '@material-ui/core/withWidth';
import {
  Button,
  Typography,
  Row,
  Stretch,
  Column,
  Checkbox,
  Box,
} from '../../../common/base-components';
import {
  CloseIcon,
  UserIcon,
  OfficeIcon,
  StarOutlineIcon,
  SearchIcon,
  ConsultantIcon,
} from '../../../common/base-components/Icons';
import {
  Step,
  Stepper,
  StepConnector,
  StepLabel,
  Badge,
} from '@material-ui/core';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 570,
    maxHeight: 512,
    padding: 0,
    minWidth: 565,
    minHeight: 395,
    borderRadius: 8,

    [theme.breakpoints.down('sm')]: {
      minWidth: 320,
      minHeight: 'auto',
    },
  },

  header: {
    width: '100%',
    padding: '12px 40px',
    borderBottom: `1px solid ${theme.colors.primary.borderGrey}`,
  },

  content: {
    padding: '24px 42px 45px',
    [theme.breakpoints.down('sm')]: {
      padding: '20px 24px 35px',
    },
  },

  rememberSelection: {
    width: 190,
    color: theme.colors.primary.darkGrey,
  },

  icon: {
    color: theme.colors.primary.borderGrey,
  },

  stepper: {
    background: 'transparent',
    padding: 0,
  },

  stepIcon: {
    width: 45,
    height: 45,
    color: theme.colors.primary.grey,
    background: theme.colors.primary.whiteGrey,
    borderRadius: '50%',
  },

  footer: {
    width: '100%',
    padding: '12px 40px',
    borderTop: `1px solid ${theme.colors.primary.borderGrey}`,
  },
});

/** Stepper connector component */
const StepperConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 22,
    marginLeft: 2,
    marginRight: 2,
  },

  vertical: {
    padding: 0,
    marginLeft: 23,
  },

  line: {
    height: 44,
    borderLeft: `1px solid ${theme.colors.primary.borderGrey}`,
  },
}))(StepConnector);

/** Stepper icon component */
const StepperIcon = ({ classes, stepIcon: StepIcon, index }) => (
  <Box
    classes={{ box: classes.stepIcon }}
    alignChildrenCenter
    justifyChildrenCenter
  >
    <Typography fontSizeM fontWeightBold>
      <Badge color="primary" badgeContent={index}>
        <StepIcon />
      </Badge>
    </Typography>
  </Box>
);

class WelcomeRoleDialog extends PureComponent {
  static propTypes = {
    /** Title of dialog */
    title: PropTypes.string,
    /** Next role */
    role: PropTypes.string,
    /** Style of dialog */
    className: PropTypes.string,
    /** Boolean for dialog is opened/closed */
    open: PropTypes.bool,
    /** Event handler for closing dialog */
    onClose: PropTypes.func,
  };

  steps = {
    landlord: [
      { title: 'profile', label: 'landlordProfileWelcome1', icon: UserIcon },
      { title: 'offices', label: 'landlordProfileWelcome2', icon: OfficeIcon },
      {
        title: 'start',
        label: 'landlordProfileWelcome3',
        icon: StarOutlineIcon,
      },
    ],
    company: [
      { title: 'profile', label: 'companyProfileWelcome1', icon: UserIcon },
      {
        title: 'chatOrSearch',
        label: 'companyProfileWelcome2',
        icon: SearchIcon,
      },
      {
        title: 'start',
        label: 'companyProfileWelcome3',
        icon: StarOutlineIcon,
      },
    ],
    consultant: [
      { title: 'profile', label: 'consultantProfileWelcome1', icon: UserIcon },
      {
        title: 'adviceToLandlordCompany',
        label: 'consultantProfileWelcome2',
        icon: ConsultantIcon,
      },
      {
        title: 'start',
        label: 'consultantProfileWelcome3',
        icon: StarOutlineIcon,
      },
    ],
  };

  /**
   * Event handler for closing dialog
   * @description Call props.onClose() to close dialog
   */
  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  /** Render function */
  render() {
    const { title, className, role, classes: s, t } = this.props;

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        {/** dialog title */}
        <DialogTitle id="help-dialog-title" className={s.header}>
          <Row fullWidth>
            {/** header title */}
            <Typography fontSizeM textSecondary fontWeightBold>
              {title ? title : t('welcome')}
            </Typography>
            <Stretch />
            {/** close button */}
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t('cancel')}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogTitle>

        {/** dialog content */}
        <DialogContent className={s.content}>
          <Column>
            <Typography fontSizeM fontWeightBold textSecondary>
              {t('welcomeRoleTitle')}
            </Typography>
            <Typography fontSizeS textMediumGrey textCenter paddingTop>
              {t('welcomeRoleSubtitle')}
            </Typography>
            <Row style={{ marginTop: 27 }}>
              <Stepper
                // alternativeLabel
                orientation="vertical"
                connector={<StepperConnector />}
                className={s.stepper}
              >
                {this.steps[role].map((step, index) => (
                  <Step key={index}>
                    <StepLabel
                      StepIconComponent={(props) => (
                        <StepperIcon
                          stepIcon={step.icon}
                          index={index + 1}
                          {...props}
                          classes={s}
                        />
                      )}
                    >
                      <Typography fontSizeS textPrimary fontWeightBold>
                        {t(step.title)}
                      </Typography>
                      <Typography
                        fontSizeXS
                        textSecondary
                        style={{ paddingTop: 4 }}
                      >
                        {t(step.label)}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Row>
          </Column>
        </DialogContent>

        {/** dialog footer */}
        <DialogActions className={s.footer}>
          <Row fullWidth>
            <Checkbox
              variant="outlined"
              label={t('dontShowAgain')}
              isChecked={true}
              onChange={() => {}}
              className={s.rememberSelection}
            />
            {/** close button */}
            <Stretch />
            <Button
              link="errorRed"
              background="secondaryLight"
              onClick={this.handleClose}
            >
              <Typography fontSizeS alignChildrenCenter>
                <CloseIcon style={{ width: 10, height: 10 }} />
                <Typography paddingLeft>{t('cancel')}</Typography>
              </Typography>
            </Button>
          </Row>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styleSheet, { name: 'WelcomeRoleDialog' })(
  withTranslation('common')(withWidth()(WelcomeRoleDialog))
);
