/*
* Author: Duong Han
* HUST
* AdminSider Messages
*
* This contains all the text for the AdminSider component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AdminSider';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AdminSider component!',
  },

  subMenuSurvey: {
    id: `${scope}.subMenuSurvey`,
    defaultMessage: 'Mẫu khảo sát',
  },

  subMenuStatistic: {
    id: `${scope}.subMenuStatistic`,
    defaultMessage: 'Thống kê',
  },

  subMenuChart: {
    id: `${scope}.subMenuChart`,
    defaultMessage: 'Biểu đồ',
  },

  menuItemAccount: {
    id: `${scope}.menuItemAccount`,
    defaultMessage: 'Quản lý tài khoản',
  },

  menuItemDashboard: {
    id: `${scope}.menuItemDashboard`,
    defaultMessage: 'Bảng điều khiển',
  },

  menuItemCheck: {
    id: `${scope}.menuItemCheck`,
    defaultMessage: 'Trắc nghiệm tâm lý',
  },

  menuItemNEO: {
    id: `${scope}.menuItemNEO`,
    defaultMessage: 'Trắc nghiệm NEO',
  },

  menuItemRIASEC: {
    id: `${scope}.menuItemRIASEC`,
    defaultMessage: 'Trắc nghiệm RIASEC',
  },
});
