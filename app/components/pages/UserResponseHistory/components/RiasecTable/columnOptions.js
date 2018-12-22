import React from 'react';
import messages from './messages';

export default formatMessage => [
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
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.realisticLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.discoverLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.artLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.convinceLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
];
