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

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

/* eslint-disable react/prefer-stateless-function */
class PsychologicChart extends React.Component {
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
