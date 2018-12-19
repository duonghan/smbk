import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip, Tag } from 'antd';
import messages from './messages';
import { styles } from '../../../../../../utils/styles';

const colorTag = inputType => {
  switch (inputType) {
    case 'text-area':
      return 'green';
    case 'select':
      return 'volcano';
    case 'rate':
      return 'purple';
    default:
      return 'blue';
  }
};

export default (
  formatMessage,
  edit,
  handleDelete,
  viewQuestion,
  handleCreateChild,
) => [
  {
    title: formatMessage(messages.nameLabel),
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: formatMessage(messages.numofChildLabel),
    dataIndex: 'numofChild',
    key: 'numofChild',
    sorter: (a, b) => a > b,
  },
  {
    title: formatMessage(messages.inputTypeLabel),
    dataIndex: 'inputType',
    key: 'inputType',
    render: text => (text ? <Tag color={colorTag(text)}>{text}</Tag> : null),
  },
  {
    title: formatMessage(messages.actionLabel),
    dataIndex: 'action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Tooltip placement="left" title={formatMessage(messages.editToolTip)}>
          <a onClick={() => edit(record)}>
            <Icon type="edit" style={styles.icon} />
          </a>
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip placement="top" title={formatMessage(messages.deleteToolTip)}>
          <Popconfirm
            title={formatMessage(messages.deletePromtMsg)}
            onConfirm={() => handleDelete(record.id)}
            cancelText={formatMessage(messages.cancel)}
            icon={<Icon type="question-circle-o" style={styles.delete} />}
          >
            <a>
              <Icon type="delete" style={(styles.icon, styles.delete)} />
            </a>
          </Popconfirm>
        </Tooltip>

        <Divider type="vertical" />

        {!record.parent && (
          <Tooltip
            placement="right"
            title={formatMessage(messages.addChildToolTip)}
          >
            <a onClick={() => handleCreateChild(record.id)}>
              <Icon type="plus" style={styles.icon} />
            </a>
            <Divider type="vertical" />
          </Tooltip>
        )}

        {!record.numofChild && (
          <Tooltip
            placement="right"
            title={formatMessage(messages.detailToolTip)}
          >
            <a onClick={() => viewQuestion(record.id, record.name)}>
              <Icon type="eye" style={styles.icon} />
            </a>
          </Tooltip>
        )}
      </span>
    ),
  },
];
