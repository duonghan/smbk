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

  rulesMsg: {
    id: `${scope}.rulesMsg`,
    defaultMessage: 'Vui lòng nhập',
  },

  editToolTip: {
    id: `${scope}.editToolTip`,
    defaultMessage: 'Sửa',
  },

  deleteToolTip: {
    id: `${scope}.deleteToolTip`,
    defaultMessage: 'Xóa',
  },

  detailToolTip: {
    id: `${scope}.detailToolTip`,
    defaultMessage: 'Chi tiết',
  },

  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Hủy',
  },

  actionTitle: {
    id: `${scope}.actionTitle`,
    defaultMessage: 'Hành động',
  },

  save: {
    id: `${scope}.save`,
    defaultMessage: 'Lưu',
  },

  cancelPromtMsg: {
    id: `${scope}.cancelPromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn hủy?',
  },

  deletePromtMsg: {
    id: `${scope}.deletePromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn xóa?',
  },

  addQuestion: {
    id: `${scope}.addQuestion`,
    defaultMessage: 'Thêm câu hỏi',
  },
});
