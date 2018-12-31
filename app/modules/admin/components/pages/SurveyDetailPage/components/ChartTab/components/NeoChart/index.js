/**
 * Author: Duong Han
 * HUST
 * NeoChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Icon, Tooltip } from 'antd';
import download from 'downloadjs';
import axios from 'axios';
import { config } from 'utils/setAuthToken';
import { HorizontalBar } from 'react-chartjs-2';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const data = {
  datasets: [
    {
      label: 'Thấp',
      backgroundColor: 'rgba(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
    },
    {
      label: 'Trung bình',
      backgroundColor: 'rgba(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
    },
    {
      label: 'Cao',
      backgroundColor: 'rgba(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132)',
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
          labelString: 'Kiểu nhân cách',
        },
        barThickness: 'flex',
      },
    ],
  },
};

/* eslint-disable react/prefer-stateless-function */
class NeoChart extends React.Component {
  downloadExcelFile = () => {
    axios
      .post(
        '/api/excel/neo/chart',
        { data: this.props.fetchedData },
        { ...config, responseType: 'blob' },
      )
      .then(res => download(res.data, `Bieu_do_du_doan_nhan_cach.xlsx`));
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>
          <FormattedMessage {...messages.header} />

          <Tooltip title={formatMessage(messages.download)}>
            <a onClick={this.downloadExcelFile} style={{ float: 'right' }}>
              <Icon
                type="download"
                style={{ fontSize: 20, color: '#FA541C' }}
              />
            </a>
          </Tooltip>
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

NeoChart.propTypes = {
  fetchedData: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(NeoChart);
