/**
 * Author: Duong Han
 * HUST
 * NeoTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Table, Radio } from 'antd';
import axios from 'axios';
import { config } from 'utils/setAuthToken';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

import columnOptions from './columnOptions';
const RadioGroup = Radio.Group;

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
    axios
      .get(`/api/survey/responses?name=neo&user=${this.props.user}`, config)
      .then(res => {
        const data = res.data.map((i, key) => {
          const eachRow = {
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
        this.setState({ data, loading: false });
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
  user: PropTypes.string.isRequired,
};

export default injectIntl(NeoTable);
