/**
 * Author: Duong Han
 * HUST
 * GroupTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import { Table } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import EditableFormRow from '../../../../../../utils/EditableFormRow';
import EditableCell from '../../../../../../utils/EditableCell';
import columnOptions from './columnOptions';
import connect from 'react-redux/es/connect/connect';
import { setCurrentGroup, setCurrentSurvey } from '../../../../actions';

/* eslint-disable react/prefer-stateless-function */
class GroupTable extends React.Component {
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

    axios
      .get(`/api/survey/question-groups/list/${this.props.surveyId}`, config)
      .then(res => {
        this.setState({
          data: res.data.map(group => ({
            id: group._id,
            name: group.name,
            inputType: group.inputType,
            children: group.childs.map(child => ({
              id: child._id,
              name: child.name,
            })),
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
      <Table
        bordered
        components={components}
        rowKey={record => record.id}
        loading={this.state.loading}
        dataSource={this.state.data}
        columns={columns}
        title={() => (
          <h3 style={{ color: '#FA541C' }}>
            <strong>{formatMessage(messages.header)}</strong>
          </h3>
        )}
        size="middle"
        rowClassName="editable-row"
      />
    );
  }
}

GroupTable.propTypes = {
  intl: intlShape.isRequired,
  surveyId: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

const mapDispatchToProps = dispatch => ({
  setCurrentGroup: groupId => dispatch(setCurrentGroup(groupId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GroupTable));
