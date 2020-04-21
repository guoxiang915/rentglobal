import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Trans, withTranslation } from 'react-i18next';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import {
  Grid, Card, Hidden, MobileStepper, Collapse,
} from '@material-ui/core';
import {
  LinkedIn,
  Facebook,
  Instagram,
  Twitter,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@material-ui/icons';
import Carousel from '@brainhubeu/react-carousel';
import {
  Box,
  Row,
  Column,
  Stretch,
  TextField,
  Button,
  Link,
  Typography,
  Divider,
  SearchIcon,
  TessiIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  HeartIcon,
  EmojiIcon,
  CalendarIcon,
  ArrowRightAltIcon,
  CheckIcon,
} from '../../common/base-components';
import { OfficeItem } from '../../common/base-layouts';
import { emailValidation } from '../../utils/validators';
import { getRecommendedOffices } from '../../api/endpoints';

// load assets
import headerimg from '../../assets/img/img_header.jpg';
import headerimgL from '../../assets/img/img_header@2x.jpg';
import gallery1 from '../../assets/img/img_gallery_01@2x.png';
import gallery2 from '../../assets/img/img_gallery_02@2x.png';
import gallery3 from '../../assets/img/img_gallery_03@2x.png';

import { styleSheet } from './Home';

class Home extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    recommendedOffices: [],
  };

  intervalId = null;

  landingBlocks = [
    {
      img: headerimg,
      imgL: headerimgL,
      title: this.props.t('needSpaceForBusiness'),
      subtitle: this.props.t('needSpaceForBusinessSub'),
    },
    {
      img: headerimg,
      imgL: headerimgL,
      title: this.props.t('havePlaceAsOffice'),
      subtitle: this.props.t('havePlaceAsOfficeSub'),
    },
    {
      img: headerimg,
      imgL: headerimgL,
      title: this.props.t('consultant'),
      subtitle: this.props.t('consultantSub'),
    },
    // {img: headerimg, imgL: headerimgL, title: this.props.t("needSpaceForBusiness"), subtitle: this.props.t("needSpaceForBusinessSub")}
  ];

  UNSAFE_componentWillMount() {
    /** Get recommended offices */
    if (getRecommendedOffices) {
      getRecommendedOffices().then((response) => {
        if (response.status === 200) {
          this.setState({ recommendedOffices: response.data });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Text stepper component
   */
  textStepper = withWidth()(
    ({
      active, index, label, content, onClick, width,
    }) => (
      <div onClick={() => onClick(index)} style={{ cursor: 'pointer' }}>
        {!isWidthDown('sm', width) ? (
          <Box classes={{ box: this.props.classes.textStepWrapper }}>
            <Box classes={{ box: this.props.classes.textStepIconWrapper }}>
              <Box
                classes={{
                  box: clsx(
                    this.props.classes.textStepIcon,
                    active && this.props.classes.textStepActiveIcon,
                  ),
                }}
                alignChildrenCenter
                justifyChildrenCenter
              >
                <Typography fontSizeM fontWeightBold>
                  {index}
                </Typography>
              </Box>
            </Box>
            <Column alignChildrenStart>
              <Typography
                fontSizeM
                fontWeightBold
                textSecondary={active}
                textMediumGrey={!active}
              >
                {label}
              </Typography>
              <Box paddingTopHalf>
                <Typography
                  fontSizeS
                  textSecondary={active}
                  textMediumGrey={!active}
                >
                  {content}
                </Typography>
              </Box>
            </Column>
          </Box>
        ) : (
          <Column
            classes={{ box: this.props.classes.textStepWrapper }}
            alignChildrenStart
          >
            <Row
              classes={{ box: this.props.classes.textStepIconWrapper }}
              alignChildrenCenter
            >
              <Box
                classes={{
                  box: clsx(
                    this.props.classes.textStepIcon,
                    active && this.props.classes.textStepActiveIcon,
                  ),
                }}
                alignChildrenCenter
                justifyChildrenCenter
              >
                {index}
              </Box>
              <Typography fontSizeS fontWeightBold textSecondary>
                {label}
              </Typography>
              {active ? (
                <ArrowDownIcon
                  className={this.props.classes.textStepExpandIcon}
                />
              ) : (
                <ArrowUpIcon
                  className={this.props.classes.textStepExpandIcon}
                />
              )}
            </Row>
            <Collapse in={active}>
              <Row paddingTopHalf>
                <Typography
                  fontSizeXS
                  textSecondary={active}
                  textMediumGrey={!active}
                >
                  {content}
                </Typography>
              </Row>
            </Collapse>
          </Column>
        )}
      </div>
    ),
  );

  /**
   * Image stepper component
   */
  imgStepper = ({ active, imgSrc }) => (
    <Box
      classes={{
        box: clsx(
          this.props.classes.imgHelpStep,
          !active && this.props.classes.imgHelpStepHidden,
        ),
      }}
    >
      <img src={imgSrc} alt="Gallery" />
    </Box>
  );

  renderLandingCard = ({ classes: s, t }) => {
    const [tessiQuery, setTessiQuery] = React.useState('');
    const changeTessiQuery = React.useCallback(
      (e) => setTessiQuery(e.target.value),
      [],
    );

    return (
      <Card className={s.searchWrapper}>
        <Column alignChildrenStart>
          <Typography
            // fontSizeXL
            textSecondary
            fontWeightBold
            classes={{ box: s.landingTitle }}
            block
          >
            <Trans i18nKey="dashboardLandingTitle">
              <Typography
                // fontSizeXL
                textPrimary
                fontWeightBold
                classes={{ box: s.landingTitle }}
                span
              >
                {{ name: 'TESSI' }}
              </Typography>
              <br />
            </Trans>
          </Typography>
          <Typography
            textMediumGrey
            // fontSizeS
            className={{ box: s.landingSubtitle }}
          >
            {t('dashboardLandingSubtitle')}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={tessiQuery}
            onChange={changeTessiQuery}
            placeholder={t('sayHiOrSearch')}
            className={clsx(s.searchInput)}
            styles={{
              input: clsx(
                s.searchInputProps,
                tessiQuery && s.limitedSearchInputProps,
              ),
            }}
            endAdornment={(
              <Button
                variant="icon"
                background="primary"
                style={{ margin: 0 }}
                className={clsx(
                  s.inputButtonIcon,
                  s.searchInputIcon,
                  tessiQuery && s.landingButton,
                )}
                shadow
              >
                {!tessiQuery ? (
                  <ArrowRightAltIcon
                    style={{
                      color: 'white',
                      width: 18,
                      height: 18,
                    }}
                  />
                ) : /hi/i.test(tessiQuery) ? (
                  <Typography
                    fontSizeS
                    fontWeightBold
                    textWhite
                    alignChildrenCenter
                  >
                    <TessiIcon style={{ stroke: 'white' }} />
                    <Typography paddingLeft>{t('chatWithTessi')}</Typography>
                  </Typography>
                ) : (
                  <Typography
                    fontSizeS
                    fontWeightBold
                    textWhite
                    alignChildrenCenter
                  >
                    <SearchIcon />
                    <Typography paddingLeft>{t('advancedSearch')}</Typography>
                  </Typography>
                )}
              </Button>
            )}
          />
        </Column>
      </Card>
    );
  };

  /** Landing image blcok */
  renderLandingImageBlock = ({ classes: s, t, width }) => {
    const LandingCard = this.renderLandingCard;
    const [active, setActive] = React.useState(0);
    const landingBlock = this.landingBlocks[active];
    /** Set timer for active landing block (every 5 seconds) */
    React.useEffect(() => {
      const intervalId = setInterval(
        () => setActive(active === this.landingBlocks.length - 1 ? 0 : active + 1),
        5000,
      );
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    });

    return (
      <React.Fragment>
        <div className={s.landingBoardWrapper}>
          {this.landingBlocks.map((block, index) => (
            <img
              key={index}
              srcSet={`${block.img} 960w, ${block.imgL} 1280w`}
              src={block.img}
              className={clsx(
                s.landingBoardImage,
                index !== active && s.landingBoardImageHidden,
              )}
              alt=""
            />
          ))}
          <Column
            fullWidth
            absolute
            style={{ top: 0, left: 0, height: '100%' }}
          >
            <Row
              style={{
                width: 'fit-content',
                height: '100%',
              }}
              alignChildrenStart
            >
              <Column classes={{ box: s.landingBoard }}>
                <Row>
                  <LandingCard classes={s} t={t} />
                </Row>
                <Stretch />
                {!isWidthDown('sm', width) && (
                  <Row
                    fullWidth
                    relative
                    style={{ height: isWidthDown('sm', width) ? 20 : 34 }}
                  >
                    <Typography
                      textSecondary
                      fontWeightBold
                      fontSizeL={!isWidthDown('sm', width)}
                      fontSizeS={isWidthDown('sm', width)}
                      fullWidth
                      style={{
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                      }}
                      absolute
                    >
                      {landingBlock.title}
                    </Typography>
                  </Row>
                )}
                {!isWidthDown('sm', width) && (
                  <Row
                    fullWidth
                    relative
                    style={{ height: isWidthDown('sm', width) ? 26 : 28 }}
                  >
                    <Typography
                      textSecondary
                      fontWeightBold
                      fontSizeS={!isWidthDown('sm', width)}
                      fontSizeXS={isWidthDown('sm', width)}
                      fullWidth
                      style={{
                        overflow: 'visible',
                        whiteSpace: 'nowrap',
                      }}
                      absolute
                    >
                      {landingBlock.subtitle}
                    </Typography>
                  </Row>
                )}
                <Row paddingTop fullWidth style={{ flexWrap: 'wrap' }}>
                  {!isWidthDown('sm', width) && (
                    <React.Fragment>
                      <Column style={{ height: '100%', left: -6 }} relative>
                        <MobileStepper
                          variant="dots"
                          steps={this.landingBlocks.length}
                          activeStep={active}
                          classes={{
                            root: s.dotStepperLandingBlock,
                            dot: s.dotLandingBlockStyle,
                            dotActive: s.dotActiveStyle,
                          }}
                        />
                      </Column>
                      <Stretch />
                    </React.Fragment>
                  )}
                  <Grid
                    className={s.landingButtonsWrapper}
                    container
                    direction="row-reverse"
                    justify={
                      isWidthDown('xs', width) ? 'center' : 'space-between'
                    }
                  >
                    <Grid item>
                      <Button className={s.landingButton}>
                        <Typography
                          fontSizeS
                          fontWeightBold
                          textWhite
                          alignChildrenCenter
                        >
                          <SearchIcon />
                          <Typography paddingLeft>
                            {t('advancedSearch')}
                          </Typography>
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button className={s.landingButton}>
                        <Typography
                          fontSizeS
                          fontWeightBold
                          textWhite
                          alignChildrenCenter
                        >
                          <TessiIcon style={{ stroke: 'white' }} />
                          <Typography paddingLeft>
                            {t('chatWithTessi')}
                          </Typography>
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                </Row>
              </Column>
            </Row>
          </Column>
        </div>

        {/** header slider for mobile */}
        {isWidthDown('sm', width) && (
          <Row fullWidth>
            <Column
              style={{ paddingBottom: 20 }}
              classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}
              alignChildrenCenter={!isWidthDown('xs', width)}
              alignChildrenStart={isWidthDown('xs', width)}
            >
              <Typography textSecondary fontWeightBold fontSizeM>
                {landingBlock.title}
              </Typography>
              <Typography textSecondary fontSizeXS paddingTopHalf>
                {landingBlock.subtitle}
              </Typography>
              <Row fullWidth justifyChildrenCenter>
                <MobileStepper
                  variant="dots"
                  steps={this.landingBlocks.length}
                  activeStep={active}
                  style={{ padding: 10, zIndex: 1 }}
                  classes={{
                    root: s.dotStepperLandingBlock,
                    dot: s.dotLandingBlockStyle,
                    dotActive: s.dotActiveStyle,
                  }}
                />
              </Row>
            </Column>
          </Row>
        )}
      </React.Fragment>
    );
  };

  /** RENTGLOBAL Helper block */
  renderHelperBlock = ({ classes: s, t }) => {
    const TextStepComponent = this.textStepper;
    const ImgStepComponent = this.imgStepper;
    const [activeHelpStep, setActive] = React.useState(0);

    return (
      <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
        <Row classes={{ box: s.blockTitleWrapper }}>
          <Typography classes={{ box: s.blockTitle }} textSecondary block>
            <Trans i18nKey="howHelpFind">
              <Typography classes={{ box: s.blockTitle }} textPrimary span>
                {{ name: 'RENTGLOBAL' }}
              </Typography>
            </Trans>
          </Typography>
        </Row>
        <Row classes={{ box: s.blockContentWrapper }}>
          <Grid container direction="row">
            <Grid item className={s.textHelpStepper} md={6} sm={12}>
              <TextStepComponent
                index="1"
                label={t('howHelpFind1_title')}
                content={t('howHelpFind1_content')}
                active={activeHelpStep === 0}
                onClick={() => setActive(0)}
              />
              <TextStepComponent
                index="2"
                label={t('howHelpFind2_title')}
                content={t('howHelpFind2_content')}
                active={activeHelpStep === 1}
                onClick={() => setActive(1)}
              />
              <TextStepComponent
                index="3"
                label={t('howHelpFind3_title')}
                content={t('howHelpFind3_content')}
                active={activeHelpStep === 2}
                onClick={() => setActive(2)}
              />
            </Grid>
            <Hidden smDown>
              <Grid item className={s.imgHelpStepper} md={6} sm={12}>
                <Box classes={{ box: s.imgHelpStepWrapper }}>
                  <ImgStepComponent
                    active={activeHelpStep === 0}
                    imgSrc={gallery1}
                  />
                  <ImgStepComponent
                    active={activeHelpStep === 1}
                    imgSrc={gallery2}
                  />
                  <ImgStepComponent
                    active={activeHelpStep === 2}
                    imgSrc={gallery3}
                  />
                </Box>
                <Box classes={{ box: s.imgHelpBkWrapper }}>
                  <Box classes={{ box: s.imgHelpBk }}>
                    <MobileStepper
                      variant="dots"
                      steps={3}
                      position="static"
                      activeStep={activeHelpStep}
                      classes={{
                        root: s.dotStepper,
                        dot: s.dotStyle,
                        dotActive: s.dotActiveStyle,
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
            </Hidden>
          </Grid>
        </Row>
      </Column>
    );
  };

  /** Render register block */
  renderRegisterBlock = ({ classes: s, t, width }) => {
    const registerBlocks = React.useMemo(
      () => [
        { title: '1.', content: t('homeRegisterContent') },
        { title: '2.', content: t('homeRegisterContent') },
        { title: '3.', content: t('homeRegisterContent') },
      ],
      [t],
    );

    return (
      <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
        <Row classes={{ box: s.homeRegisterTitle }}>
          <Typography classes={{ box: s.blockTitle }} textWhite>
            {t('homeRegisterTitle')}
          </Typography>
        </Row>
        <Row
          classes={{ box: s.homeRegisterContent }}
          fullWidth
          textWhite
          textCenter
        >
          <div style={{ width: '100%', height: '100%' }}>
            <Carousel
              infinite
              slidesPerPage={1}
              keepDirectionWhenDragging
              addArrowClickHandler
              arrowLeft={(
                <Box
                  style={{
                    left: isWidthDown('sm', width) ? '-60px' : '-124px',
                  }}
                  classes={{ box: s.homeRegisterArrow }}
                >
                  <KeyboardArrowLeft className={s.homeRegisterArrowButton} />
                </Box>
              )}
              arrowRight={(
                <Box
                  style={{
                    right: isWidthDown('sm', width) ? '-60px' : '-124px',
                  }}
                  classes={{ box: s.homeRegisterArrow }}
                >
                  <KeyboardArrowRight className={s.homeRegisterArrowButton} />
                </Box>
              )}
            >
              {registerBlocks.map((val, index) => (
                <React.Fragment key={index}>
                  <Column>
                    <Typography
                      paddingBottom
                      fontSizeM={isWidthDown('sm', width)}
                      fontSizeL={!isWidthDown('sm', width)}
                    >
                      {val.title}
                    </Typography>
                    <Typography
                      fontSizeXS={isWidthDown('sm', width)}
                      fontSizeS={!isWidthDown('sm', width)}
                      fontWeightBold
                      fullWidth
                    >
                      {val.content}
                    </Typography>
                  </Column>
                </React.Fragment>
              ))}
            </Carousel>
          </div>
        </Row>
        <Row>
          <Button
            // variant="secondary"
            className={s.whiteShadowButton}
            onClick={() => this.props.history.push('/auth/register/landlord')}
          >
            {isWidthDown('sm', width) ? (
              <Typography fontSizeXS fontWeightBold>
                {t('registerAndStart')}
              </Typography>
            ) : (
              <Typography fontSizeS fontWeightBold>
                {t('registerAndStartRENTGLOBALConsultant')}
              </Typography>
            )}
          </Button>
        </Row>
      </Column>
    );
  };

  /** Render following block */
  renderFollowingBlock = ({
    classes: s, t, width, onSubmit,
  }) => {
    const [news, setNews] = React.useState('');
    const [newsError, setNewsError] = React.useState(null);
    const changeNewsLetter = React.useCallback(
      (e) => setNews(e.target.value),
      [],
    );
    const submitReceiveNewsLetter = React.useCallback(() => {
      console.log('callback!');
      if (!emailValidation(news)) {
        setNewsError(t('invalidEmailAddress'));
      } else {
        onSubmit(news);
      }
    }, [t, news, onSubmit]);

    return (
      <Column
        style={{ paddingTop: isWidthDown('xs', width) ? 30 : 16 }}
        classes={{ box: clsx(s.fixedWith) }}
        paddingBottom
      >
        <Grid container justify="space-between">
          <Grid item xs={12} sm={6}>
            <Column paddingTop paddingBottom>
              <Typography fontSizeS textSecondary>
                {t('receiveNewsletter')}
              </Typography>
              <Row paddingTopHalf fullWidth justifyChildrenCenter>
                <TextField
                  variant="outlined"
                  placeholder={t('yourEmailAddress')}
                  className={s.receiveNewsletter}
                  type="email"
                  value={news}
                  onChange={changeNewsLetter}
                  error={!!newsError}
                  helperText={newsError}
                  endAdornment={(
                    <Button
                      variant="icon"
                      style={{ margin: 0 }}
                      className={clsx(s.inputButtonIcon)}
                      background={news ? 'primary' : 'borderLight'}
                      shadow={!!news}
                      onClick={submitReceiveNewsLetter}
                      disabled={!news}
                    >
                      <CheckIcon
                        style={{
                          color: 'white',
                          width: 18,
                          height: 18,
                        }}
                      />
                    </Button>
                  )}
                />
              </Row>
            </Column>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Column paddingTop paddingBottom>
              <Typography fontSizeS textSecondary>
                {t('followUpSocials')}
              </Typography>
              <Row paddingTopHalf classes={{ box: s.socialIconsWrapper }}>
                <Box paddingLeft paddingRight>
                  <Link to="#" variant="normalXLight">
                    <Twitter fontSize="large" />
                  </Link>
                </Box>
                <Box paddingLeft paddingRight>
                  <Link to="#" variant="normalXLight">
                    <Facebook fontSize="large" />
                  </Link>
                </Box>
                <Box paddingLeft paddingRight>
                  <Link to="#" variant="normalXLight">
                    <Instagram fontSize="large" />
                  </Link>
                </Box>
                <Box paddingLeft paddingRight>
                  <Link to="#" variant="normalXLight">
                    <LinkedIn fontSize="large" />
                  </Link>
                </Box>
              </Row>
            </Column>
          </Grid>
        </Grid>
      </Column>
    );
  };

  /**
   * Change event emitter to update state
   * @param {string} field Name of state field to update
   */
  handleChangeByEvent = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  /** Click submit button of news letter input box */
  handleReceiveNewsLetter = () => {
    console.log('Submit receive news letter!');
  };

  /** Navigate to office detail page */
  handleOfficeDetail = (officeId) => () => {
    this.props.navigate('offices', officeId);
  };

  render() {
    const { width, classes: s, t } = this.props;
    const { recommendedOffices } = this.state;

    const LandingImageBlock = this.renderLandingImageBlock;
    const HelperBlock = this.renderHelperBlock;
    const RegisterBlock = this.renderRegisterBlock;
    const FollowingBlock = this.renderFollowingBlock;

    console.log('rendering!');

    return (
      <Column classes={{ box: s.root }}>
        {/** Landing image block */}
        <LandingImageBlock classes={s} t={t} width={width} />

        {/* RENTGLOBAL helper block */}
        <Row fullWidth justifyChildrenCenter>
          <HelperBlock classes={s} t={t} />
        </Row>

        <Hidden smUp>
          <Divider className={s.divider} half />
        </Hidden>

        {/* Office list block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Row
              classes={{ box: s.blockTitleWrapper }}
              style={
                isWidthDown('sm', width)
                  ? { paddingBottom: 24, paddingTop: 0 }
                  : { paddingTop: 0 }
              }
            >
              <Typography classes={{ box: s.blockTitle }} textSecondary>
                {t('latestRecommendOffice')}
              </Typography>
            </Row>
            <Row
              classes={{ box: s.blockContentWrapper }}
              style={{ overflowX: 'hidden' }}
              fullWidth
            >
              <div style={{ width: '100%', height: '100%' }}>
                <Carousel itemWidth={255} offset={20} keepDirectionWhenDragging>
                  {recommendedOffices.map((office, index) => (
                    <div
                      style={{
                        position: 'relative',
                        cursor: 'pointer',
                        height: '100%',
                      }}
                      key={index}
                    >
                      <OfficeItem
                        office={office}
                        setFavorite
                        onClick={this.handleOfficeDetail(office._id)}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </Row>
            <Row classes={{ box: s.allLatestButton }}>
              <Button variant="secondary" shadow>
                <Typography fontSizeS fontWeightBold textSecondary>
                  {t('allLatest', { count: '50+' })}
                </Typography>
              </Button>
            </Row>
          </Column>
        </Row>

        {/* Register block */}
        <Column fullWidth classes={{ box: s.registerBlock }}>
          <RegisterBlock classes={s} t={t} width={width} />
        </Column>

        {/* RENTGLOBAL pros block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Grid container direction="row" className={s.prosWrapper}>
              <Grid item xs={12} md={4}>
                {isWidthDown('sm', width) ? (
                  <Row>
                    <Column>
                      <EmojiIcon className={s.prosIcon} />
                    </Column>
                    <Column paddingLeft alignChildrenStart>
                      <Row>
                        <Typography
                          fontSizeS
                          uppercase
                          textSecondary
                          fontWeightBold
                        >
                          {t('flexibility')}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography fontSizeXS uppercase textSecondary>
                          {t('minimumCommitment')}
                        </Typography>
                      </Row>
                    </Column>
                  </Row>
                ) : (
                  <Column>
                    <Row>
                      <EmojiIcon className={s.prosIcon} />
                    </Row>
                    <Row paddingTop>
                      <Typography
                        fontSizeM
                        uppercase
                        textSecondary
                        fontWeightBold
                      >
                        {t('flexibility')}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography fontSizeS uppercase textSecondary>
                        {t('minimumCommitment')}
                      </Typography>
                    </Row>
                  </Column>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                {isWidthDown('sm', width) ? (
                  <Row paddingTopDouble>
                    <Column>
                      <CalendarIcon className={s.prosIcon} />
                    </Column>
                    <Column paddingLeft alignChildrenStart>
                      <Row>
                        <Typography
                          fontSizeS
                          uppercase
                          textSecondary
                          fontWeightBold
                        >
                          {t('confiance')}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography fontSizeXS uppercase textSecondary>
                          {t('personalMonitoring')}
                        </Typography>
                      </Row>
                    </Column>
                  </Row>
                ) : (
                  <Column>
                    <Row>
                      <CalendarIcon className={s.prosIcon} />
                    </Row>
                    <Row paddingTop>
                      <Typography
                        fontSizeM
                        uppercase
                        textSecondary
                        fontWeightBold
                      >
                        {t('confiance')}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography fontSizeS uppercase textSecondary>
                        {t('personalMonitoring')}
                      </Typography>
                    </Row>
                  </Column>
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                {isWidthDown('sm', width) ? (
                  <Row paddingTopDouble>
                    <Column>
                      <HeartIcon className={s.prosIcon} />
                    </Column>
                    <Column paddingLeft alignChildrenStart>
                      <Row>
                        <Typography
                          fontSizeS
                          uppercase
                          textSecondary
                          fontWeightBold
                        >
                          {t('simplicity')}
                        </Typography>
                      </Row>
                      <Row>
                        <Typography fontSizeXS uppercase textSecondary>
                          {t('turnkeySolution')}
                        </Typography>
                      </Row>
                    </Column>
                  </Row>
                ) : (
                  <Column>
                    <Row>
                      <HeartIcon className={s.prosIcon} />
                    </Row>
                    <Row paddingTop>
                      <Typography
                        fontSizeM
                        uppercase
                        textSecondary
                        fontWeightBold
                      >
                        {t('simplicity')}
                      </Typography>
                    </Row>
                    <Row>
                      <Typography fontSizeS uppercase textSecondary>
                        {t('turnkeySolution')}
                      </Typography>
                    </Row>
                  </Column>
                )}
              </Grid>
            </Grid>
          </Column>
        </Row>

        {/* Following block */}
        <Row
          fullWidth
          justifyChildrenCenter
          classes={{ box: s.newsLetterWrapper }}
        >
          <FollowingBlock
            classes={s}
            t={t}
            width={width}
            onSubmit={this.handleReceiveNewsLetter}
          />
        </Row>

        {/* Contact info block */}
        <Row fullWidth justifyChildrenCenter>
          <Column classes={{ box: clsx(s.fixedWith, s.blockWrapper) }}>
            <Grid
              container
              justify="space-between"
              className={s.contactInfoWrapper}
            >
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t('rentglobal')}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Link to="/">
                      <Typography fontSizeS>{t('aboutUs')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t('news')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t('careers')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t('contactUs')}</Typography>
                    </Link>
                  </Column>
                </Column>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t('discover')}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Link to="/">
                      <Typography fontSizeS>{t('howItWorks')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t('legalNotice')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t('privacyPolicy')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>
                        {t('termsAndConditions')}
                      </Typography>
                    </Link>
                  </Column>
                </Column>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t('support')}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Link to="/">
                      <Typography fontSizeS>{t('help')}</Typography>
                    </Link>
                    <Link to="/auth/login">
                      <Typography fontSizeS>{t('login')}</Typography>
                    </Link>
                    <Link to="/auth/register">
                      <Typography fontSizeS>{t('register')}</Typography>
                    </Link>
                    <Link to="/">
                      <Typography fontSizeS>{t('support')}</Typography>
                    </Link>
                  </Column>
                </Column>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Column paddingTopDouble paddingBottomDouble alignChildrenStart>
                  <Typography fontSizeM fontWeightBold textSecondary>
                    {t('contact')}
                  </Typography>
                  <Column paddingTop alignChildrenStart>
                    <Typography fontSizeS textSecondary>
                      1176, street Bishop, Montreal,
                    </Typography>
                    <Typography fontSizeS textSecondary>
                      QC H3G 2E3
                    </Typography>
                    <Typography fontSizeS textSecondary>
                      info@dokstation.ca
                    </Typography>
                    <Typography fontSizeS textSecondary>
                      Phone: (514) 461-3030
                    </Typography>
                  </Column>
                </Column>
              </Grid>
            </Grid>
          </Column>
        </Row>
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation(['home', 'common'])(Home)),
);
