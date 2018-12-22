/**
 * Author: Duong Han
 * HUST
 * PsychologicTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { Skeleton, Table } from 'antd';
import axios from 'axios';
import config from 'utils/validation/config';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';
import columnOptions from './columnOptions';

/* eslint-disable react/prefer-stateless-function */
class PsychologicTable extends React.Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchResponse();
  }

  fetchResponse = () => {
    axios
      .get(
        `/api/survey/responses?name=psychological&user=${this.props.user}`,
        config,
      )
      .then(res => {
        const data = res.data.map((i, key) => {
          const eachRow = {
            name: i.userName,
            key,
            date: i.date,
          };

          i.results.map(it => {
            switch (it.item) {
              case 'Stress':
                eachRow.stress = it.value;
                break;
              case 'Lo âu':
                eachRow.worry = it.value;
                break;
              case 'Trầm cảm':
                eachRow.depression = it.value;
                break;
              case 'Khó tập trung':
                eachRow.concentrating = it.value;
                break;
              case 'Tăng động':
                eachRow.crazy = it.value;
                break;
              case 'Khó khăn về giao tiếp xã hội':
                eachRow.socialInteraction = it.value;
                break;
              case 'Khó khăn học tập':
                eachRow.study = it.value;
                break;
              case 'Khó khăn trong định hướng nghề nghiệp':
                eachRow.work = it.value;
                break;
              case 'Khó khăn trong mối quan hệ với cha mẹ':
                eachRow.parent = it.value;
                break;
              case 'Khó khăn trong mối quan hệ với thầy cô':
                eachRow.teacher = it.value;
                break;
              case 'Hành vi thách thức – chống đối':
                eachRow.against = it.value;
                break;
              case 'Rối loạn hành vi ứng xử':
                eachRow.behavior = it.value;
                break;
              case 'Gây hấn':
                eachRow.fight = it.value;
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
      <Skeleton loading={this.state.loading} active>
        <Table
          bordered
          rowKey={record => record.key}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>
            </h3>
          )}
          size="middle"
          scroll={{ x: 3000 }}
        />
      </Skeleton>
    );
  }
}

PsychologicTable.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.string.isRequired,
};

export default injectIntl(PsychologicTable);
