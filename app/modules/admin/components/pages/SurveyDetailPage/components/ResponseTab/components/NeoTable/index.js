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
import { Table, Radio } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import columnOptions from './columnOptions';
import messages from './messages';

const RadioGroup = Radio.Group;

/* eslint-disable react/prefer-stateless-function */
class NeoTable extends React.Component {
  state = {
    loading: true,
    data: [],
    gender: 'male',
    rawData: [],
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

      i.results.filter(item => item.gender === gender).map(it => {
        switch (it.item.toUpperCase()) {
          case 'DỄ CHẤP NHẬN':
            eachRow.ezAccept = it.value;
            break;
          case 'TẬN TÂM':
            eachRow.conscientious = it.value;
            break;
          case 'CỞI MỞ, HAM HỌC HỎI':
            eachRow.openMinded = it.value;
            break;
          case 'NHIỄU TÂM':
            eachRow.noise = it.value;
            break;
          case 'HƯỚNG NGOẠI':
            eachRow.outward = it.value;
            break;
          default:
            break;
        }
      });

      return eachRow;
    });
  };

  onChange = e => {
    this.setState(prevState => ({
      gender: e.target.value,
      data: this.refineData(e.target.value, prevState.rawData),
    }));
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
            <RadioGroup
              onChange={this.onChange}
              value={this.state.gender}
              style={{ float: 'right' }}
            >
              <Radio value="male">
                <FormattedMessage {...messages.male} />
              </Radio>
              <Radio value="female">
                <FormattedMessage {...messages.female} />
              </Radio>
            </RadioGroup>
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
