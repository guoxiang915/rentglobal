import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import { Card } from "@material-ui/core";
import {
  Row,
  Column,
  Stretch,
  Box,
  Button,
  Typography,
  DownloadIcon
} from "../base-components";
import { getReportByOffice } from "../../api/endpoints";
import { months } from "../../utils/constants";
import ReactHighcharts from "react-highcharts";

const StatInfoCard = withStyles(() => ({
  card: {
    width: 192,
    height: 116,
    padding: 20
  },
  title: {},
  value: {
    marginTop: 24
  }
}))(({ classes: s, title, value, onClick }) => (
  <Card
    variant="outlined"
    className={s.card}
    onClick={() => {
      if (onClick) {
        onClick();
      }
    }}
  >
    <Column fullWidth>
      <Typography textSecondary fontSizeS classes={{ box: s.title }}>
        {title}
      </Typography>
      <Typography textPrimary fontSizeXL classes={{ box: s.value }}>
        {value}
      </Typography>
    </Column>
  </Card>
));

const styleSheet = theme => ({
  root: {},

  graphPanel: {
    background: theme.colors.primary.white,
    borderRadius: 8,
    padding: 32
  },

  reportChart: {
    width: "700px !important",
    height: "500px !important",
    [theme.breakpoints.down("sm")]: {
      width: "600px !important"
    },
    [theme.breakpoints.down("xs")]: {
      width: "400px !important"
    }
  }
});

class OfficeReport extends React.Component {
  static propTypes = {
    officeId: PropTypes.string.isRequired,
    classes: PropTypes.object,
    t: PropTypes.func,
    width: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      report: null,
      currentYear: new Date().getFullYear()
    };
    if (getReportByOffice) {
      getReportByOffice(props.officeId).then(response => {
        if (response.status === 200) {
          this.setState({ report: response.data });
        }
      });
    }
  }

  handleChangeYear = currentYear => this.setState({ currentYear });

  handleExcelExport = () => {};

  render() {
    const { classes: s, t } = this.props;
    const { report, currentYear } = this.state;

    if (!report) {
      return null;
    }

    const stats = [
      {
        title: t("totalVisit"),
        value: report?.visit?.reduce((a, b) => a + b.count, 0)
      },
      {
        title: (
          <React.Fragment>
            {t("totalLease")}&nbsp;
            <Typography textMediumGrey fontSizeXS>
              {t("day")}
            </Typography>
          </React.Fragment>
        ),
        value: report?.lease?.reduce((a, b) => a + b.count, 0)
      },
      {
        title: t("totalView"),
        value: (
          <Typography textMediumGrey>
            {report?.view?.reduce((a, b) => a + b.count, 0)}
          </Typography>
        )
      },
      {
        title: t("totalIncome"),
        value: `$${Math.floor(
          report?.income?.reduce((a, b) => a + b.count, 0) / 1000
        )}K`
      }
    ];

    let years = [];
    Object.values(report).forEach(stat =>
      stat.forEach(item => years.push(item.year))
    );
    years = [...new Set(years)];

    const chartConfig = {
      chart: {
        type: "bar",
        className: s.reportChart
      },
      title: null,
      xAxis: {
        categories: months.map(m => t(m)),
        title: {
          text: null
        },
        labels: {
          style: {
            color: "#b9b9b9",
            fontSize: "15px"
          }
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: null
        },
        labels: {
          overflow: "justify",
          style: {
            color: "#b9b9b9",
            fontSize: "15px"
          }
        }
      },
      tooltip: {
        // valueSuffix: " millions"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: "Visit",
          data: months.map(
            (m, index) =>
              report?.visit?.find(
                v => v.year === currentYear && v.month === index
              )?.count || 0
          ),
          color: "rgb(253, 109, 159)"
        },
        {
          name: "Lease",
          data: months.map(
            (m, index) =>
              report?.lease?.find(
                v => v.year === currentYear && v.month === index
              )?.count || 0
          ),
          color: "rgb(99, 82, 155)"
        }
        // {
        //   name: "View",
        //   data: months.map(
        //     (m, index) =>
        //       report?.view?.find(
        //         v => v.year === currentYear && v.month === index
        //       )?.count || 0
        //   )
        // },
        // {
        //   name: "Income",
        //   data: months.map(
        //     (m, index) =>
        //       report?.income?.find(
        //         v => v.year === currentYear && v.month === index
        //       )?.count || 0
        //   )
        // }
      ]
    };

    return (
      <Column classes={{ box: s.root }} fullWidth alignChildrenStart>
        {/** Stat info cards */}
        <Row fullWidth style={{ marginBottom: 35 }} wrap>
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Box paddingLeftHalf />}
              <StatInfoCard title={stat.title} value={stat.value} />
            </React.Fragment>
          ))}
        </Row>

        {/** years */}
        <Row fullWidth paddingBottom alignChildrenEnd>
          <Typography
            textMediumGrey
            fontWeightBold
            fontSizeS
            paddingRightDouble
          >
            {t("lifeTime")}
          </Typography>
          {years.map(year => (
            <React.Fragment key={year}>
              <Typography
                textSecondary={year === currentYear}
                textMediumGrey={year !== currentYear}
                fontWeightBold
                fontSizeS
                paddingLeftHalf
                paddingRight
                style={{ cursor: "pointer" }}
                onClick={() => this.handleChangeYear(year)}
              >
                {year}
              </Typography>
            </React.Fragment>
          ))}
          <Stretch />
          <Button variant="primary" onClick={this.handleExcelExport} shadow>
            <DownloadIcon style={{ width: 13, height: 14 }} />
            <Typography paddingLeft>{t("excelExport")}</Typography>
          </Button>
        </Row>

        {/** Graph panel */}
        <Row fullWidth style={{ marginBottom: 50 }}>
          <Column fullWidth classes={{ box: s.graphPanel }}>
            <ReactHighcharts config={chartConfig} style={{ width: "100%" }} />
          </Column>
        </Row>
      </Column>
    );
  }
}

export default withStyles(styleSheet)(withTranslation()(OfficeReport));
