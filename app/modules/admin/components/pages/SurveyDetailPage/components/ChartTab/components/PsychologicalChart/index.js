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
import { Icon } from 'antd';
import download from 'downloadjs';
import axios from 'axios';
import config from 'utils/validation/config';

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
        barThickness: 'flex',
      },
    ],
  },
};

/* eslint-disable react/prefer-stateless-function */
class PsychologicChart extends React.Component {
  downloadExcelFile = () => {
    axios
      .post(
        '/api/excel/psychological/chart',
        { data: this.props.fetchedData },
        { ...config, responseType: 'blob' },
      )
      .then(res => download(res.data, `psychological_chart.xlsx`));
  };

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
