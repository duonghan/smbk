/*
* Author: Duong Han
* HUST
* PsychologicTable Messages
*
* This contains all the text for the PsychologicTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PsychologicTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách phản hồi',
  },

  // Table
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Người dùng',
  },

  stressLabel: {
    id: `${scope}.stressLabel`,
    defaultMessage: 'Stress',
  },

  worryLabel: {
    id: `${scope}.worryLabel`,
    defaultMessage: 'Lo âu',
  },

  depressionLabel: {
    id: `${scope}.depressionLabel`,
    defaultMessage: 'Trầm cảm',
  },

  concentratingLabel: {
    id: `${scope}.concentratingLabel`,
    defaultMessage: 'Khó tập trung',
  },

  crazyLabel: {
    id: `${scope}.crazyLabel`,
    defaultMessage: 'Tăng động',
  },

  socialInteractionLabel: {
    id: `${scope}.socialInteractionLabel`,
    defaultMessage: 'Khó khăn về giao tiếp xã hội',
  },

  studyLabel: {
    id: `${scope}.studyLabel`,
    defaultMessage: 'Khó khăn học tập',
  },

  workLabel: {
    id: `${scope}.workLabel`,
    defaultMessage: 'Khó khăn trong định hướng nghề nghiệp',
  },

  parentLabel: {
    id: `${scope}.parentLabel`,
    defaultMessage: 'Khó khăn trong mối quan hệ với cha mẹ',
  },

  teacherLabel: {
    id: `${scope}.teacherLabel`,
    defaultMessage: 'Khó khăn trong mối quan hệ với thầy cô',
  },

  againstLabel: {
    id: `${scope}.againstLabel`,
    defaultMessage: 'Hành vi thách thức – chống đối',
  },

  behaviorLabel: {
    id: `${scope}.behaviorLabel`,
    defaultMessage: 'Rối loạn hành vi ứng xử',
  },

  fightLabel: {
    id: `${scope}.fightLabel`,
    defaultMessage: 'Gây hấn',
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
