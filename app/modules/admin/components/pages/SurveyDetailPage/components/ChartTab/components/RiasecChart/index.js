/**
 * Author: Duong Han
 * HUST
 * RiasecChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { HorizontalBar } from 'react-chartjs-2';
import { Rate } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const data = {
  datasets: [
    {
      label: '1',
      backgroundColor: 'rgba(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
    },
    {
      label: '2',
      backgroundColor: 'rgba(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
    },
  ],
};

/* eslint-disable react/prefer-stateless-function */
class RiasecChart extends React.Component {
  render() {
    return (
      <div>
        <HorizontalBar data={{ ...data, ...this.props.fetchedData }} />
      </div>
    );
  }
}

RiasecChart.propTypes = {};

export default RiasecChart;
