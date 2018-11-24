/*
* Author: Duong Han
* HUST
* SurveyItem Messages
*
* This contains all the text for the SurveyItem component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SurveyItem';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SurveyItem component!',
  },

  userCount: {
    id: `${scope}.userCount`,
    defaultMessage: 'Người tham gia',
  },

  type: {
    id: `${scope}.type`,
    defaultMessage: 'Kiểu',
  },

  date: {
    id: `${scope}.date`,
    defaultMessage: 'Ngày tạo',
  },

  lastUpdate: {
    id: `${scope}.lastUpdate`,
    defaultMessage: 'Cập nhật lần cuối',
  },

  takeSurvey: {
    id: `${scope}.takeSurvey`,
    defaultMessage: 'Tham gia',
  },
});
