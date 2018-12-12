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
import { Table, Skeleton, Icon, Modal } from 'antd';
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
    parentId: '',
  };

  componentDidMount() {
    this.fetchQuestionGroup();
  }

  createParentGr = () => {
    this.setState({ visible: true });
  };

  createPChildGr = parentId => {
    this.setState({ visible: true, parentId });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreateGroup = () => {
    const { form } = this.formRef.props;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      const data = { ...values, surveyId: this.props.surveyId };
      if (this.state.parentId) data.parent = this.state.parentId;

      axios.post('/api/survey/question-groups', data, config).then(() => {
        Modal.success({
          title: this.props.intl.formatMessage(messages.successTitle),
          content: this.props.intl.formatMessage(messages.addSuccessContent),
        });

        this.fetchQuestionGroup();
      });

      form.resetFields();
      this.setState({
        visible: false,
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  fetchQuestionGroup = () => {
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
              parent: child.parent,
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

      axios
        .put('/api/survey/question-groups', { ...row, id }, config)
        .then(res => {
          this.setState({ editingKey: '' });
          this.fetchQuestionGroup();

          Modal.success({
            title: this.props.intl.formatMessage(messages.successTitle),
            content: this.props.intl.formatMessage(
              messages.updateSuccessContent,
            ),
          });
        });
    });
  };

  handleDelete = id => {
    axios
      .delete('/api/survey/question-groups/', {
        ...config,
        data: {
          id,
        },
      })
      .then(res => {
        if (res.data.success) {
          this.fetchQuestionGroup();
          Modal.success({
            title: this.props.intl.formatMessage(messages.successTitle),
            content: this.props.intl.formatMessage(
              messages.deleteSuccessContent,
            ),
          });
        }
      });
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
      this.createPChildGr,
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
      <Skeleton loading={this.state.loading} active>
        <Table
          bordered
          components={components}
          rowKey={record => record.id}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>
              <a onClick={this.createParentGr} style={{ float: 'right' }}>
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
          onCreate={this.handleCreateGroup}
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
