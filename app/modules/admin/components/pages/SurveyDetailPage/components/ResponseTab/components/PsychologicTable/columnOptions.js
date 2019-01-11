import React from 'react';
import { Tag } from 'antd';
import messages from './messages';

const filters = [
  {
    text: 'Nên gặp chuyên gia',
    value: 'Nên gặp chuyên gia',
  },
  {
    text: 'Nguy cơ',
    value: 'Nguy cơ',
  },
  {
    text: 'Không gặp vấn đề',
    value: 'Không gặp vấn đề',
  },
];

const tagColor = new Map([
  ['Nên gặp chuyên gia', 'red'],
  ['Nguy cơ', 'geekblue'],
  ['Không gặp vấn đề', 'green'],
]);

export default formatMessage => [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
    render: key => key + 1,
    sorter: (a, b) => a.key < b.key,
  },
  {
    title: formatMessage(messages.nameLabel),
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: formatMessage(messages.stressLabel),
    dataIndex: 'stress',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.stress.localeCompare(b.stress),
    filters,
    onFilter: (value, record) => record.stress.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.worryLabel),
    dataIndex: 'worry',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.worry.localeCompare(b.worry),
    filters,
    onFilter: (value, record) => record.worry.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.depressionLabel),
    dataIndex: 'depression',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.depression.localeCompare(b.depression),
    filters,
    onFilter: (value, record) => record.depression.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.concentratingLabel),
    dataIndex: 'concentrating',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.concentrating.localeCompare(b.concentrating),
    filters,
    onFilter: (value, record) => record.concentrating.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.crazyLabel),
    dataIndex: 'crazy',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.crazy.localeCompare(b.crazy),
    filters,
    onFilter: (value, record) => record.crazy.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.socialInteractionLabel),
    dataIndex: 'socialInteraction',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.socialInteraction.localeCompare(b.socialInteraction),
    filters,
    onFilter: (value, record) => record.socialInteraction.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.studyLabel),
    dataIndex: 'study',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.study.localeCompare(b.study),
    filters,
    onFilter: (value, record) => record.study.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.workLabel),
    dataIndex: 'work',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.work.localeCompare(b.work),
    filters,
    onFilter: (value, record) => record.work.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.parentLabel),
    dataIndex: 'parent',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.parent.localeCompare(b.parent),
    filters,
    onFilter: (value, record) => record.parent.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.teacherLabel),
    dataIndex: 'teacher',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.teacher.localeCompare(b.teacher),
    filters,
    onFilter: (value, record) => record.teacher.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.againstLabel),
    dataIndex: 'against',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.against.localeCompare(b.against),
    filters,
    onFilter: (value, record) => record.against.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.behaviorLabel),
    dataIndex: 'behavior',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.behavior.localeCompare(b.behavior),
    filters,
    onFilter: (value, record) => record.behavior.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.fightLabel),
    dataIndex: 'fight',
    render: text => <Tag color={tagColor.get(text)}>{text}</Tag>,
    sorter: (a, b) => a.fight.localeCompare(b.fight),
    filters,
    onFilter: (value, record) => record.fight.indexOf(value) === 0,
  },
  {
    title: formatMessage(messages.dateLabel),
    dataIndex: 'date',
    render: text => new Date(text).toLocaleString('vi-VN'),
    sorter: (a, b) => new Date(b.date) - new Date(a.date),
  },
];
