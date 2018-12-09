import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip, Popover } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { EditableContext } from '../../utils/EditableCell';
import messages from './messages';
import { styles } from '../../utils/styles';

export default (formatMessage, isEditing, save, cancel, edit, handleDelete) => [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    sorter: (a, b) => a.key < b.key,
  },
  {
    title: formatMessage(messages.titleLabel),
    dataIndex: 'title',
    key: 'title',
    editable: true,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: formatMessage(messages.coverLabel),
    dataIndex: 'cover',
    key: 'cover',
    editable: true,
    render: text => (
      <Popover content={<img src={text} />} trigger="hover" placement="right">
        <a> {text}</a>
      </Popover>
    ),
  },
  {
    title: formatMessage(messages.dateLabel),
    dataIndex: 'date',
    key: 'date',
    align: 'center',
    render: text => new Date(text).toLocaleString('vi-VN'),
    sorter: (a, b) => a > b,
  },
  {
    title: formatMessage(messages.updateLabel),
    dataIndex: 'lastUpdate',
    key: 'lastUpdate',
    align: 'center',
    render: text => new Date(text).toLocaleString('vi-VN'),
    sorter: (a, b) => new Date(a) > new Date(b),
  },
  {
    title: formatMessage(messages.actionTitle),
    dataIndex: 'action',
    width: 140,
    key: 'action',
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
                    onClick={() => save(form, record.key)}
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
            placement="top"
            title={formatMessage(messages.deleteToolTip)}
          >
            <Popconfirm
              title={formatMessage(messages.deletePromtMsg)}
              onConfirm={() => handleDelete(record.key)}
              cancelText={formatMessage(messages.cancel)}
              icon={<Icon type="question-circle-o" style={styles.delete} />}
            >
              <a>
                <Icon type="delete" style={(styles.icon, styles.delete)} />
              </a>
            </Popconfirm>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip
            placement="right"
            title={formatMessage(messages.detailToolTip)}
          >
            <Link
              to={{
                pathname: '/admin/survey/detail',
                search: `?survey=${record.name}`,
                state: { id: record.id },
              }}
            >
              <Icon type="arrow-right" />
            </Link>
          </Tooltip>
        </span>
      );
    },
  },
];
