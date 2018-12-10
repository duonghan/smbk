/**
 * Author: Duong Han
 * HUST
 * MocChart
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import axios from 'axios';
import config from 'utils/validation/config';
import { Skeleton } from 'antd';

import { Bar } from 'react-chartjs-2';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';

const plugins = [
  {
    beforeInit: function(chart) {
      chart.data.labels.forEach((e, i, a) => {
        if (/\n/.test(e)) {
          a[i] = e.split(/\n/);
        }
      });
    },
  },
];

/* eslint-disable react/prefer-stateless-function */
class MocChart extends React.Component {
  state = {
    chartData: [],
    loading: true,
  };

  componentDidMount() {
    this.fetchChartData(this.props.surveyId);
  }

  fetchChartData = surveyId => {
    axios.get(`/api/chart/moc?survey=${surveyId}`, config).then(res => {
      return this.setState({ chartData: res.data, loading: false });
    });
  };

  render() {
    return (
      <Skeleton loading={this.state.loading} active>
        {this.state.chartData.map(data => (
          <div style={{ margin: 10 }}>
            <h2>{data.name}</h2>
            <Bar data={data} plugins={plugins} />
          </div>
        ))}
      </Skeleton>
    );
  }
}

MocChart.propTypes = {
  surveyId: PropTypes.string,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

export default connect(mapStateToProps)(injectIntl(MocChart));
