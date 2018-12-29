import React from 'react';
import { Divider, Icon, Popconfirm, Tag, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditableContext } from './EditableCell';
import messages from './messages';
import { styles } from './styles';

const colorTag = text => {
  switch (text) {
    case 'ADMIN':
      return 'volcano';
    case 'male':
      return 'red';
    case 'female':
      return 'green';
    default:
      return 'blue';
  }
};

export default (
  sortedInfo,
  filteredInfo,
  formatMessage,
  isEditing,
  save,
  cancel,
  edit,
  handleDelete,
) => [
  {
    title: '#',
    dataIndex: 'key',
    width: 50,
    render: key => key + 1,
    sorter: (a, b) => a.key < b.key,
    sortOrder: sortedInfo.columnKey === 'key' && sortedInfo.order,
    fixed: 'left',
  },
  {
    title: formatMessage(messages.nameTitle),
    dataIndex: 'name',
    editable: true,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    editable: true,
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
  },
  {
    title: formatMessage(messages.genderTitle),
    dataIndex: 'gender',
    editable: true,
    render: gender => (
      <span>
        <Tag color={colorTag(gender)}>
          {formatMessage(messages[gender.toLowerCase()])}
        </Tag>
      </span>
    ),
    filters: [
      { text: formatMessage(messages.male), value: 'male' },
      { text: formatMessage(messages.female), value: 'female' },
    ],
    filteredValue: filteredInfo.gender || null,
    onFilter: (value, record) => record.gender === value,
    sorter: (a, b) => a.gender.localeCompare(b.gender),
    sortOrder: sortedInfo.columnKey === 'gender' && sortedInfo.order,
  },
  {
    title: formatMessage(messages.roleTitle),
    dataIndex: 'role',
    editable: true,
    render: role => (
      <span>
        <Tag color={colorTag(role)}>
          {formatMessage(messages[role.toLowerCase()])}
        </Tag>
      </span>
    ),
    filters: [
      { text: formatMessage(messages.admin), value: 'ADMIN' },
      { text: formatMessage(messages.default), value: 'DEFAULT' },
    ],
    filteredValue: filteredInfo.role || null,
    onFilter: (value, record) => record.role.includes(value),
    sorter: (a, b) => a.role.localeCompare(b.role),
    sortOrder: sortedInfo.columnKey === 'role' && sortedInfo.order,
  },
  {
    title: formatMessage(messages.dateTitle),
    dataIndex: 'date',
    sorter: (a, b) => new Date(b.date) - new Date(a.date),
    sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
    render: text => new Date(text).toLocaleString('vi-VN'),
  },
  {
    title: formatMessage(messages.actionTitle),
    dataIndex: 'action',
    width: 100,
    align: 'center',
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
                onConfirm={() => cancel(record.key)}
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
              <a onClick={() => edit(record.key)}>
                <Icon type="edit" style={styles.icon} />
              </a>
            </Tooltip>
          )}
          <Divider type="vertical" />
          <Tooltip
            placement="right"
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
        </span>
      );
    },
  },
];
