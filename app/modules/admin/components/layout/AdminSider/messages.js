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
  menuItemAccount: {
    id: `${scope}.menuItemAccount`,
    defaultMessage: 'Quản lý tài khoản',
  },

  menuItemSurvey: {
    id: `${scope}.menuItemSurvey`,
    defaultMessage: 'Quản lý khảo sát',
  },

  menuItemDashboard: {
    id: `${scope}.menuItemDashboard`,
    defaultMessage: 'Bảng điều khiển',
  },
});
