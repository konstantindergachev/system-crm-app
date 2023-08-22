import Chart from 'chart.js';
import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { createChartConfig } from '../../../helpers/createChartConfig';
import { ANALYTICS, MONEY } from '../../../constants';
import { moneyFormat } from '../../../helpers/moneyFormat';

import './AnalyticsContent.scss';

let lineGainChart;
let lineOrderChart;

class AnalyticsContent extends PureComponent {
  constructor(props) {
    super(props);
    this.refGainChart = React.createRef();
    this.refOrderChart = React.createRef();
  }
  componentDidMount() {
    const { gainConfig, orderConfig } = this.props;
    if (Object.keys(gainConfig).length > 0 && Object.keys(orderConfig).length > 0) {
      this.buildChart(gainConfig, orderConfig);
    }
  }
  componentDidUpdate() {
    const { gainConfig, orderConfig } = this.props;
    if (Object.keys(gainConfig).length > 0 && Object.keys(orderConfig).length > 0) {
      this.buildChart(gainConfig, orderConfig);
    }
  }

  buildChart = (gainConfig, orderConfig) => {
    const refGainLink = this.refGainChart.current.getContext('2d');
    const refOrderLink = this.refOrderChart.current.getContext('2d');
    if (typeof lineGainChart !== 'undefined' || typeof lineOrderChart !== 'undefined') {
      lineGainChart.destroy();
      lineOrderChart.destroy();
    }

    lineGainChart = new Chart(
      refGainLink,
      createChartConfig(gainConfig.labels, gainConfig.label, gainConfig.gains, gainConfig.color)
    );
    lineOrderChart = new Chart(
      refOrderLink,
      createChartConfig(
        orderConfig.labels,
        orderConfig.label,
        orderConfig.orders,
        orderConfig.color
      )
    );
  };
  render() {
    const { average } = this.props;

    return (
      <Fragment>
        <div className="page-title">
          <h4>{ANALYTICS.TITLE}</h4>
        </div>

        <div className="average-price">
          <p>
            {ANALYTICS.AVG_PRICE}:{' '}
            <strong>{moneyFormat(MONEY.LOCALE, MONEY.CURRENCY, average)}</strong>
          </p>
        </div>

        <div className="analytics-block pb3">
          <h5>{ANALYTICS.REVENUE}:</h5>
          <div className="linechart__container">
            <canvas ref={this.refGainChart} />
          </div>
        </div>
        <div className="analytics-block pb3">
          <h5>{ANALYTICS.ORDER}:</h5>
          <div className="linechart__container">
            <canvas ref={this.refOrderChart} />
          </div>
        </div>
      </Fragment>
    );
  }
}

AnalyticsContent.propTypes = {
  gainConfig: PropTypes.object.isRequired,
  orderConfig: PropTypes.object.isRequired,
  average: PropTypes.number,
};

export default AnalyticsContent;
