import React from 'react';
import { Tag } from 'antd';
import messages from './messages';

const filters = [
  {
    text: 'Cao',
    value: 'Cao',
  },
  {
    text: 'Thấp',
    value: 'Thấp',
  },
  {
    text: 'Trung bình',
    value: 'Trung bình',
  },
];

const tagColor = new Map([
  ['Cao', 'red'],
  ['Thấp', 'geekblue'],
  ['Trung bình', 'green'],
]);

export default formatMessage => [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
    render: key => key + 1,
    sorter: (a, b) => a.orderNumber < b.orderNumber,
  },
  {
    title: formatMessage(messages.noiseLabel),
    dataIndex: 'noise',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.noise.localeCompare(b.noise),
    filters,
    onFilter: (value, record) => record.noise.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.outwardLabel),
    dataIndex: 'outward',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.outward.localeCompare(b.outward),
    filters,
    onFilter: (value, record) => record.outward.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.openMindedLabel),
    dataIndex: 'openMinded',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.openMinded.localeCompare(b.openMinded),
    filters,
    onFilter: (value, record) => record.openMinded.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.ezAcceptLabel),
    dataIndex: 'ezAccept',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.ezAccept.localeCompare(b.ezAccept),
    filters,
    onFilter: (value, record) => record.ezAccept.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.conscientiousLabel),
    dataIndex: 'conscientious',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.conscientious.localeCompare(b.conscientious),
    filters,
    onFilter: (value, record) => record.conscientious.indexOf(value) === 0,
  },
];
