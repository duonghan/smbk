/**
 * Author: Duong Han
 * HUST
 * SurveyPage
 *
 */

import React from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { injectIntl, intlShape } from 'react-intl';
import { config } from 'utils/setAuthToken';
import messages from './messages';
import columnOptions from './columnOptions';
import EditableFormRow from '../../utils/EditableFormRow';
import EditableCell from '../../utils/EditableCell';

/* eslint-disable react/prefer-stateless-function */
class SurveyTable extends React.Component {
  state = {
    loading: false,
    data: [],
    editingKey: '',
  };

  componentDidMount() {
    this.fetchSurveys();
  }

  fetchSurveys = () => {
    this.setState({ loading: true });

    axios.get('/api/survey/all', config).then(res => {
      this.setState({
        data: res.data.map((survey, index) => ({
          key: index + 1,
          id: survey._id,
          name: survey.name,
          cover: survey.cover,
          title: survey.title,
          date: survey.date,
          lastUpdate: survey.lastUpdate,
        })),
        loading: false,
      });
    });
  };

  isEditing = record => record.key === this.state.editingKey;

  edit = key => {
    this.setState({ editingKey: key });
  };

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      // update in UI
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }

      // update survey name in db
      axios.post('/api/survey/update', newData[index], config).then(res => {});
    });
  };

  render() {
    const { formatMessage } = this.props.intl;

    const components = { body: { row: EditableFormRow, cell: EditableCell } };

    const columns = columnOptions(
      formatMessage,
      this.isEditing,
      this.save,
      this.cancel,
      this.edit,
      this.handleDelete,
    ).map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <div>
        <Helmet title={formatMessage(messages.header)} />
        <Table
          bordered
          components={components}
          rowKey={record => record.id}
          loading={this.state.loading}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C', textAlign: 'center' }}>
              <strong>{formatMessage(messages.header)}</strong>
            </h3>
          )}
          size="middle"
          rowClassName="editable-row"
        />
      </div>
    );
  }
}

SurveyTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SurveyTable);
