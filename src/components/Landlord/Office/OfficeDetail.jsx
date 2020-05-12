import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Carousel from '@brainhubeu/react-carousel';
import { KeyboardBackspace } from '@material-ui/icons';
import {
  Row,
  Column,
  Stretch,
  Box,
  Typography,
  Button,
  EyeDisIcon,
  DeleteIcon,
  EditIcon,
  Divider,
} from '../../../common/base-components';
import { OfficeItem } from '../../../common/base-layouts';
import OfficeDetailForm from '../../Layout/OfficeDetailForm';

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

  addOfficeTabWrapper: {
    paddingTop: 20,
    paddingBottom: 56,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 8,
      paddingBottom: 24,
    },
  },

  formButtons: {
    paddingTop: 160,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 64,
    },
  },

  similarOfficesWrapper: {
    paddingTop: 46,
    paddingBottom: 74,
  },

  similarOffices: {
    paddingTop: 54,
    overflow: 'hidden',
  },
});

class OfficeDetail extends PureComponent {
  static propTypes = {
    officeId: PropTypes.string.isRequired,
    getOfficeById: PropTypes.func.isRequired,
    getSimilarOffices: PropTypes.func.isRequired,
    onEditOffice: PropTypes.func,
    onDeleteOffice: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    office: {},
    similarOffices: [],
    dialog: null,
  };

  /** Get office from id */
  componentDidMount() {
    const { officeId } = this.props;
    this.props.getOfficeById(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ office: response.data });
      }
    });

    /** Get similar offices */
    // this.props.
    this.props.getSimilarOffices(officeId).then((response) => {
      if (response.status === 200) {
        this.setState({ similarOffices: response.data });
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { officeId } = this.props;

    if (officeId !== prevProps.officeId) {
      this.props.getOfficeById(officeId).then((response) => {
        if (response.status === 200) {
          this.setState({ office: response.data });
        }
      });

      /** Get similar offices */
      // this.props.
      this.props.getSimilarOffices(officeId).then((response) => {
        if (response.status === 200) {
          this.setState({ similarOffices: response.data });
        }
      });
    }
  }

  /** Close dialog */
  closeDialog = () => {
    this.setState({ dialog: null });
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate('offices');
  };

  /** Unpublish office */
  handleUnpublish = () => {
    this.props.unpublishOffice(this.state.office._id).then((response) => {
      if (response.status === 200) {
        this.props.navigate('offices/add', `${this.state.office._id}/${this.state.office.location.country}-${this.state.office.officeType}-${this.state.office.numberOfEmployees}`);
      }
    });
  };

  /** Event for edit office */
  handleEditOffice = () => {
    this.props.onEditOffice(this.state.office);
  };

  /** Event for delete office */
  handleDeleteOffice = () => {
    this.props.onDeleteOffice(this.state.office._id);
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const { office, dialog, similarOffices } = this.state;

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth paddingBottom>
          {/** title */}
          <Typography fontSizeM textSecondary>
            {t('office')}
          </Typography>
          <Stretch />
          <Button
            link="secondary"
            background="secondaryLight"
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t('back')}
            </Typography>
          </Button>
        </Row>

        <Row fullWidth paddingBottom>
          {/** Show unpublish button */}
          <Button
            link="errorRedNormal"
            background="errorRedLight"
            inverse
            onClick={this.handleUnpublish}
            variant={isWidthDown('xs', width) ? 'icon' : ''}
          >
            <EyeDisIcon style={{ width: 16, height: 16 }} />
            <Typography fontSizeS paddingLeft>
              {t('unpublish')}
            </Typography>
          </Button>
          <Stretch />

          {/** Show delete button */}
          <Button
            link="errorRedNormal"
            background="errorRedLight"
            inverse
            onClick={this.handleDeleteOffice}
            variant={isWidthDown('xs', width) ? 'icon' : ''}
          >
            <DeleteIcon style={{ width: 20, height: 18 }} />
            {!isWidthDown('xs', width) ? (
              <Typography paddingLeft fontSizeS>
                {t('delete')}
              </Typography>
            ) : null}
          </Button>
          <Box paddingLeft />

          {/** Show edit button */}
          <Button
            link="primary"
            background="normalLight"
            inverse
            onClick={this.handleEditOffice}
            variant={isWidthDown('xs', width) ? 'icon' : ''}
          >
            <EditIcon style={{ width: 20, height: 18 }} />
            {!isWidthDown('xs', width) ? (
              <Typography paddingLeft fontSizeS>
                {t('edit')}
              </Typography>
            ) : null}
          </Button>
        </Row>

        <Row fullWidth classes={{ box: clsx(s.addOfficeTabWrapper) }}>
          {office && <OfficeDetailForm office={office} />}
        </Row>

        {/** Show similar offices */}
        <Divider />
        <Row fullWidth classes={{ box: s.similarOfficesWrapper }}>
          <Column fullWidth alignChildrenStart>
            <Typography fontSizeM textBlackGrey fontWeightBold>
              {t('similarOffice')}
            </Typography>
            <Row fullWidth classes={{ box: s.similarOffices }}>
              <div style={{ width: '100%', height: '100%' }}>
                <Carousel
                  itemWidth={255}
                  offset={0}
                  keepDirectionWhenDragging
                >
                  {similarOffices.map((office, index) => (
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
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </Row>
          </Column>
        </Row>

        <Row
          fullWidth
          classes={{ box: clsx(s.addOfficeTabWrapper, s.formButtons) }}
        >
          {/** Show unpublish button */}
          <Button
            link="errorRedNormal"
            background="errorRedLight"
            inverse
            onClick={this.handleUnpublish}
            variant={isWidthDown('xs', width) ? 'icon' : ''}
          >
            <EyeDisIcon style={{ width: 16, height: 16 }} />
            <Typography fontSizeS paddingLeft>
              {t('unpublish')}
            </Typography>
          </Button>
        </Row>
        {dialog}
      </Column>
    );
  }
}

export default withWidth()(
  withStyles(styleSheet)(withTranslation('common')(OfficeDetail)),
);
