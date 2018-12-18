/**
 * Author: Duong Han
 * HUST
 * NeoTable
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Skeleton, Table, Icon } from 'antd';

import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import messages from './messages';

import columnOptions from './columnOptions';

/* eslint-disable react/prefer-stateless-function */
class NeoTable extends React.Component {
  state = {
    loading: false,
    data: [],
  };

  render() {
    const { formatMessage } = this.props.intl;

    const columns = columnOptions(
      formatMessage,
      this.isEditing,
      this.handleUpdate,
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
      <Skeleton loading={this.state.loading} active>
        <Table
          bordered
          rowKey={record => record.id}
          dataSource={this.state.data}
          columns={columns}
          title={() => (
            <h3 style={{ color: '#FA541C' }}>
              <strong>{formatMessage(messages.header)}</strong>
            </h3>
          )}
          size="middle"
          rowClassName="editable-row"
          scroll={{ x: 715 }}
        />
      </Skeleton>
    );
  }
}

NeoTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(NeoTable);
