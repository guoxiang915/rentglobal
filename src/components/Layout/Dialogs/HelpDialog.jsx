import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  withStyles,
} from '@material-ui/core';
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
  VideoPlayer,
} from '../../../common/base-components';
import { CloseIcon } from '../../../common/base-components/Icons';

const styleSheet = (theme) => ({
  root: {
    maxWidth: 1056,
    maxHeight: 512,
    padding: 0,
    width: '80%',
    height: '80%',
    borderRadius: 8,
  },

  header: {
    width: '100%',
    padding: '12px 40px',
  },

  content: {
    padding: '3px 17px',
  },

  contentWrapper: {
    height: '100%',
  },

  videoPlayer: {
    width: '100%',
    height: '100%',
    minHeight: 150,
  },

  videoPlayerWrapper: {
    padding: 20,
  },

  userGuides: {
    width: '100%',
    height: '100%',
    border: 'none',
    borderLeft: `0.5px solid ${theme.colors.primary.borderGrey}`,
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      borderUp: `0.5px solid ${theme.colors.primary.borderGrey}`,
    },
  },

  userGuidesWrapper: {
    padding: '35px 16px 35px 38px',
    height: '100%',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
  },

  footer: {
    width: '100%',
    padding: '12px 40px',
  },
});

class HelpDialog extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  userGuides = [
    {
      title: 'Title of ...',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Title of ...',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Title of ...',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Title of ...',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      title: 'Title of ...',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  render() {
    const { className, classes: s, t } = this.props;

    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="help-dialog-title"
        classes={{ paper: clsx(s.root, className) }}
      >
        <DialogTitle id="help-dialog-title" className={s.header}>
          {/** close button */}
          <Row fullWidth>
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
        </DialogTitle>
        <DialogContent className={s.content}>
          <Grid container className={s.contentWrapper}>
            <Grid item xs={12} sm={6} className={s.videoPlayer}>
              {/** video player panel */}
              <Box
                classes={{ box: s.videoPlayerWrapper }}
                fullWidth
                fullHeight
                justifyChildrenCenter
                alignChildrenCenter
              >
                <VideoPlayer.PlayButton
                  isLoading={true}
                  isPlaying={false}
                  onTogglePlay={() => {}}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} className={s.userGuides}>
              {/** user guide panel */}
              <Column classes={{ box: s.userGuidesWrapper }} alignChildrenStart>
                <Typography
                  fontWeightBold
                  textSecondary
                  fontSizeM
                  paddingBottomHalf
                >
                  {t('userGuide')}
                </Typography>
                {this.userGuides.map((item, index) => (
                  <React.Fragment key={index}>
                    <Typography
                      fontWeightBold
                      textSecondary
                      fontSizeM
                      paddingTop
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      textSecondary
                      fontSizeS
                      paddingTopHalf
                      fullWidth
                    >
                      {item.content}
                    </Typography>
                  </React.Fragment>
                ))}
              </Column>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className={s.footer}>
          {/** close button */}
          <Row fullWidth>
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

export default withStyles(styleSheet, { name: 'HelpDialog' })(
  withTranslation('common')(withWidth()(HelpDialog))
);
