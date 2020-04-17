import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
} from '../../../common/base-components';
import {
  TabWrapper,
  StatisticBox,
  OfficeItem,
} from '../../../common/base-layouts';
import { withCarousel as CarouselWrapper } from '../../../common/base-services/withCarousel';
import { ConditionalWrapper } from '../../../utils/helpers';

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  fullWidth: {
    width: '100%',
  },

  statisticWrapper: {
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      overflowX: 'auto',
    },
  },

  officesTabWrapper: {
    paddingTop: 20,
    paddingBottom: 56,
  },

  carouselWrapper: {
    marginLeft: -10,
  },
});

class Offices extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    getOffices: PropTypes.func.isRequired,

    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = { offices: [] };

  /** Navigation */
  navigate = (path) => () => {
    this.props.navigate(path);
  };

  /** Get landlord offices */
  componentDidMount() {
    this.props.getOffices().then(
      (response) => this.setState({ offices: response.data }),
      () => {}
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

  /**
   * Renderer function
   */
  render() {
    const { width, classes: s, t } = this.props;
    const { offices } = this.state;

    const statistics = {
      followUpRequests: { value: 8, variant: 'primary' },
      moreInfoReq: { value: 1 },
      contactReq: { value: 1 },
    };

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          {/* title */}
          <Typography fontSizeM textSecondary>
            {t('offices')}
          </Typography>
          <Stretch />
          <Button
            variant="secondary"
            shadow
            onClick={this.navigate('offices/add')}
          >
            {t('addNewOffice')}
          </Button>
        </Row>

        {/* requests tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper title={t('requests') + ' (10)'} open={true} insideOpen>
            <Row
              fullWidth
              paddingTopDouble
              classes={{ box: s.statisticWrapper }}
            >
              <ConditionalWrapper
                condition={isWidthDown('xs', width)}
                wrapper={(children) => (
                  <CarouselWrapper
                    itemWidth={212}
                    itemOffset={20}
                    className={s.carouselWrapper}
                  >
                    {children}
                  </CarouselWrapper>
                )}
              >
                {Object.entries(statistics).map(([key, stat]) => (
                  <React.Fragment key={key}>
                    <Box paddingRightHalf={!isWidthDown('xs', width)}>
                      <StatisticBox title={t(key)} statistics={[stat]} />
                    </Box>
                  </React.Fragment>
                ))}
              </ConditionalWrapper>
            </Row>
          </TabWrapper>
        </Row>

        {/* office lists tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper
            title={
              t('officeLists') +
              ' (' +
              offices.filter((item) => item.published === true).length +
              ')'
            }
            open={true}
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate('offices/all')}
              >
                <Typography paddingLeft fontSizeS>
                  {t('allOfficesList')}
                </Typography>
              </Button>
            }
          >
            <Row paddingTopDouble fullWidth noOverflow>
              <CarouselWrapper
                itemWidth={isWidthDown('xs', width) ? 'calc(100% + 20px)' : 255}
                itemOffset={20}
                className={s.carouselWrapper}
              >
                {offices
                  .filter((item) => item.published === true)
                  .map((office, index) => (
                    <div
                      style={{ position: 'relative', cursor: 'pointer' }}
                      key={index}
                      onClick={this.handleNavigateOfficeDetail(office)}
                    >
                      <OfficeItem office={office} setFavorite />
                    </div>
                  ))}
              </CarouselWrapper>
            </Row>
          </TabWrapper>
        </Row>

        {/* offices need attention tab */}
        <Row fullWidth classes={{ box: s.officesTabWrapper }}>
          <TabWrapper
            title={
              t('needAttention') +
              ' (' +
              offices.filter((item) => item.published === false).length +
              ')'
            }
            open={true}
            insideOpen
            actionButton={
              <Button
                link="primary"
                background="normalLight"
                inverse
                onClick={this.navigate('offices/unpublish')}
              >
                <Typography paddingLeft fontSizeS>
                  {t('allUnpublish')}
                </Typography>
              </Button>
            }
          >
            <Row paddingTopDouble fullWidth noOverflow>
              <CarouselWrapper
                itemWidth={isWidthDown('xs', width) ? 'calc(100% + 20px)' : 255}
                itemOffset={20}
                className={s.carouselWrapper}
              >
                {offices
                  .filter((item) => item.published === false)
                  .map((office, index) => (
                    <div
                      style={{ position: 'relative', cursor: 'pointer' }}
                      key={index}
                      onClick={this.handleNavigateOfficeDetail(office)}
                    >
                      <OfficeItem
                        office={office}
                        // errorMsg="pending"
                        setFavorite
                      />
                    </div>
                  ))}
              </CarouselWrapper>
            </Row>
          </TabWrapper>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation('common')(Offices))
);
