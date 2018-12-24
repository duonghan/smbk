/*
* Author: Duong Han
* HUST
* NeoTable Messages
*
* This contains all the text for the NeoTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.pages.UserResponseHistory.NeoTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Trắc nghiệm dự đoán nhân cách',
  },

  // Table
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Người trả lời',
  },

  noiseLabel: {
    id: `${scope}.noiseLabel`,
    defaultMessage: 'Nhiễu tâm',
  },

  outwardLabel: {
    id: `${scope}.outwardLabel`,
    defaultMessage: 'Hướng ngoại',
  },

  openMindedLabel: {
    id: `${scope}.openMindedLabel`,
    defaultMessage: 'Cởi mở, ham học hỏi',
  },

  ezAcceptLabel: {
    id: `${scope}.ezAcceptLabel`,
    defaultMessage: 'Dễ chấp nhận',
  },

  conscientiousLabel: {
    id: `${scope}.conscientiousLabel`,
    defaultMessage: 'Tận tâm',
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

  male: {
    id: `${scope}.male`,
    defaultMessage: 'Nam',
  },

  female: {
    id: `${scope}.female`,
    defaultMessage: 'Nữ',
  },
});
