/**
 * Author: Duong Han
 * HUST
 * PsychologicChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import config from 'utils/validation/config';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Bình thường',
      backgroundColor: '#3fb68e',
      borderColor: '#3fb68e',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
    {
      label: 'Nguy cơ',
      backgroundColor: '#367dc4',
      borderColor: '#367dc4',
      data: [20, 30, 45, 0, 10, 5, 2],
    },
    {
      label: 'Nên gặp chuyên gia',
      backgroundColor: '#0e8c62',
      borderColor: '#0e8c62',
      data: [5, 2, 20, 0, 10, 30, 45],
    },
  ],
};

/* eslint-disable react/prefer-stateless-function */
class PsychologicChart extends React.Component {
  componentWillMount() {
    this.fetchPsychologicalChart();
  }

  fetchPsychologicalChart = () => {
    axios.get('/api/chart/psychological', config).then(res => {
      data.labels = res.data[0][1].map(item => item[0]);

      res.data.map((item, index) => {
        data.datasets[index].label = item[0];
        data.datasets[index].data = item[1].map(_ => _[1]);
      });
    });
  };

  render() {
    return (
      <div>
        <Bar data={data} />
      </div>
    );
  }
}

PsychologicChart.propTypes = {};

export default PsychologicChart;
