/*
* Author: Duong Han
* HUST
* RiasecTable Messages
*
* This contains all the text for the RiasecTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.RiasecTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách phản hồi',
  },

  // Table
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Người trả lời',
  },

  realisticLabel: {
    id: `${scope}.realisticLabel`,
    defaultMessage: 'Hiện thực',
  },

  ruleLabel: {
    id: `${scope}.ruleLabel`,
    defaultMessage: 'Quy tắc',
  },

  discoverLabel: {
    id: `${scope}.discoverLabel`,
    defaultMessage: 'Khám phá',
  },

  artLabel: {
    id: `${scope}.artLabel`,
    defaultMessage: 'Nghệ thuật',
  },

  convinceLabel: {
    id: `${scope}.convinceLabel`,
    defaultMessage: 'Thuyết phục',
  },

  societyLabel: {
    id: `${scope}.societyLabel`,
    defaultMessage: 'Xã hội',
  },

  dateLabel: {
    id: `${scope}.dateLabel`,
    defaultMessage: 'Ngày trả lời',
  },

  download: {
    id: `${scope}.download`,
    defaultMessage: 'Tải xuống',
  },
});
