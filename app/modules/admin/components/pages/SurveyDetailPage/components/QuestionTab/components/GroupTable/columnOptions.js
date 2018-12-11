import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditableContext } from '../../../../../../utils/EditableCell';
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
  isEditing,
  save,
  cancel,
  edit,
  handleDelete,
  viewQuestion,
  handleCreateChild,
) => [
  {
    title: formatMessage(messages.nameLabel),
    dataIndex: 'name',
    key: 'name',
    editable: true,
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
    render: (text, record) => {
      const editable = isEditing(record);
      return (
        <span>
          {editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    <FormattedMessage {...messages.save} />
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title={formatMessage(messages.cancelPromtMsg)}
                onConfirm={() => cancel()}
                cancelText={formatMessage(messages.cancel)}
              >
                <a>
                  <FormattedMessage {...messages.cancel} />
                </a>
              </Popconfirm>
            </span>
          ) : (
            <Tooltip
              placement="left"
              title={formatMessage(messages.editToolTip)}
            >
              <a onClick={() => edit(record.id)}>
                <Icon type="edit" style={styles.icon} />
              </a>
            </Tooltip>
          )}
          <Divider type="vertical" />
          <Tooltip
            placement="top"
            title={formatMessage(messages.deleteToolTip)}
          >
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
          {!record.parent ? (
            <Tooltip
              placement="right"
              title={formatMessage(messages.addChildToolTip)}
            >
              <a onClick={() => handleCreateChild(record)}>
                <Icon type="plus" style={styles.icon} />
              </a>
            </Tooltip>
          ) : (
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
      );
    },
  },
];
