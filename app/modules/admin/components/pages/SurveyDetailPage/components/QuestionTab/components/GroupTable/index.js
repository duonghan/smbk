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
import { Table, Skeleton, message, Tooltip, Icon, Modal } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import { config } from 'utils/setAuthToken';
import messages from './messages';
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
    editingKey: {},
    parentId: '',
  };

  componentDidMount() {
    this.fetchQuestionGroup();
  }

  createParentGr = () => {
    this.setState({ visible: true, editingKey: {} });
  };

  createPChildGr = parentId => {
    if(this.props.surveyName === 'neo'){
      message.error(this.props.intl.formatMessage(messages.neoErrorMsg));
      return;
    }

    this.setState({ visible: true, parentId, editingKey: {} });
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

      const data = {
        id: this.state.editingKey.id || '',
        ...values,
        surveyId: this.props.surveyId,
      };

      if (this.state.parentId) data.parent = this.state.parentId;

      axios.post('/api/survey/question-groups', data, config).then(() => {
        Modal.success({
          title: this.props.intl.formatMessage(messages.successTitle),
          content: this.state.editingKey.id
            ? this.props.intl.formatMessage(messages.updateSuccessContent)
            : this.props.intl.formatMessage(messages.addSuccessContent),
        });

        this.fetchQuestionGroup();
        this.setState({ parentId: '' });
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
            optionAnswers: group.optionAnswers,
            children: group.childs.map(child => ({
              id: child._id,
              inputType: child.inputType,
              name: child.name,
              parent: child.parent,
              optionAnswers: child.optionAnswers,
            })),
          })),
          loading: false,
        });
      });
  };

  edit = record => {
    this.setState({
      editingKey: {
        id: record.id,
        name: record.name,
        inputType: record.inputType,
        optionAnswers: record.optionAnswers,
      },
      visible: true,
    });
  };

  handleDelete = id => {
    if(this.props.surveyName === 'neo'){
      message.error(this.props.intl.formatMessage(messages.neoErrorMsg));
      return;
    }

    axios
      .delete('/api/survey/question-groups/', {
        ...config,
        data: {
          id,
        },
      })
      .then(res => {
        if (res.data.success) {
          Modal.success({
            title: this.props.intl.formatMessage(messages.successTitle),
            content: this.props.intl.formatMessage(
              messages.deleteSuccessContent,
            ),
          });

          this.fetchQuestionGroup();
          this.setCurrentGroup(null, null);
        }
      });
  };

  viewQuestion = (id, name) => {
    this.props.setCurrentGroup(id, name);
  };

  render() {
    const { formatMessage } = this.props.intl;

    const columns = columnOptions(
      formatMessage,
      this.edit,
      this.handleDelete,
      this.viewQuestion,
      this.createPChildGr,
    );

    return (
      <Skeleton loading={this.state.loading} active>
        <Table
          bordered
          rowKey={record => record.id}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>

              {this.props.surveyName !== 'neo' &&
                this.props.surveyName !== 'riasec' && (
                  <Tooltip title={formatMessage(messages.addGroup)}>
                    <a onClick={this.createParentGr} style={{ float: 'right' }}>
                      <Icon
                        type="plus"
                        style={{ fontSize: 20, color: '#FA541C' }}
                      />
                    </a>
                  </Tooltip>
                )}
            </h3>
          )}
          size="middle"
          scroll={{ x: 715 }}
          rowClassName="editable-row"
        />

        <AddGroupForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreateGroup}
          group={this.state.editingKey}
        />
      </Skeleton>
    );
  }
}

GroupTable.propTypes = {
  intl: intlShape.isRequired,
  surveyId: PropTypes.string.isRequired,
  setCurrentGroup: PropTypes.func.isRequired,
  surveyName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
  surveyName: state.getIn(['surveyDetail', 'surveyName']),
});

const mapDispatchToProps = dispatch => ({
  setCurrentGroup: (groupId, groupName) =>
    dispatch(setCurrentGroup(groupId, groupName)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(GroupTable));
