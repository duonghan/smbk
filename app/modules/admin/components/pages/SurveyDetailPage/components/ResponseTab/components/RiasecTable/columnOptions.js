import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { EditableContext } from '../../../../../../utils/EditableCell';
import messages from './messages';
import { styles } from '../../../../../../utils/styles';

export default (formatMessage, isEditing, save, cancel, edit, handleDelete) => [
  {
    title: '#',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    align: 'center',
    sorter: (a, b) => a.orderNumber < b.orderNumber,
  },
  {
    title: formatMessage(messages.nameLabel),
    dataIndex: 'content',
    key: 'content',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.realisticLabel),
    dataIndex: 'content',
    key: 'content',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.discoverLabel),
    dataIndex: 'content',
    key: 'content',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.artLabel),
    dataIndex: 'content',
    key: 'content',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.convinceLabel),
    dataIndex: 'content',
    key: 'content',
    editable: true,
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
];
