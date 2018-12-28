import React from 'react';
import { Rate } from 'antd';
import messages from './messages';

const filters = [1, 2, 3, 4, 5, 6].map(range => ({
  text: (
    <Rate
      disabled
      defaultValue={7 - range}
      count={6}
      style={{ color: '#2196f3' }}
    />
  ),
  value: range,
}));

export default formatMessage => [
  {
    title: '#',
    dataIndex: 'key',
    render: key => key + 1,
    align: 'center',
    width: 50,
    fixed: 'left',
    sorter: (a, b) => a > b,
  },
  {
    title: formatMessage(messages.nameLabel),
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    filters,
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.realisticLabel),
    dataIndex: 'realistic',
    render: range => (
      <Rate
        disabled
        defaultValue={7 - range}
        count={6}
        style={{ color: '#2196f3', fontSize: 14 }}
      />
    ),
    sorter: (a, b) => a.realistic.localeCompare(b.realistic),
    filters,
    onFilter: (value, record) => record.realistic.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.discoverLabel),
    dataIndex: 'discover',
    render: range => (
      <Rate
        disabled
        defaultValue={7 - range}
        count={6}
        style={{ color: '#2196f3', fontSize: 14 }}
      />
    ),
    sorter: (a, b) => a.discover.localeCompare(b.discover),
    filters,
    onFilter: (value, record) => record.discover.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.artLabel),
    dataIndex: 'art',
    render: range => (
      <Rate
        disabled
        defaultValue={7 - range}
        count={6}
        style={{ color: '#2196f3', fontSize: 14 }}
      />
    ),
    sorter: (a, b) => a.art.localeCompare(b.art),
    filters,
    onFilter: (value, record) => record.art.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.societyLabel),
    dataIndex: 'society',
    render: range => (
      <Rate
        disabled
        defaultValue={7 - range}
        count={6}
        style={{ color: '#2196f3', fontSize: 14 }}
      />
    ),
    sorter: (a, b) => a.society.localeCompare(b.society),
    filters,
    onFilter: (value, record) => record.society.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.ruleLabel),
    dataIndex: 'rule',
    render: range => (
      <Rate
        disabled
        defaultValue={7 - range}
        count={6}
        style={{ color: '#2196f3', fontSize: 14 }}
      />
    ),
    sorter: (a, b) => a.rule.localeCompare(b.rule),
    filters,
    onFilter: (value, record) => record.rule.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.convinceLabel),
    dataIndex: 'convince',
    render: range => (
      <Rate
        disabled
        defaultValue={7 - range}
        count={6}
        style={{ color: '#2196f3', fontSize: 14 }}
      />
    ),
    sorter: (a, b) => a.convince.localeCompare(b.convince),
    filters,
    onFilter: (value, record) => record.convince.indexOf(value) === 0,
  },
];
