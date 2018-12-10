import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditableContext } from '../../../../../../utils/EditableCell';
import { styles } from '../../../../../../utils/styles';
import messages from './messages';

export default (formatMessage, viewProfile, handleDelete) => [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
    align: 'center',
    sorter: (a, b) => a.orderNumber < b.orderNumber,
    render: key => key + 1,
  },
  {
    title: formatMessage(messages.profileLabel),
    dataIndex: 'name',
    key: 'name',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.actionTitle),
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: (text, record) => {
      return (
        <span>
          <Tooltip placement="left" title={formatMessage(messages.viewToolTip)}>
            <a onClick={() => viewProfile(record.key)}>
              <Icon type="eye" style={styles.icon} />
            </a>
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip
            placement="right"
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
        </span>
      );
    },
  },
];
