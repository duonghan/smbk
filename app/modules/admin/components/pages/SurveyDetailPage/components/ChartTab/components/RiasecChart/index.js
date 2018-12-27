/**
 * Author: Duong Han
 * HUST
 * RiasecChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Icon } from 'antd';
import { HorizontalBar } from 'react-chartjs-2';
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
        <h2 style={{ textAlign: 'center' }}>
          <FormattedMessage {...messages.header} />

          <a onClick={this.downloadExcelFile} style={{ float: 'right' }}>
            <Icon type="download" style={{ fontSize: 20, color: '#FA541C' }} />
          </a>
        </h2>

        <br />
        <HorizontalBar data={{ ...data, ...this.props.fetchedData }} />
      </div>
    );
  }
}

RiasecChart.propTypes = {
  fetchedData: PropTypes.object.isRequired,
};

export default RiasecChart;
