/*
* Author: Duong Han
* HUST
* SurveyTable Messages
*
* This contains all the text for the SurveyTable component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SurveyTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách khảo sát',
  },

  titleLabel: {
    id: `${scope}.titleLabel`,
    defaultMessage: 'Tiêu đề',
  },

  dateLabel: {
    id: `${scope}.dateLabel`,
    defaultMessage: 'Ngày tạo',
  },

  updateLabel: {
    id: `${scope}.updateLabel`,
    defaultMessage: 'Lần cuối cập nhật',
  },

  actionLabel: {
    id: `${scope}.actionLabel`,
    defaultMessage: 'Hành động',
  },
});
