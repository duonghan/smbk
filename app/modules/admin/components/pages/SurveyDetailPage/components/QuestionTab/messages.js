/*
* Author: Duong Han
* HUST
* QuestionTab Messages
*
* This contains all the text for the QuestionTab component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.QuestionTab';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the QuestionTab component!',
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

  // add group question form
  addGroup: {
    id: `${scope}.addGroup`,
    defaultMessage: 'Thêm nhóm câu hỏi',
  },
});
