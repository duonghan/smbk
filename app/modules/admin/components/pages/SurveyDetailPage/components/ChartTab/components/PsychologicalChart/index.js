/**
 * Author: Duong Han
 * HUST
 * PsychologicalChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { HorizontalBar } from 'react-chartjs-2';
import axios from 'axios';
import config from 'utils/validation/config';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const data = {
  datasets: [
    {
      label: 'Không gặp vấn đề',
      backgroundColor: '#3fb68e',
      borderColor: '#3fb68e',
    },
    {
      label: 'Nguy cơ',
      backgroundColor: '#367dc4',
      borderColor: '#367dc4',
    },
    {
      label: 'Nên gặp chuyên gia',
      backgroundColor: '#0e8c62',
      borderColor: '#0e8c62',
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Số lượng',
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Kiểu tâm lý',
        },
      },
    ],
  },
};

/* eslint-disable react/prefer-stateless-function */
class PsychologicChart extends React.Component {
  render() {
    console.log('fetched data is ', this.props.fetchedData);

    return (
      <div>
        <HorizontalBar
          data={{ ...data, ...this.props.fetchedData }}
          options={options}
        />
      </div>
    );
  }
}

PsychologicChart.propTypes = {
  fetchedData: PropTypes.array.isRequired,
};

export default PsychologicChart;
