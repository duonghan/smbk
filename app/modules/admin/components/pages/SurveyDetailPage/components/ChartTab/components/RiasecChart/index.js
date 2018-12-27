/**
 * Author: Duong Han
 * HUST
 * RiasecChart
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

const data = {
  datasets: [
    {
      label: 'Không gặp vấn đề',
      backgroundColor: 'rgba(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
    },
    {
      label: 'Nguy cơ',
      backgroundColor: 'rgba(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
    },
    {
      label: 'Nên gặp chuyên gia',
      backgroundColor: 'rgba(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
    },
  ],
};

/* eslint-disable react/prefer-stateless-function */
class RiasecChart extends React.Component {
  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

RiasecChart.propTypes = {};

export default RiasecChart;
