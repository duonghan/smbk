/**
 * Author: Duong Han
 * HUST
 * RiasecTable
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import config from 'utils/validation/config';
import download from 'downloadjs';
import axios from 'axios';

import { Icon, Table } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import columnOptions from './columnOptions';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class RiasecTable extends React.Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchResponse();
  }

  fetchResponse = () => {
    axios
      .get(`/api/survey/responses?name=riasec&type=report`, config)
      .then(res => {
        const data = res.data.map((i, key) => {
          const eachRow = {
            name: i.userName,
            key,
            date: i.date,
          };

          i.results.map(it => {
            switch (it.item) {
              case 'Thuyết phục':
                eachRow.convince = it.value;
                break;
              case 'Quy tắc':
                eachRow.rule = it.value;
                break;
              case 'Khám phá':
                eachRow.discover = it.value;
                break;
              case 'Nghệ thuật':
                eachRow.art = it.value;
                break;
              case 'Hiện thực':
                eachRow.realistic = it.value;
                break;
              case 'Xã hội':
                eachRow.society = it.value;
                break;
              default:
                break;
            }
          });
          console.log(eachRow);

          return eachRow;
        });

        this.setState({ data, loading: false });
      });
  };

  downloadExcelFile = formatMessage => {
    // const data = {
    //   ...excelData,
    //   labels: excelData.labels.map(label => formatMessage(messages[label])),
    // };
    // axios
    //   .post(
    //     '/api/excel/psychological/response',
    //     { data },
    //     { ...config, responseType: 'blob' },
    //   )
    //   .then(res =>
    //     download(res.data, `${this.props.surveyName}_response_table.xlsx`),
    //   );
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
        scroll={{ x: 800 }}
      />
    );
  }
}

RiasecTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(RiasecTable);
