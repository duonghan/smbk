/*
* Author: Duong Han
* HUST
* AdminPage Messages
*
* This contains all the text for the AdminPage component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AdminPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Trang quản trị',
  },

  subMenuUpdate: {
    id: `${scope}.subMenuUpdate`,
    defaultMessage: 'Cập nhật',
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
    defaultMessage: 'Tài khoản',
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
