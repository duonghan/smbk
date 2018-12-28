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
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import columnOptions from './columnOptions';
import messages from './messages';

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
      this.setState(prevState => ({
        rawData: res.data,
        loading: false,
        data: this.refineData(prevState.gender, res.data),
      }));
    });
  };

  refineData = (gender, rawData) => {
    return rawData.map((i, key) => {
      const eachRow = {
        name: i.userName,
        key,
        date: i.date,
      };

      i.results.map(it => {
        switch (it.item) {
          case 'Dễ chấp nhận':
            eachRow.ezAccept = it.value;
            break;
          case 'Tận tâm':
            eachRow.conscientious = it.value;
            break;
          case 'Cởi mở, ham học hỏi':
            eachRow.openMinded = it.value;
            break;
          case 'Nhiễu tâm':
            eachRow.noise = it.value;
            break;
          case 'Hướng ngoại':
            eachRow.outward = it.value;
            break;
          default:
            break;
        }
      });

      return eachRow;
    });
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
};

export default injectIntl(NeoTable);
