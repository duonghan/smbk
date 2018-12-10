/*
* Author: Duong Han
* HUST
* QuestionTable Messages
*
* This contains all the text for the QuestionTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.QuestionTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách câu hỏi',
  },

  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Nội dung câu hỏi',
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

  // add question form modal
  contentLabel: {
    id: `${scope}.contentLabel`,
    defaultMessage: 'Nội dung câu hỏi',
  },

  contentPlaceholder: {
    id: `${scope}.contentPlaceholder`,
    defaultMessage: 'Vui lòng nhập nội dung câu hỏi',
  },

  contentRequiredMsg: {
    id: `${scope}.contentRequiredMsg`,
    defaultMessage: 'Vui lòng nhập nội dung của câu hỏi',
  },

  groupLabel: {
    id: `${scope}.groupLabel`,
    defaultMessage: 'Nhóm câu hỏi',
  },

  groupPlaceholder: {
    id: `${scope}.groupPlaceholder`,
    defaultMessage: 'Chọn nhóm câu hỏi',
  },

  groupRequiredMsg: {
    id: `${scope}.groupRequiredMsg`,
    defaultMessage: 'Vui lòng chọn nhóm câu hỏi',
  },

  addBtn: {
    id: `${scope}.addBtn`,
    defaultMessage: 'Thêm',
  },

  cancelBtn: {
    id: `${scope}.cancelBtn`,
    defaultMessage: 'Trở về',
  },

  // Update question succeeded

  updateSuccessTitle: {
    id: `${scope}.updateSuccessTitle`,
    defaultMessage: 'Thành công',
  },

  updateSuccessContent: {
    id: `${scope}.updateSuccessContent`,
    defaultMessage: 'Xóa câu hỏi thành công',
  },

  updateFailedTitle: {
    id: `${scope}.updateFailedTitle`,
    defaultMessage: 'Lỗi',
  },

  updateFailedContent: {
    id: `${scope}.updateFailedContent`,
    defaultMessage: 'Đã xảy ra lỗi. Vui lòng thử lại',
  },

  deleteSuccessTitle: {
    id: `${scope}.deleteSuccessTitle`,
    defaultMessage: 'Thành công',
  },

  deleteSuccessContent: {
    id: `${scope}.deleteSuccessContent`,
    defaultMessage: 'Xóa câu hỏi thành công',
  },
});
