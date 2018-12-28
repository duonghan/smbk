/**
 * Author: Duong Han
 * HUST
 * NeoTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import config from 'utils/validation/config';
import { Icon, Table } from 'antd';
import download from 'downloadjs';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import columnOptions from './columnOptions';
import messages from './messages';

const excelData = {
  labels: [
    'nameLabel',
    'noiseLabel',
    'outwardLabel',
    'openMindedLabel',
    'ezAcceptLabel',
    'conscientiousLabel',
    'dateLabel',
  ],
  values: [],
};

/* eslint-disable react/prefer-stateless-function */
class NeoTable extends React.Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchResponse();
  }

  fetchResponse = () => {
    axios.get(`/api/survey/responses?name=neo`, config).then(res => {
      const data = res.data.map((i, key) => {
        const eachRow = {
          name: i.userName,
          key,
          date: i.date,
        };

        const rowExcelData = new Array(7).fill(0);
        rowExcelData[0] = i.userName;
        rowExcelData[6] = new Date(i.date).toLocaleString('vi-VN');

        i.results.map(it => {
          switch (it.item) {
            case 'Dễ chấp nhận':
              eachRow.ezAccept = it.value;
              rowExcelData[1] = it.value;
              break;
            case 'Tận tâm':
              eachRow.conscientious = it.value;
              rowExcelData[2] = it.value;
              break;
            case 'Cởi mở, ham học hỏi':
              eachRow.openMinded = it.value;
              rowExcelData[3] = it.value;
              break;
            case 'Nhiễu tâm':
              eachRow.noise = it.value;
              rowExcelData[4] = it.value;
              break;
            case 'Hướng ngoại':
              eachRow.outward = it.value;
              rowExcelData[5] = it.value;
              break;
            default:
              break;
          }
        });

        excelData.values.push(rowExcelData);
        return eachRow;
      });

      this.setState({
        loading: false,
        data,
      });
    });
  };

  downloadExcelFile = formatMessage => {
    const data = {
      ...excelData,
      labels: excelData.labels.map(label => formatMessage(messages[label])),
    };

    axios
      .post(
        '/api/excel/neo/response',
        { data },
        { ...config, responseType: 'blob' },
      )
      .then(res => download(res.data, 'Thong_ke_trac_nghiem_nhan_cach.xlsx'));
  };

  render() {
    const { formatMessage } = this.props.intl;
    const columns = columnOptions(formatMessage);

    return (
      <Table
        bordered
        rowKey={record => record.key}
        dataSource={this.state.data}
        loading={this.state.loading}
        columns={columns}
        title={() => (
          <h3 style={{ color: '#FA541C' }}>
            <strong>{formatMessage(messages.header)}</strong>

            <a
              onClick={() => this.downloadExcelFile(formatMessage)}
              style={{ float: 'right' }}
            >
              <Icon
                type="download"
                style={{ fontSize: 20, color: '#FA541C' }}
              />
            </a>
          </h3>
        )}
        size="middle"
        scroll={{ x: 715 }}
      />
    );
  }
}

NeoTable.propTypes = {
  intl: intlShape.isRequired,
  surveyName: PropTypes.string,
};

export default injectIntl(NeoTable);
