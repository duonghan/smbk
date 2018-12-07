/*
 * Admin Messages
 *
 * This contains all the text for the Admin component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.modules.admin.components.DashBoardPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Bảng điều khiển',
  },

  responseChartHeader: {
    id: `${scope}.responseChartHeader`,
    defaultMessage: 'Biểu đồ số lượng người dùng',
  },

  userStatTitle: {
    id: `${scope}.userStatTitle`,
    defaultMessage: 'Người dùng',
  },

  surveyStatTitle: {
    id: `${scope}.surveyStatTitle`,
    defaultMessage: 'Khảo sát',
  },

  responseStatTitle: {
    id: `${scope}.responseStatTitle`,
    defaultMessage: 'Phản hồi',
  },

  questionStatTitle: {
    id: `${scope}.questionStatTitle`,
    defaultMessage: 'Câu hỏi',
  },
});
