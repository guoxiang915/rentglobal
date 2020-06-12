import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withTranslation } from "react-i18next";
import PropTypes from "prop-types";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";
import { withRouter } from "react-router-dom";
import { KeyboardBackspace } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import {
  Row,
  Column,
  Stretch,
  Typography,
  Button,
  Divider,
  DeleteConfirmDialog,
} from "../../../common/base-components";
import {
  SearchbarWithSorter,
  VisitRequestItem,
} from "../../../common/base-layouts";
import VisitRequestAcceptedDialog from "../../Layout/Dialogs/VisitRequestAcceptedDialog";

const OFFICES_PER_PAGE = 6;

const styleSheet = (theme) => ({
  root: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 27,
      paddingRight: 27,
    },
  },

  visitRequests: {
    width: "100%",
  },

  pagination: {
    marginTop: 20,
    marginBottom: 60,
    color: theme.colors.primary.grey,
  },
});

class VisitRequests extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    classes: PropTypes.object,
    t: PropTypes.func,
  };

  state = {
    visitRequests: [],
    query: "",
    page: 1,
    totalLength: 0,
    loading: false,
    dialog: null,
  };

  visitRequests = [
    {
      title: "Title",
      shortDescription: "Short Description",
      officeType: "privateOffice",
      priceMonthly: 2000,
      rating: 3.5,
      refId: 0,
      coverPhotos: [
        {
          desktop: {
            bucketPath:
              "https://rentglobal.s3.us-east-2.amazonaws.com/2020/3/22878a03e36d233e2a/blob",
          },
        },
      ],
      visitRequest: {
        start: new Date().setMonth(1),
        end: new Date().setMonth(2),
      },
    },
  ];

  /**
   * Navigate page
   * @member
   * @param {string} path Path to navigate
   */
  navigate = (path) => () => {
    this.props.navigate(path);
  };

  /** Goto previous step */
  handleBack = () => {
    this.props.navigate("/landlord/calendar");
  };

  handleFilterChange = ({ query }) => {
    this.setState({ query: query });
  };

  handleClickApproveVisitRequest = (visitRequest) => {
    this.setState({
      dialog: (
        <VisitRequestAcceptedDialog
          onClose={this.handleCloseDialog}
          onBack={this.handleBack}
        />
      ),
    });
  };

  handleClickRejectVisitRequest = (visitRequest) => {
    this.setState({
      dialog: (
        <DeleteConfirmDialog
          text={this.props.t("confirmDelete")}
          onClose={this.handleCloseDialog}
          onConfirm={() => this.handleRejectVisitRequest(visitRequest)}
        />
      ),
    });
  };

  handleCloseDialog = () => {
    this.setState({ dialog: null });
  };

  handleApproveVisitRequest = (visitRequest) => {
    /** Handle approve visit request by calling api */
    console.log(visitRequest);
  };

  handleRejectVisitRequest = (visitRequest) => {
    /** Handle reject visit request by calling api */
    console.log(visitRequest);
  };

  /**
   * Renderer function
   */
  render() {
    const { classes: s, t, width } = this.props;
    const {
      // visitRequests,
      query,
      page,
      totalLength,
      dialog,
    } = this.state;

    const pageCount = Math.ceil(totalLength / OFFICES_PER_PAGE);

    return (
      <Column
        classes={{ box: s.root }}
        fullWidth
        alignChildrenStart
        paddingTopDouble
        paddingBottomDouble
      >
        <Row fullWidth style={{ marginBottom: 36 }}>
          {/** title */}
          <Typography fontSizeM textSecondary>
            {t("calendar")}
          </Typography>
          <Stretch />
          <Button
            link='secondary'
            background='secondaryLight'
            onClick={this.handleBack}
          >
            <KeyboardBackspace />
            <Typography paddingLeft fontSizeS>
              {t("back")}
            </Typography>
          </Button>
        </Row>

        <Typography textMediumGrey fontSizeS style={{ marginBottom: 22 }}>
          {t("allVisitRequests") + ` (${this.visitRequests.length})`}
        </Typography>

        <Row fullWidth style={{ marginBottom: 42 }}>
          <SearchbarWithSorter
            query={query}
            title={t("searchOnRequests")}
            onChange={this.handleFilterChange}
          />
        </Row>

        {!isWidthDown("xs", width) && (
          <React.Fragment>
            <div
              className={s.visitRequests}
              style={{
                marginBottom: 40,
                height: "auto",
              }}
            >
              <Grid
                container
                direction='row'
                spacing={2}
                wrap='wrap'
                className={s.visitRequests}
              >
                <Grid item xs={12}>
                  <Column classes={{ box: s.visitRequestsList }} fullWidth>
                    {this.visitRequests.map((visitRequest, index) => (
                      <React.Fragment key={index}>
                        {index > 0 && <Divider />}
                        <Row
                          fullWidth
                          classes={{ box: s.visitRequestsListItemWrapper }}
                        >
                          <VisitRequestItem
                            visitRequest={visitRequest}
                            onApprove={() =>
                              this.handleClickApproveVisitRequest(visitRequest)
                            }
                            onReject={() =>
                              this.handleClickRejectVisitRequest(visitRequest)
                            }
                            fullWidth
                            horizontal={!isWidthDown("xs", width)}
                          />
                        </Row>
                      </React.Fragment>
                    ))}
                  </Column>
                </Grid>
              </Grid>
            </div>
          </React.Fragment>
        )}

        <div className={s.visitRequests}>
          <Grid container>
            <Grid item xs={12}>
              <Divider />
              <Column>
                <Pagination
                  count={pageCount}
                  shape='rounded'
                  classes={{ root: s.pagination }}
                  onChange={this.handleChangePage}
                  page={page}
                />
              </Column>
            </Grid>
          </Grid>
        </div>

        {/** Show dialog */}
        {dialog}
      </Column>
    );
  }
}

export default withRouter(
  withWidth()(withStyles(styleSheet)(withTranslation("common")(VisitRequests)))
);
