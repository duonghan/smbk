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
    title: formatMessage(messages.noiseLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.outwardLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.openMindedLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.ezAcceptLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
  {
    title: formatMessage(messages.conscientiousLabel),
    dataIndex: 'content',
    key: 'content',
    sorter: (a, b) => a.content.localeCompare(b.content),
  },
];
