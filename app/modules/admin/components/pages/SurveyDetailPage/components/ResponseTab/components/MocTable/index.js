/**
 * Author: Duong Han
 * HUST
 * MocTable
 *
 */

import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import { Icon, Skeleton, Table } from 'antd';

import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import config from 'utils/validation/config';
import messages from './messages';
import EditableFormRow from '../../../../../../utils/EditableFormRow';
import EditableCell from '../../../../../../utils/EditableCell';
import columnOptions from './columnOptions';
import { fetchResponse } from '../../../../actions';

/* eslint-disable react/prefer-stateless-function */
class MocTable extends React.Component {
  state = {
    loading: false,
    data: [],
    editingKey: '',
  };

  componentDidMount() {
    this.props.fetchResponse(this.props.surveyId);
  }

  // fetchResponse = surveyId => {
  //   this.setState({ loading: true });
  //
  //   axios.get(`/api/survey/responses?survey=${surveyId}`, config).then(res => {
  //     this.setState({
  //       data: res.data.map(item => {
  //         const responseItem = {
  //           id: item._id,
  //           answers: item.answers,
  //         };
  //         if (item.profile) {
  //           responseItem.profile = item.profile;
  //         } else {
  //           responseItem.user = item.user;
  //         }
  //         return responseItem;
  //       }),
  //       loading: false,
  //     });
  //   });
  // };

  isEditing = record => record.orderNumber === this.state.editingKey;

  edit = orderNumber => {
    this.setState({ editingKey: orderNumber });
  };

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save = (form, orderNumber) => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }

      // update in UI
      const newData = [...this.state.data];
      const index = newData.findIndex(item => orderNumber === item.orderNumber);

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
    debugger;

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
                <Icon
                  type="file-excel"
                  style={{ fontSize: 20, color: '#FA541C' }}
                />
              </a>
            </h3>
          )}
          size="middle"
          rowClassName="editable-row"
        />
      </Skeleton>
    );
  }
}

MocTable.propTypes = {
  intl: intlShape.isRequired,
  surveyId: PropTypes.string,
  fetchResponse: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  surveyId: state.getIn(['surveyDetail', 'surveyId']),
});

const mapDispatchToProps = dispatch => ({
  fetchResponse: surveyId => dispatch(fetchResponse(surveyId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MocTable));
