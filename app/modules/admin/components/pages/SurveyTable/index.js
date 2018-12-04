/**
 * Author: Duong Han
 * HUST
 * SurveyTable
 *
 */

import React from 'react';
import { Table, Icon, Divider, Popover } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
// import styled from 'styled-components';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
class SurveyTable extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  componentDidMount() {
    this.fetchSurveys();
  }

  columns = () => [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: this.props.intl.formatMessage(messages.titleLabel),
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.length - b.title.length,
      align: 'center',
    },
    {
      title: this.props.intl.formatMessage(messages.dateLabel),
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a) > new Date(b),
      align: 'center',
    },
    {
      title: this.props.intl.formatMessage(messages.updateLabel),
      dataIndex: 'lastUpdate',
      key: 'lastUpdate',
      sorter: (a, b) => new Date(a) > new Date(b),
      align: 'center',
    },
    {
      title: this.props.intl.formatMessage(messages.actionLabel),
      dataIndex: 'action',
      key: 'action',
      align: 'center',
    },
  ];

  fetchSurveys = () => {
    this.setState({ loading: true });

    axios.get('/api/survey/all', config).then(res => {
      this.setState({
        data: res.data.map((survey, index) => ({
          key: index + 1,
          id: survey._id,
          name: survey.name,
          title: survey.title,
          date: new Date(survey.date).toLocaleDateString('vi-VN'),
          lastUpdate: new Date(survey.lastUpdate).toLocaleDateString('vi-VN'),
        })),
        loading: false,
      });
    });
  };

  render() {
    return (
      <Table
        bordered
        rowKey={record => record.id}
        onRow={record => {
          return {
            onClick: () =>
              this.props.history.push({
                pathname: '/admin/survey/detail',
                search: `?survey=${record.name}`,
                state: { id: record.id },
              }),
          };
        }}
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={this.columns()}
        title={() => (
          <strong>{this.props.intl.formatMessage(messages.header)}</strong>
        )}
        size="middle"
        rowClassName="editable-row"
      />
    );
  }
}

SurveyTable.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
};

export default injectIntl(SurveyTable);
