/*
* Author: Duong Han
* HUST
* GroupTable Messages
*
* This contains all the text for the GroupTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.GroupTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách nhóm câu hỏi',
  },

  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Tên nhóm câu hỏi',
  },

  numofChildLabel: {
    id: `${scope}.numofChildLabel`,
    defaultMessage: 'Số nhóm con',
  },

  inputTypeLabel: {
    id: `${scope}.inputTypeLabel`,
    defaultMessage: 'Kiểu',
  },

  actionLabel: {
    id: `${scope}.actionLabel`,
    defaultMessage: 'Hành động',
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
});
