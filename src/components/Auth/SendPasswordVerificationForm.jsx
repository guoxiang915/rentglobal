import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Trans, withTranslation } from 'react-i18next';
import { CheckCircleOutline } from '@material-ui/icons';
import {
  Box, Column, Button, Typography,
} from '../../common/base-components';

const styleSheet = (theme) => ({
  formWrapper: {
    width: '100%',
    paddingTop: 45,
    paddingBottom: 75,
  },

  successIcon: {
    fontSize: 40,
  },

  formTitle: {
    color: theme.colors.primary.darkGrey,
    lineHeight: '26px',
    fontSize: '20px',
    marginTop: 8,
    textAlign: 'center',
  },

  formSubtitle: {
    color: theme.colors.primary.grey,
    lineHeight: '20px',
    fontSize: '16px',
    textAlign: 'center',
  },

  fixedWidthButton: {
    width: 220,
  },
});

class SendPasswordVerificationForm extends PureComponent {
  handleLogin = () => {
    this.props.navigate('login');
  };

  render() {
    const { email, classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Column fullWidth>
          <CheckCircleOutline color="primary" className={classes.successIcon} />
          <Box paddingTop>
            <Typography
              fontSizeM
              fontWeightBold
              textSecondary
              fullWidth
              paddingTopHalf
              justifyChildrenCenter
            >
              {t('verificationSent')}
            </Typography>
          </Box>
          <Box paddingTop>
            <Typography fontSizeS textMediumGrey textCenter block>
              <Trans i18nKey="checkEmailForPasswordVerification">
                <Typography textPrimary span>
                  {{ email }}
                </Typography>
              </Trans>
            </Typography>
          </Box>
          <Column paddingTopDouble fullWidth>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              className={classes.fixedWidthButton}
              onClick={this.handleLogin}
            >
              <Typography fontSizeS fontWeightBold>
                {t('login')}
              </Typography>
            </Button>
          </Column>
        </Column>
      </form>
    );
  }
}

SendPasswordVerificationForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func,
};

export default withStyles(styleSheet)(
  withTranslation('common')(SendPasswordVerificationForm),
);
