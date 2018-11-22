/*
* Author: Duong Han
* HUST
* AddNewSurvey Messages
*
* This contains all the text for the AddNewSurvey component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AddNewSurvey';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AddNewSurvey component!',
  },
  nextBtn: {
    id: `${scope}.nextBtn`,
    defaultMessage: 'Kế tiếp',
  },
  prevBtn: {
    id: `${scope}.prevBtn`,
    defaultMessage: 'Lùi lại',
  },
  doneBtn: {
    id: `${scope}.doneBtn`,
    defaultMessage: 'Hoàn tất',
  },
  doneMsg: {
    id: `${scope}.doneMsg`,
    defaultMessage: 'Quá trình hoàn tất',
  },
  initStep: {
    id: `${scope}.initStep`,
    defaultMessage: 'Khởi tạo',
  },
  editStep: {
    id: `${scope}.editStep`,
    defaultMessage: 'Thiết kế',
  },
  publishStep: {
    id: `${scope}.publishStep`,
    defaultMessage: 'Xuất bản',
  },
  addTitlle: {
    id: `${scope}.addTitlle`,
    defaultMessage: 'Thêm tiêu đề',
  },
  addTitllePlcHolder: {
    id: `${scope}.addTitllePlcHolder`,
    defaultMessage: 'Điền tên tiêu đề tại đây',
  },
  preTitle: {
    id: `${scope}.preTitle`,
    defaultMessage: 'Mẫu khảo sát: ',
  },
});
