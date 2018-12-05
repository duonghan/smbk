import React from 'react';
import { Divider, Icon, Popconfirm, Tooltip, Popover, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { EditableContext } from '../../../../../../utils/EditableCell';
import messages from './messages';
import { styles } from '../../../../../../utils/styles';

export default (formatMessage, isEditing, save, cancel, edit, handleDelete) => [
  {
    title: formatMessage(messages.nameLabel),
    dataIndex: 'name',
    key: 'name',
    editable: true,
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: formatMessage(messages.inputTypeLabel),
    dataIndex: 'inputType',
    key: 'inputType',
    editable: true,
    render: text => (text ? <Tag color="blue">{text}</Tag> : null),
  },
];
