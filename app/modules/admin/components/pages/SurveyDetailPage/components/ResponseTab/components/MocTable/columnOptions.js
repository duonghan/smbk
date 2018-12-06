import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditableContext } from '../../../../../../utils/EditableCell';
import { styles } from '../../../../../../utils/styles';
import messages from './messages';

export default (formatMessage, isEditing, save, cancel, edit, handleDelete) => [
  {
    title: '#',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    align: 'center',
    sorter: (a, b) => a.orderNumber < b.orderNumber,
  },
  {
    title: formatMessage(messages.profileLabel),
    dataIndex: 'profile',
    key: 'profile',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.actionTitle),
    dataIndex: 'action',
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
                    onClick={() => save(form, record.orderNumber)}
                    style={{ marginRight: 8 }}
                  >
                    <FormattedMessage {...messages.save} />
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title={formatMessage(messages.cancelPromtMsg)}
                onConfirm={() => cancel(record.orderNumber)}
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
              <a onClick={() => edit(record.orderNumber)}>
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
              onConfirm={() => handleDelete(record.orderNumber)}
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
