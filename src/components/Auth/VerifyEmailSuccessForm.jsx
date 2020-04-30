import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import { CheckCircleOutline } from '@material-ui/icons';
import {
  Box,
  Column,
  Button,
  Typography,
  Divider,
  Link,
} from '../../common/base-components';

const styleSheet = () => ({
  formWrapper: {
    width: '100%',
  },

  successIcon: {
    marginTop: 45,
    fontSize: 40,
  },

  fixedWidthButton: {
    width: 220,
  },

  dividerPadding: {
    marginTop: 80,
  },
});

class VerifyEmailSuccessForm extends PureComponent {
  handleLogin = () => {
    const { navigate, redirect } = this.props;
    const searchParams = new URLSearchParams(window.location.search);
    const redirectPath = searchParams.get("redirect");
    if (redirect) {
      navigate(`login?redirect=${redirect}`);
    } else if (redirectPath) {
      // in case user refresh the page, we read it from query param
      navigate(`login?redirect=${redirectPath}`);
    } else {
      navigate('login');
    }
  };

  render() {
    const { classes, t } = this.props;

    return (
      <form noValidate autoComplete="off" className={classes.formWrapper}>
        <Column fullWidth>
          <Typography fontSizeM fontWeightBold textSecondary paddingTopHalf>
            {t('thankyou')}
          </Typography>
          <Typography fontSizeS textMediumGrey paddingTop>
            {t('emailVerificationSuccessMsg')}
          </Typography>
          <CheckCircleOutline color="primary" className={classes.successIcon} />
          <Box paddingTopHalf>
            <Typography
              fontSizeM
              fontWeightBold
              textPrimary
              fullWidth
              justifyChildrenCenter
            >
              {t('yourEmailConfirmed')}
            </Typography>
          </Box>
          <Column paddingTopHalf fullWidth>
            <Button
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
          <Divider light styles={classes.dividerPadding} />
          <Box paddingTop paddingBottom>
            <Typography fontSizeS fontWeightBold>
              <Link variant="primary" to="/auth/reset-password">
                {t('forgotPassword')}
              </Link>
            </Typography>
          </Box>
        </Column>
      </form>
    );
  }
}

VerifyEmailSuccessForm.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  navigate: PropTypes.func,
};

export default withStyles(styleSheet)(
  withTranslation('common')(VerifyEmailSuccessForm),
);
