/**
 * Author: Duong Han
 * HUST
 * GroupTable
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import { Table, Skeleton, Icon } from 'antd';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import EditableFormRow from '../../../../../../utils/EditableFormRow';
import EditableCell from '../../../../../../utils/EditableCell';
import columnOptions from './columnOptions';
import { setCurrentGroup } from '../../../../actions';
import AddGroupForm from './AddGroupForm';
import './styles.css';

/* eslint-disable react/prefer-stateless-function */
class GroupTable extends React.Component {
  state = {
    loading: false,
    visible: false,
    data: [],
    editingKey: '',
  };

  componentDidMount() {
    this.fetchSurveys();
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

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
            numofChild: group.childs.length,
            children: group.childs.map(child => ({
              id: child._id,
              inputType: child.inputType,
              name: child.name,
            })),
          })),
          loading: false,
        });
      });
  };

  isEditing = record => record.id === this.state.editingKey;

  edit = id => {
    this.setState({ editingKey: id });
  };

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = (form, id) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      // update in UI
      const newData = [...this.state.data];

      const index = newData.findIndex(item => {
        if (item.numofChild > 0) {
          if (id === item.id) return true;
          item.children.findIndex(child => id === child.id);
        }
        return id === item.id;
      });

      console.log(index);

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

  handleDelete = id => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
  };

  viewQuestion = (id, name) => {
    this.props.setCurrentGroup(id, name);
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
      this.viewQuestion,
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
      <Skeleton loading={this.state.loading}>
        <Table
          bordered
          components={components}
          rowKey={record => record.id}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>
              <a onClick={this.showModal} style={{ float: 'right' }}>
                <Icon type="plus" style={{ fontSize: 20, color: '#FA541C' }} />
              </a>
            </h3>
          )}
          size="middle"
          rowClassName="editable-row"
        />

        <AddGroupForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </Skeleton>
    );
  }
}

GroupTable.propTypes = {
  intl: intlShape.isRequired,
  surveyId: PropTypes.string.isRequired,
  setCurrentGroup: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

const mapDispatchToProps = dispatch => ({
  setCurrentGroup: (groupId, groupName) =>
    dispatch(setCurrentGroup(groupId, groupName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GroupTable));
