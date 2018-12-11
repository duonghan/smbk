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

  namePlaceholder: {
    id: `${scope}.namePlaceholder`,
    defaultMessage: 'Nhập nội dung nhóm câu hỏi',
  },

  nameRequiredMsg: {
    id: `${scope}.nameRequiredMsg`,
    defaultMessage: 'Vui lòng nhập nội dung của nhóm câu hỏi',
  },

  numofChildLabel: {
    id: `${scope}.numofChildLabel`,
    defaultMessage: 'Số nhóm con',
  },

  groupTypeLabel: {
    id: `${scope}.groupTypeLabel`,
    defaultMessage: 'Danh mục',
  },

  inputTypeLabel: {
    id: `${scope}.inputTypeLabel`,
    defaultMessage: 'Kiểu',
  },

  inputTypeRequiredMsg: {
    id: `${scope}.inputTypeRequiredMsg`,
    defaultMessage: 'Vui lòng nhập kiểu trả lời',
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

  addChildToolTip: {
    id: `${scope}.addChildToolTip`,
    defaultMessage: 'Thêm nhóm con',
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

  addQuestion: {
    id: `${scope}.addQuestion`,
    defaultMessage: 'Thêm câu hỏi',
  },

  addBtn: {
    id: `${scope}.addBtn`,
    defaultMessage: 'Thêm',
  },

  addAnswerBtn: {
    id: `${scope}.addAnswerBtn`,
    defaultMessage: 'Thêm câu trả lời',
  },

  answerLabel: {
    id: `${scope}.answerLabel`,
    defaultMessage: 'Nội dung câu trả lời',
  },

  cancelBtn: {
    id: `${scope}.cancelBtn`,
    defaultMessage: 'Trở về',
  },

  // add group question form
  addGroup: {
    id: `${scope}.addGroup`,
    defaultMessage: 'Thêm nhóm câu hỏi',
  },

  successTitle: {
    id: `${scope}.successTitle`,
    defaultMessage: 'Thành công',
  },

  updateSuccessContent: {
    id: `${scope}.updateSuccessContent`,
    defaultMessage: 'Cập nhật nhóm thành công',
  },

  addSuccessContent: {
    id: `${scope}.addSuccessContent`,
    defaultMessage: 'Thêm nhóm thành công',
  },
});
